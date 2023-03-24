---
title: 인터셉터(Interceptor) 란?
categories:
  - springboot
tags: 
  - Interceptor
---

## 인터셉터의 이해
인터셉터는 "무엇인가를 가로챈다"라는 의미입니다. Filter가 실행된 이후 인터셉터는 Controller가 호출 전/후에 무엇인가 제어 하고자할 때 사용합니다. 그리고 Filter가 WebContainer에서 동작하는 반면에 인터셉터는 Spring Container에서 동작하는 차이점이 있습니다.
대표적인 사용 목적은 logging과 인증처리에 많이 사용합니다.

![filter interceptor aop]({{ "/assets/images/springboot/04-spring-filter-interceptor-aop-resolver-advice.png" }})

## HandlerInterceptor를 구현
- preHandle
- postHandle
- afterCompletion

#### preHandle
Controller의 메서드에 매핑된 특정 URI가 호출됐을 때 실행되는 메서드로, Controller를 경유(접근)하기 직전에 실행되는 메서드입니다.  
Controller를 호출하기전에 동작하는 메소드로 return값이 true이면 진행, false이면 Controller 호출을 중단합니다  

#### postHandle
컨트롤러를 호출 후, 즉 화면(View)으로 결과를 전달하기 전에 실행되는 메서드입니다. 

#### afterCompletion
view가 정상적으로 랜더링된 후에 마지막에 실행됩니다

#### 인록셉터 를 사용하기 위해 클래스를 빈(Bean)으로 등록
인록셉터 사용하기 먼저 HandlerInterceptor를 상속받아 구현합니다.  
구현하는 Method는 위에 3가지 Method이며, Bean으로 등록하기 위해 구현한 클래스에 @Component 어노테이션을 추가합니다.  

## 인록셉터 InterceptorRegistry에 등록
HandlerInterceptor를 구현 후 WebMvcConfigurer를 상속받아 구현 WebMvcConfigure의 addInterceptors에 등록하고, 
Uri PathPattern을 지정하여 어떤 Uri가 호출될 때 인터셉터를 동학하게 할지 설정합니다.

