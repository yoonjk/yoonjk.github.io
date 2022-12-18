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
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/10-task-taskgroup.git" alt="">
  <figcaption></figcaption>
</figure> 

#### 작업 그룹을 사용하려면 다음 import 문을 실행합니다.

```python
from airflow.utils.task_group import TaskGroup
```

첫 번째 예에서는 with 문을  사용하여 작업 그룹을 인스턴스화하고 group_id 제공합니다. 작업 그룹 내에서 두 작업인 t1과 t2와 해당 종속성을 정의합니다.

개별 작업에서 사용할 수 있는 것과 동일한 방식으로 작업 그룹에서 종속성 연산자(<< 및 >>)를 사용할 수 있습니다. 작업 그룹에 적용된 종속성은 해당 작업 전체에 적용됩니다. 다음 코드에서는 start 및 end 에 대한 추가 종속성을 작업 그룹에 추가하여 t1 및 t2에  동일한 종속성을 자동으로 적용합니다. :


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

#### TaskGroup에 데코레이터 사용

DAG에서 작업 그룹을 정의하는 또 다른 방법은 작업 그룹 데코레이터를 사용하는 것입니다. 작업 그룹 데코레이터는 Airflow 2.1 이상에서 사용할 수 있습니다. 작업 그룹 데코레이터는 다른 Airflow 데코레이터처럼 작동하며  TaskFlow API를 사용하여 작업 그룹을 정의할 수 있습니다. 작업 그룹 데코레이터를 사용해도 작업 그룹의 기능은 변경되지 않지만 DAG에서 이미 작업 그룹 데코레이터를 사용하고 있는 경우 작업 그룹의 코드 서식을 보다 일관되게 만들 수 있습니다.

데코레이터를 사용하려면  작업 그룹에 들어가야 하는 작업의 함수를 호출하는 Python 함수 앞에 @task_group 추가합니다. 예를 들어:

```python
@task_group(group_id="tasks")
def my_independent_tasks():
    task_a()
    task_b()
    task_c()
```


```python
@task_group(group_id="tasks")
def my_dependent_tasks():
    return task_a(task_b(task_c()))
```

이 함수는 DAG의 다른 위치에 정의된 세 개의 독립적인 작업이 있는 작업 그룹을 만듭니다.

```python
from airflow import DAG 
from airflow.decorators import task_group, task
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
  dag_id = 'taskgroup-decorator',
  default_args=default_args
) as dag: 
  @task
  def start():
    pass
  
  @task
  def end():
    pass

  @task_group(group_id = 'group1')
  def func_group():
    @task
    def task1():
      pass
  
    @task
    def task2():
      pass 
    task1() >> task2()
  group1 = func_group()  
  start() >> group1 >> end()
```

#### inner taskgroup decorator

좀더 복잡한 Inner TaskGroup 입니다.

<figure style="width: 100%" class="align-left">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/10-task-inner_taskgroup.git" alt="">
  <figcaption></figcaption>
</figure> 

```python
from airflow import DAG 
from airflow.operators.empty import EmptyOperator
from airflow.decorators import task_group, task
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
  dag_id = 'taskgroup-decorator2',
  default_args=default_args
) as dag: 
  @task
  def start():
    pass
  
  @task
  def end():
    pass

  @task_group(group_id = 'section_1')
  def func_group1():
    @task
    def task_1():
      pass
  
    @task
    def task_2():
      pass 

    @task
    def task_3():
      pass 
    task_1() >> [task_2(), task_3()]
    
  @task_group(group_id = 'section_2')
  def func_group2():
    @task
    def task_1():
      print('task1 of group2')

    @task_group(group_id = 'inner_section_2')
    def func_inner_group2():
      
      task2 = EmptyOperator(task_id = 'task_2')
      task3 = EmptyOperator(task_id = 'task_3')
      task4 = EmptyOperator(task_id = 'task_4')
      
      return [task2,task3] >> task4

    inner_section_2 = func_inner_group2()
    task_1() >> inner_section_2
    
  section_1 = func_group1()  
  section_2 = func_group2() 
  start() >> section_1 >> section_2 >> end()
  ```