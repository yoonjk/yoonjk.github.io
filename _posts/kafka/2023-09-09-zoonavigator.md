---
title: zookeeper zoonavigator 
categories:
  - kafka
tags: 
  - zookeeper
---

zookeeper의  zoonavigator의 설치합니다.
```bash
version: '2'

services:
  # https://github.com/elkozmon/zoonavigator
  zoonavigator:
    image: elkozmon/zoonavigator:latest
    container_name: zoonavigator
    network_mode: host
    environment:
      HTTP_PORT: 9000
    restart: always
    ports:
      - "9000:9000"
    extra_hosts:
     - "zookeeper1:10.100.10.100"
     - "zookeeper2:10.100.10.101"
     - "zookeeper3:10.100.10.102"
```