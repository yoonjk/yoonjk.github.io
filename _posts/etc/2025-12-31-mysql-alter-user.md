---
title: mysql - ERROR 1820 (HY000)
categories:
  - etc 
tags:
  - mysql
---

ERROR 1820 (HY000): You must reset your password using ALTER USER statement before executing this statement.

mysql을 설치하고 처음 root 계정으로 로그인, 명령어를 수행(show databases;)를 수행하면 위와 패스워드 변경을 해야하다는 에러가 발생합니다.  

다음과 같이 패스워드를 변경합니다.  

```bash
mysql > show databases;
```

```bash
mysql > ALTER USER 'root'@'localhost' IDENTIFIED BY 'Root#2025!';

# 결과
Query OK, 0 rows affected (0.33 sec)
```

