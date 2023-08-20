---
title: Quickstart Iceberg with Spark and Docker Compose
categories:
  - watson
tags: 
  - iceberg
---

Apache Iceberg는 대규모(페타바이트) 분석 데이터 세트를 위한 오픈 테이블 형식(데이터 파일을 구성하는 방법)입니다. 넷플릭스에서 만들었으며 ASF에서 오픈 소스화되었습니다. Netflix, Apple 및 기타 여러 회사에서 광범위하게 사용되고 있습니다. Tabular.io는 Apache Iceberg 테이블을 기반으로 합니다. Dremio.com Arctic은 아파치 아이스버그용으로 구축되었습니다.  

두 가지 구성 요소로 구성된 오픈 테이블 형식입니다:

- 메타데이터 파일(메타데이터 파일, 매니페스트 목록 파일, 매니페스트 파일)
데이터 파일(데이터 자체)  
- 가장 널리 사용되는 쿼리 엔진 또는 프레임워크는 Apache Spark이며 다른 쿼리 엔진으로는 Snowflake, Trino, Starburst, 
  ... 등이 있습니다.  

## 다음 단계: Iceberg, 스파크 시작
Apache Iceberg를 사용해 볼 수 있는 방법은 여러 가지가 있습니다. 클라우드를 선호하는 경우, 호스팅된 Tabular.io를 사용해 볼 수 있습니다.  

저는 docker-compose.yml을 사용하겠습니다.  

```bash
git clone https://github.com/tabular-io/docker-spark-iceberg
cd docker-spark-iceberg
docker-compose up -d 
```

새 터미널 창을 열고 spark-sql 프롬프트로 이동합니다.  

```bash
% docker exec -it spark-iceberg spark-sql
...
Spark master: local[*], Application Id: local-1682287035887
spark-sql>
```
테이블 생성  
```bash
spark-sql> CREATE TABLE demo.nyc.taxis
         > (
         >   vendor_id bigint,
         >   trip_id bigint,
         >   trip_distance float,
         >   fare_amount double,
         >   store_and_fwd_flag string
         > )
         > PARTITIONED BY (vendor_id);
```
데이터 등록  
```bash
park-sql> INSERT INTO demo.nyc.taxis
         > VALUES (1, 1000371, 1.8, 15.32, 'N'), (2, 1000372, 2.5, 22.15, 'N'), (2, 1000373, 0.9, 9.01, 'N'), (1, 1000374, 8.4, 42.13, 'Y');
```

데이터 조회  
```bash
spark-sql> SELECT * FROM demo.nyc.taxis;
1 1000371 1.8 15.32 N
1 1000374 8.4 42.13 Y
2 1000372 2.5 22.15 N
2 1000373 0.9 9.01 N
Time taken: 1.804 seconds, Fetched 4 row(s)
```

## 참조 
[Quickstart Iceberg with Spark and Docker Compose](https://medium.com/@sree_at_work/quickstart-iceberg-with-spark-and-docker-compose-3e7c068720f6)

