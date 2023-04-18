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

## lua script load
아래와 같은 lua script를 redis-cli로 load시 반환값으로 출력되는 sha값으로 lua를 실행할 수 도 있습니다.
```bash
local current = redis.call('zrangebyscore', KEYS[1], ARGV[1], ARGV[2], 'LIMIT', ARGV[3], ARGV[4])
if (current == nil or current == '') then
    return "failed"
else
    for i, mem in pairs(current) do
        redis.call('zincrby', KEYS[1], 1, mem)
        return current
    end
end
```

```bash
cat ex01.lua | redis-cli -x script load

# 출력결과
"d57be6feffc53b0a7096b8a5d1c802c04ebc139e"

```
redis-cli를 redis에 접속하여 다음과 같이 실행할 수 있습니다.
```bash
127.0.0.1:6379> zadd users:point 0 jason
127.0.0.1:6379> zadd users:point 10 mason 20 jane

127.0.0.1:6379> evalsha d57be6feffc53b0a7096b8a5d1c802c04ebc139e 1 users:point -inf inf 0
```
## 참고
[코드공장](https://code-factory.tistory.com/13)
[everydayminder](https://luran.me/381)