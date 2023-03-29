---
title: Getting Start Redis using Jupyter Notebook
categories:
  - cache
tags: 
  - redis
  - jupyter
---
Jupyter Notebook을 이용하여 Redis를 실습할 수 있는 환경을 구성합니다.

## Setup Redis on Docker
설치형 redis를 하지않고 학습용으로 최적의 환경인 docker를 사용하여 간단히 Redis를 실행합니다.
아래의 docker-compose.yaml 파일을 작성하고 작성된 폴더위치에서 다음과 같이 docker-compose를 실행하여 redis를 실행합니다.
그러면 redis docker image를 pull 받아서 background로 실행합니다.  
```yaml
version: '3.7'
services:
    redis:
      image: redis:alpine
      command: redis-server --port 6379
      container_name: redis
      labels:
        - "name=redis"
        - "mode=standalone"
      ports:
        - 6379:6379
```
#### Run redis 
docker-compose 를 사용하여 redis를 실행합니다.  
```bash
docker-compose up -d
```

## Setup Jupyter using Docker
Jupyter notebook을 이용하여 GUI 환경에서 Python을 이용하여 Redis를 실습할 수 있습니다.  
아래의 [링크](https://yoonjk.github.io/docker/jupyter/)를 통해 Jupyter Notebook을 설치하고 localhost에 10000 포트로 연결하면
Jupyter GUI 환경이 출력됩니다.  
