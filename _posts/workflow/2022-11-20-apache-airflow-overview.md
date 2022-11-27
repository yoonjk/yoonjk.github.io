---
title: Apache Airflow - 개요
categories:
  - workflow
tags: 
  - airflow
  - workflow
---

Airflow는 2014년 10월 Airbnb의 Maxime Beauchemin에 의해 시작되었다. 
첫 번째 커밋부터 오픈 소스였으며 공식적으로 Airbnb GitHub에 포함되었으며 2015년 6월에 발표되었습니다. 
이 프로젝트는 2016년 3월 Apache Software Foundation의 인큐베이터 프로그램에 합류했으며 재단은 2019년 1월 Apache Airflow를 최상위 프로젝트로 발표, 현재 아파치 재단에서 관리중인 오픈소스 프로젝트입니다. 

Airflow는 

- 워크플로를 작성, 예약 및 모니터링하는 플랫폼이며, 
- Workflow를 정의하고 실행, 
- 반복 된 작업을 자동화

하기 위해 사용합니다.

각 작업들은 DAG(Directed Acycle Graph)를 통해 구조화하며, 
DAG에 연결된 화살표 방향 순서대로 작업을 실행하고, 순차/병렬 실행이 가능합니다.
Airflow는 일정 시간 단위마다 주기적으로 실행하는 스케줄링 기능을 지원합니다.
또한 Backfill 이라는 과거 특정시점부터 현재까지 작업을 처리하는 것도 지원합니다.

