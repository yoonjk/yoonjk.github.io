---
title: Redis 시작하기 - Redis 설치(Centos)
categories:
  - cache 
tags: 
  - redis 
--- 

## Redis 설치 준비
Redis를 다음의 절차로 설치합니다.  
- OS 업데이트
- Development Tools 설치
- redis download
- redis build
- redis install  

Centos7 OS 버전을 최신으로 업그레이드 하고, Development Tools를 설치합니다. Redis [download](http://download.redis.io/releases/) site 에 가서 원하는 redis 를 확인하고 address link를 복사합니다.
```bash
sudo yum update -y
yum groupinstall 'Development Tools'
sudo wget http://download.redis.io/releases/redis-7.0.10.tar.gz
tar xvzf redis-7.0.10.tar.gz
cd redis-7.0.10
```
Redis 압축파일을 해제한 후 make 명령어를 수행하면 아래처럼 jemalloc No such file or directory 오류가 발생합니다.
이를 해결하기 위해서는 deps 폴더에서 compile을 해야합니다.
```bash
cd deps
make hiredis jemalloc linenoise lua
cd ..
```
Redis 압축 해제했던 폴더로 되돌아와서 다시 build합니다.
```bash
# redis-7.0.10
make
make install
```

## Redis 서버 실행
redis 를 install 후 redis 서버를 실행합니다. 
```
src/redis-server redis.conf
```

redis를 접속하기 위해 terminal을 1개 열어 redis가 설치된 서버에 접속합니다.
src 폴더에 있는 redis-cli를 이용하여 redis 서버에 접속합니다.
```bash
redis-cli
set k1 v1
get k1
```


## 참고
[꽁담](https://mozi.tistory.com/536)