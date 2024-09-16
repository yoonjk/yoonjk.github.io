---
title: install LinkedIn kafka-monitor on linux
categories:
  - kafka
tags: 
  - kafka-monitor
---

LinkedIn에서 제공하는 kafka-monitor를 설치하여 구성하여  kafka를 모니터링하는 것입니다. 
고급 사용자는 ./bin/xinfra-monitor-start.sh config/xinfra-monitor.properties를 사용하여 Xinfra 모니터를 실행하는 것이 좋습니다. 리포지토리의 기본 xinfra-monitor.properties는 단일 클러스터를 모니터링하는 방법에 대한 간단한 예제를 제공합니다. 클러스터를 가리키도록 zookeeper.connect 및 bootstrap.servers의 값을 변경해야 할 수도 있습니다.

전체 구성 목록과 해당 문서는 각 서비스에 대한 구성 클래스 코드  
  (예: ProduceServiceConfig.java 및 ConsumeServiceConfig.java)  
에서 찾을 수 있습니다.  

xinfra-monitor.properties에서 여러 개의 단일 클러스터 모니터를 지정하여 하나의 Xinfra 모니터 프로세스에서 여러 개의 Kafka 클러스터를 모니터링할 수 있습니다.  또 다른 고급 사용 사례로, MirrorMaker로 연결된 두 개의 서로 다른 Kafka 클러스터를 ProduceService와 ConsumeService로 지정하여 엔드투엔드 지연 시간을 모니터링할 수 있습니다.  

신프라 모니터는 기본적으로 구성에 지정된 topic-management.replicationFactor 및 topic-management.partitionsToBrokersRatio에 따라 모니터 토픽을 자동으로 생성합니다. 기본적으로 replicationFactor는 1이며 기존 토픽에 사용된 것과 동일한 복제 계수로 변경하고 싶을 수 있습니다. produce.topic.topicCreationEnabled를 false로 설정하여 자동 토픽 생성을 사용하지 않도록 설정할 수 있습니다.

#### Install kafka-monitor of LinkedIn
Linkedin에서 제공하는 kafka-monitor tool을 설치합니다.  
```bash
git clone https://github.com/linkedin/kafka-monitor.git
cd kafka-monitor
./gradlew jar
```

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/kafka/09-gradlew-jar.png" alt="">
  <figcaption></figcaption>
</figure> 


<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/kafka/10-kafka-monitor-tree.png" alt="">
  <figcaption></figcaption>
</figure> 

config 폴더에 있는 xinfra-monitor.properties 파일을 kafka-monitor.properties로 복사합니다. 
kafka-monitor.properties configuration을 수정합니다.  

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/kafka/11-change-kafka-monitor-config.png" alt="">
  <figcaption></figcaption>
</figure> 


<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/kafka/12-change-zookeeper-in-config.png" alt="">
  <figcaption></figcaption>
</figure> 

#### kafka-monitor 실행
kafka-monitor.properties파일 수정하 kafka monitoring을 다음과 같이 실행합니다.

```bash
# There is current folde of kafka-monitor : ./kafka-monitor 
bin/xinfra-monitor-start.sh config/kafka-monitor.properties

# or
./bin/single-cluster-monitor.sh --topic test --broker-list kafka1:9092 --zookeeper zookeeper1:2181 --replication-factor 3
```
