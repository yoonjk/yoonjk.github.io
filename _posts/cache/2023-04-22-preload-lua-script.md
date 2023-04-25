---
title: Redis 시작하기 - Pre Loading a Lua Script into Redis With Lettuce
categories:
  - cache 
tags:
  - redis
  - Lua
---
양상추를 사용하여 redis에 대해 루아 스크립트를 실행하는 것을 우리는 매번 인수와 함께 전체 스크립트 redis가 원자 적으로 실행될 것를 보냈습니다. 매우 작은 스크립트의 경우 문제가 될 것 같지 않지만 EVALSHA를 사용하여이를 수행하는 더 효율적인 방법이 있습니다 .

## EVALSHA 
evalsha 없이 lua 스크립트를 실행한다는 것은 이미 다룬 것처럼 매번 스크립트와 인수를 보낸다는 것을 의미합니다:
```bash
redis-cli eval "return redis.call('set',KEYS[1],ARGV[1],'ex',ARGV[2])" 1 foo1 bar1 10
OK
```
SCRIPT LOAD를 사용하면 redis에 "이것은 내 스크립트입니다, 기억하십시오"라고 말한 다음 EVALSHA를 사용하여 redis가 기억하는 스크립트를 실행할 수 있습니다. 예를 들어 CLI를 사용하면 다음과 같습니다.

```bash
redis-cli
> SCRIPT LOAD "return redis.call('set',KEYS[1],ARGV[1],'ex',ARGV[2])"
"cf4df3d8eb7f521ceb285c6870e5713d79e2bb0b"

> evalsha cf4df3d8eb7f521ceb285c6870e5713d79e2bb0b 1 foo1 bar1 10
OK

```
다음과 같은 쉘 스크립트로 작동하는지 확인할 수 있습니다.
```bash
$ SHA=$(redis-cli script load "return redis.call('set',KEYS[1],ARGV[1],'ex',ARGV[2])")
$ redis-cli evalsha "$SHA" 1 foo1 bar1 10; redis-cli ttl foo1; redis-cli get foo1      
OK
(integer) 10
"bar1"
```
스크립트의 해시 [sha1 hash, 더 구체적으로 말하면]를 참조하여 전체 스크립트를 보낼 필요가 없습니다. 실제로 로드하는 스크립트의 크기에 관계없이 스크립트를 나타내는 해시의 크기는 컴팩트하게 유지됩니다.

## EVALSHA with Lettuce
Lettuce를 곁들인 EVALSHA는 우리가 원한다면 거의 같은 방식으로 작동 할 수 있습니다. 스크립트를 로드하고 반환 된 해시를 사용했습니다 [SHA1 해시는 16 진수 문자열로 표시됩니다] :