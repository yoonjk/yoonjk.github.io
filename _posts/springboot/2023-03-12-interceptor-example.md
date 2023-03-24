---
title: 인터셉터(Interceptor) 예시
categories:
  - springboot
tags: 
  - Interceptor
---

## 인터셉터의 사용예시
HandlerInterceptor를 구현한 MyHandler 입니다.  
```java
@Component
@Slf4j
public class MyHandler implements HandlerInterceptor {
	public static final String LOG_ID = "logId";
	
	private void readBody(final HttpServletRequest request) {

		String reqBody = (String) request.getAttribute("requestBody");

		/*
		 * reqBody 값을 읽어 임의 처리.
		 */
		log.info("reqBody:{}", reqBody);
	}

	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		  log.info("----------------- preHandle -------------------");
	    String requestURI = request.getRequestURI();
	    String uuid = UUID.randomUUID().toString();
	    log.info("logId:{}", request.getAttribute(LOG_ID));
	    //request.setAttribute(LOG_ID, uuid);		

		  readBody(request);

      if (Objects.equals(request.getMethod(), "POST")) {
        log.info("req URL: " + request.getRequestURL());
      } else {

        log.info("req QueryString: " + request.getQueryString());
        log.info("req URL: " + request.getRequestURL());
      }	
		
		return true;
	}

	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			@Nullable ModelAndView modelAndView) throws Exception {
		log.info("postHandle [{}]", handler);
	}

	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler,
			@Nullable Exception ex) throws Exception {
		log.info("------------------------------------");
		log.info("afterCompletion");

    String requestURI = request.getRequestURI();
    String logId = (String)request.getAttribute(LOG_ID);
    log.info("RESPONSE logId:[{}][{}]", logId, requestURI);
    
    if (ex != null) {
      log.error("afterCompletion error!!", ex);
    }	
  
		log.info("------------------------------------");        
	}
}
```

MyHandler를 WebMvcConfigurer를 구현한  WebMvcConfigure에 등록하고 Uri PathPatttern을 지정합니다.

```java
@Slf4j
@RequiredArgsConstructor
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
	private final DecryptArgumentResolver decryptArgumentResolver;
	private final ResultReturnValueHandler resultReturnValueHandler;
	private final MyHandler myHandler;
	
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(myHandler)
			.addPathPatterns("/test/**");
	}
}
```