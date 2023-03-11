---
title: AOP(Aspect Oriented Programming)  PointCut 
categories:
  - springboot
tags: 
  - aop
  - pointcut
---

## PointCut 의 이해
어느 시점(Operation or method)에 AOP 모듈을 trigger할지 정의하는 JoinPoint의 상세 스펙 또는 표현식(Expression) 으로
설명하였습니다. 아래 그림으로 표현하다면 주황색의 내용으로 이해하면 좋을 것 같습니다.  
- 주황색 유형 : JoinPoint  
- 주황색 표현식(E) : PointCut  
- 주황색 내용 : Advice

![ponintcut]({{ "/assets/images/springboot/03-spring-aop-pointcut.png" }})

|JoinPoint|설명|
|---|---|
|execution|메소드 실행 조인 포인트를 매칭한다. 스프링 AOP에서 가장 많이 사용하고, 기능도 복잡|
|within | 특정 타입 내의 조인 포인트를 매칭.|
|args |인자가 주어진 타입의 인스턴스인 조인 포인트|
|this | 스프링 빈 객체(스프링 AOP 프록시)를 대상으로 하는 조인 포인트|
|target | Target 객체(스프링 AOP 프록시가 가르키는 실제 대상)를 대상으로 하는 조인 포인트|
|@target | 실행 객체의 클래스에 주어진 타입의 애노테이션이 있는 조인 포인트|
|@within | 주어진 애노테이션이 있는 타입 내 조인 포인트| 
|@annotation | 메서드가 주어진 애노테이션을 가지고 있는 조인 포인트를 매칭|
|@args | 전달된 실제 인수의 런타임 타입이 주어진 타입의 애노테이션을 갖는 조인 포인트|
|bean | 스프링 전용 포인트컷 지시자, 빈의 이름으로 포인트컷을 지정한다.|


## 참고
[SeungTaek](https://velog.io/@gmtmoney2357/%EC%8A%A4%ED%94%84%EB%A7%81-%EB%B6%80%ED%8A%B8-%EC%8A%A4%ED%94%84%EB%A7%81-AOP-%ED%8F%AC%EC%9D%B8%ED%8A%B8%EC%BB%B7-%EC%A7%80%EC%8B%9C%EC%9E%90)