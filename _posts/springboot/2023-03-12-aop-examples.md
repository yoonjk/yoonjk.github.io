---
title: AOP(Aspect Oriented Programming) 예시
categories:
  - springboot
tags: 
  - aop
---

## AOP 예시

```java
@Aspect
public class AspectConfig {
	@Pointcut("@annotation(org.springframework.web.bind.annotation.GetMapping)")
	public void getMapping() {
		
	}
	
	@Pointcut("@annotation(org.springframework.web.bind.annotation.PostMapping)")
	public void postMapping() {
		
	}
	
	@Pointcut("@annotation(org.springframework.web.bind.annotation.RequestMapping)")
	public void requestMapping() {
		
	}
	
	@Pointcut("execution(* com.demo.microservices..*.*Service.*(..))")
	public void serviceExcution() {
		
	}
	
	@Around(value="serviceExcution()")
	public Object around(ProceedingJoinPoint  pjt) throws Throwable {
		log.info("------------- Around logging Start -------------");
		
		Object retValue = null;
		try {
			retValue = pjt.proceed();
		} catch(Throwable e) {
			log.info("error:{}", e.getMessage());
			
		}

		log.info("--------------");
		log.info(" return val:{}", retValue);
		log.info("------------- Around logging end -------------");
		return retValue;
	}
	
	@Before(value = "serviceExcution()") 
	public void before(JoinPoint jointPoint) throws Throwable {
		log.info("------------- Before logging -------------" );
	}
	
	@AfterReturning(pointcut = "serviceExcution()", returning = "result")
	public void afterRuturning(JoinPoint joinPoint, Object result) {
		log.info("------------- AfterReturning logging -------------" );
		log.info(" result :{}", result);
		log.info("----------------------------------------" );
	}
	
	@After(value = "serviceExcution()")
	public void after(JoinPoint joinPoint) {
		log.info("------------- After logging -------------");
	}
	
	@AfterThrowing(pointcut = "serviceExcution()", throwing = "e") 
	public void afterThrowing(JoinPoint joinPoint, Throwable e) throws Throwable {
		log.info("------------- AfterThrowing logging -------------");
		log.info(" throwable :{}", e);
		log.info("----------------------------------------" );
	}
}
```