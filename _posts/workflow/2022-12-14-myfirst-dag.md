---
title: Create your first Airflow DAG
categories:
  - workflow
tags: 
  - airflow

---

## My First DAG 개발 
Apache Airflow Dag 개발 절차는 다음의 7단계 절차로 구현합니다. 

- Airflow 관련 Module import 
- DAG Arguments 정의
- Python Function 또는 task 에서 사용하는 Variable 정의 (Optional)
- Instatiate DAG 정의 
- Task 정의 
- Task간 의존성 정의 
- Verify DAG 

개발절차를 예제로 살펴보면 다음과 같습니다.

#### 1. Airflow 관련 Module import  

```python
from airflow import DAG 
from datetime import timedelta 
from airflow.operators.bash import BashOperator 
from airflow.operators.python import PythonOperator 
from airflow.utils.dates import days_ago 
```

#### 2. DAG Arguments 정의

``` python
default_args = {
    'start_date': days_ago(1),
    'retries': 1,
    'retry_delay': timedelta(minutes=5),
    'schedule_interval': '@daily',
    'tags': 'training',
    'catchup': False
}
``` 

#### 3. Python Function 또는 task 에서 사용하는 Variable 정의(Optional)

```python
def hello_airflow():
    print("Hello airflow")
```

#### 4. Instantiate DAG 정의 

```python
dag = DAG(
    dag_id = "myFirstDag",
    default_args=default_args,
    schedule_interval="@daily"
)
```

#### 5.  Task 정의 

```python
t1 = BashOperator(
    task_id="bash",
    bash_command="echo Hello airflow",
    dag=dag
)

t2 = PythonOperator(
    task_id="python",
    python_callable=hello_airflow,
    dag=dag
)
```

#### 6. Task간 의존성 정의 

```
t1 >> t2
```

#### 7. Verify DAG 

myFirstDag을 airflow에 배포하여 dag을 테스트합니다. 
테스트 aifrlow Webserver UI에서 하거나 airflow cli를 사용하여 테스트합니다.
