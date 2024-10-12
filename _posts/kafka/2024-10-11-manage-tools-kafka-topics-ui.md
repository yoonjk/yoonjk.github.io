---
title:  kafka-topics-ui 관리도구
categories:
  - kafka
tags: 
  - management
  - topic
---

## 주요 기능
Kafka 토픽 목록 조회  

Kafka 클러스터 내의 모든 토픽을 한눈에 볼 수 있습니다. 각 토픽의 이름, 파티션 수, 복제 계수(replication factor) 등의 기본 정보를 확인할 수 있습니다.

**토픽 세부 정보 조회**

각 토픽의 파티션에 대한 상세 정보를 제공합니다. 예를 들어, 각 파티션의 리더 브로커, 복제본(replica), ISR(In-Sync Replicas) 상태 등 세부 정보를 확인할 수 있습니다.
ISR(In-Sync Replicas) 정보는 파티션의 리더와 동기화된 복제본이 얼마나 되는지 보여주며, 이 정보를 통해 파티션 복제 상태를 실시간으로 모니터링할 수 있습니다.

**메시지 탐색 및 조회**  

토픽에 저장된 메시지를 탐색하고 조회할 수 있습니다. 메시지 키(key), 값(value), 오프셋(offset), 파티션 번호 등 메시지의 메타데이터와 함께 메시지 내용을 직접 볼 수 있습니다.
실시간으로 토픽에 들어오는 데이터를 확인하며 Kafka의 데이터 흐름을 모니터링하는 데 유용합니다.

토픽 생성 및 삭제  

UI를 통해 새로운 토픽을 생성할 수 있습니다. 토픽을 생성할 때 파티션 수, 복제 계수 등 다양한 설정을 손쉽게 할 수 있습니다.

필요하지 않은 토픽을 삭제하는 작업도 UI 상에서 쉽게 수행할 수 있습니다.
토픽 설정 변경  

기존 토픽의 설정(예: retention period나 cleanup policy)을 변경할 수 있습니다. 이를 통해 메시지 보존 기간 등을 유연하게 조정할 수 있습니다.

메시지 필터링 및 검색  

특정 파티션이나 오프셋 범위에 따라 메시지를 필터링할 수 있습니다. 특정 키 또는 값으로 메시지를 검색하여 원하는 데이터를 빠르게 찾을 수 있습니다.
JSON 메시지 포맷 지원  

JSON 형식의 메시지를 쉽게 조회하고 파싱하여 볼 수 있는 기능을 지원합니다. Kafka에서 JSON 형식으로 데이터를 주고받는 경우, 메시지를 가독성 있게 표현해 줍니다.

편리한 사용성  

설치 및 설정이 비교적 간단하며, 사용이 쉽고 직관적인 웹 인터페이스를 제공합니다.
Docker 기반으로 실행되므로 Kafka와 함께 간편하게 배포할 수 있습니다.

장점

시각적 모니터링: CLI 기반의 Kafka 관리 툴에 비해, 시각적으로 토픽을 모니터링할 수 있기 때문에 실시간 데이터를 더 직관적으로 확인할 수 있습니다.

빠른 탐색: UI에서 토픽을 클릭하고 탐색하는 방식으로 동작하기 때문에, 특정 파티션이나 메시지를 빠르게 찾을 수 있습니다.

실시간 데이터 확인: 실시간으로 Kafka의 토픽에 저장된 메시지를 볼 수 있으므로, 데이터 흐름을 모니터링하는 데 매우 유용합니다.

다양한 메시지 포맷 지원: JSON을 비롯한 여러 형식의 메시지를 지원하며, 각 메시지를 보기 쉽게 표현해 줍니다.

쉬운 배포: Docker로 쉽게 배포할 수 있기 때문에 Kafka 클러스터에 간편하게 통합하여 사용할 수 있습니다.

사용 방법  

Docker를 통한 설치

landoop/kafka-topics-ui는 Docker를 통해 쉽게 설치하고 실행할 수 있습니다.

```bash
docker run -d --rm -p 8000:8000 \
-e KAFKA_REST_PROXY_URL=http://your-kafka-rest-proxy:8082 \
landoop/kafka-topics-ui
```

