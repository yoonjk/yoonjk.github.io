---
title: "Redis 시작하기 - lua 설치 (Centos)"
categories: 
  - cache
tags:
  - redis
	- lua
---

## lua 설치 - 사전준비
사전에 compiler가 설치되어 있어야 합니다.
Compiler가 설치되어 있지 않는 경우 다음을 실행합니다.
```
sudo yum update -y
yum groupinstall -y 'Development Tools'
```
## lua 설치
```bash
curl -R -O http://www.lua.org/ftp/lua-5.4.4.tar.gz
tar zxf lua-5.4.4.tar.gz
cd lua-5.4.4
make all test
```

## lua cli 실행
lua를 실행하고 Hello World를 출력합니다.
```
src/lua
str = "Hello World"
print(str)
```