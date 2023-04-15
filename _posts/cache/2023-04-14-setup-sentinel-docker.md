---
title: Getting Start Redis - docker를 이용하여 Redis Sentinel 구성
categories: 
  - cache
tags:
  - redis
  - sentinel 
---

## Redis Sentinel 을 docker 를 사용하여 구성 - 사전준비
Redis Sentinel 을 docker기반으로 구성하기 위해서는 docker, docker-compose를 설치하여야 합니다.

docker engine 설치방법은 아래의 [링크](https://yoonjk.github.io/docker/docker/)를 참조하세요.

## Redis Sentinel - docker-compose
- port 설정  
- extra_hosts설정  
- redis master/replica1/2는 netowrk_mode를 host로 설정  
- sentinel은 client에서 접근하기 위해 port를 expose (5000,5001,5002)
- sentinel 구성은 QUORUM으로 구성합니다.  

redis master 의 port 는 default port 6379로 설정합니다.
replica의 port는 6383, 6384로 설정합니다.

extra_hosts에  myIP대신 VM 서버의 IP로 변경합니다.


```yaml
version: '3.7'

services:

  redis-master:
    container_name: master
    image: redis
    command: redis-server --port 6379
    volumes:
     - "./master:/data"
    network_mode: host
    extra_hosts:
      - "redis-master:myIp"
      - "redis-replica1:myIp"
      - "redis-replica2:myIp"
      - "redis-sentinel1:myIp
      - "redis-sentinel2:myIp"
      - "redis-sentinel3:myIp"

  redis-replica1:
    container_name: replica1
    image: redis
    command: redis-server --slaveof redis-master 6379  --replicaof redis-master 6379 --port 6383
    volumes:
     - "./replica1:/data"
    network_mode: host
    extra_hosts:
      - "redis-master:myIp"
      - "redis-replica1:myIp"
      - "redis-replica2:myIp"
      - "redis-sentinel1:myIp
      - "redis-sentinel2:myIp"
      - "redis-sentinel3:myIp"

  redis-replica2:
    container_name: replica2
    image: redis
    command: redis-server --slaveof redis-master 6379  --replicaof redis-master 6379 --port 6384
    volumes:
     - "./replica2:/data"
    network_mode: host
    extra_hosts:
      - "redis-master:myIp"
      - "redis-replica1:myIp"
      - "redis-replica2:myIp"
      - "redis-sentinel1:myIp
      - "redis-sentinel2:myIp"
      - "redis-sentinel3:myIp"

  # Instance 1
  redis-sentinel1:
    container_name: sentinel1
    build:
      context: ./sentinel
    ports:
      - "5000:26379"
    extra_hosts:
      - "redis-master:myIp"
      - "redis-replica1:myIp"
      - "redis-replica2:myIp"
      - "redis-sentinel1:myIp
      - "redis-sentinel2:myIp"
      - "redis-sentinel3:myIp"

  # Instance 2
  redis-sentinel2:
    container_name: sentinel2
    build:
      context: ./sentinel
    links:
      - redis-master
      - redis-replica1
      - redis-replica2
    ports:
      - "5001:26379"
    extra_hosts:
      - "redis-master:myIp"
      - "redis-replica1:myIp"
      - "redis-replica2:myIp"
      - "redis-sentinel1:myIp
      - "redis-sentinel2:myIp"
      - "redis-sentinel3:myIp"

  # Instance 3
  redis-sentinel3:
    container_name: sentinel3
    build:
      context: ./sentinel
    links:
      - redis-master
      - redis-replica1
      - redis-replica2
    ports:
      - "5002:26379"
    extra_hosts:
      - "redis-master:myIp"
      - "redis-replica1:myIp"
      - "redis-replica2:myIp"
      - "redis-sentinel1:myIp
      - "redis-sentinel2:myIp"
      - "redis-sentinel3:myIp"
```

sentinel.conf 파일
```bash
port 26379

dir /tmp

sentinel resolve-hostnames yes
sentinel monitor redismaster redis-master 6379 $SENTINEL_QUORUM
sentinel down-after-milliseconds redismaster $SENTINEL_DOWN_AFTER
sentinel parallel-syncs redismaster 1
sentinel failover-timeout redismaster $SENTINEL_FAILOVER
```
entrypoint.sh 파일
```bash
#!/bin/sh

sed -i "s/\$SENTINEL_QUORUM/$SENTINEL_QUORUM/g" /redis/sentinel.conf
sed -i "s/\$SENTINEL_DOWN_AFTER/$SENTINEL_DOWN_AFTER/g" /redis/sentinel.conf
sed -i "s/\$SENTINEL_FAILOVER/$SENTINEL_FAILOVER/g" /redis/sentinel.conf

redis-server /redis/sentinel.conf --sentinel
```

Dockerfile
```dockerfile
FROM redis

ENV SENTINEL_QUORUM 2
ENV SENTINEL_DOWN_AFTER 1000
ENV SENTINEL_FAILOVER 1000

RUN mkdir -p /redis

WORKDIR /redis

COPY sentinel.conf .
COPY sentinel-entrypoint.sh /usr/local/bin/

RUN chown redis:redis /redis/* && \
    chmod +x /usr/local/bin/sentinel-entrypoint.sh

EXPOSE 26379

ENTRYPOINT ["sentinel-entrypoint.sh"]
```

## 참조 :
[Redis-Sentinel-Docker-Compose](https://github.com/Developers-Notebook/Redis-Sentinel-Docker-Compose)