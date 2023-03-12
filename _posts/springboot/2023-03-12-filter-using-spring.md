---
title: Filter in springboot
categories:
  - springboot
tags: 
  - aop
  - filter
  - interceptor
---

## spring을 사용한 Filter
Springboot를 이용한 filter를 사용하는 방법입니다.
이전에 GlobalLoggingFilter에서 @Component를 제거하여 이중으로 Bean이 등록되는 것을 피하고, Springboot에서 제공하는 FilterRegistrationBean 사용하여 Bean으로 등록합니다.  

```java
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

```java
import javax.servlet.Filter;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.demo.microservices.filter.GlobalLoggingFilter;

@Configuration
public class WebConfig {
	@Bean
	public FilterRegistrationBean logFilter() {
		FilterRegistrationBean<Filter> filterRegistrationBean = new FilterRegistrationBean<>();
		filterRegistrationBean.setFilter(new GlobalLoggingFilter());
											
		return filterRegistrationBean;
	}
}
```