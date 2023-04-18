---
title: "Springboot기반 Redis @Transactional 어노테이션 사용"
categories:
  - springboot
tags:
  - springboot
---

## @Transactional
Springboot 기반 Redis를 사용할 때 @Tranactional 사용하여 commit 과 rollback 을 처리할 수 있습니다.
rollback 은 exception을 throw하면 redis cache에 데이터가 저장되지 않습니다.  
PlatformTransactionManager를 Bean으로 등록되어 있고, 메소드에 @tranactional 어노테이션이 있고,메소드 로직에 @redisTemplate을 사용하고 있다면 이는 트랜잭션으로 처리되어, 예외(Exception)가 발생하면 데이터베이스에 처리했던 작업이 rollback 되고, 또한 로직에서 Redis에 저장했던 데이터 또한 저장되지 않고 rollback 됩니다.

__@Transactional__ 어노테이션이 있을때, Redis는 메서드 시작시 transaction 시작으로 __MULTI__, 메서드 종료시 transaction 커밋으로 __EXEC__ 명령어를 실행하는 것으로 구현하고 있습니다. 만약 Exception이 발생하면 __DISCARD__ 가 실행됩니다.

## Redis 환경설정
Redis를 @Transaction 어노테이션과 함께 사용하고 싶을 때는 3가지 방법이 있습니다.
* 자바의 database configuration에 PlatformTransactionManager를 Bean으로 등록 사용
* 자바의 Redis Configuration에 PlatformTransactionManager를 Bean으로 등록 
* RedisTemplate 단독으로 사용하고 있다면 @EnableTransactionManagement 어노테이션 추가

#### java database configuration 사용 - 예시
```java
@Configuration
@PropertySource("classpath:/application.properties")
@EnableTransactionManagement
public class DatabaseConfiguration {
...
	@Bean
	public PlatformTransactionManager transactionManager() throws Exception {
		return new DataSourceTransactionManager(dataSource());
	}
}
```

#### Redis Configuration 사용 - 예제
```java
@Configuration
public class RedisConfig {

  @Bean
  public RedisTemplate<?, ?> redisTemplate(RedisConnectionFactory redisConnectionFactory) {
    RedisTemplate<byte[], byte[]> redisTemplate = new RedisTemplate<>();
    redisTemplate.setConnectionFactory(redisConnectionFactory);
    redisTemplate.setEnableTransactionSupport(true); // redis Transaction On !
    return redisTemplate;
  }

  @Bean // 만약 PlatformTransactionManager 등록이 안되어 있다면 해야함, 되어있다면 할 필요 없음
  public PlatformTransactionManager transactionManager() throws SQLException {
      // 사용하고 있는 datasource 관련 내용, 아래는 JDBC
    return new DataSourceTransactionManager(datasource()); 

    // JPA 사용하고 있다면 아래처럼 사용하고 있음
    return new JpaTransactionManager(entityManagerFactory);
  }
}
``` 

####  RedisTemplate 단독으로 사용 - 예제
```java
@Configuration
@EnableTransactionManagement                                 
public class RedisTxContextConfiguration {

  @Bean
  public StringRedisTemplate redisTemplate() {
    StringRedisTemplate template = new StringRedisTemplate(redisConnectionFactory());
    // explicitly enable transaction support
    template.setEnableTransactionSupport(true);              
    return template;
  }

  @Bean
  public PlatformTransactionManager transactionManager() throws SQLException {
    return new DataSourceTransactionManager();   
  }
}
```

## 참조
[사바라다는 차곡차곡](https://sabarada.tistory.com/178)