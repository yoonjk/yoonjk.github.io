---
title: kafka-manager using docker
categories:
  - docker
tags:
  - Jupyter
---
kafka-manager를  docker를 기반으로 실행하여 kafka-manager를 확인합니다.
```yaml
version: '2'

services:
  # https://github.com/yahoo/kafka-manager
  kafka-manager:
    image: qnib/plain-kafka-manager
    network_mode: host
    environment:
      ZOOKEEPER_HOSTS: "zookeeper1:2181,zookeeper2:2181,zookeeper3:2181"
      APPLICATION_SECRET: change_me_please
    restart: always
```