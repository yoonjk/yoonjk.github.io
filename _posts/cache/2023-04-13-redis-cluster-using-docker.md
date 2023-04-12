---
title: Getting Start Redis - Docker를 이용한 Redis 클러스터링 구성
categories:
  - cache 
tags: 
  - redis 
  - docker
---
작성중...

```bash
# Master Redis 구동
docker run -d --name redis-6379-16 --network host -v /redis/redis-6379-16:/data redis:5.0.5-buster redis-server --port 6379 --cluster-enabled yes --cluster-config-file node.conf --cluster-node-timeout 5000 --bind 0.0.0.0

# Slave Redis 구동
docker run -d --name redis-6380-16 --network host -v /redis/redis-6380-16:/data redis:5.0.5-buster redis-server --port 6380 --cluster-enabled yes --cluster-config-file node.conf --cluster-node-timeout 5000 --bind 0.0.0.0



## 참고
[우쭈뿌라 개발노트](https://uchupura.tistory.com/56
[과거의 나를 위해](https://pinggoopark.tistory.com/268)