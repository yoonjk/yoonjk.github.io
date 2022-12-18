---
title: Airflow Operator
categories:
  - workflow
tags: 
  - airflow

---

## Airflow Operator
DAG을 구성하는 작업을 Task라고 하며, DAG이 수행할 작업을 의미합니다. 한개 이상의 Task를 pipeline으로 연결해서 하나의 DAG을 완성해야 합니다.
Task에는 

-	Operator
-	Sensor
-	Hook

가 있습니다.  
Operator에서는 대표적인. Bash, Python, Empty 또는 이전버전 Dummy Operator가 있습니다. 
상세한 Operator 정보는 다음의 [링크](https://airflow.apache.org/docs/apache-airflow/2.2.3/operators-and-hooks-ref.html)를 참고하세요

<https://airflow.apache.org/docs/apache-airflow/2.2.3/operators-and-hooks-ref.html>

Operator는 

-	Action Operator 
-	Transfer Operator
-	Sensor Operator 

로 구분됩니다.   
Action Operator 는 작업을 수행하거나 다른 작업을 수행하도록 trigger합니다.  
Transfer Operator는 특정 시스템에 다른 시스템으로 데이터를 이동합니다.  
Sensor Operator는 특정 조건에 일치할 때 까지 기다렸다가, 만족되면 이후 과정을 진행하도록 기다려는 Operator. 

여기에서는 대표적인 Operator 를 알아보겠습니다.
-	EmptyOperator
-	BashOperator
-	PythonOperator

기외 주요 Operator는 다음과 같습니다.

| 구분 | 클래스 경로 |  설명 |
|---|---|---|
|BranchPythonOperator|airflow.operators.branch|파이션 실행결과에 따른 분기를 설정하는 Operator|
|TriggerDagRunOperator|airflow.operators.trigger_dagrun|지정한 dag을 실행 |
|ShortCircuitOperator|airflow.operators.python|bool 조건에 맞을 때만 실행 <br> bool 연산 로직은 python_callable로 전달|
|EmailOperator|airflow.operators.email|이메일 전송|


그외 operator들은 다음의 [링크](https://airflow.apache.org/docs/apache-airflow/2.2.3/_api/airflow/operators/index.html) 참고합니다.

<https://airflow.apache.org/docs/apache-airflow/2.2.3/_api/airflow/operators/index.html> 

Bash Operator 예제 

```python
from airflow import DAG  
from airflow.operators.bash import BashOperator 
from airflow.operators.empty import EmptyOperator 
from airflow.utils.dates import days_ago 
from datetime import timedelta 

default_args = {
  'start_date': days_ago(1),
  'retries': 1,
  'retry_delay': timedelta(minutes=5),
  'schedule_interval': '@daily',
  'catchup': False
}

with DAG(
  dag_id = 'bash-op',
  default_args = default_args,
  tags = ['training']
) as dag: 
  start = EmptyOperator(
    task_id = 'start'
  )
  
  end = EmptyOperator(
    task_id = 'end'
  )
  
  bash_task = BashOperator(
    task_id="test_bash",
    bash_command = "echo 'This is the ds: \'$msg\''",
    env = { "msg": '{{ dag_run.conf.ds | d(ds_nodash) }}'}
  )
  
  start >> bash_task >> end 
``` 

Python Operator 예제 

```python
from airflow import DAG 
from airflow.operators.python import  PythonOperator 
from airflow.operators.empty import EmptyOperator

from airflow.utils.dates import days_ago 
from datetime import timedelta 

import time 

default_args = {
  'start_date': days_ago(1),
  'retries': 1,
  'retry_delay': timedelta(minutes=5),
  'schedule_interval': '@daily',
  'tags': ['training'],
  'catchup': False
}

def _sleep_func(sleep_time):
  print('Start sleep {sleep_time} seconds'.format(sleep_time = sleep_time))
  time.sleep(sleep_time) 

with DAG(
  dag_id = 'python-op',
  default_args=default_args,
  tags = ['training']
) as dag :
  start = EmptyOperator(task_id = 'start_task')
  end = EmptyOperator(task_id = 'end_task')
  
  task1 = PythonOperator(
    task_id = 'python_callable_task1',
    python_callable = _sleep_func,
    op_kwargs = {"sleep_time" : 10}
  )
  
  start >> task1 >> end  
  ```


