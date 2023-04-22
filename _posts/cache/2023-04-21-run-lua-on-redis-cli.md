---
title:  Redis 시작하기 - Lua 스크립트 등록 및 실행
categories:
  - cache 
tags:
  - redis
  - lua
---
스크립팅을 사용하면 Redis 내에서 복잡한 작업을 실행할 수 있습니다.  
Redis 스크립트를 사용하면 제어 구조와 같은 프로그래밍 도구를 사용할 수 있으며 거의 ​​모든 Redis 명령에 액세스 할 수 있습니다.

그렇다면 왜 명령을 직접 실행하여 또는 응용 프로그램 자체에서 Redis 스크립트를 사용합니까?
* 작업이 Redis Cache 서버에서 직접 실행되 성능이 크게 증가합니다.
* Logic은  Redis 서버에서 직접 적재되고, 분산되어 있는 여러 응용프로그램에서 사용가능.
* atomic하게 실행되므로 스크립트가 실행중인 동안 동시에 다른 서버가 해당 스크립트를 실행 하는 것을 방지 함.

Lua는 Redis 스크립팅의 언어입니다. LUA 언어는 단순성과 간결함을 제공하므로 스크립팅 작업에 효과적인 언어입니다.

그러나 스크립트가 모든 경우에 적합하지는 않습니다. Redis 서버는 스크긴트가 실행되는 동안 다른 작업을 차단하기 때문에 로직이 긴 스크립트는 실제로 성능에 영향을 미칠 수 있습니다.  

Lua 스크립트를 작성하고, 스크립트를 등록하고 Caching하여 실행하거나, EVAL 명령어로 script를 직접 실행하는 방법들이 있습니다.
## Lua Script 등록 방법

* CLI로 등록 
```bash
cat script.lua | redis-cli -x script load
```
* script load  명령어 
```bash
127.0.0.1:6379> script load "redis.call('SET', KEYS[1], ARGV[1])"
```

## Lua Script 실행방법
#### redis-cli 
redis-cli -p 6383 eval "$(cat scriptfile)" keynum keys argv 
```bash
-- example01.lua
redis.call('SET', KEYS[1], ARGV[1])
```
예시 1
```bash
redis-cli eval "$(example01.lua)" 1 key1 value
```

예시 2
```bash
SHA=$(cat example02.lua |redis-cli -p 6383 -x script load)
redis-cli -p 6383 evalsha "$SHA" 2 order hkeys
```


#### redis 서버
기본 Redis 스크립트는 EVAL 명령을 사용하여 실행할 수 있습니다. 명령은 Redis에서 직접 스크립트를 실행합니다
```bash
127.0.0.1:6379> EVAL "return 'Hello, world!'"
127.0.0.1:6379> EVAL "redis.call('SET', KEYS[1], ARGV[1])" 1 key1 "Example Value"

127.0.0.1:6379> hmset hkeys key:1 value:1 key:2 value:2 key:3 value:3 key:4 value:4 key:5 value:5 key:6 value:6
127.0.0.1:6379> zadd order 1 key:3 2 key:1 3 key:2
127.0.0.1:6379> eval "local order = redis.call(‘zrange’, KEYS[1], 0, -1); return redis.call(‘hmget’,KEYS[2],unpack(order));" 2 order hkeys
```

EVALSHA <your_script_sha> 1 key argv
```bash
127.0.0.1:6379> script load "redis.call('SET', KEYS[1], ARGV[1])" 
fcd2612e1ca113b83fdfbc2a88493d3b231a32ad

127.0.0.1:6379> EVALSHA fcd2612e1ca113b83fdfbc2a88493d3b231a32ad 1 key1 test1
127.0.0.1:6379> get key1
```

## 참조
[Hong's Programing World](https://hsg2510.tistory.com/category/Lua%20Script)
[Lua manual](https://www.lua.org/manual/5.4/)
[freeCodeCamp](https://www.freecodecamp.org/news/a-quick-guide-to-redis-lua-scripting/)