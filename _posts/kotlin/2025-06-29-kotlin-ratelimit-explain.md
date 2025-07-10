---
title: Kotlin - companion object란
categories:
  - kotlin
tags:
  - springboot 
--- 
## Redis 기반 Rate Limiter
Spring Cloud Gateway에서는 Redis를 사용한 Rate Limiter 구현을 지원합니다. Redis는 캐시 기반의 저장 시스템으로, Rate Limiter의 구현에 적합합니다. 이 구현은 Stripe 팀의 작업을 기반으로 하고 있으며, 기본적으로 토큰 버킷(Token Bucket) 알고리즘을 사용합니다.

- ReplenishRate: 초당 허용할 요청 수를 정의합니다. 예를 들어 replenishRate가 100으로 설정되면, 매 초마다 100개의 토큰이 버킷에 추가
- Burst Capacity: 버킷이 최대 몇 개의 토큰을 저장할 수 있는지를 정의합니다. 예를 들어, burstCapacity가 200으로 설정되면, 버킷에는 최대 200개의 토큰이 저장
- Requested Tokens: 요청 하나당 소모될 토큰 수를 정의합니다. 기본적으로 각 요청은 1개의 토큰을 소모

## 예시 
```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: loans-service
          uri: lb://loans-service
          filters:
            - name: RequestRateLimiter
              args:
                redis-rate-limiter.replenishRate: 10
                redis-rate-limiter.burstCapacity: 20
                redis-rate-limiter.requestedTokens: 1
```
- replenishRate: 초당 10개의 요청을 허용하도록 설정, 초당 버킷 회복량    
- burstCapacity: 최대 20개의 요청을 허용하도록 설정, 버킷의 담겨져있는 최대량    
- requestedTokens: 각 요청에 1개의 토큰을 소모하도록 설정  

## 참고
- [공부하는 개발자 - companion object이란](https://lannstark.tistory.com/141)
