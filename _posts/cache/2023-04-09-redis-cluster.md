---
title: Getting Start Redis - Redis Cluster
categories:
  - cache 
tags:
  - redis
  - haproxy
---


## Redis Cluster 환경구성
```bash
port [각자포트]
# 백그라운드에서 시작하도록 설정
daemonize yes
# 클러스터를 사용하겠다.
cluster-enabled yes 
# 클러스터 구성 내용을 저장한는 파일명 지정 (자동 생성됨)
cluster-config-file nodes-[각자포트].conf 
# 클러스터 노드가 다운되었는지 판단하는 시간 (3s)
cluster-node-timeout 3000 
# Appendonly를 yes로 설정하면 rdb에 저장 안되고 aof에 저장됨 (각각 장단점이 있으니 해당 부분은 선택 사항)
appendonly yes 
# append only yes 시 해당 부분도 수정
appendfilename appendonly_[각자포트].aof 
# 프로세스 아이디 저장 경로 설정
pidfile /var/run/redis_[각자포트].pid
# 로그 파일 저장 경로 지정
logfile logs/redis_[각자포트].log
```
redis.conf 파일을 각 서버의 포트별로 파일을 작성합니다.
```bash
# redis-server 6300
cp redis.conf redis_6300.conf
vi redis_6300.conf
```
redis_6300.conf 파일을 다음과 같이 수정합니다.
```bash
port 6300
# 백그라운드에서 시작하도록 설정
daemonize yes
# 클러스터를 사용하겠다.
cluster-enabled yes 
# 클러스터 구성 내용을 저장한는 파일명 지정 (자동 생성됨)
cluster-config-file nodes-6300.conf 
# 클러스터 노드가 다운되었는지 판단하는 시간 (3s)
cluster-node-timeout 3000 
# Appendonly를 yes로 설정하면 rdb에 저장 안되고 aof에 저장됨 (각각 장단점이 있으니 해당 부분은 선택 사항)
appendonly yes 
# append only yes 시 해당 부분도 수정
appendfilename appendonly_6300.aof 
# 프로세스 아이디 저장 경로 설정
pidfile /var/run/redis_6300.pid
# 로그 파일 저장 경로 지정
logfile logs/redis_6300.log
```
나머지 redis server의 환경파일을 복사하고 수정합니다.
```bash
cp redis_6300.conf redis_6301.conf
cp redis_6300.conf redis_6302.conf
cp redis_6300.conf redis_6400.conf
cp redis_6300.conf redis_6401.conf
cp redis_6300.conf redis_6402.conf

sed -i 's/6300/6301/g' redis_6301.conf
sed -i 's/6300/6302/g' redis_6302.conf
sed -i 's/6300/6400/g' redis_6400.conf
sed -i 's/6300/6401/g' redis_6401.conf
sed -i 's/6300/6402/g' redis_6402.conf
```

## Redis Cluster 실행

```bash
./src/redis-server redis_6300.conf
./src/redis-server redis_6301.conf
./src/redis-server redis_6302.conf
./src/redis-server redis_6400.conf
./src/redis-server redis_6401.conf
./src/redis-server redis_6402.conf

redis-cli --cluster create 127.0.0.1:6300 127.0.0.1:6301 127.0.0.1:6302
```
#### redis cluster 실행로그
![Jupyter log]({{ "/assets/images/cache/08-cache-create-redis-cluster.png" }})

#### Master 노드 로그
![Jupyter log]({{ "/assets/images/cache/09-cache-log-redis-cluster.png" }})

## Slave1 등록
Master1(6300)에 Slave1(6400) node를 추가합니다
```bash
redis-cli --cluster add-node 127.0.0.1:6400 127.0.0.1:6300 --cluster-slave
```
#### Slave 등록 로그
![Jupyter log]({{ "/assets/images/cache/10-cache-add-slave-node.png" }})

#### Master 로그
![Jupyter log]({{ "/assets/images/cache/11-cache-log-redis-master.png" }})

## Slave2 등록
Master2(6301)에 Slave1(6401) node를 추가합니다
```bash
redis-cli --cluster add-node 127.0.0.1:6401 127.0.0.1:6301 --cluster-slave
```

## Slave3 등록
Master3(6302)에 Slave1(6402) node를 추가합니다
```bash
redis-cli --cluster add-node 127.0.0.1:6402 127.0.0.1:6302 --cluster-slave
```