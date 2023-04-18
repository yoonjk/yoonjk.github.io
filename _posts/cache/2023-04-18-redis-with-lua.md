---
title:  Redis 시작하기 - Redis with lua
categories:
  - cache 
tags:
  - redis
  - lua
---
## Lua Script 사용 명령어

```bash
eval "lua script" 키개수 [KEYS[1], KEYS[2],...] [ARGV[1],ARGV[2],...]
```
eval : lua script를 실행하기 위한 예약어  
lua script : Redis에서 실행하기 위한 lua script 입니다.  
키개수 : 파라메터로 받을 키개수 입니다. => KEYS[1], KEYS[2],...  
KEYS : 키개수 다음으로 오는 파라메터로 키개수 만큼 파라메터를 입력합니다.  
ARGV : ARGV는 lua에서 가변적으로 입력받는 파라메터입니다.   

```bash
eval "return { KEYS[1], KEYS[2], KEYS[3], ARGV[1], ARGV[2]}" 3 k1 k2 k3 arg1 arg2

# 결과
1) "k1" 
2) "k2"
3) "k3"
4) "arg1"
5) "arg2"
```
## 참고
[코드공장](https://code-factory.tistory.com/13)