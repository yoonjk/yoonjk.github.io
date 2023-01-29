---
title: Docker 기반 Jira 설치 
categories:
  - docker 
tags:
  - jira
---

## Jira on Docker
Docker 기반 Jira 입니다.

```YAML
version: '3'
networks:
 jenkins-net:
    driver: bridge

services:
  jira:
    container_name: jira
    image: atlassian/jira-software:latest
    networks:
      - jenkins-net
    ports:
      - "9010:8080"

  postgres:
    container_name: postgres
    image: postgres:latest
    volumes:
      - ./data:/var/lib/postgresql/data
    environment:
      - 'POSTGRES_USER=postgres'
      # CHANGE THE PASSWORD!
      - 'POSTGRES_PASSWORD=admin1234'
      - 'POSTGRES_DB=jira'
      - 'POSTGRES_ENCODING=UTF8'
    networks:
      - jenkins-net
    ports:
      - "5432:5432"
```
