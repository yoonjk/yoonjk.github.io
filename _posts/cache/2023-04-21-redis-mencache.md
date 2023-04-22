---
title:  Redis 시작하기 - Redis vs Memcache
categories:
  - cache 
tags:
  - redis
  - mencache
---
redis와 Memcached를 비교합니다.

|항목|Redis|Memcached|
|---|---|---|
|특징|메모리 DB|고성능 분산 캐시 서버|
|저장방식|메모리 캐시 및 스토리지|메모리|
|지원 데이터 타입|다양한 데이터 타입지원<br>String/List/Hashes/Set/Sorted Set|String key/value만 지원|
|키목록 조죄| 모든 키목록 |모든 키 목록 지원 않음|
|복제| Controller/replica |복제 지원 않음|
|클러스터|클러스터 지원| Not support|
|Pub/Sub| Pub/Sub model 지원| Not support|
|Script| LUA Script 지원| Not support|
