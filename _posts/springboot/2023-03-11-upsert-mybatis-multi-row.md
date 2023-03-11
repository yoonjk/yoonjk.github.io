---
title: Mybatis에 멀티 로우 insert or update
categories:
  - springboot
tags: 
  - mybatis
---

## Mybatis 한번에 여러건 Insert or Update
Mybatis에서 한번에 여러건의 데이터를 insert 또는 update하기 기능을 Mybatis는 이를 지원하고 있다.
이 기능을 이용하여 약간의 성능에 도움을 받을 수 있습니다.  

Mybatis에서 여러건의 데이터를 Insert or Update 예제입니다.  

- 다음은 Controller 입니다.  

```java

@Slf4j
@RestController
public class HelloController {
	@Autowired
	private SampleUserDao sampleUserDao;

	@ApiOperation(value="bulkload")
	@PostMapping(value="/users/bulkload")
	public ResponseEntity <?> bulkloadUser(@RequestBody List<SampleUser> userList) {
		try {
			sampleUserDao.bulkloadUsers(userList);
		} catch(Exception e) {
			throw new RuntimeException(e);
		}

		return Response.ok("Success");
	}
}
```

- 다음은 Mapper 입니다.  
  
```java
@Mapper
public interface SampleUserDao {	
	
	/**
	 * 사용자 목록을 입력받아 bulkload합니다.
	 * @return
	 * @throws Exception
	 */
	int bulkloadUsers(List<SampleUser> userList) throws Exception;
}
```

- 다음은 VO(Value Object) 입니다.

```java
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SampleUser {
	 private String  userId 		; // 사용자 ID
	 private String  userNm 		; // 사용자 이름
	 private String  addr 		    ; // 주소 
	 private String  cellPhone 	    ; // 핸드폰 
	 private String  agreeInform    ; // 고객정보 동의 여부 
	 private String  birthDt 	    ; // 생년 월일 
}

```


다음의 그 Mybatis Mapper 파일 예제입니다.  

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.demo.microservices.dao.SampleUserDao">
	<insert id="bulkloadUsers" parameterType="list">
		insert into tb_user00 (
		    user_id,
		    user_nm,
		    addr,
		    cell_phone,
		    agree_inform,
		    birth_dt
		) values 
	  foreach collection="list" item="item" separator=",">
		(
			  #{item.userId},
			  #{item.userNm},
			  #{item.addr},
			  #{item.cellPhone},
			  #{item.agreeInform},
			  #{item.birthDt}
		)
		</foreach> 	
		on duplicate key update 
		    user_nm = values(user_nm),
		    addr = values(addr),
		    cell_phone = values(cell_phone),
		    agree_inform = values(agree_inform),
		    birth_dt = values(birth_dt)
	</insert>
</mapper>
```

