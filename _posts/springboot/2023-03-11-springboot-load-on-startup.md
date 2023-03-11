---
title: load-on-startup
categories:
  - springboot
tags: 
  - load-on-startup
---

## load-on-startup
Springboot 시작시 첫 호출이 느린 경우 application.yml에 해당 내용 추가 합니다.  

application.yml 파일입니다.  
```yaml
spring:
  mvc:
    servlet:
      load-on-startup: 1
```
