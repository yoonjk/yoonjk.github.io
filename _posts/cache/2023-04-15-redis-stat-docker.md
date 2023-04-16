---
title: Redis 시작하기 - Docker를 이용하여 모니터링
categories: 
  - cache
tags:
  - redis
  - sentinel 
---

## Redis Sentinel 을 docker 를 사용하여 구성 - 사전준비
Redis Sentinel과 Cluster를 redis-stat로 모니터링하는 것을 docker 기반으로 구성합니다.
myIP는 자신의 환경에 맞는 VM Server의 IP를 설정합니다.  

## Redis 모니터링 - docker-compose
```yaml
version: "3"

services:
  redis-stat:
    container_name: redis-stat
    image: insready/redis-stat
    command: [
        '--verbose',
        '--server',
        'redis-master:6379',
        'redis-replica1:6383',
        'redis-replica2:6384'
        ]
    extra_hosts:
      - "redis-master:myIP"
      - "redis-replica1:myIP
      - "redis-replica2:myIP"
  
    ports:
      - "9999:63790"
```
## 참조 :
[Hyo's Dev Log](https://hyos-dev-log.tistory.com/m/22)