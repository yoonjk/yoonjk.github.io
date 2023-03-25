---
title: ArgumentResolver
categories:
  - springboot
tags: 
  - Resolver
---

## ArgumentResolver
  Http Request를 제어 또는 가공(Decrpt)할 수 있는 또 하나의 영역중 하나가 바로 ArgumentResolver 입니다.
  ArgumentRoslver는 Request 데이터를 가공하여 Constroller에 전달하고 싶을 때 사용합니다.
  제어할 때상으로는 아래와 같은 유형을 대상으로 ArgumentResolver를 적용할 수 있습니다.  

- 적용대상 Controller
- Annotation 이용
- Argument Type 등

![filter interceptor aop]({{ "/assets/images/springboot/04-spring-filter-interceptor-aop-resolver-advice.png" }})

## HandlerMethodArgumentResolver 상속하여 구현
ArgumentResolver를 이용하여 Http 요청의 데이터를 가공하고 싶을 때는 HandlerMethodArgumentResolver 상속받아 구현하면 됩니다. HandlerMethodArgumentResolver는 아래의 2개의 Method를 구현해야 합니다.  

  - public boolean supportsParameter(MethodParameter parameter)
  - public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
			NativeWebRequest webReq터est, WebDataBinderFactory binderFactory) throws Exception  

첫번째는 ArgumentResolver를 적용할 대상을 선정하는 부분입니다. 여기에서 대상 Controller나 Annotation인 경우 return 을 true로 반환하면 resolveArgument 가 실행되어 webRequest에서 데이터를 읽어서 원하는 형식의 데이터를 만들어 반환하면 됩니다.  

  ## 예시 

```java
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import com.demo.microservices.annotation.Decrypted;
import com.demo.microservices.util.AESUtil;
import com.demo.microservices.util.IOUtils;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class DecryptArgumentResolver implements HandlerMethodArgumentResolver {
	

	@Override
	public boolean supportsParameter(MethodParameter parameter) {
		log.info("supportsParameter:{}", parameter.getContainingClass());
        return parameter.hasParameterAnnotation(Decrypted.class) &&
        		parameter.getParameterType().equals(Map.class);
	}

	@Override
	public Map resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
			NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
		ObjectMapper objectMapper = new ObjectMapper();
		HttpServletRequest request = (HttpServletRequest) webRequest.getNativeRequest();
		byte[] rawData = null;
		String decodingBody;
		Map reqMap = null;
		
        try {
        	log.info("decodingBody:");
            InputStream inputStream = request.getInputStream();
            rawData = IOUtils.toByteArray(inputStream);
            log.info("rawData:{}", rawData);
            AESUtil aesUtil = new AESUtil();
            decodingBody = aesUtil.decrypt(new String(rawData, StandardCharsets.UTF_8));
            reqMap = objectMapper.readValue(decodingBody, Map.class);
            log.info("decodingBody:{}", decodingBody);
        } catch (Exception e) {
            e.printStackTrace();
        }
		return reqMap;
	}
}
```

