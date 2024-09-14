---
title: kafka-topic-ui
categories:
  - docker
tags:
  - kafka-topic-ui
---
kafka cluster에서 topic을 편리하게 조호할 수 있는 kafka topic ui 입니다.  
```yaml
version: '2'

services:
  # https://github.com/confluentinc/schema-registry
  confluent-schema-registry:
    image: confluentinc/cp-schema-registry:3.2.1
    container_name: schema-registry
    network_mode: host
    # default port : 8000
    # custom define
    ulimits:
      nofile:
        soft: 65536
        hard: 65536
    environment:
      SCHEMA_REGISTRY_KAFKASTORE_CONNECTION_URL: zookeeper1:2181,zookeeper2:2181,zookeeper3:2181
      SCHEMA_REGISTRY_LISTENERS: http://0.0.0.0:8081
      # please replace this setting by the IP of your web tools server
      SCHEMA_REGISTRY_HOST_NAME: "10.117.25.140"
    restart: always

  # https://github.com/confluentinc/kafka-rest
  confluent-rest-proxy:
    image: confluentinc/cp-kafka-rest:3.2.1
    container_name: kafka-rest
    network_mode: host
    # custom define
    ulimits:
      nofile:
        soft: 65536
        hard: 65536
    environment:
      KAFKA_REST_BOOTSTRAP_SERVERS: kafka1:9092,kafka2:9092,kafka3:9092
      KAFKA_REST_ZOOKEEPER_CONNECT: zookeeper1:2181,zookeeper2:2181,zookeeper3:2181
      KAFKA_REST_LISTENERS: http://0.0.0.0:8082/
      KAFKA_REST_SCHEMA_REGISTRY_URL: http://localhost:8081/
      # please replace this setting by the IP of your web tools server
      KAFKA_REST_HOST_NAME: "10.117.25.140"
    depends_on:
      - confluent-schema-registry
    restart: always

  # https://github.com/Landoop/kafka-topics-ui
  kafka-topics-ui:
    image: landoop/kafka-topics-ui:0.9.2
    container_name: kafka-topics
    network_mode: host
    environment:
      KAFKA_REST_PROXY_URL: http://localhost:8082
      PROXY: "TRUE"
    depends_on:
      - confluent-rest-proxy
    restart: always
```