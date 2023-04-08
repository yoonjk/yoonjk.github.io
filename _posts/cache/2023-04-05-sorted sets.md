---
title: Getting Start Redis - Sorted Sets
categories:
  - cache 
tags:
  - redis
  - jupyter
---

## Sorted Sets
정렬된 집합은 Set과 해시 간의 혼합과 유사한 데이터 유형입니다. 집합과 마찬가지로 정렬된 집합은 반복되지 않는 고유한 문자열 요소로 구성되므로 어떤 의미에서는 정렬된 집합도 집합입니다.  
그러나 집합 내의 요소는 정렬되지 않지만 정렬 된 집합의 모든 요소는 score라고하는 부동 소수점 값과 연결됩니다  (모든 요소가 값에 매핑되기 때문에 유형이 해시와 유사한 이유입니다).  
또한 정렬 된 집합의 요소는 순서대로 취해집니다 (따라서 요청시 정렬되지 않으므로 순서는 정렬 된 집합을 나타내는 데 사용되는 데이터 구조의 특성입니다). 다음 규칙에 따라 정렬됩니다.:  
•	B와 A가 점수가 다른 두 요소인 경우 A.점수가 B.점수>이면 A는 B>.  
•	B와 A의 점수가 정확히 같으면 A 문자열이 B 문자열보다 사전적으로 크면 A가 B> B입니다. B와 A 문자열은 정렬된 집합에만 고유한 요소만 있으므로 같을 수 없습니다.  

