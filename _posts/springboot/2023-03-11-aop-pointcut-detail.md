---
title: AOP(Aspect Oriented Programming) PointCut 표현식
categories:
  - springboot
tags: 
  - aop
  - pointcut
---

## PointCut 의 표현식
**리턴타입  패키지경로  클래스지정  메소드지정**   


**예시)**
- execution(* com.demo.microservices..\*.\*Controller.\*(..))  
- execution(* com.demo.microservices..\*.\*Service.\*(..))  

**리턴타입** : 
- \* : 모든 리턴타입 허용
- void : 리턴타입이 void인 메소드 선택
- !void : 리턴타압이 void가 아닌 메소드 선택 

**패키지경로** : 
- com.demo.microservice : 지정한 패키지만 선택
- com.demo.microservices.. : 지정한 패턴의 모든패키지 선택
- com.demo.microservices..controller : 마지막 패키지 이름이 controller로 끝나는 패키지 선택

**클래스지정**
- UserController : 지정한 클래스만 선택
- *Controller : 이정한 패턴으로 시작하는 클래스 선택
- Controller+ : 지정한 클래로 파생된 모든 자식 클래스를 선택. 또는 인터페이스로 구현한 모든 클래스

**메소드** 
- \*(..) : 모든 메소드 선택 
- update*(..) : 메소드명이 update로 시작하는 모든 메소드 선택 

**매개변수 지정**
- (..) : 모든 매개변수
- (*) : 반드시 1개의 매개변수를 가지는 메소드
- (com.demo.microservices.model.UserVO) : 매개변수로 UserVO 를 가지는 메소드만 선택
- (!om.demo.microservices.model.UserVO) : 매개변수로 UserVO 를 가지지 않는 메소드를 선택
- (Integer, ..) : 1개 이상의 매개변수를 가지고, 첫번째 매개변수 타입이 Integer인 메소드만 선택
- (Integer, *) : 반드시 2개의 매개변수를 가지고, 첫번째 타입이 Integer인 메소드만 선택 


## 참조
[빨간색코딩](https://sjh836.tistory.com/157)  
[어느 개발자의 한적한 공간](http://closer27.github.io/backend/2017/08/03/spring-aop/)