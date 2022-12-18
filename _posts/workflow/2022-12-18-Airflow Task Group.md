---
title: Airflow TaskGroup
categories:
  - workflow
tags: 
  - airflow,TaskGroup

---

## Airflow TaskGroup
작업 그룹은 그래프 보기에서 작업을 계층적 그룹으로 구성하는 데 사용할 수 있습니다. 반복되는 패턴을 만들고 시각적 혼란을 줄이는 데 유용합니다..

<figure style="width: 100%" class="align-left">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/10-task-taskgroup.png" alt="">
  <figcaption></figcaption>
</figure> 

작업 그룹을 사용하려면 다음 import 문을 실행합니다.

```python
from airflow.utils.task_group import TaskGroup
```

첫 번째 예에서는 with 문을  사용하여 작업 그룹을 인스턴스화하고 group_id 제공합니다. 작업 그룹 내에서 두 작업인 t1과 t2와 해당 종속성을 정의합니다.

개별 작업에서 사용할 수 있는 것과 동일한 방식으로 작업 그룹에서 종속성 연산자(<< 및 >>)를 사용할 수 있습니다. 작업 그룹에 적용된 종속성은 해당 작업 전체에 적용됩니다. 다음 코드에서는 t0 및 t3에 대한 추가 종속성을 작업 그룹에 추가하여 t1 및 t2에  동일한 종속성을 자동으로 적용합니다. :


```python
from airflow import DAG 
from airflow.operators.empty import EmptyOperator 
from airflow.utils.task_group import TaskGroup 
# Utils 
from airflow.utils.dates import days_ago 
from datetime import timedelta 

default_args = {
  'start_date': days_ago(1),
  'retries': 0, 
  'retry_delay': timedelta(minutes=5),
  'schedule_interval': '@daily',
  'catchup': False
}

with DAG (
  dag_id = 'taskgroup2',
  default_args=default_args
) as dag: 
  start = EmptyOperator(task_id = 'start')
  end = EmptyOperator(task_id = 'end')
  
  with TaskGroup(group_id = 'group1') as group1:
    t1 = EmptyOperator(task_id = 'task1')
    t2 = EmptyOperator(task_id = 'task2')
    t1 >> t2 
    
  start >> group1 >> end 
  ```


