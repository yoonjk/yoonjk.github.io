---
title: Redis 시작하기 - Sorted Sets - ZADD
categories:
  - cache 
tags:
  - redis
---

ZADD key score1 member1 [score2 member2]

Redis ZADD 명령은 지정된 Score와 함께 지정된 모든 멤버를 키에 저장된 정렬된 집합에 추가하는 데 사용됩니다. 지정된 멤버가 저장된 집합의 기존 멤버인 경우 점수가 업데이트되고 요소가 올바른 위치에 다시 삽입되어 올바른 순서가 보장됩니다. 지정된 멤버가 유일한 멤버로 있는 새 정렬 집합이 만들어지며, 키가 존재하지 않거나 정렬된 집합이 비어 있을 때 새로 만들어집니다. 키가 있지만 정렬된 집합이 없으면 오류가 반환됩니다.


Return : Integer는 Score가 업데이트 된 이미 존재하는 요소는 개수에 포함하지 않고  신규 추가 된 요소는 개수에 포함된 개수를 반환.
문법 : 
```bash
ZADD KEY_NAME SCORE1 VALUE1.. SCOREN VALUEN
```
1개의 요소를 추가하는 경우
```bash
127.0.0.1:6379> ZADD mycolorset 1 white
(integer) 1
127.0.0.1:6379> ZADD mycolorset 2 black
(integer) 1
127.0.0.1:6379> ZADD mycolorset 3 red
(integer) 1
127.0.0.1:6379> ZRANGE mycolorset 0 -1
```
여러개 요소를 추가하는 경우
```bash
127.0.0.1:6379> ZADD mycolorset 4 blue 5 green
(integer) 2
127.0.0.1:6379> ZRANGE mycolorset 0 -1 WITHSCORES
 1) "white"
 2) "1"
 3) "black"
 4) "2"
 5) "red"
 6) "3"
 7) "blue"
 8) "4"
 9) "green"
10) "5"
```
Score가 동일한 경우
```bash
127.0.0.1:6379> ZADD mycolorset 1 white 1 black 1 red 1 blue 1 green
(integer) 5
127.0.0.1:6379> ZRANGE mycolorset 0 -1 WITHSCORES
 1) "black"
 2) "1"
 3) "blue"
 4) "1"
 5) "green"
 6) "1"
 7) "red"
 8) "1"
 9) "white"
10) "1"
```
