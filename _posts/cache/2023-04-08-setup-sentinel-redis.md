---
title: Getting Start Redis - Redis Sentinel 구성
categories: 
  - cache
tags:
  - redis
  - sentinel 
---

## Redis Sentinel 구성
Redis를 다음의 [링크](https://yoonjk.github.io/cache/install-redis/)를 참조하여 설치합니다.

Redis 를 HA 구성하는 방법은 몇가지 방법은 아래와 같이 구성할 수 있습니다. 첫번째 방법은 Master가 장애가 발생하면 서비스 장애가 발생하는 구성이지만 구성은 간단합니다. 두번째 방법 Sentinel 방법은 Redis Master가 장애가 발생하여도 slave가 master로 승격되어 지속적인 서비스가 가능합니다. 장애가 발생했던 master가 복귀되면 이전의 master는 slave 역할로 서비스를 합니다.
마지막 방법은 Redis 구성은 이전 방법보다는 복잡하지만 좀더 낳은 고가용성을 제공하면서 처리량을 높이는 방법입니다.  
이번 글에서는 Redis Sentinel을 구을해 봅니다.

- Redis Master and Slave 
- Redis Sentinel
- Redis Cluster 

## redis 환경설정 
redis sentinel을 구성하기 위해 redis master/slave 를 위한 환경설정을 합니다.  
- redis config 구성
- sentinel config 구성

redis master config 구성
```bash
cp redis.conf redis_6382.conf
vi redis_6382.conf

# 포트 설정
port 각자포트
# 백그라운드에서 시작하도록 설정
daemonize yes
# log 파일 남도록 설정
logfile logs/redis_6382.log
```

redis slave config 구성
```bash
cp redis_6382.conf redis_6383.conf 
cp redis_6382.conf redis_6384.conf

sed -i 's/6382/6383/g' redis_6383.conf 
sed -i 's/6382/6384/g' redis_6384.conf 

# slave1
echo "slaveof 127.0.0.1 6382" >> redis_6383.conf
echo "replicaof 127.0.0.1 6382" >> redis_6383.conf

# slave2
echo "slaveof 127.0.0.1 6382" >> redis_6384.conf
echo "replicaof 127.0.0.1 6382" >> redis_6384.conf
```

#### redis sentinel config 구성
redis sentinel config 구성
```bash
cp sentinel.conf redis_5000.conf
vi redis_5000.conf

# 포트 설정
port 5000
# 백그라운드에서 시작하도록 설정
daemonize yes
# log 파일 남도록 설정
dir "./"
logfile "logs/redis_5000.log"
# 감시할 마스터 정보 및 쿼럼(quorum) 설정
sentinel monitor mymaster 127.0.0.1 6382 2
# 다운 되었다고 인지하는 시간 (3초)
- 마스터 서버에 정기적으로 PING을 보내는데, 이 시간 동안 응답이 없으면 다운된 것으로 판단하고 장애조치(failover) 작업을 시작합니다
sentinel down-after-milliseconds mymaster 3000
sentinel failover-timeout mymaster 3000
```

```bash
cp redis_5000.conf redis_5001.conf
cp redis_5000.conf redis_5002.conf

sed -i 's/5000/5001/g' redis_5001.conf 
sed -i 's/5000/5002/g' redis_5002.conf 
```

## redis 실행
Redis 3개 실행
```bash
src/redis-server redis_6382.conf
src/redis-server redis_6383.conf
src/redis-server redis_6384.conf
```

Redis Sentinel 3개 실행
```bash
src/redis-sentinel redis_5000.conf
src/redis-sentinel redis_5001.conf
src/redis-sentinel redis_5002.conf
```

## redis failover 테스트
redis master를 강제 종료시 slave가 master로 승격되는 확인하기 위해, sentinel 서버의 로그를 모니터링 합니다.

```bash
tail -f logs/redis_5000.log
```
redis master process를 확인하고 서버를 강제로 종료합니다.  
그러면 sentinel에서 자동으로 redis slave를 master로 승격하는 것을 확인 할 수 있습니다.
```bash
ps -ef|grep redis

# redis master pid를 확인
kill -9 redis_master_pid
```

## 참고
[5분 안에 구축하는 Redis-Sentinel](https://co-de.tistory.com/15)
 