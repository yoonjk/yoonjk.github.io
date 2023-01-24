---
title: Bitbucket on docker 
categories:
  - docker 
tags:
  - bitbucket
---

## Bitbucket on Docker
Docker 기반 Bitbucket 입니다.

```yaml
version: '3'
networks:
 jenkins-net:
    driver: bridge

services:
  bitbucket:
    container_name: bitbucket
    image: atlassian/bitbucket-server:latest
    environment:
      - 'BITBUCKET_PROXY_PORT='
      - 'BITBUCKET_PROXY_SCHEME='
      - 'BITBUCKET_DELAYED_START='
      - 'DOCKER_WAIT_HOST=postgres'
      - 'DOCKER_WAIT_PORT=5432'
    networks:
      - jenkins-net
    ports:
      - "8990:7990"

  postgres:
    container_name: postgres
    image: postgres:latest
    volumes:
      - ./data:/var/lib/postgresql/data
    environment:
      - 'POSTGRES_USER=postgres'
      # CHANGE THE PASSWORD!
      - 'POSTGRES_PASSWORD=admin1234'
      - 'POSTGRES_DB=bitbucket'
      - 'POSTGRES_ENCODING=UTF8'
    networks:
      - jenkins-net
    ports:
      - "5432:5432"
```
