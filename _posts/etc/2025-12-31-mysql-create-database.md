---
title: mysql - create database 
categories:
  - etc 
tags:
  - mysql
---

mysql을 데이터베이스 utf8 character set으로 생성하는 명령어 입니다.  

## 데이터베이스 설치
mysql community server를 설치합니다.  

```bash
sudo dnf install mysql-community-server
```

## 데이터베이스 시작

```bash
sudo systemctl mysql start

# 비번확인

sudo grep 'temporary password' /var/log/mysqld.log

# 결과 
[itzuser@itz-cdwz1k-helper-1 ~]$ sudo grep 'temporary password' /var/log/mysqld.log
2025-12-30T13:39:46.643451Z 6 [Note] [MY-010454] [Server] A temporary password is generated for root@localhost: aabb
```

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

## mysql shell 설치

```bash
sudo dnf install mysql-shell
```

## mysql shell 로그인
mysql shell을 이용하여 로그앤합니다.  

```bash
mysqlsh

\c --mysql -u root -p
```
