---
title: Lua Script 및 Redis7 FUNCTION
categories:
  - cache 
tags:
  - redis
  - lua
---
Lua를 이용하여 Redis에 있는 데이터를 월별 합계를 계산하거나, from ~ to 기간을 입력받아 합계를 계산할 수 도 있습니다.

다음은 그 예시입니다.

## 초기 데이터 로드

```bash
127.0.0.1:6379> hmset SiteID:TotalCnt 20180101 10 20180102 2 20180103 5 20180120 10 20180131 30 20180205 20 20180210 5 20180331 23 20181230 1230 20190130 130 20190301 310 20200102 10 20200215 30 20200503 15 20200601 40 20200801 45 20200909 500 20201015 70 20201117 60 20201220 45 20220115 10 20220212 51 20220301 80 20220405 2 20220505 25 20220606 60 20220717 70 20220815 80 20220903 90 20221009 100 20221101 110 20221225 120 20230120 10 20230222 20 20230313 30 20230414 40 20230501 50"
```

## Lua script
#### 월별합계
```
-- summon.lua
local key, mon = KEYS[1], ARGV[1]
local subkey
local sumkey, keyval= 0

for i = 1,31 do
    if i < 10 then 
        subkey = mon .. '0' .. tostring(i)
    else 
        subkey = mon .. tostring(i)
    end

    keyval = tonumber(redis.call('hget',key,subkey))

    if keyval ~= nil then
        sumkey = sumkey + keyval
    end
end

return sumkey
```
#### lua FUNCTION days-of-month
Redis 7 부터 지원하는 FUNCTION을 이용하여 월별 마지막 달을 구하는 Redis FUNCTION 입니다.

```bash
#!lua name=mylib
-- get_days_in_month
local function get_days_in_month (keys, args)
  local year = tonumber(keys[1])
  local month = tonumber(args[1])
  local days_in_month= { 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 }
  local days = days_in_month[month]

  if (month == 2) then
    if (math.mod(year,4) == 0) then
      if (math.mod(year,100) == 0)then
        if (math.mod(year,400) == 0) then
          days = 29
        end
      else
        days = 29
     end
    end
  end

  return days
end

redis.register_function('get_days_in_month', get_days_in_month)
```

#### Redis FUNCTION 등록
```bash
cat day_of_month.lua | redis-cli -p 6383 -x FUNCTION LOAD REPLACE
```

#### Redis FUNCTION 호출
```bash
127.0.0.1:6383> FCALL get_days_in_month 1 2020 2
127.0.0.1:6383> FCALL get_days_in_month 1 2022 2
127.0.0.1:6383> FCALL get_days_in_month 1 2023 2
127.0.0.1:6383> FCALL get_days_in_month 1 2023 4
```

## 참조
[멋지게 놀아라](https://bstar36.tistory.com/348)  