---
title: Redis 시작하기 - Usecases - Leaderboard
categories:
  - cache 
tags:
  - redis
  - jupyter
---
LUA 스크립팅의 효율적인 방법으로 수행 할 수 있는 사례에 사용될 수 사례를 살펴봅니다.
여기에는 Redis zset에 유지되는 리더 보드가 있으며, 현재 사용 사례를 위해 주어진 사용자의 경우 해당 사용자의 순위와 리더 보드에서 사용자의 주변의 rank를 얻을 수도 있습니다.



![locked]({{ "/assets/images/cache/30-cache-leaderboard.png" }})  


아래의 2 개의 명령이 연속적으로 수행했을 때 정확한 결과를 가져오는가?

* 첫 번째는 Zrank Leaderboard Heather를 사용하여 사용자 순위를 얻습니다
* 그런 다음 위의 순위를 사용하여 하위 및 상한을 얻으려면 아래에서 3을, 아래 3 개를 원한다고 가정 해 봅시다.  

```bash
127.0.0.1:6383> zadd leaderboard 10 Andrew 20 Bella 30 Andy 33 Dolly 40 Cathy 42 Heather 43 Gilbert 45 Lilly 50  Dinesh 58 "Jon snow" 60 Ygnitte
```
```bash
127.0.0.1:6383> zrange leaderboard 0 -1
 1) "Andrew"
 2) "Bella"
 3) "Andy"
 4) "Dolly"
 5) "Cathy"
 6) "Heather"
 7) "Gilbert"
 8) "Lilly"
 9) "Dinesh"
10) "Jon snow"
11) "Ygnitte"
127.0.0.1:6383> zrank leaderboard Heather
(integer) 5
127.0.0.1:6383> zrange leaderboard 2 8
1) "Andy"
2) "Dolly"
3) "Cathy"
4) "Heather"
5) "Gilbert"
6) "Lilly"
7) "Dinesh"
```

그러나 리더 보드는 zrank와 zrange Redis 명령어를 실행하는 사이에 순위가 변경 될 수 있습니다.
이를 해결하기 위한 솔루션 중 하나는 사용자의 순위를 얻기 전에 일종의 lock 장치를 사용한 다음 zrange를 사용한 다음 lock을 제거하는 것입니다. 그리고 이전에, 리더 보드에 쓰고, 우리는 lock을 점검해야하며, lock 장치가 있으면 lock 장치가 제거 될 때까지 재 시도해야합니다.

![locked]({{ "/assets/images/cache/29-cache-locked.png" }})  

유스 케이스를 처리하는 우아한 방법은 LUA 스크립트를 사용하는 것입니다
Redis는 서버에서 LUA 스크립트를 업로드하고 실행할 수 있으며 스크립트가 서버에서 실행되기 때문에 스크립트에서 데이터를 읽고 쓰는 것이 매우 효율적입니다.
또한 Redis는 스크립트의 원자(Atomic) 실행을 보장합니다. 스크립트를 실행하는 동안 전체 런타임 중에 모든 서버의 명령이 차단됩니다. 

간단한 LUA 스크립트를 작성하여 어떻게 문제를 해결할 수 있는지 보자.

```bash
local rank = redis.call('zrank', KEYS[1], KEYS[2])
local min = math.max(rank - ARGV[1], 0)
local max = rank + ARGV[1]
local ldb = redis.call('zrange', KEYS[1], min, max)
local results = {}

results['rank'] = tostring(rank + 1)
results['item'] = ldb

local vars = cjson.encode(results)
return vars
```

| member | score | rank |
— — — — — — — — — — —
| member_1 | 50 | 1 |
| member_2 | 50 | 1 |
| member_3 | 30 | 3 |
| member_4 | 30 | 3 |
| member_5 | 10 | 5 |
```bash
127.0.0.1:6379> zadd test-leaderboard 9 user1
(integer) 1
127.0.0.1:6379> zadd test-leaderboard 5 user2
(integer) 1
127.0.0.1:6379> zadd test-leaderboard 5 user3
(integer) 1
127.0.0.1:6379> zadd test-leaderboard 3 user4
(integer) 1

127.0.0.1:6379> zrank test-leaderboard user2
(integer) 1
127.0.0.1:6379> zrank test-leaderboard user3
(integer) 2

127.0.0.1:6379> ZSCORE test-leaderboard user3
"5"
127.0.0.1:6379> ZRANGEBYSCORE test-leaderboard 5 5 LIMIT 0 1
1) "user2"
127.0.0.1:6379> ZRANK test-leaderboard user2
(integer) 1

127.0.0.1:6379> ZADD test-leaderboard 5 user2
127.0.0.1:6379> ZADD test-ranks 5 5

EVAL "local score = redis.call('ZSCORE', KEYS[1], ARGV[1]) \n return redis.call('ZRANK', KEYS[2], score)" 2 test-leaderboard test-ranks user2
(integer) 1
```

스크립트를 한 줄로 보면 