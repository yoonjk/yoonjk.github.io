---
titlㄷ: instance가 죽었을 때 circuitebreak 처리 
categories:
  - kotlin
tags:
  - springcloudgateway
--- 
## add dependency 
- dependency library 를 추가 
```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-circuitbreaker-reactor-resilience4j</artifactId>
 </dependency>
```
- Declare circuit breaker in application.yaml

```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: my_route
          uri: http://localhost:8060/
          filters:
            - name: CircuitBreaker
              args:
                name: myCircuitBreaker
                fallbackUri: forward:/inCaseOfFailure
```

- Declare the endpoint which will be called in the case of failure (a connection error, for example)
```java
@RequestMapping("/inCaseOfFailure")
    public Mono<ResponseEntity<String>> inCaseOfFailureUseThis() {
        return Mono.just(ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body("body for service failure case"));
}
```

## 참고
- [Spring Cloud Gateway 500 when an instance is down](https://stackoverflow.com/questions/64440951/spring-cloud-gateway-500-when-an-instance-is-down)
