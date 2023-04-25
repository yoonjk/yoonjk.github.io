---
title:  Redis 시작하기 - Redis with Lua
categories:
  - cache 
tags:
  - redis
  - lua
---
## lua
Lua는 달을 뜻하는 포르투갈어이며 1993년 브라질에서 처음 개발되었으며, light-weight하며 이식성이 좋은 스크립트 언어입니다.

__Lua 스크립트는 다음과 같은 특징__ 이 있습니다.
* 대소 문자를 구분
* 다른 스크립트 언어처럼 변수 형을 선언하지 않음 
* 변수 명의 첫글자는 영문 또는 _(언더스코어)로 시작 
* 예약어는 다음과 같습니다.
```bash
and / break / do / else / elseif / end / false / for /function / if / in / local / nil / not / or / repeat / then / true /until / while 
```
* local 키워드를 사용하여 전역변수와 지역변수를 구분하고, 지역변수 사용을 권고
* 배열의 인덱스는 1부터 시작 

__Lua 스크립트는 다음과 같은 장점__ 을 가집니다.

* Pipelining처럼, 여러 명령을 한 번의 request/response만으로 수행할 수 있습니다.
* 원하는 함수를 redis에서 지원하고 있지 않더라도 lua 스크립트로 대체 가능합니다.(반환되는 값 count, 반환되는 value 모두 더하기 등)
* 스크립트를 재활용할 수도 있습니다
* 그래픽 시뮬레이션을 위한 스크립트언어로 개발되었기 때문에 타 스크립트언어보다 빠른 성능을 제공합니다.
* 자바처럼 가비지 컬렉션을 제공하기 때문에 사용하지 않는 변수를 제거하기 위해 별도의 처리가 필요없습니다. 가비스 컬렉션 대상으로 만들려면 변수에 nil을 할당하면 됩니다. 

#### Redis and Lua
* Redis에서는 2.6부터 Lua 5.1 버전을 지원하기 시작
* eval 명령어로 Redis에 전송하여 실행 
* Lua 스크립트를 script load 명령을 이용하여 Redis 서버에 등록하여 Cache하여 사용가능
* Redis 에서 Lua 스크립트를 실행할 때 파라메터를 입력받을 수 있다.
* Lua 스크립트에서 Redis 명령을 사용가능 
* Redis에서 실행되는 Lua 스크립트는 Atomic으로 처리된다. 즉 스크립트가 실행되는 동안 다른 Redis 명령이 실행되지 못한다.
* lua-time-limit : Lua 스크립트가 수행될 때 최대 시간을 밀리초 단위로 설정한다. 해당 시간이 지나면 SCRIPT KILL 명령을 이용해서 Lua 스크립트를 중지 할 수 있게 된다. 기본값은  50000(0.0005 초)
  * 0 이나 음수를 입력하면 스크립트 제한 시간이 없음.  
  * Lua 스크립트가 수행되고 lua-time-limit 설정값이 되기 전에 SCRIPT KILL 명령을 수행해도 중지되지 않음.  
  * 무한 loop Lua 스크립트가 수행되고 있을 때 다른 세션에서는 다음과 같은 메시지가 출력됨   
  __BUSY Redis is busy running a script. You can only call SCRIPT KILL or SHUTDOWN NOSAVE__