몇 가지 선택된 해커 이름을 정렬 된 집합 요소로 추가하고 출생 연도를 "점수"로 추가하는 간단한 예부터 시작하겠습니다.
```bash
> zadd hackers 1940 "Alan Kay"
(integer) 1
> zadd hackers 1957 "Sophie Wilson"
(integer) 1
> zadd hackers 1953 "Richard Stallman"
(integer) 1
> zadd hackers 1949 "Anita Borg"
(integer) 1
> zadd hackers 1965 "Yukihiro Matsumoto"
(integer) 1
> zadd hackers 1914 "Hedy Lamarr"
(integer) 1
> zadd hackers 1916 "Claude Shannon"
(integer) 1
> zadd hackers 1969 "Linus Torvalds"
(integer) 1
> zadd hackers 1912 "Alan Turing"
(integer) 1
```
보시다시피 [ZADD](https://redis.io/commands/zadd)는 [SADD](https://redis.io/commands/sadd)와 유사하지만 점수 인 하나의 추가 인수 (추가 할 요소 앞에 배치)를 사용합니다.  
[ZADD](https://redis.io/commands/zadd)는 또한 가변적이므로 위의 예에서 사용되지 않더라도 여러 점수-값 쌍을 자유롭게 지정할 수 있습니다..
정렬 된 세트를 사용하면 실제로 이미 정렬되어 있기 때문에 출생 연도별로 정렬 된 해커 목록을 반환하는 것은 간단합니다..
구현 참고 사항 : 정렬 된 세트는 건너 뛰기 목록과 해시 테이블을 모두 포함하는 이중 포트 데이터 구조를 통해 구현되므로 요소를 추가 할 때마다 Redis는 O (log (N)) 작업을 수행합니다. 좋지만 정렬 된 요소를 요청하면 Redis는 작업을 전혀 수행 할 필요가 없으며 이미 모두 정렬되어 있습니다.:
```bash
> zrange hackers 0 -1
1) "Alan Turing"
2) "Hedy Lamarr"
3) "Claude Shannon"
4) "Alan Kay"
5) "Anita Borg"
6) "Richard Stallman"
7) "Sophie Wilson"
8) "Yukihiro Matsumoto"
9) "Linus Torvalds"
```
Note: 0 및 -1은 요소 인덱스 0에서 마지막 요소까지를 의미합니다(-1은 [LRANGE](https://redis.io/commands/lrange) 명령의 경우와 마찬가지로 여기에서 작동  함).
가장 최신것부터 가장 오래된 것까지 반대 방향으로 주문하려면 어떻게해야합니까? [ZRANGE](https://redis.io/commands/zrange) 대신 [ZREVRANGE](https://redis.io/commands/zrevrange)를 사용하십시오. :
```bash
> zrevrange hackers 0 -1
1) "Linus Torvalds"
2) "Yukihiro Matsumoto"
3) "Sophie Wilson"
4) "Richard Stallman"
5) "Anita Borg"
6) "Alan Kay"
7) "Claude Shannon"
8) "Hedy Lamarr"
9) "Alan Turing"
```
It는 WITHSCORES 인수를 사용하여 점수를 반환 할 수도 있습니다.:
```bash
> zrange hackers 0 -1 withscores
1) "Alan Turing"
2) "1912"
3) "Hedy Lamarr"
4) "1914"
5) "Claude Shannon"
6) "1916"
7) "Alan Kay"
8) "1940"
9) "Anita Borg"
10) "1949"
11) "Richard Stallman"
12) "1953"
13) "Sophie Wilson"
14) "1957"
15) "Yukihiro Matsumoto"
16) "1965"
17) "Linus Torvalds"
18) "1969"
```
Operating on ranges
Sorted Set는 이보다 더 강력합니다. 범위에서 작동 할 수 있습니다. 1950 년까지 태어난 모든 개인을 모아 봅시다. [ZRANGEBYSCORE](https://redis.io/commands/zrangebyscore) 명령을 사용하여이를 수행합니다.:
```bash
> zrangebyscore hackers -inf 1950
1) "Alan Turing"
2) "Hedy Lamarr"
3) "Claude Shannon"
4) "Alan Kay"
5) "Anita Borg"
```
Redis에 음의 무한대와 1950 사이의 점수로 모든 요소를 반환하도록 요청했습니다. (both extremes are included).
요소 범위를 제거할 수도 있습니다. Sorted Set에서 1940 년에서 1960 년 사이에 태어난 모든 해커를 제거합시다.:
```bash
> zremrangebyscore hackers 1940 1960
(integer) 4
```
 [ZREMRANGEBYSCORE](https://redis.io/commands/zremrangebyscore)는 아마도 최고의 명령 이름은 아니지만 매우 유용 할 수 있으며 제거 된 요소의 수를 반환합니다..
정렬된 집합 요소에 대해 정의된 또 다른 매우 유용한 작업은 get-rank 작업입니다. 정렬 된 요소 집합에서 요소의 위치가 무엇인지 물어볼 수 있습니다.
```bash
> zrank hackers "Anita Borg"
(integer) 4
```
[ZREVRANK](https://redis.io/commands/zrevrank) 명령은 요소가 내림차순으로 정렬된 것을 고려하여 순위를 가져오기 위해서도 사용할 수 있습니다.

Lexicographical scores
최신 버전의 Redis 2.8에서는 정렬된 집합의 요소가 모두 동일한 동일한 점수로 삽입된다고 가정하고 사전순으로 범위를 가져올 수 있는 새로운 기능이 도입되었습니다(요소는 C memcmp 함수와 비교  되므로 데이터 정렬이 없고 모든 Redis 인스턴스가 동일한 출력으로 응답함).

사전 범위로 작동하는 주요 명령은  
- [ZRANGEBYLEX](https://redis.io/commands/zrangebylex)  
- [ZREVRANGEBYLEX](https://redis.io/commands/zrevrangebylex)  
- [ZREMRANGEBYLEX](https://redis.io/commands/zremrangebylex)    
- [ZLEXCOUNT](https://redis.io/commands/zlexcount)  

예를 들어 유명한 해커 목록을 다시 추가하지만 이번에는 모든 요소에 대해 0점을 사용합니다.:
```bash
> zadd hackers 0 "Alan Kay" 0 "Sophie Wilson" 0 "Richard Stallman" 0
  "Anita Borg" 0 "Yukihiro Matsumoto" 0 "Hedy Lamarr" 0 "Claude Shannon"
  0 "Linus Torvalds" 0 "Alan Turing"
```
정렬된 집합 순서 규칙으로 인해 이미 사전순으로 정렬되어 있습니다.:
```bash
> zrange hackers 0 -1
1) "Alan Kay"
2) "Alan Turing"
3) "Anita Borg"
4) "Claude Shannon"
5) "Hedy Lamarr"
6) "Linus Torvalds"
7) "Richard Stallman"
8) "Sophie Wilson"
9) "Yukihiro Matsumoto"
```
[ZRANGEBYLEX](https://redis.io/commands/zrangebylex) 를 사용하여  사전 범위를 요청할 수 있습니다:
```bash
> zrangebylex hackers [B [P
1) "Claude Shannon"
2) "Hedy Lamarr"
3) "Linus Torvalds"
```
범위는 포괄적이거나 배타적일 수 있으며(첫 번째 문자에 따라 다름), 문자열 무한 및 빼기 무한대도 + 및 - 문자열로 각각 지정됩니다  . 자세한 내용은 설명서를 참조하십시오..
이 기능은 정렬 된 집합을 일반 인덱스로 사용할 수 있기 때문에 중요합니다. 예를 들어 128비트 부호 없는 정수 인수로 요소를 인덱싱하려면 점수는 같지만(예: 0) 빅 엔디안의 128비트 숫자로 구성된 16바이트 접두사를 사용하여 정렬된 집합에 요소를 추가하기만 하면 됩니다. 빅 엔디안의 숫자는 사전순으로 (원시 바이트 순서로) 정렬 될 때 실제로 숫자로 정렬되므로 128 비트 공간의 범위를 요청하고 접두사를 버리는 요소의 값을 가져올 수 있습니다.
보다 진지한 데모의 맥락에서 기능을 보려면 Redis 자동 완성 데모를 확인하십시오
