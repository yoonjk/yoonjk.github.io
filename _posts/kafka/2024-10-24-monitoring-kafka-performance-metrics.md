---
title: kafka 성능 metrics 모니터링
categories:
  - kafka
tags: 
  - metrics
---

아키텍처 개요
자세히 알아보기 전에 Kafka 배포의 일반적인 아키텍처를 이해하는 것이 중요합니다. 모든 배포는 아래 그림과 같은 구성 요소로 이루어져 있습니다:

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/kafka/kafka-architecture.png" alt="">
  <figcaption></figcaption>
</figure> 

카프카 브로커는 메시지(레코드라고도 함)의 형태로 데이터를 전송하는 생산자 애플리케이션과 해당 메시지를 수신하는 소비자 애플리케이션 사이의 중개자 역할을 합니다. 생산자는 요청 횟수를 줄여 네트워크 오버헤드를 최소화하기 위해 메시지를 일괄적으로 카프카 브로커에 푸시합니다. 브로커는 소비자가 자신의 속도로 가져올 수 있도록 메시지를 저장합니다.

메시지는 메시지를 설명하는 메타데이터, 메시지 페이로드, 그리고 임의의 임의 헤더(버전 0.11.0 기준)로 구성됩니다. Kafka의 메시지는 브로커가 수신한 순서대로 로그에 기록되며, 변경할 수 없고 읽기만 허용되는 유일한 작업입니다.

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/kafka/message-consist-of-metadata.png" alt="">
  <figcaption></figcaption>
</figure> 

카프카는 메시지를 토픽으로 구성하여 관련 메시지를 저장하고, 소비자는 필요한 토픽을 구독합니다. 토픽은 그 자체로 파티션으로 나뉘며, 파티션은 브로커에 할당됩니다. 따라서 토픽은 브로커 수준에서 데이터의 샤딩을 시행합니다. 파티션 수가 많을수록 토픽이 지원할 수 있는 동시 소비자 수가 늘어납니다.

