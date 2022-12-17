---
title: Airflow Hooks
categories:
  - workflow
tags: 
  - airflow

---

## Airflow Hooks
Hook은 DB나 서비스 같은 외부 시스템(Database, Storage)과 통신하기 위한 인터페이스를 제공하여 연결상태를 유지하여 작업을 처리하기 위해 사용합니다.
Apache Airflow의 Hook에서csv to db를 또는 db to csv 작업을 할 때 대표적인 Hook은 다음과 같은 것이 있습니다.

-	PostgresHook
-	MySqlHook
-	S3
-	HDFS

## Apache Airflow Hooks를 실행하는 방법? 

Airflow Hook을 다음의 4단계로 작성합니다 . 

- Prepare your PostgreSQL Environment 
- Create a CSV file using the format
- PostgreSQL 연결 설정 정보 작성 
- Airflow PostgresHook DAG 작성 
    
Airflow가 제공 한 PostgreSQL Hooks를 사용하여 테이블의 내용을 CSV 파일로 추출합니다. 

우선 PostgreSQL에서 테이블을 만들고 일부 데이터를 로드 합니다. 이렇게 하려면 PSQL 쉘로 가서 아래 명령을 실행합니다. 

그리고 PostgresHook을 처리하는 DAG을 작성합니다.

#### Prepare your PostgreSQL Environment

우선 PostgreSQL에서 테이블을 만들고 일부 데이터를로드 해야합니다. 이렇게 하려면 PSQL 쉘에서  아래 명령을 실행합니다.

```sql
CREATE TABLE customer(
  id serial,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email VARCHAR(50)
);
```

여기에서는 4 개의 열 ID, First_Name, Last_name 및 email 이 있는 고객 테이블을 작성하고 있습니다

#### Create a CSV file using the format 

```
serial,first_name,last_name,email
1,john,michael,john@gmail.com
2,mary,cooper,mcooper@gmail.com
3,sheldon,cooper,scopper@gmail.com
4,john,michael,john@gmail.com
5,mary,cooper,mcooper@gmail.com
6,sheldon,cooper,scopper@gmail.com
```

COPY CSV to POD into customer table

Kubernetes 환경인 경우 다음과 같이 customer.csv파일을 복사합니다.
POD에 customer.csv 파일을 복사합니다.

- POSTGRES_POD=$(kubectl get pods -o jsonpath='{.items[0].metadata.name}')
- kubectl cp customer.csv $POSTGRES_POD:/tmp 
- kubectl exec -it $POSTGRESPOD -- bash 

postgres에 접속합니다.

psql -U postgres

COPY customer FROM '/tmp/customer.csv' DELIMITER ',' CSV HEADER;

#### PostgreSQL 연결 설정 정보 작성

Airflow UI에서 Admin > Connections 메뉴를 선택하고, Connection Type이 Postgres를 선택하고 Postgres 접속정보를 입력하고 저장합니다.

| Key | Value |
|---|---|
|Connection Type :| Postgres |
|Host   | ip address |
|Schema | database |
|Login  | postgres account |
|Password | postgres password |
|Port | postgres port |

<figure style="width: 100%" class="align-left">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/09-hooks-postgres-conn.png" alt="">
  <figcaption></figcaption>
</figure> 

#### Airflow PostgresHook DAG 작성 

PostgresHook을 다음과 같이 구현하고 테스트합니다

성공적으로 실행되면 파일 저장을 위해 구성된 디렉토리로 이동하면 출력 CSV 파일을 찾을 수 있습니다

```python
from airflow import DAG 
from airflow.operators.python import PythonOperator
from airflow.operators.empty import EmptyOperator
from airflow.providers.postgres.hooks.postgres import PostgresHook 

from airflow.utils.dates import days_ago 
from datetime import timedelta 

import logging 

default_args = {
  'start_date': days_ago(1),
  'retries': 1,
  'retry_delay': timedelta(minutes=5),
  'schedule_interval': '@daily',
  'catchup': False
}

POSTGRES_CONN_ID ='postgres-conn'

def export_db_to_csv(sql):
  pg_hook = PostgresHook.get_hook(POSTGRES_CONN_ID)
  logging.info('Exporting query to file:{}'.format(sql))
  pg_hook.copy_expert(sql, filename='/opt/airflow/data/customer.csv')
  
with DAG(
  dag_id = 'postgres-hook-db-to-csv',
  default_args = default_args,
  tags=['training']
) as dag: 
  start = EmptyOperator(task_id='start')
  end = EmptyOperator(task_id='end') 
  export_task = PythonOperator(
    task_id = 'export-task',
    python_callable=export_db_to_csv,
    op_kwargs = {
      'sql': "COPY (SELECT * FROM CUSTOMER WHERE first_name = 'john' ) TO STDOUT WITH CSV HEADER"
    }
  )
  
  start >> export_task >> end 
  ```

