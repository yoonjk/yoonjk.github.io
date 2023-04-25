---
title: Redis 시작하기 - Lua 에서 return String, List, JSON 형식으로 받기. 
categories:
  - cache
tags: 
  - redis
  - Lua
---

Springboot Lettuce기반 Lua를 호출하여 결과값을 List 받는 방법을 공유합니다.
Lua를 를 이용해서 Boolean, Long 타입은 별다른 어려움없이 응답을 받을 수 있습니다. 그러나 String이나 List같은 경우는 RedisTemplate 기본 설정으로는 결과를 받을 수 없고 다음과 같은 오류를 만나게 될 것입니다. 이것은 GenericJackson2JsonRedisSerializer에서 byte[]를 deserialization을 하지 못해서 발생하는 에러입니다.

```bash
com.fasterxml.jackson.core.JsonParseException: Unrecognized token 'test': was expecting (JSON String, Number, Array, Object or token 'null', 'true' or 'false')
 at [Source: (byte[])"test"; line: 1, column: 5]
	at com.fasterxml.jackson.core.JsonParser._constructError(JsonParser.java:2391) ~[jackson-core-2.13.5.jar!/:2.13.5]
```

그래서 다음과 같은 방법으로 해결이 가능하며, Lua를 통해서 JSON, String, List등을 반환값으로 받을 수 있습니다.

* GenericJackson2JsonRedisSerializer에서 extends 
* deserialize를 overriding
  
GenericJackson2JsonRedisSerializer를 extention하여 overriding하는 소는 다음과 같습니다. GenericJackson2JsonRedisSerializer를 CustomJackson2JsonRedisSerializer로 변경하면 Lua에서 반환값을 다양하게 받을 수 있습니다.

```java
import java.util.Objects;

import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.SerializationException;
import org.springframework.lang.Nullable;
import org.springframework.util.Assert;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class CustomJackson2JsonRedisSerializer extends GenericJackson2JsonRedisSerializer {
	ObjectMapper objectMapper = new ObjectMapper();
	/**
	 * @param source can be {@literal null}.
	 * @param type must not be {@literal null}.
	 * @return {@literal null} for empty source.
	 * @throws SerializationException
	 */
	@Nullable
	public <T> T deserialize(@Nullable byte[] source, Class<T> type) throws SerializationException {
		T clazz = null;
		try {
			
			Assert.notNull(type,
					"Deserialization type must not be null! Please provide Object.class to make use of Jackson2 default typing.");

			if (Objects.isNull(source)) {
				return null;
			}

			log.info("Source:{}, class:{}", new String(source), type);
			clazz = objectMapper.readValue(new String(source), type);
			return clazz;
		} catch (Exception ex) {
			throw new SerializationException("Could not read JSON: " + ex.getMessage(), ex);
		}
	}
}
```
#### leaderboard Lua
Lua 예제는 다음과 같습니다.
```lua
-- leaderboard.lua 
local rank = redis.call('zrank', KEYS[1], KEYS[2])
local min = math.max(rank - ARGV[1], 0)
local max = rank + ARGV[1]
local ldb = redis.call('zrange', KEYS[1], min, max)
local results = {}

results['rank'] = tostring(rank + 1)
results['item'] = ldb

local vars = cjson.encode(results)

return vars
```

#### redis에 적용하기 
```bash
cat leaderboard.lua | redis-cli -x script load
"60e0429ac3aed8dbb3abfeb4fb2d13dde103d575"

 127.0.0.1:6379> evalsha "60e0429ac3aed8dbb3abfeb4fb2d13dde103d575" 2 leaderboard Heather 3
"{\"item\":[\"Andy\",\"Dolly\",\"Cathy\",\"Heather\",\"Gilbert\",\"Lilly\",\"Dinesh\"],\"rank\":\"6\"}"
```
#### RedisTemplate & Lettuce를 이용

```java
    public Object retrieveLeaderBoard(LeaderBoardReqVO leaderBoardReqVO) {
    	DefaultRedisScript<Object> redisScript = new DefaultRedisScript<>();
    	Resource resource = new ClassPathResource(leaderBoard);
    	redisScript.setScriptSource(new ResourceScriptSource(resource));
    	redisScript.setResultType(Object.class);
    	log.info("retrieveLeaderBoard:{}", leaderBoardReqVO);
    	Object[] args = new Object[] {leaderBoardReqVO.getUser()};
    	Object ret = redisTemplate.execute(redisScript,  Arrays.asList(leaderBoardReqVO.getKey(), leaderBoardReqVO.getUser()), leaderBoardReqVO.getCount());
    	
    	log.info("retrieveLeaderBoard ret:{}", ret);
    	
    	return ret;
    }
```

## Swagger UI에서 호출

![m1s1-r1s2-r3s3]({{ "/assets/images/cache/31-cache-leaderboard-swagger.png" }}) 

[수행결과과]  
![m1s1-r1s2-r3s3]({{ "/assets/images/cache/32-cache-result-leaderboard.png" }}) 