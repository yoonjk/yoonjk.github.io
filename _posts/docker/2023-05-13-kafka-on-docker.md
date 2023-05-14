---
title: Kafka using docker-compose
categories:
  - docker
tags:
  - Kafka
---

카프카 브로커 1개, 주키퍼 1로 구성된 confluent사의 docker 이미지를 기반으로 실행하는 docker-compose 파일입니다.
```
version: '2'

services:
  zookeeper:
    container_name: zookeeper
    image: confluentinc/cp-zookeeper:latest
    environment:
      ZOOKEEPER_SERVER_ID: 1
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000
      ZOOKEEPER_INIT_LIMIT: 5
      ZOOKEEPER_SYNC_LIMIT: 2
    ports:
      - "2181:2181"

  kafka:
    container_name: kafka
    image: confluentinc/cp-kafka:latest
    depends_on:
      - zookeeper
    ports:
      - "9092:9092"
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: 'zookeeper:2181'
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka:9092,PLAINTEXT_HOST://localhost:29092
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: PLAINTEXT:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT
      KAFKA_INTER_BROKER_LISTENER_NAME: PLAINTEXT
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
      KAFKA_GROUP_INITIAL_REBALANCE_DELAY_MS: 0
```

## Kafka 연결
Confluent 사의 docker image에서는 kafka CLI 들이  sh 확장자가 없습니다. apache 나 Bitnami 에서 제공하는 docker image는 sh 확장자가 있는 것이 특징입니다.

다음의 명령어로 현재 topic 목록을 조회합니다.
```
docker exec -it kafka kafka-topics --bootstrap-server kafka:9092 --list
```