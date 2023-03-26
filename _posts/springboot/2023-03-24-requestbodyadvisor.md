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

## RequestBodyAdvice를 상속받아 구현 
Http 요청을 했을 때 body 데이터를 제어하고자 할 떄 RequestBodyAdvice를 상속받아 아래와 같이 3개의 Method를 구현해야 합니다.  
- public boolean supports(MethodParameter methodParameter, Type targetType, Class<? extends HttpMessageConverter<?>> converterType)
- public HttpInputMessage beforeBodyRead(HttpInputMessage inputMessage, MethodParameter parameter, Type targetType, Class<? extends HttpMessageConverter<?>> converterType) throws IOException
- public Object afterBodyRead(Object body, HttpInputMessage inputMessage, MethodParameter parameter, Type targetType, Class<? extends HttpMessageConverter<?>> converterType)


supports에서는 대상 Controller나 대상 Parameter Type에 따라 대상을 선택할 수 있습니다. 
beforeBodyRead 는 Http Body를 읽기전에 처리하거나 afterBodyRead 는 Http Body를 읽은후에 처리합니다.  
beforeBodyRead에서는 inputMessage의 getHeader와 getBody를 읽어서와 원하는 작업을 할 수 있수 있습니다.
afterBodyRead는  Controller의 Input Type을 body로 넘어오며 그것을 가공할 수 있습니다.

##  RequestBodyAdvice - 예시 
아래의 예제는 RequestBodyAdvice를 구현한 DecryptRequestBodyAdvice입니다.  

```java
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Type;
import java.nio.charset.StandardCharsets;

import org.springframework.core.MethodParameter;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpInputMessage;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.RequestBodyAdvice;

import com.demo.microservices.controller.UserController;
import com.demo.microservices.util.AESUtil;
import com.demo.microservices.util.IOUtils;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
public class DecryptRequestBodyController implements RequestBodyAdvice {
	private String decodingBody;
	private byte[] rawData;

	@Override
	public boolean supports(MethodParameter methodParameter, Type targetType,
			Class<? extends HttpMessageConverter<?>> converterType) {
		log.info("------------ DecryptRequestBodyController ------------ ");
		log.info("supports:{}", methodParameter.getContainingClass().equals(UserController.class));
		return methodParameter.getContainingClass().equals(UserController.class);
	}

	@Override
	public HttpInputMessage beforeBodyRead(HttpInputMessage inputMessage, MethodParameter parameter, Type targetType,
			Class<? extends HttpMessageConverter<?>> converterType) throws IOException {
		log.info("------------ beforeBodyRead ------------ ");

		HttpHeaders headers = inputMessage.getHeaders();
		AESUtil aesUtil = new AESUtil();

		try {
			InputStream inputStream = inputMessage.getBody();
			rawData = IOUtils.toByteArray(inputStream);
			decodingBody = aesUtil.decrypt(new String(rawData, StandardCharsets.UTF_8));
			log.info("decodingBody:{}", decodingBody);
		} catch (IOException e) {
			e.printStackTrace();
		}

		return new DecodeHttpInputMessage(headers, new ByteArrayInputStream(decodingBody.getBytes()));
	}

	@Override
	public Object afterBodyRead(Object body, HttpInputMessage inputMessage, MethodParameter parameter, Type targetType,
			Class<? extends HttpMessageConverter<?>> converterType) {
		log.info("------------ afterBodyRead ------------ ");
		log.info("body:{}", body);
		return body;
	}

	@Override
	public Object handleEmptyBody(Object body, HttpInputMessage inputMessage, MethodParameter parameter,
			Type targetType, Class<? extends HttpMessageConverter<?>> converterType) {
		log.info("handleEmptyBody ", targetType);
		log.info("body:{}", body);
		log.info("targetType:{}", targetType);
		return body;
	}
}
```