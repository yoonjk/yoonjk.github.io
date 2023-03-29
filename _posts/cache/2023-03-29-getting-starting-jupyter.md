---
title: Getting Start Redis using Jupyter Notebook
categories:
  - cache
tags: 
  - redis
  - jupyter
---

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

