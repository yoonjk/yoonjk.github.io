---
title: docker-compose로 postgreSQL 실행
categories:
  - docker 
tags:
  - postgresSQL
---

## PostgresSQL docker-compose 파일

postgreSQL docker-compose 파일입니다.

```yaml
version: '3.5'

services:
  postgres:
    container_name: postgres
    image: postgres:latest
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: admin1234
      PGDATA: /data/postgres
    volumes:
       - postgres-db:/data/postgres
    ports:
      - "5432:5432"

volumes:
  postgres-db:
    driver: local
```

docker-compose.yaml 파일이 있는 곳에서 docker-compose를 실행합니다.  
```
docker-compose up -d
```


