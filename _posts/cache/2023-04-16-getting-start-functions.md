---
title:  Redis 시작하기 - Redis Functions 시작하기
categories:
  - cache 
tags:
  - redis
  - lua
---

## Redis Functions
Redis 버전 7.0에 추가된 가장 영향력 있는 기능은 모듈성, 재사용성 및 전반적인 개발자 환경 개선을  통해 스크립트를 개선하는 새로운 프로그래밍 옵션  인 Redis Functions입니다.  

함수는 스크립트와 달리 .rdb 및 .aof 파일에 유지될 뿐만 아니라 모든 복제본에 자동으로 복제되므로 Redis의 일부 모듈이 됩니다.
Redis는 여러 실행 엔진을 지원할 수 있으므로 향후 릴리스 중 하나에서 Lua, Javascript 및 기타 언어로 Redis 함수를 작성할 수 있지만 현재(Redis v7.0) 지원되는 유일한 언어는 Lua입니다.  

개발자의 일반적인 고충은 논리 스키마를 통해 데이터 엔터티에 대한 일관된 보기를 유지하는 것입니다. Redis Functions는 이 문제를 해결하는 데 이상적으로 적합하며 이 자습서에서는 두 가지 기능이 있는 라이브러리를 만듭니다. 첫 번째는 자동으로 할 수 있는지 확인합니다.  해시 키에 대한 타임스탬프  _created_at 및 _updated_at 설정두 번째는  다른 요소를 변경하지 않고 단순히 _updated_at 타임스탬프를 업데이트하여 "터치" Unix 기능을 시뮬레이션합니다. 시작합시다!  

## Environment setup
먼저 Redis 7로 작업 환경을 설정해 보겠습니다. 운영 체제에 따라 아래 가이드의 설치 지침을 따를 수 있습니다:
* [Install Redis from Source](https://redis.io/docs/getting-started/installation/install-redis-from-source/)
* [Install Redis on Linux](https://redis.io/docs/getting-started/installation/install-redis-on-linux/)
* [Install Redis on macOS](https://redis.io/docs/getting-started/installation/install-redis-on-mac-os/)
* [Install Redis on Windows](https://redis.io/docs/getting-started/installation/install-redis-on-windows/)  

또는 Redis Stack을 사용하여 Docker 컨테이너를 스핀업할 수 있습니다:
```bash
mkdir data
docker run -p 6379:6379 --name redis-7.0 -it  -v $PWD/data:/data redis/redis-stack:7.0.0-RC4
```
NOTE
이 자습서의 나머지 부분에서는 $ 문자를 사용하여 명령 프롬프트에서 명령을 실행해야 함을 나타내고> redis-cli를 사용하여  redis-cli 프롬프트에 대해 동일한 명령을 나타냅니다.
Warm-Up
이제 Redis 서버가 실행 중이므로 mylib.lua라는 파일을 만들고  그 안에 명령줄에 매개 변수로 전달하는 키와 인수를 수신하는 hset이라는 함수를 만들  수 있습니다.
Redis의 함수는 항상 라이브러리의 일부이며 단일 라이브러리에는 여러 함수가 있을 수 있습니다.
우선 "Hello Redis 7.0"을 반환하는 간단한 함수를 만들어 data 폴더에 mylib.lua 파일을 저장합니다.
```bash
#!lua name=mylib

local function hset(keys, args)
   return "Hello Redis 7.0"
end
```
첫 번째 줄은 Lua 엔진을 사용하여 이 함수를 실행하고 해당 이름을 mylib로 지정합니다. 이름은 라이브러리 식별자이며 업데이트해야 할 때마다 사용합니다.
다음으로 Functions API를 통해 액세스할 수 있도록 이 함수를 등록해야 합니다. 등록에서 함수 hset을 my_hset라는  이름으로 호출할 수  있도록 지정합니다.:
```bash
redis.register_function('my_hset', hset)
```
지금까지의 전체 코드는 다음과 같습니다.
```bash
#!lua name=mylib
local function hset(keys, args)
   return "Hello Redis 7.0"
end

redis.register_function('my_hset', hset)
```

명령줄에서 함수를 호출하려면 먼저 Redis 서버에 로드하고 등록해야 합니다:
```bash
cat /path/to/mylib.lua | redis-cli -x FUNCTION LOAD
```

docker 기반인 경우 다음과 같이 실행합니다 
```bash
docker exec -it redis-7.0 bash
# data
cd /data
cat /path/to/mylib.lua | redis-cli -x FUNCTION LOAD
```

마지막으로 등록한 함수를 실행해 보겠습니다:
```bash
redis-cli> FCALL my_hset 1 foo
```
