---
title: burrow on docker 
categories:
  - docker
tags:
  - kafka
---

kafka를 모니터링하는 burrow를 docker 기반으로 실행합니다. 

```yaml
version: "2"
services:
  burrow:
    build: .
    volumes:
      - ${PWD}/docker-config:/etc/burrow/
      - ${PWD}/tmp:/var/tmp/burrow
    ports:
      - 8100:8000
    restart: always
    extra_hosts:
      - "zookeeper1:10.100.25.100"
      - "zookeeper2:10.100.25.101"
      - "zookeeper3:10.100.25.1002"
      - "kafka1:10.100.25.100"
      - "kafka2:10.100.25.101"
      - "kafka3:10.100.25.102"
```