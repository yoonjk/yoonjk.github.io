---
title: kafka-manager using docker
categories:
  - docker
tags:
  - kafka
---

kafka-manager를  github에서 [git clone](https://github.com/yahoo/kafka-manager.git) 하여 build하여 실행하는 방법이 있으며, docker를 기반으로 실행할 수 있습니다.

- docker 기반 : [https://github.com/hleb-albau/kafka-manager-docker]

```yaml
version: '3.6'
services:
  kafka_manager:
    image: hlebalbau/kafka-manager:stable
    ports:
      - "9000:9000"
    environment:
      ZK_HOSTS: "zookeeper:2181,zookeeper2:2181,zookeeper3:2181"
      APPLICATION_SECRET: "random-secret"
    extra_hosts:
      - "zookeeper1:10.117.25.140"
      - "zookeeper2:10.66.219.165"
      - "zookeeper3:10.66.219.164"
```