Kafka를 처음 설정할 때는 토픽당 충분한 수의 파티션을 할당하고 브로커 간에 파티션을 공정하게 분배하는 데 주의를 기울여야 합니다. Kafka를 처음 배포할 때 이렇게 하면 향후 성장통을 최소화할 수 있습니다. 적절한 토픽 및 파티션 수를 선택하는 방법에 대한 자세한 내용은 Confluent의 Jun Rao가 작성한 이 [훌륭한 글을 참조](http://www.confluent.io/blog/apache-kafka-supports-200k-partitions-per-cluster/)하세요.


Kafka의 복제 기능은 선택적으로 여러 브로커에서 각 파티션을 유지함으로써 고가용성을 제공합니다. 복제된 파티션에서 Kafka는 하나의 복제본, 즉 파티션 리더에게만 메시지를 씁니다. 다른 복제본은 팔로워로, 리더로부터 메시지의 복사본을 가져옵니다. 소비자는 Kafka 버전 2.4부터 파티션 리더 또는 팔로워 중 하나에서 읽을 수 있습니다. (이전 버전에서는 소비자는 파티션 리더에서만 읽을 수 있었습니다.) 이 아키텍처는 여러 복제본에 걸쳐 요청 부하를 분산시킵니다.

또한 현재 리더가 오프라인 상태가 되면 팔로워가 동기화 복제본(ISR)으로 인식되는 경우 팔로워가 파티션 리더 역할을 할 수 있습니다. 팔로워가 파티션 리더에게 전송된 각 메시지를 성공적으로 가져와서 승인하면 팔로워가 동기화 중인 것으로 간주합니다. 리더가 오프라인 상태가 되면 Kafka는 ISR 세트에서 새 리더를 선출합니다. 그러나 브로커가 클린하지 않은 리더 선출을 허용하도록 구성된 경우(즉, unclean.leader.election.enable 값이 true인 경우) 동기화되지 않은 리더를 선출할 수 있습니다.

마지막으로, ZooKeeper 없이는 Kafka 배포가 완료되지 않습니다. ZooKeeper는 이 모든 것을 하나로 묶어주는 접착제이며, 그 역할을 담당합니다:

- 트롤러(파티션 리더를 관리하는 Kafka 브로커) 선출
- 클러스터 멤버십 기록
- 토픽 구성 유지 관리
- 생산자와 소비자의 처리량을 제한하기 위해 설정한 쿼터 적용

## Kafka 모니터링을 위한 주요 메트릭
제대로 작동하는 Kafka 클러스터는 상당한 양의 데이터를 처리할 수 있습니다. 이에 의존하는 애플리케이션의 안정적인 성능을 유지하려면 Kafka 배포의 상태를 모니터링하는 것이 중요합니다.

Kafka 메트릭은 세 가지 범주로 나눌 수 있습니다:  
- Kafka server (broker) metrics  
- Producer metrics  
- Consumer metrics  

Kafka는 상태를 유지하기 위해 ZooKeeper에 의존하기 때문에 ZooKeeper를 모니터링하는 것도 중요합니다. Kafka 및 ZooKeeper 메트릭 수집에 대해 자세히 알아보려면 이 시리즈의 2부를 참조하세요.

이 문서에서는 메트릭 수집 및 알림을 위한 프레임워크를 제공하는 [모니터링 101 시리즈](https://www.datadoghq.com/blog/monitoring-101-collecting-data/)에서 소개된 메트릭 용어를 참조합니다 

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/kafka/monitoring-kafka-broker.png" alt="">
  <figcaption></figcaption>
</figure> 

**Kafka-emitted metrics**

<table>
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Mbean name</th>
      <th scope="col">Description</th>
      <th scope="col">Metric type</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">UnderReplicatedPartitions</th>
      <td>kafka.server:type=ReplicaManager,name=UnderReplicatedPartitions</td>
      <td>복제되지 않은 파티션 수</td>
      <td>Resource: Availability</td>
    </tr>
    <tr>
      <th scope="row">IsrShrinksPerSec/IsrExpandsPerSec</th>
      <td>kafka.server:type=ReplicaManager,name=IsrShrinksPerSec<br/>kafka.server:type=ReplicaManager,name=IsrExpandsPerSec</td>
      <td>동기화 복제본(ISR) 풀이 축소/확장되는 속도</td>
      <td>Resource: Availability</td>
    </tr>
     <tr>
      <th scope="row">ActiveControllerCount</th>
      <td>kafka.controller:type=KafkaController,name=ActiveControllerCount</td>
      <td>동클러스터의 active 컨트롤러 수</td>
      <td>Resource: Error</td>
    </tr>   
     <tr>
      <th scope="row">OfflinePartitionsCount</th>
      <td>kafka.controller:type=KafkaController,name=OfflinePartitionsCount</td>
      <td>오프라인 파티션 수</td>
      <td>Resource: Availability</td>
    </tr>
     <tr>
      <th scope="row">LeaderElectionRateAndTimeMs</th>
      <td>kafka.controller:type=ControllerStats,name=LeaderElectionRateAndTimeMs</td>
      <td>리더 선출 비율 및 지연 시간</td>
      <td>Other</td>
    </tr>     
     <tr>
      <th scope="row">UncleanLeaderElectionsPerSec</th>
      <td>kafka.controller:type=ControllerStats,name=UncleanLeaderElectionsPerSec</td>
      <td>초당 'unclean' 선거 횟수</td>
      <td>Resource: Error</td>
    </tr>              
    <tr>
      <th scope="row">TotalTimeMs</th>
      <td>kafka.network:type=RequestMetrics,name=TotalTimeMs,request={Produce|FetchConsumer|FetchFollower}</td>
      <td>지정된 요청을 처리하는 데 걸린 총 시간(ms)(Produce/Fetch)</td>
      <td>Work: Performance</td>
    </tr>         
     <tr>
      <th scope="row">PurgatorySize</th>
      <td>kafka.server:type=DelayedOperationPurgatory,name=PurgatorySize,delayedOperation={Produce|Fetch}</td>
      <td>지정된 요청을 처리하는 데 걸린 총 시간(ms)(Produce/Fetch)</td>
      <td>Other</td>
    </tr>       
     <tr>
      <th scope="row">BytesInPerSec/BytesOutPerSec</th>
      <td>kafka.server:type=BrokerTopicMetrics,name={BytesInPerSec|BytesOutPerSec}</td>
      <td>생산자 퍼지토리에서 대기 중인 요청 수/ 가져오기 퍼지토리에서 대기 중인 요청 수</td>
      <td>Work: Throughput</td>
    </tr>        
  </tbody>
  <tfoot>
     <tr>
      <th scope="row">RequestsPerSecond</th>
      <td>kafka.network:type=RequestMetrics,name=RequestsPerSec,request={Produce|FetchConsumer|FetchFollower},version={0|1|2|3|…}	Number of (producer|consumer|follower) requests per second	Work: Throughput</td>
      <td>총 바이트 수신/발신 속도 집계</td>
      <td>Work: Throughput</td>
    </tr>   
  </tfoot>
</table>


**UnderReplicatedPartitions**  
정상 클러스터에서는 동기화 중 복제본(ISR)의 수가 총 복제본 수와 정확히 같아야 합니다. 파티션 복제본이 리더 파티션보다 너무 뒤처지면 팔로워 파티션이 ISR 풀에서 제거되고 그에 따라 IsrShrinksPerSec이 증가합니다. 브로커를 사용할 수 없게 되면 UnderReplicatedPartitions의 값이 급격하게 증가합니다. 복제 없이는 Kafka의 고가용성 보장을 충족할 수 없으므로 이 메트릭 값이 오랜 기간 동안 0을 초과하는 경우 반드시 조사가 필요합니다.  

**IsrShrinksPerSec/IsrExpandsPerSec**  
브로커 클러스터를 확장하거나 파티션을 제거하는 경우를 제외하고 특정 파티션에 대한 동기화 복제본(ISR)의 수는 상당히 고정적으로 유지되어야 합니다. 고가용성을 유지하기 위해, 건강한 Kafka 클러스터에는 장애 조치를 위한 최소한의 ISR이 필요합니다. 복제본이 일정 시간 동안 리더에 연결되지 않으면 ISR 풀에서 제거될 수 있습니다(replica.socket.timeout.ms 매개변수로 구성 가능). 이러한 메트릭 값의 플랩핑이 있는지, 그리고 그 직후에 IsrExpandsPerSec의 증가 없이 IsrShrinksPerSec의 증가가 있는지 조사해야 합니다.  

**ActiveControllerCount**  
Kafka 클러스터에서 가장 먼저 부팅되는 노드는 자동으로 컨트롤러가 되며, 컨트롤러는 하나만 있을 수 있습니다. Kafka 클러스터의 컨트롤러는 파티션 리더 목록을 유지하고, 파티션 리더를 사용할 수 없게 되는 경우 리더십 전환을 조정하는 역할을 담당합니다. 컨트롤러를 교체해야 하는 경우, ZooKeeper는 브로커 풀에서 무작위로 새 컨트롤러를 선택합니다. 모든 브로커의 ActiveControllerCount 합은 항상 1이어야 하며, 1초 이상 지속되는 다른 값에 대해 알림을 보내야 합니다

**OfflinePartitionsCount (controller only)**  
이 메트릭은 활성 리더가 없는 파티션의 수를 보고합니다. 모든 읽기 및 쓰기 작업은 파티션 리더에서만 수행되므로 이 메트릭의 값이 0이 아닌 경우 서비스 중단을 방지하기 위해 경고를 보내야 합니다. 활성 리더가 없는 파티션은 완전히 액세스할 수 없으며, 해당 파티션의 소비자와 생산자 모두 리더를 사용할 수 있게 될 때까지 차단됩니다.

**LeaderElectionRateAndTimeMs**  
파티 리더가 사망하면 새 리더를 선출하기 위한 선거가 시작됩니다. 파티션 리더가 ZooKeeper에서 세션을 유지하지 못하면 “죽은” 것으로 간주됩니다. ZooKeeper의 Zab과 달리, 카프카는 리더 선출에 다수결 합의 알고리즘을 사용하지 않습니다. 대신, Kafka의 쿼럼은 특정 파티션에 대한 모든 동기화 복제본(ISR)의 집합으로 구성됩니다. 복제본이 리더를 따라잡으면 동기화 중인 것으로 간주되며, 이는 ISR의 모든 복제본이 리더로 승격될 수 있음을 의미합니다.  

**LeaderElectionRateAndTimeMs**  
리더 선출 비율(초당)과 클러스터에 리더가 없는 총 시간(밀리초 단위)을 보고합니다. UncleanLeaderElectionsPerSec만큼 나쁘지는 않지만, 이 메트릭을 계속 주시하고 싶을 것입니다. 위에서 언급했듯이 리더 선거는 현재 리더와의 연락이 끊어질 때 트리거되며, 이는 오프라인 브로커로 해석될 수 있습니다. 


<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/kafka/unclean-leader-elections-per-sec.png" alt="">
  <figcaption></figcaption>
</figure> 

**UncleanLeaderElectionsPerSec**  
부정 리더 선출은 카프카 브로커 중 자격을 갖춘 파티션 리더가 없을 때 발생합니다. 일반적으로 파티션의 리더인 브로커가 오프라인 상태가 되면 파티션의 ISR 집합에서 새 리더가 선출됩니다. Kafka 버전 0.11 이상에서는 기본적으로 리더 선출이 비활성화되어 있으므로, 새 리더로 선출할 ISR이 없는 경우 파티션이 오프라인 상태가 됩니다. 카프카가 unclean 리더 선출을 허용하도록 구성된 경우, 동기화되지 않은 복제본 중에서 리더가 선택되며, 이전 리더가 손실되기 전에 동기화되지 않은 모든 메시지는 영원히 손실됩니다. 기본적으로 부정 리더 선거는 가용성을 위해 일관성을 희생합니다. 이 메트릭은 데이터 손실을 의미하므로 주의해야 합니다.  

**TotalTimeMs**
TotalTimeMs 메트릭군은 요청을 서비스하는 데 걸린 총 시간을 측정합니다(생산, 가져오기-소비자, 가져오기-팔로워 요청 등):

- produce: 생산자가 데이터를 전송하는 요청
- fetch-consumer: 새 데이터를 가져오기 위한 소비자의 요청
- fetch-follower: 파티션의 팔로워인 브로커가 새 데이터를 가져오기 위한 요청  
  
총 시간 측정값 자체는 네 가지 메트릭의 합입니다:

queue: 요청 큐에서 대기하는 데 소요된 시간
로컬: 리더가 처리하는 데 소요된 시간
원격: 팔로워 응답을 기다리는 데 소요된 시간(requests.required.acks=-1인 경우에만 해당)
응답: 응답을 보내는 데 걸린 시간

## purgatory
- purgatory란: Kafka에서 purgatory란 특정 요청이 조건을 만족할 때까지 보류되며, 대기 상태로 처리되는 구조를 의미합니다. Kafka에는 대표적으로 Producer Purgatory와 Fetch Purgatory라는 두 가지 종류의 purgatory가 존재합니다.

- Producer Purgatory
Producer Purgatory는 프로듀서(producer)로부터 메시지를 받았을 때 지정된 조건이 충족될 때까지 해당 요청을 대기시키는 Kafka 내부 구조입니다. 대표적인 경우로는 acks 설정이 있습니다. 프로듀서의 acks 값은 메시지가 정상적으로 브로커에 저장되었을 때 응답을 기다리는 정도를 설정하는 옵션으로, 0, 1, -1(all) 등으로 설정할 수 있습니다.

acks=1: 리더 복제본이 메시지를 받아들이면 즉시 응답을 반환합니다.
acks=-1 (all): 모든 팔로워 복제본까지 메시지가 복제될 때까지 기다렸다가 응답합니다.
예를 들어, 프로듀서가 acks=-1로 설정했을 때 모든 팔로워가 복제 완료 상태가 되어야만 요청이 완료되므로, 모든 팔로워가 복제본을 수신할 때까지 요청이 Producer Purgatory에 머물게 됩니다. 이 때까지 해당 요청은 응답을 보류하는 상태가 되며, 특정 조건을 만족하는 순간 Purgatory에서 빠져나가게 됩니다.

Producer Purgatory의 주요 기능:

복제 일관성 유지: 요청이 모두 복제될 때까지 대기함으로써, 메시지 복제와 데이터 일관성을 보장합니다.
성능 최적화: Kafka는 이러한 대기 구조를 통해 비동기 처리를 최적화하여, 효율적인 데이터 전송과 복제를 수행할 수 있습니다.
- Fetch Purgatory
Fetch Purgatory는 컨슈머(consumer)가 데이터를 요청할 때 특정 조건을 만족할 때까지 요청을 대기시키는 구조입니다. 컨슈머가 Kafka로부터 데이터를 읽을 때, 요청하는 데이터가 아직 준비되지 않았거나 특정 조건에 맞는 데이터가 없다면, 해당 요청이 Fetch Purgatory에 추가됩니다. 이 구조는 주로 데이터의 최소 레코드 수 또는 최소 바이트 수에 도달할 때까지 기다리도록 설정된 경우에 사용됩니다.

예를 들어, 컨슈머가 특정 오프셋부터 최소 5MB 이상의 데이터를 가져오기를 요청했을 때, 해당 데이터가 준비될 때까지 요청은 Fetch Purgatory에 머물며, 데이터를 충분히 수집한 후에 응답하게 됩니다.

Fetch Purgatory의 주요 기능:

효율적인 데이터 수집: 컨슈머가 대량의 데이터를 요청할 때, 지정된 데이터 양이 확보될 때까지 대기함으로써 네트워크 자원을 절약할 수 있습니다.
데이터의 안정성 보장: 데이터를 모두 수집한 후 일괄적으로 응답함으로써 안정적인 데이터 전송을 보장합니다.
Purgatory의 이점
Kafka의 Purgatory 시스템은 메시지 복제 및 데이터 수집 시점을 제어할 수 있어, 높은 데이터 일관성과 전송 효율성을 유지하는 데 중요한 역할을 합니다. 또한, 이 구조 덕분에 Kafka는 대규모 데이터 스트림을 처리할 때 안정성과 성능을 유지할 수 있습니다.