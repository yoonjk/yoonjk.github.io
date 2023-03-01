---
title: docker-compose로 redis standalone으로 실행
categories:
  - docker 
tags:
  - redis
---

## Redis docker-compose 파일

redis docker-compose 파일입니다.

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

docker-compose.yaml 파일이 있는 곳에서 docker-compose를 실행합니다.  
```
docker-compose up -d
```