## Lua Script 사용 명령어
Redis에서 lua script를 실행하기 위해 [eval](https://redis.io/commands/eval/) 명령어는 다음과 같습니다.
```bash
eval "script" 키개수 [KEY1,KEY2,...] [ARGV1,ARGV2,...]

# 예시
eval “redis.call(‘set’, KEYS[1], ARGV[1])” 1 key:name value
```
__eval__ : lua script를 실행하기 위한 예약어. Required.  
__script__ : Redis에서 실행하기 위한 lua script 입니다. Required  
__키개수__ : 파라메터로 입력 받을 키(KEYS)의 개수 입니다. 이는 뒤에 추가적으로 붙을 선택 인자들 중 몇 개가 key인지를 lua가 알 수 있도록 하기 위함입니다. 키가 없는 경우 키의 개수는 0으로 입력합니다. Required  
__KEYS__ : 키개수 다음으로 오는 파라메터로 키개수 만큼 파라메터를 입력합니다. 그러면 lua는 KEYS 배열에 바인딩됩니다 

* 0 이면  KEYS 파라메터가 없는 script입니다.
```bash
eval 'return "Hello World"' 0
```
* 1 이면  => 1 KEY1
* 2 이면  => 2 KEY1 KEY2
* 3 이면  => 3 KEY1 KEY2 KEY3
script에서는 KEYS[1], KEYS[2], KEYS[3]  이렇게 참조합니다.  

__ARGV__ : ARGV는 lua에서 가변적으로 입력받는 파라메터입니다. 인자 [ARGV ...]는 각각 lua에서 사용할 수 있도록 ARGV 배열에 바인팅 됩니다.  

```bash
eval "return { KEYS[1], KEYS[2], KEYS[3], ARGV[1], ARGV[2]}" 3 k1 k2 k3 arg1 arg2

# 결과
1) "k1" 
2) "k2"
3) "k3"
4) "arg1"
5) "arg2"
```
## eval 
Redis에서 Lua를 사용하여 eval로 Hello World를 출력할 수 있습니다.
```bash
eval 'return "Hello World"' 0
```

예제 2
```bash
eval 'return string.format("Hi %s", KEYS[1])' 1 jaeguk
```

예제 3
```bash
eval 'return string.format("key1 is %s, key2 is %s", KEYS[1],KEYS[2])' 2 age score
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

## redis 명령어 호출방법
아래 두 개의 lua 함수를 사용하여, lua script에서 redis 명령을 호출할 수 있습니다.
```bash
redis.call()
redis.pcall()
```

## Lua 예제 
Key 등록 
```bash
127.0.0.1:6379> sadd kstar:info:age 25
(integer) 1
127.0.0.1:6379> sadd kstar:info:joinday "2022.11.17"
(integer) 1
127.0.0.1:6379> sadd kstar:info:siteid job academy campstudy
(integer) 3
127.0.0.1:6379> sadd kstar:info:lastloginday "2023.01.02"
(integer) 1
127.0.0.1:6379> sadd kstar:info:sex M
(integer) 1
sadd kstar:info:totallogincount 54
```
Key 목록 조회하기
```bash
127.0.0.1:6379> eval 'local members = redis.call("keys", "kstar:info:*") local results = {} for index,key in ipairs(members) do results[index] = key end return results'  0
1) "kstar:info:lastloginday"
2) "kstar:info:sex"
3) "kstar:info:totallogincount"
4) "kstar:info:age"
5) "kstar:info:siteid"
6) "kstar:info:joinday"
```

Key 값에 대한 Value 를 조회
```bash
eval 'local members = redis.call("keys", "kstar:info:*") local results = {} for index,key in ipairs(members) do results[index] = redis.call("smembers", key) end return results ' 0
1) 1) "2023.01.02"
2) 1) "M"
3) 1) "54"
4) 1) "25"
5) 1) "job"
   2) "campstudy"
   3) "academy"
6) 1) "2022.11.17"
```
Key 값에 대한 Value 를 조회하여 key => value 형으로 출력
```bash
eval "local members = redis.call('keys', 'kstar:info:*') local results = {} for index, key in ipairs(members) do results[index] = key ..'=>'.. unpack(redis.call('smembers', key)) end return results " 0
1) "kstar:info:lastloginday=>2023.01.02"
2) "kstar:info:sex=>M"
3) "kstar:info:totallogincount=>54"
4) "kstar:info:age=>25"
5) "kstar:info:siteid=>job"
6) "kstar:info:joinday=>2022.11.17"
```
## 참고
[코드공장](https://code-factory.tistory.com/13)  
[everydayminder](https://luran.me/381)  
[Redis 코스](http://www.w3big.com/ko/redis/sorted-sets-zrangebyscore.html#gsc.tab=0)  
[PlanB의 백엔드 엔지니어링](https://planbs.tistory.com/entry/Redis-Eval)  
[멋지게 놀아라라](https://bstar36.tistory.com/category/%EA%B8%B0%ED%83%80%20DBMS/Redis?page=5)  