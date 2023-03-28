---
title: Controller에서 응답을 암호화하여 내보내기 - ResponseBodyAdvice
categories:
  - springboot
tags: 
  - Advice
---

## ResponseBodyAdvice 
  Http Response를 제어 또는 가공(Decrpt)할 수 있는 또 하나의 영역중 하나가 바로를 ReponseBodyAdvice 입니다.
  ReturnValueHandler는 RestController에는 적용할 수 없습니다. RequestBodyAdvice는 그러한 제약사항이 없습니다.
  적용하는 방법은 RequestBodyAdvice와 유사합니다.

![filter interceptor aop]({{ "/assets/images/springboot/04-spring-filter-interceptor-aop-resolver-advice.png" }})

## ResponseBodyAdvice를 상속받아 구현 
Http 요청을 했을 때 body 데이터를 제어하고자 할 떄 RequestBodyAdvice를 상속받아 아래와 같이 3개의 Method를 구현해야 합니다.  
- public boolean supports(...)
- public Object beforeBodyWrite(...)


supports에서는 대상 Controller나 대상 Parameter Type에 따라 대상을 선택할 수 있습니다. 
beforeBodyWrite 는 사용자 Controller에서 받은 return 값을 가공할 수 있는 영역입니다.
선택된 converter를 이용하여 json으로 변환하기 직전에 호출되는 것이다.  
사용하는 주요 용도로 아래와 같이  
- 로깅
- Decrypt

로 사용할 수 있는 영역입니다. 다음 예제는 ResponseBodyAdvice를 Decrypt 로 사용하고 있습니다.  

##  ResponseBodyAdvice를 - 예시 
아래의 예제는 ResponseBodyAdvice를 구현한 EncryptResponseBodyAdvice입니다.  

```java
import java.nio.charset.StandardCharsets;

import org.springframework.core.MethodParameter;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

import com.demo.microservices.controller.UserController;
import com.demo.microservices.util.AESUtil;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
public class EncryptAdviceController implements ResponseBodyAdvice<Object>{
	/**
	 * Whether this component supports the given controller method return type
	 * and the selected {@code HttpMessageConverter} type.
	 * @param returnType the return type
	 * @param converterType the selected converter type
	 * @return {@code true} if {@link #beforeBodyWrite} should be invoked;
	 * {@code false} otherwise
	 */
	public boolean supports(MethodParameter returnType, Class<? extends HttpMessageConverter<?>> converterType) {
		log.info("------------ beforeBodyRead ------------ ");
		log.info("------------ supports");
		return returnType.getContainingClass().equals(UserController.class);
	}

	/**
	 * Invoked after an {@code HttpMessageConverter} is selected and just before
	 * its write method is invoked.
	 * @param body the body to be written
	 * @param returnType the return type of the controller method
	 * @param selectedContentType the content type selected through content negotiation
	 * @param selectedConverterType the converter type selected to write to the response
	 * @param request the current request
	 * @param response the current response
	 * @return the body that was passed in or a modified (possibly new) instance
	 */
	@Nullable
	public Object beforeBodyWrite(@Nullable Object body, MethodParameter returnType, MediaType selectedContentType,
			Class<? extends HttpMessageConverter<?>> selectedConverterType,
			ServerHttpRequest request, ServerHttpResponse response) {
		ObjectMapper objectMapper = new ObjectMapper();
		String responseMessage = null;
    AESUtil aesUtil = new AESUtil();
        
		try {
			responseMessage = objectMapper.writeValueAsString(body);
	    byte[] encRawData = aesUtil.encrypt(responseMessage).getBytes(StandardCharsets.UTF_8);
	    response.getBody().write(encRawData);
	    log.info("encData:{}", new String(encRawData));
	    log.info("orgBody:{}",body);
		} catch (Exception e) {
			throw new RuntimeException();
		}
		
    return null;
	}
}
```