---
title:  Redis 시작하기 - Redisearch 
categories:
  - cache 
tags:
  - redis
  - redisearch
---
Hands-on을 위해 docker 기반으로 redis-stack-server를 설치합니다.

```bash
docker run -d --name redis-stack-server -p 6379:6379 redis/redis-stack-server
```

## 인덱스 생성
FT.CREATE 명령을 사용하여 필드와 인덱스를 생성합니다(기본 가중치는 1.0).
```bash
127.0.0.1:6379> FT.CREATE myIdx ON HASH PREFIX 1 doc: SCHEMA title TEXT WEIGHT 5.0 body TEXT url TEXT
OK
```

doc:xx 접두사가 있는 키가 있는 기존 해시 문서는 이때 자동으로 인덱스에 추가됩니다.

## documents 추가

색인을 만든 후 doc: 접두사가 있는 새 해시 문서는 생성 시 자동으로 색인이 생성됩니다.

HSET 명령을 사용하여 새 해시 문서를 만들고 인덱스에 추가합니다.
```bash
127.0.0.1:6379> HSET doc:1 title "hello world" body "lorem ipsum" url "http://redis.io"
(integer) 3
```

## 색인(index) 검색
특정 단어가 포함된 문서의 색인을 검색하려면 FT.SEARCH 명령을 사용하십시오.

```bash
127.0.0.1:6379> FT.SEARCH myIdx "hello world" LIMIT 0 10
1) (integer) 1
2) "doc:1"
3) 1) "title"
   2) "hello world"
   3) "body"
   4) "lorem ipsum"
   5) "url"
   6) "http://redis.io"
```

## 색인(index) 삭제
연관된 해시 문서를 삭제하지 않고 색인을 제거하려면 DD 옵션 없이 FT.DROPINDEX를 실행하십시오.
```bash
127.0.0.1:6379> FT.DROPINDEX myIdx
OK
```

인덱스 및 모든 인덱스 해시 문서를 삭제하려면 명령에 DD 옵션을 추가합니다.
```bash
127.0.0.1:6379> FT.SUGGET autocomplete "he"
1) "hello world"
```