위 명령어에서 KAFKA_REST_PROXY_URL은 Kafka REST 프록시의 URL을 지정해야 합니다. Kafka REST 프록시는 Kafka 클러스터와 통신하여 토픽 정보를 제공하는 역할을 합니다.

웹 브라우저로 접속  

Docker 실행 후 http://localhost:8000 주소로 접속하면 Kafka Topics UI에 접근할 수 있습니다. 여기서 Kafka 클러스터의 토픽을 실시간으로 모니터링하고 관리할 수 있습니다.

요약
**landoop/kafka-topics-ui**는 Kafka 토픽을 시각적으로 관리하고 실시간으로 데이터를 모니터링할 수 있는 웹 기반 UI 도구입니다.  
Kafka 클러스터의 토픽, 파티션, 메시지 등을 쉽게 확인하고, 메시지 내용을 탐색하거나 토픽을 생성, 삭제, 설정 변경할 수 있습니다.  
Docker로 쉽게 배포 가능하며, 실시간 Kafka 데이터 모니터링에 매우 유용합니다.  
Kafka REST Proxy와 연동되어야 하며, JSON 등 다양한 메시지 포맷을 지원합니다.  
이 도구는 Kafka 클러스터 운영자나 개발자가 복잡한 CLI 명령어를 사용하지 않고도 쉽게 Kafka의 상태를 파악하고 관리할 수 있도록 도와주는 훌륭한 도구입니다.

```yaml
version: '2'

services:
  # https://github.com/confluentinc/schema-registry
  confluent-schema-registry:
    image: confluentinc/cp-schema-registry:3.2.1
    container_name: schema-registry
  #  network_mode: host
    ulimits:
      nofile:
        soft: 65536
        hard: 65536
    environment:
      SCHEMA_REGISTRY_KAFKASTORE_CONNECTION_URL: zookeeper1:2181,zookeeper2:2181,zookeeper3:2181
      SCHEMA_REGISTRY_LISTENERS: http://0.0.0.0:8081
      # please replace this setting by the IP of your web tools server
      SCHEMA_REGISTRY_HOST_NAME: confluent-schema-registry
    restart: always
    ports:
      - "8081:8081"
    extra_hosts:
      - "zookeeper1:10.117.25.140"
      - "zookeeper2:10.117.25.151"
      - "zookeeper3:10.66.219.170"
      - "kafka1:10.117.25.140"

  # https://github.com/confluentinc/kafka-rest
  confluent-rest-proxy:
    image: confluentinc/cp-kafka-rest:3.2.1
    container_name: kafka-rest
  #  network_mode: host
    ulimits:
      nofile:
        soft: 65536
        hard: 65536
    environment:
      KAFKA_REST_BOOTSTRAP_SERVERS: kafka1:9092,kafka2:9092,kafka3:9092
      KAFKA_REST_ZOOKEEPER_CONNECT: zookeeper1:2181,zookeeper2:2181,zookeeper3:2181
      KAFKA_REST_LISTENERS: http://0.0.0.0:8082/
      KAFKA_REST_SCHEMA_REGISTRY_URL: http://confluent-schema-registry:8081/
      # please replace this setting by the IP of your web tools server
      KAFKA_REST_HOST_NAME: "10.117.25.140"
    depends_on:
      - confluent-schema-registry
    restart: always
    ports:
      - "8082:8082"
    extra_hosts:
      - "zookeeper1:10.117.25.140"
      - "zookeeper2:10.117.25.151"
      - "zookeeper3:10.66.219.170"
      - "kafka1:10.117.25.140"
      - "kafka2:10.117.25.151"
      - "kafka3:10.66.219.170"

  # https://github.com/Landoop/kafka-topics-ui
  kafka-topics-ui:
    image: landoop/kafka-topics-ui:0.9.2
    container_name: kafka-topics
  #  network_mode: host
    environment:
      KAFKA_REST_PROXY_URL: http://confluent-rest-proxy:8082
      PROXY: "TRUE"
    depends_on:
      - confluent-rest-proxy
    restart: always
    ports:
      - "8000:8000"
```
