---
title: Airflow Best Practices - II
categories:
  - workflow
tags:
  - airflow
---
## DAG에서 default_args 설정
모든 작업에 설정, 인수 또는 정보를 적용해야 하는 경우 DAG의 일부가 아닌 최상위 코드를 사용하지 않고 default_args 설정하는 것이 가장 좋습니다. 다음과 같이 모든 인수가 있는 default_args  dictionary 만들 수 있습니다.
```python
default_args ={
	'owner': 'ITGix Data Engineers',
	'email_on_failure': False,
	'retries': 2
}
```
## DAG 이름의 DAG 버전 관리
현재로서는 DAG 버전 관리를 위한 다른 방법이 없습니다. 당분간은 DAG 이름에 버전 관리 접미사를 넣는 것이 좋습니다.. ‘itgix_dag_v_1_0_0’.
DAG를 업데이트할 때 DAG의 이름과 버전을 변경할 수 있습니다. 이렇게 하면 트리거된 DAG 버전을 쉽게 확인할 수 있습니다.

## DAG에 대한 schedule_interval 및 start_data 설정
각 DAG 개체에 대해 인수 schedule_interval 지정해야 합니다.  
DAG가 트리거되는 빈도(매일, 매월 등)를 정의합니다.  
각 DAG 개체에 대한 또 다른 중요한 인수는 start_date입니다. DAG가 예약되기 시작하는 날짜입니다.  
특히 다음 인수의 캐치 업이 TRUE와 같은 경우 가장 중요한 부분이라는 것을 명심하십시오.  
다음 내용으로 넘어 가서 그 내용이 왜 필수적인지 직접 살펴 보겠습니다.  

## catchup=false 파라메터 설정
각 DAG의 인수에 catchup 설정하는 것이 중요한 이유
DAG에 구성된 start_date(2021, 4, 1)이 있고 01.04.2022에 처음으로 DAG 실행을 트리거한다고 가정해 보겠습니다.  
기본적으로 Airflow에서 캐치업은 TRUE로 설정되며 DAG를 처음 트리거하면 Airflow는 1년(2021년 4월 1일부터 현재 날짜까지) 동안 DAG RUN을 트리거합니다.  
이것이 catchup 매개변수가 FALSE와 동일한 각 DAG 개체에 대해 설정하는 것이 중요한 이유입니다.  
이것을 명심하고 다음 인수로 넘어 갑시다.  

## DAG에 태그 추가 
태그 인수는 매우 유용하며 특히 팀이 많거나 Airflow 웹 UI에서 DAG를 빠르고 쉽게 필터링하려는 경우 각 DAG 개체에 대해 설정하는 것이 좋습니다.. 
For argument tag you can specify a list of tags: tags=[“data_science”, “data”] .
파라메터 태그의 경우 태그 목록을 지정할 수 있습니다.:  
tags=[“data_science”, “data”] 

## DAG에 대한 설명 추가
또 다른 모범 사례는 DAG가 수행하는 작업을 가장 잘 설명하기 위해 DAG에 의미 있는 설명을 추가하는 것입니다. 설명 인수는 설명 = "DAG는 데이터를 저장하는 데 사용됩니다"일 수 있습니다.

## dagrun_timeout 설정
가장 중요한 주장 중 일부는 dagrun_timeout입니다. 예를 들어 DAG 실행에 약 5분이 걸린다고 가정해 보겠습니다. DAG 실행이 6분 또는 7분 후에 완료되지 않으면 실패로 표시하는 것이 가장 좋습니다. 
어떻게 할 수 있습니까? 대답은 dagrun_timeout 같은 인수가 있습니다.
```python
dagrun_timeout =timedelta(minutes=6).
```
그렇지 않으면 작업 중 하나가 중단되면 DAG가 영원히 실행됩니다.  

•	How to configure dependency between tasks in one DAG?  

