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
  <caption>
    Kafka-emitted metrics
  </caption>
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
      <td>kafka.server:type=ReplicaManager,name=IsrShrinksPerSec</br>kafka.server:type=ReplicaManager,name=IsrExpandsPerSec</td>
      <td>동기화 복제본(ISR) 풀이 축소/확장되는 속도</td>
      <td>Resource: Availability</td>
    </tr>
     <tr>
      <th scope="row">ActiveControllerCount</th>
      <td>kafka.controller:type=KafkaController,name=ActiveControllerCount</td>
      <td>동클러스터의 active 컨트롤러 수</td>
      <td>Resource: Error</td>
    </tr>   
  </tbody>
  <tfoot>
     <tr>
      <th scope="row">RequestsPerSecond</th>
      <td>kafka.network:type=RequestMetrics,name=RequestsPerSec,request={Produce|FetchConsumer|FetchFollower},version={0|1|2|3|…}	Number of (producer|consumer|follower) requests per second	Work: Throughput</td>
      <td>초당 (생산자|소비자|팔로워) 요청 수</td>
      <td>Work: Throughput</td>
    </tr>   
  </tfoot>
</table>


