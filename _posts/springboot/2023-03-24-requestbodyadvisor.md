---
title: RequestBodyAdvice
categories:
  - springboot
tags: 
  - Advice
---

## RequestBodyAdvice
  Http Request를 제어 또는 가공(Decrpt)할 수 있는 또 하나의 영역중 하나가 바로 RequestBodyAdvice 입니다.
  ArgumentRoslver는 RestController에는 약간의 제약사항이 있으나 RequestBodyAdvice는 그러한 제약사항이 없습니다.
  적용하는 방법은 ArgumentResolver와 유사하자 좀더 상세하고 제어가 가능합니다.  

![filter interceptor aop]({{ "/assets/images/springboot/04-spring-filter-interceptor-aop-resolver-advice.png" }})

