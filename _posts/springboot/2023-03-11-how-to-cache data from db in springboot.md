---
title: CacheMager 사용하여 data 캐시하는 방법
categories:
  - springboot
tags: 
  - cacheManager
---

## cacheManager 의존성 추가
Springboot 에서 data를 Cache를 하고자 하는 경우 Solution을 시용하는 경우 Redis를 고려합니다.  
그러나 Redis 를 사용할 정도의 애플리케이션 아닌 경우 Local Cache만으로 충분한 경우 Singleton 패턴으로 구현할 수도 있지만 이미 만들어진 CacheManager를 사용하면 편리합니다.  

Springboot에서 cacheManager를 사용하기 위해서 maven 빌드 환경에서 pom.xml에 아래의 의존성을 추가합니다.  

```yaml
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-cache</artifactId>
		</dependency>
```
## cacheManager Bean 등록
CacheManager를 사용하기 위해 먼저 CacheManager Bean을 등록합니다.  
@EnableCaching을 어노테이션을 추가하고 SimpleCacheManager를 생성하고 CacheManager에 cache하고자 하는 대상에 대해 cacheName 을 등록합니다. 아래는 user 정보와 product 정보를 cache하기 위해서 cache name을 users, products으로 cache name을 등록하였습니다.  
```java
@Configuration
@EnableCaching
public class CacheManagerConfig extends CachingConfigurerSupport {

	@Bean
    public CacheManager cacheManager() {
        SimpleCacheManager cacheManager = new SimpleCacheManager();
        cacheManager.setCaches(Arrays.asList(
          new ConcurrentMapCache("users"), 
          new ConcurrentMapCache("products")));
        return cacheManager;
    }
}
```

## cacheManager Service 구현

```java
@RequiredArgsConstructor
@RestController
@Slf4j
public class ProductController {
	private final ProductService productService;
	
	@GetMapping("/products/{productId}")
	public ResponseEntity<?> findByProduct(@PathVariable String productId) {
		ProductVo product = productService.findByProductId(productId);
		
		return new ResponseEntity<Object>(product, HttpStatus.OK);
	}
}
```
Service에서 productId를 조회했을 때 @Cacheable 오노테이션을 사용하여 Product Id가 조회된 결과를 Caching합니다. 두번째 같은 product id를 조회하면 Cache된 정보가 조회됩니다.   

```java
@Slf4j
@RequiredArgsConstructor
@Service
public class ProductService {
	private final ProductDao productDao;
	
	@Cacheable(value="products")
	public ProductVo findByProductId(String productId) {
		ProductVo product = productDao.findByProductId(productId);
		log.info("product:{}", product);
		return product;
	}
}
```

관련 소스는 아래 [링크](https://gitlab.com/nexweb/sample-service.git)에 boot-startup branch에 있습니다.  

[https://gitlab.com/nexweb/sample-service.git](https://gitlab.com/nexweb/sample-service.git)