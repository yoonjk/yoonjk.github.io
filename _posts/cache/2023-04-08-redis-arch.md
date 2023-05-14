---
title: Redis 시작하기 - Redis 아키텍처
categories: 
  - cache
tags:
  - redis
  - sentinel 
---
## Redis 란 무엇인가?
![Jupyter log]({{ "/assets/images/cache/00-cache-redis-arch.png" }})  
Image from [https://architecturenotes.co/redis/](https://architecturenotes.co/redis/)

Redis (“REmote DIctionary Service”) 오픈 소스이며 Key/Value 기반 데이터베이스 서버입니다.
Redis에 대한 가장 정확한 설명은 데이터 구조 서버라고 합니다. Redis의 이러한 특정 특성으로 인해 개발자들 사이에서 인기를 얻고, 많은 solution으로 채택을 했습니다.  
데이터가 이미 구조화되어 있고, 정렬되어있는 경우라면 ? 초기에는 memcahced 처럼 사용했었습니다. 그러나 Redis는 계속 발전하여, Pub/Sub을 지원하고, 스트림, queue를 지원하여 많은 usecases를 지원하게 되었습니다.   

![Jupyter log]({{ "/assets/images/cache/01-cache-datatype.png" }})  



