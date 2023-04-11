---
title: "@Inject과 @Autowired의 차이점"
categories:
  - springboot
tags:
  - springboot
---

## @Inject vs @Autowired
@Inject 및 @Autowired 두 주석은 응용 프로그램에서 자동 의존성주입에 사용됩니다.
@Inject 어노테이션은 Java 6에 도입 된 Java CDI의 일부인 반면 @Autowire 어노테이션은 스프링프레임워크의 일부. 두 어노테이션 모두 동일한 목적을 수행하므로 응용프로그램에서 사용할 수 있는 어노테이션.  


|Sr. No.	Key	|@Inject	|@Autowired|
|---|---|---|
|1	Basic	|그것은 자바 CDI의 일부입니다	|스프링 프레임 워크의 일부입니다.|
|2	Required	|required 속성이 없습니다.	|required속성이 있습니다.|
|3	Default Scope	autowire | 기본 범위는 싱글톤입니다.	|주입 빈의 기본 범위는 prototype입니다.|  
|4	Ambiguity	|주입을 위해 빈에 모호성이있는 경우 코드에 @Named해야합니다 | 주입을 위해 Bean에 모호한 경우 코드에 @Qualifer 추가해야합니다.|
|5	Advantage	|Java CDI의 일부이므로 DI 프레임워크에 의존하지 않습니다.|시스템을 느슨하게 결합합니다.|

응용 프로그램을 Spring 프레임워크와 밀접하게 결합시킵니다. 나중에 다른 DI 프레임워크로 이동하려면 응용 프로그램을 다시 구성해야합니다.  

@Injection 어노테이션 예시
```java
public class InjectionExample {
   @Inject
   private CarBean carbean;
}
Example of @Autowired annotation
public class AutowiredExample {
   @Autowired
   private CarBean carbean;
}
```