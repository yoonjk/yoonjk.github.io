---
title: [mysql] create database 
categories:
  - etc 
tags:
  - mysql
---

mysql을 데이터베이스 utf8 character set으로 생성하는 명령어 입니다.  
## 데이터베이스 생성

```bash
CREATE DATABASE demo
CHARACTER SET utf8
COLLATE utf8_general_ci;
```

## 데이터베이스 결과  

```bash

+--------------------+
| Database           |
+--------------------+
| demo               |
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
5 rows in set (0.01 sec)
```
