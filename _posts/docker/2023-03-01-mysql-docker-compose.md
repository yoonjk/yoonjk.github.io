---
title: mysql docker-compose 파ㄹ
categories:
  - docker 
tags:
  - mysql
---

## mysql docker-compose 파일

mysql docker-compose 파일입니다.
```bash
mkdir -p data
vi docker-compose.yaml
```

```yaml
version: "3" # 파일규격버전

services:
  db: # 서비스이름
    image: mysql:8.0.23 # 이미지
    container_name: mysql # 컨테이너 이름
    ports:
      - "3306:3306" # 포트 설정  외부:내부
    environment:
      MYSQL_ROOT_PASSWORD: "1234qwer" # 패스워드설정
      MYSQL_DATABASE: "demo"
      MYSQL_USER: "user00"
      MYSQL_PASSWORD: "admin1234"
    command:
      - --character-set-server=utf8 # 인코딩
      - --collation-server=utf8_general_ci
    volumes:
      - ./data:/dev/docker/db/mysql-db01 # 마운트 설정
```


