---
title: Redis 시작하기 - Sorted Sets - ZCARD
categories:
  - cache 
tags:
  - redis
  - ZCARD
---

Redis Zcard 명령은 지정된 키에서 세트에 저장된 member의 개수를 반환하는 데 사용됩니다.

문법 : 
ZCARD KEY_NAME

반환 유형 : sorted set 의 member 개수 또는 0

```bash
127.0.0.1:6379> ZADD mycolorset 10 white 12 black 14 red 16 blue
(integer) 4
127.0.0.1:6379> ZADD mycolorset 18 green 20 orange 22 pink 24 yellow
(integer) 4
127.0.0.1:6379> ZCARD mycolorset
(integer) 8
```