DAG에서 작업 간의 종속성을 구성하는 방법에 대해 설명해 보겠습니다. set_upstream() 및 set_downstream() 함수를 사용하거나 << 및 >> 연산자를 사용할 수 있습니다. 선택하는 방법은 개인 취향의 문제이지만 가독성을 위해 한 가지 방법을 선택하고 고수하는 것이 가장 좋습니다.
예를 들어, 다음과 같은 방법을 혼합하는 대신:
```python
task_1.set_downstream(task_2)
task_3.set_upstream(task_2)
task_3 >> task_4
```
다음과 같이 일관성을 유지하십시오.
```python
task_1 >> task_2 >> [task_3, task_4]
```
마지막으로 첫 번째 DAG를 Apache Airflow에서 실행할 준비가 되었다고 말할 수 있습니다. 파이썬 파일의 전체 DAG 코드는 아래에서 찾을 수 있습니다.
```python
from airflow.models import DAG
from airflow.operators.bash import BashOperator
from airflow.operators.dummy import DummyOperator
from airflow.operators.python import PythonOperator

from datetime import datetime

default_args ={
    'owner': 'ITGix Data Engineers',
    'email_on_failure': False,
    'retries': 2
}

def clean_a():
    print("cleaning with ml a")

def clean_b():
    print("cleaning with ml a")

def clean_c():
    print("cleaning with ml a")

def ml_a():
    clean_a()
    print("process with ml a")

def ml_b():
    clean_b()
    print("process with ml b")

def ml_c():
    clean_b()
    print("process with ml c")

with DAG('itgix_dag_v_1_0_0', schedule_interval='@daily', 
    start_date=datetime(2022, 4, 1), default_args=default_args,
    catchup=False, tags=["data_science", "data"],
    description="DAG is used to store data", 
    dagrun_timeout=timedelta(minutes=6)) as dag:
    
    extract = BashOperator(
        task_id='extract',
        bash_command='echo "this commands extract my data"'
    )

    process_ml_a = PythonOperator(
        task_id='process_ml_a',
        python_callable=ml_a
    )

    process_ml_b = PythonOperator(
        task_id='process_ml_b',
        python_callable=ml_b
    )

    process_ml_c = PythonOperator(
        task_id='process_ml_c',
        python_callable=ml_c
    )

    store = DummyOperator(
        task_id='store_data'
    )

extract >> [process_ml_a, process_ml_b, process_ml_c] >> store
```
"하나의 작업이 하나의 연산자를 정의합니다"라는 원칙을 따라야 합니까? 그리고 그것이 왜 그렇게 중요합니까?
아래에서 볼 수 있듯이 하나의 연산자로 두 개의 작업을 정의한다고 가정 해 봅시다.
```python
process_ml_a = PythonOperator(
	task_id='process_ml_a',
	python_callable=ml_a

	task_id='process_ml_b',
	python_callable=ml_b
)
```
이 경우 예를 들어 작업 'process_ml_b'이 예상대로 작동하지 않으면 'process_ml_a'이 성공적으로 실행된 경우에도 해당 작업을 다시 시도합니다.
규칙 (아래 참조)을 따르고 작업 'process_ml_b'이 예상대로 작동하지 않으면 특정 작업을 다시 시도하고 쉽게 문제를 해결할 수 있습니다.
```python
process_ml_a = PythonOperator(
	task_id='process_ml_a',
	python_callable=ml_a
)

process_ml_a = PythonOperator(
	task_id='process_ml_b',
	python_callable=ml_b
)
```
## 작업간에 데이터를 공유하는 방법은 무엇입니까?
물론 때로는 한 작업에서 다른 작업으로 데이터를 공유해야 하며 가장 먼저 떠오르는 질문은 "작업 간에 데이터를 공유하려면 어떻게 해야 합니까?"
짧은 대답은 : Xcoms를 사용하지만 몇 가지 팁을 알아야합니다..
XComs는 "교차 통신"에 사용되며 작업간에 소량의 데이터를 교환 할 수 있습니다. Xcoms는 메타스토어를 사용하여 데이터를 저장하므로 몇 가지 제한이 있습니다.  

#### 데이터 제한은 Metastore에 사용되는 데이터베이스의 종류에 따라 다릅니다.  
•	SQLite 데이터 제한 – 2 GB;  
•	PostgreSQL 데이터  제한 – 1 GB;  
•	MySQL 데이터  제한 – 64 kB;  

## subDAG를 사용하지 말고 taskGroup만 사용  
동일한 수준에 있는 둘 이상의 작업을 하나의 작업에서 병합하려는 경우 subDAG를 사용할 수 있습니다. 과거에는 자주 사용되었지만 전혀 사용하지 않는 것이 좋습니다. 이것 뒤에는 세 가지 이유가 있습니다  
1.	Deadlocks:: Airflow 인스턴스로 작업을 실행할 수 없습니다.  
2.	Complexity: 하위 DAG를 설정하는 프로세스 
3.	Sequential executor: 어떤 종류의 실행기를 사용하든 상관 없습니다.  

Airflow 2.0에서는 작업 그룹을 사용하여 동일한 수준에 있는 둘 이상의 작업을 하나의 작업으로 결합할 수 있습니다.  
아래에서 작업 그룹을 사용하여 세 가지 작업을 "processing_tasks"라는 작업으로 결합하는 DAG를 찾을 수 있습니다.:
```python
from airflow.models import DAG
from airflow.operators.bash import BashOperator
from airflow.operators.dummy import DummyOperator
from airflow.operators.python import PythonOperator
from airflow.utils.task_group import TaskGroup

from datetime import datetime

default_args ={
    'owner': 'ITGix Data Engineers',
    'email_on_failure': False,
    'retries': 2
}

def clean_a():
    print("cleaning with ml a")

def clean_b():
    print("cleaning with ml a")

def clean_c():
    print("cleaning with ml a")

def ml_a():
    clean_a()
    print("process with ml a")

def ml_b():
    clean_b()
    print("process with ml b")

def ml_c():
    clean_b()
    print("process with ml c")

with DAG('itgix_dag_v_1_0_0', schedule_interval='@daily', 
    start_date=datetime(2022, 4, 1), default_args=default_args,
    catchup=False, tags=["data_science", "data"],
    description="DAG is used to store data", 
    dagrun_timeout=timedelta(minutes=6)) as dag:
    
    extract = BashOperator(
        task_id='extract',
        bash_command='echo "this commands extract my data"'
    )

    with TaskGroup('processing_tasks') as processing_tasks:
        process_ml_a = PythonOperator(
            task_id='process_ml_a',
            python_callable=ml_a
        )

        process_ml_b = PythonOperator(
            task_id='process_ml_b',
            python_callable=ml_b
        )

        process_ml_c = PythonOperator(
            task_id='process_ml_c',
            python_callable=ml_c
        )

    store = DummyOperator(
        task_id='store_data'
    )

extract >> processing_tasks >> store
```