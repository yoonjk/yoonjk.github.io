---
title: [mysql] mysql user 생성
categories:
  - etc 
tags:
  - mysql
---

## 계정이 생성
```bash
CREATE USER IF NOT EXISTS 'user01'@'localhost' IDENTIFIED BY '비밀번호';

-- 비밀번호를 확실히 동일하게 재설정
ALTER USER 'user01'@'localhost' IDENTIFIED BY '비밀번호';
```

## 권한부여
```bash
-- 권한도 둘 다 부여
GRANT ALL PRIVILEGES ON `demo`.* TO 'user01'@'localhost';
FLUSH PRIVILEGES;
```
