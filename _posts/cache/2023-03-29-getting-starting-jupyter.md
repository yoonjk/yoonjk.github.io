---
title: Redis 시작하기 - 파이썬 with Redis on Juypter
categories:
  - cache
tags: 
  - redis
  - jupyter
---
Jupyter Notebook을 환경에서 Python을 이용하여 Redis를 알아봅니다. redis-py를 이용하여 redis를 연결하고, 다음과 같이 데이터를 set/get을 수행하여 결과를 확인합니다.  
## Connect
```python
import redis

redisClient = redis.Redis(host='localhost', port=6379, decode_responses=True)

redisClient.set('foo', 'bar')
redisClient.get('foo')

redisClient.set('mykey', 'Hello from Python!')
value = redisClient.get('mykey')
print(value)

redisClient.zadd('vehicles', {'car' : 0})
redisClient.zadd('vehicles', {'bike' : 0})
vehicles = redisClient.zrange('vehicles', 0, -1)
```

![Jupyter log]({{ "/assets/images/cache/06-cache-get-set.png" }})


