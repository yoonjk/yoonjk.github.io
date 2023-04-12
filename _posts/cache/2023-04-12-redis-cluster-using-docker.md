---
title: Getting Start Redis - Docker를 이용한 클러스터링 구성
categories:
  - cache 
tags:
  - redis
  - docker
---

## redis.conf 편집

```bash
mkdir -p 6300 6301 6302 6400 6401 6402
```
redis config 파일을 다음과 같이 수정합니다.
```bash
## redis.conf 편집
vi redis.conf
port 6379
cluster-enabled yes
cluster-config-file nodes.conf
cluster-node-timeout 3000
appendonly yes
```
redis.conf를 각 폴더에 복사합니다.
```bash
cp redis.conf 6300/
cp redis.conf 6301/
cp redis.conf 6302/
cp redis.conf 6400/
cp redis.conf 6401/
cp redis.conf 6402/
```

redis.conf를 편집합니다.
```bash
sed -i 's/6379/6300/g' 6300/redis.conf
sed -i 's/6379/6301/g' 6300/redis.conf
sed -i 's/6379/6302/g' 6300/redis.conf
sed -i 's/6379/6400/g' 6300/redis.conf
sed -i 's/6379/6401/g' 6300/redis.conf
sed -i 's/6379/6402/g' 6300/redis.conf
```

## Master Redis 작성

```yaml
version: '3'

services:
  redis1:
    hostname: redis1
    container_name: redis1
    image: redis
    network_mode: "host"
    command: redis-server /etc/redis.conf
    volumes:
    - ./6300/redis.conf:/etc/redis.conf
    ports:
    - 6300:6300
    - 16300:16300

  redis2:
    hostname: redis2
    container_name: redis2
    image: redis
    network_mode: "host"
    command: redis-server /etc/redis.conf
    volumes:
      - ./6301/redis.conf:/etc/redis.conf
    ports:
      - 6301:6301
      - 16301:16301

  redis3:
    hostname: redis3
    container_name: redis3
    image: redis
    network_mode: "host"
    command: redis-server /etc/redis.conf
    volumes:
      - ./6302/redis.conf:/etc/redis.conf
    ports:
      - 6302:6302
      - 16302:16302

  redis4:
    hostname: redis4
    container_name: redis4
    image: redis
    network_mode: "host"
    command: redis-server /etc/redis.conf
    volumes:
      - ./6400/redis.conf:/etc/redis.conf
    ports:
      - 6400:6400
      - 16400:16400

  redis5:
    hostname: redis5
    container_name: redis5
    image: redis
    network_mode: "host"
    command: redis-server /etc/redis.conf
    volumes:
      - ./6401/redis.conf:/etc/redis.conf
    ports:
      - 6401:6401
      - 16401:16401

  redis6:
    hostname: redis6
    container_name: redis6
    image: redis
    network_mode: "host"
    command: redis-server /etc/redis.conf
    volumes:
      - ./6402/redis.conf:/etc/redis.conf
    ports:
      - 6402:6402
      - 16402:16402
```
## Redis cluster 시작
docker-compose 이용하여 Redis Cluster를 시작합니다.
```bash
docker-compose up -d
```

## 참고
[우쭈뿌라 개발노트](https://uchupura.tistory.com/56)  
[과거의 나를 위해](https://pinggoopark.tistory.com/268)

