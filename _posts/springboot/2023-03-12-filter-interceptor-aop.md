---
title: AOP vs Interceptor vs Filter - Filter
categories:
  - springboot
tags: 
  - aop
  - filter
  - interceptor
---

## AOP vs Interceptor vs Filter
AOP 를 내용을 살펴보면 Interceptor 와 Filter에 대해 궁금해질 것입니다. 
AOP와 Interceptor, Filter의 역할에 대해 간략하게 알아보기 위해 아래의 그램으로 표현하였습니다.

![filter interceptor aop]({{ "/assets/images/springboot/04-spring-filter-interceptor-aop.png" }})

## Filter 란?
필터는 J2EE 표준 스펙으로 서블릿에 요청이 전달되기 전/후에 url 패턴에 맞는 모든 요청에 대해 원하는 처리를 할 수 있는 기능을 제공합니다. DispatcherServlet 앞단에서 처리되기 때문에 springframework 앞에서 처리가 되는 것입니다. 
필터를 추가하기 위해서는 Filter 인터페이스를 구현해야 하며 다음의 3가지 메소드를 overriding할 수 있습니다.

- init 메소드
- doFilter 메소드 
- destory 메소드 
  
#### init 메소드 
컨텡이너가 1회 init 메소드를 호출하여 필터 객체를 초기화 하는 역할입니다.

#### doFilter 메소드 
doFilter는 원하는 filter 기능을 구현하는 영역으로 url pattern에 맞는 모든 http 요청을 중간에 capture하여 DispatchServlet에 전달되기전에 웹 컨네이터에 의해 실행되는 메소드입니다.
FilterChain 파라미터는 FilterChain의 doFilter를 통해 다음 대상으로ㅗ 요청을 전달합니다.

#### dstory 메소드 
destory 메소드는 필터 객체를 서비스에서 제거하고 사용하는 자원을 반환하기 위한 메소드입니다. 이 또한 웹컨테이너에 의해 1회 호출되는 메소드입니다.  

## Filter 사용하기
Servlet에서 제공하는 Filter Interface를 구현 예제입니다.  
 ```java
import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.web.util.ContentCachingRequestWrapper;
import org.springframework.web.util.ContentCachingResponseWrapper;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class GlobalLoggingFilter implements Filter {
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
        log.info("-------------------전 처리-------------------");
        ContentCachingRequestWrapper req = new ContentCachingRequestWrapper((HttpServletRequest) request);
        ContentCachingResponseWrapper res = new ContentCachingResponseWrapper((HttpServletResponse) response);

        // 전처리
        chain.doFilter(req, res);
        // 후처리

        String url = req.getRequestURI();
        String reqContent = new String(req.getContentAsByteArray());
        log.info("request url : {}, request body : {}", url, reqContent);
        
        String resContent = new String(res.getContentAsByteArray());
        int httpStatus = res.getStatus();
        log.info("response status : {}, response body : {}", httpStatus, resContent);
        
        log.info("-------------------후 처리-------------------");
	}
}
```

## 참조 
  [망나니개발자](https://mangkyu.tistory.com/173)