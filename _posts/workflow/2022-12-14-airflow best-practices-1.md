---
title: Airflow Best Practices - I 
categories:
  - workflow
tags: 
  - airflow

---

## 좀더 낳은 DAG 작성
DAG는 데이터 파이프라인에 해당합니다. 
DAG는 매일 사용되므로 모범 사례를 따르는 것이 중요합니다.
최적화되고, 이해하기 쉽고, 문서화되고, 잘 조직되어야 합니다. 
수백 개의 DAG로 빠르게 끝날 수 있으므로이 부분을 과소 평가하지 마십시오. 
그것은 당신에게 많은 고통과 문제를 덜어 줄 것입니다.  

#### DAG의 명확한 목적 정의  

DAG를 만들기 전에, 당신은 당신이 그것에서 무엇을 기대하는지 생각해야합니다. 
도움이 될 수 있는 몇 가지 질문이 있습니다.

- 입력은 무엇입니까?
- 무엇이 출력 될까요?
- 언제 트리거해야합니까?
- 어느 시간 간격으로?
- 상호 작용할 타사 도구는 무엇입니까?
- 작업은 무엇입니까? (매우 중요)
- 간단하게 만들 수 있습니까?

마지막 질문이 중요합니다. 
원하는 것을 달성하기 위해 DAG를 빌드해야하는지 또는 빌드 및 유지 관리가 
더 쉬운 다른 솔루션이 있는지 항상 자문 해보십시오.
데이터 파이프라인을 지나치게 복잡하게 만들지 마십시오.
DAG에는 데이터를 데이터 웨어하우스로 내보내거나 필요한 경우 프로덕션에서 
기계 학습 모델을 업데이트하는 것과 같은 명확한 목적이 있어야 합니다.

#### Task에 대한 명확한 목적 정의  
DAG를 통해 실행하려는 작업을 명확하게 파악합니다. 
하나의 작업(task) = 여러 작업이 아닌 
하나의 작업 = 하나의 작업을 갖도록 
가능한 한 설계하십시오. 
예를 들어 보겠습니다..

```python
# DON'T
def process_data():
  wrangling()
  cleaning()
  transforming()
  validating()

task = PythonOperator(
  task_id="my_task",
  python_callable=process_data,
  dag=dag
)
```

``` 
# DO
t1 = PythonOperator(
  task_id="wrangling",
  python_callable=wrangling,
)
t2 = PythonOperator(
  task_id="cleaning",
  python_callable=cleaning,
)
t3 = PythonOperator(
  task_id="transforming",
  python_callable=transforming,
)
t4 = PythonOperator(
  task_id="validating",
  python_callable=validating,
)

```

위의 예에서 볼 수 있듯이 모든 것을 
PythonOperator에 넣고 싶지만 강력히 권장하지 않습니다. 
유효성 검사 함수가  실패하는 반면 wrangling, cleaning및 transforming은 성공한다고 가정 해 봅시다  . 하나의 기능만 실패하기 때문에 Airflow는 전체 작업을 실패로 간주합니다. 따라서 유효성 검사를 수행하는  하나의 함수만 다시 시도하는 합니다. 그러나 모든 작업을 하나의 작업에 넣을 때 모든 함수가 다시 시도됩니다.  

그렇기 때문에  

-	one Task = one Operator

어야합니다. 무언가가 실패하면 이 부분만 다시 실행되고 다른 부분은 실행되지 않습니다. 이렇게 하면 데이터의 불일치를 방지하고 실패한 항목과 그 이유를 더 쉽게 파악할 수 있습니다.

#### DAG 및 컨텍스트 관리자  
Python에서는 컨텍스트 관리자를 활용하여 원할 때 정확하게 리소스를 할당하고 
해제할 수 있습니다. 
가장 널리 사용되는 컨텍스트 관리자는 __with__ 입니다.
예를 들어 보겠습니다.

```
# DON'T
dag = DAG("simple_pipe", default_args=default_args, schedule_interval="*/5 * * * *", catchup=False) as dag:
t1 = PythonOperator(
  task_id="t1",
  python_callable=my_func
  dag=dag
)
t2 = PythonOperator(
  task_id="t2",
  python_callable=my_func
  dag=dag
)
t3 = PythonOperator(
  task_id="t3",
  python_callable=my_func
  dag=dag
)
```

```
# DO
with DAG("simple_pipe", default_args=default_args, schedule_interval="*/5 * * * *", catchup=False) as dag:
  t1 = PythonOperator(
      task_id="t1",
      python_callable=my_func
  )
  t2 = PythonOperator(
      task_id="t2",
      python_callable=my_func
  )
  t3 = PythonOperator(
      task_id="t3",
      python_callable=my_func
  )
```
 
__with__ 문은  각 작업에 dag 변수를 할당할 필요성을 제거하여 코드를 더 깔끔하게 만듭니다. 
이렇게하면 DAG  에 속한 작업을 명확하게 볼 수 있으며 (DAG 파일에 python 함수가있는 경우 
상황이 빠르게 지저분 해질 수 있음) 컨텍스트 관리자가 DAG 수명주기를 처리하도록합니다

#### Default arguments

Task의 생성자는 이메일, 재시도 횟수, 시작 날짜, 큐 등과 같은 다양한 인수를 허용합니다. 아래와 같이 DAG 개체 정의 바로 앞에 사전이있는 많은 DAG를 이미 보았을 것입니다

```
# DON'T
with DAG('dag', 
  start_date=datetime(2019, 1, 1), 
  schedule_interval='*/10 * * * *', 
  catchup=False
):
  t0 = DummyOperator(task_id='t0', retries=2, retry_delay=timedelta(minutes=5))
  t1 = DummyOperator(task_id='t1', retries=2, retry_delay=timedelta(minutes=5))
  t2 = DummyOperator(task_id='t2', retries=2, retry_delay=timedelta(minutes=5))
  t3 = DummyOperator(task_id='t3', retries=2, retry_delay=timedelta(minutes=5))
```

```
# DO
default_args = {
  'retries': 1,
  'retry_delay': timedelta(minutes=5)
}

with DAG('dag', start_date=datetime(2019, 1, 1), default_args=default_args, schedule_interval='*/10 * * * *', catchup=False):
    t0 = DummyOperator(task_id='t0')
    t1 = DummyOperator(task_id='t1')
    t2 = DummyOperator(task_id='t2')
    t3 = DummyOperator(task_id='t3')

```

일반적으로 default_args 라고 하는 
이 사전의 목적은 DAG의 모든 작업에 공통적인 매개 변수 집합을 정의하는 것입니다.
이렇게 하면 동일한 인수를 반복해서 반복하지 않아도 되므로 DAG가 더 명확해지고 오류가 발생할 가능성이 줄어듭니다. 모든 작업에 대한 사전을 사용하여 기본 인수 집합을 정의하고 한 작업에 특정 값이 필요한 경우 연산자 정의에서 해당 인수를 덮어씁니다.

#### 의미있는 고유 식별자 또는 DAG ID 정의

DAG 개체를 인스턴스화할 때 DAG ID를 지정해야  합니다.  DAG ID는 모든 DAG에서 고유해야 합니다. DAG ID가 동일한 두 개의 DAG가 있으면 안 되며, 그렇지 않으면 하나의 DAG만 표시되고 예기치 않은 동작이 발생할 수 있습니다. DAG에 대한 설명과 함께 의미 있는 DAG ID를 정의합니다.

```
# DON'T
with DAG(
  'dag_1', 
  start_date=datetime(2019, 1 ,1), 
  schedule_interval='*/10 * * * *')
```

```
# DO
with DAG('csv_to_datawarehouse', 
  description='Fetch data from CSV, process and load them in the data warehouse' 
  start_date=datetime(2019, 1 ,1), 
  schedule_interval='*/10 * * * *')
```

수백 개의 서로 다른 DAG가 있을 때를 생각해 보십시오. 의미 있는 DAG ID와 설명을 통해 어떤 DAG가 어떤 작업을 수행하는지 빠르게 알 수 있습니다. 한 가지 더, 여러 DAG가 서로 어느 정도 관련되어있는 경우 모든 DAG에 공통 접두사를 넣는 것이 좋습니다.

#### start_date
여기에 큰 주제가 있습니다. 
Airflow에서 DAG를 예약하는 방식은 처음에는 이해하기 다소 어려울 수 있습니다. 
__start_date__ DAG가 예약되기 시작하는 날짜를 정의합니다. 
한 가지 알아야 할 것은 각 작업 또는 운영자가 다른 __start_date__ 가질 수 있다는 것입니다. 예, 동일한 DAG 내의 작업은 다른 날짜를 시작할 수 있습니다. 나는 이것에 대해 강력히 조언합니다. 
다른 시작 날짜를 정의하지 마십시오. 
일을 단순하고 규칙적으로 정의 하십시오. 

```
# DON'T
default_args = {
  'retries': 1,
  'retry_delay': timedelta(minutes=5)
}

with DAG(
  dag_id = 'dag', 
  start_date=datetime(2019, 1, 1), 
  default_args=default_args, 
  schedule_interval='*/10 * * * *', 
  catchup=False
) as dag:

  t0 = DummyOperator(task_id='t0', start_date=datetime(2019, 1, 15))
  t1 = DummyOperator(task_id='t1', start_date=datetime(2019, 2, 16))
  t2 = DummyOperator(task_id='t2', start_date=datetime(2019, 3, 6))
```

```
# DO
default_args = {
  'retries': 1,
  'retry_delay': timedelta(minutes=5),
  'start_date': datetime(2019, 1, 1)
}

with DAG(dag_id = 'dag', 
  default_args=default_args, 
  schedule_interval='*/10 * * * *', 
  catchup=False
) as dag:
  t0 = DummyOperator(task_id='t0')
  t1 = DummyOperator(task_id='t1')
  t2 = DummyOperator(task_id='t2')
  t3 = DummyOperator(task_id='t3')

  t0 >> [t1, t2] >> t3
```

__start_date__ 는 정적이어야 합니다. 
 혼란 스럽기 때문에 datetime.now() 와 같은 함수로 동적 시작 날짜를 정의하지 마십시오. 
 작업은 start_date + schedule_interval이 전달되면 실행됩니다. 
 시작 날짜가 now()로 설정되면 이론적으로 날짜가 지속적으로 앞으로 이동하므로 
 작업이 실행되지 않습니다.

#### catchup parameter

Airflow는 최근에 실행된 DAG 실행과 현재 날짜 사이에 트리거되지 않은 DAG 실행을 자동으로 실행합니다.  어떤 이유로 DAG를 일시 중지하고 지연을 따라 잡으려는 경우 매우 유용합니다. 그럼에도 불구하고 이 기능에 주의해야 합니다. 실제로 DAG의 start_date 1년 전으로 설정되어 있고 일정 간격이 10분으로 설정되어 있다고 가정해 보겠습니다. 해당 DAG 예약을 시작하면 수천 개의 DAG 실행이 동시에 실행됩니다. 이로 인해 다른 작업이 실행되지 않거나 Airflow 인스턴스 속도가 느려질 수 있습니다. 이를 방지하려면 기본적으로이 매개 변수를 False로 하는 것이 좋습니다. DAG 정의 또는 구성 파일에서 catchup 매개 변수를 False로 설정합니다

```
default_args = {
  'description': 'Fetch data from CSV, process and load them in the data warehouse',
  'start_date': datetime(2019, 1 ,1), 
  'schedule_interval' : '*/10 * * * *',
  'catchup': False
}

with DAG(
  dag_id = 'csv_to_datawarehouse', 
  default_args = default_args
)
```

Airflow CLI에서 에어플로우 백필  명령을 계속 사용할 수 있습니다. 
제 생각에는 이것이 트리거되지 않은 DAG 실행을 따라 잡는 가장 좋은 방법입니다.

#### schedule_interval 

일정 간격은 DAG가 트리거되는 시간 간격을 정의합니다. Airflow는 데이터 스트리밍 솔루션이 아니므로 일정 간격을 1초로 설정하지 마세요.
CRON 표현식이나 타임 델타 객체로 정의 된 schedule_interval 이미 보셨을 것입니다

```
# CRON EXPRESSION
with DAG(
  'dag', 
  default_args=default_args, 
  schedule_interval='*/10 * * * *', 
  catchup=False
) as dag:
  t0 = DummyOperator(task_id='t0')

# TIMEDELTA OBJECT

with DAG(
  dag_id = 'dag', 
  default_args=default_args, 
  schedule_interval=timedelta(minutes=10),
  catchup=False
) as dag:
  t0 = DummyOperator(task_id='t0')
```
 
Cron 표현은 매우 강력하지만 처음에는 이해하기 어려울 수 있습니다. 다음 웹 사이트를 살펴보고  일정 간격이 예상한 간격인지 확인하십시오. 

이제 Cron 표현식 대신 Timedelta 객체를 언제 사용해야합니까? 특정 schedule interval은  Cron 표현식으로 표현할 수 없습니다. 3일에 한 번씩 DAG를 트리거하려면 timedelta(일=3)  를 사용하여 시간 델타 개체를 정의해야 합니다. Cron 표현식을 사용하여 수행하려고하면 월말에 해당 DAG가 30 일 또는 31  일에 트리거 된 다음 다음 달 1 일에  트리거되어 3 일 간격을 깨뜨립니다.

즉 cron expression으로는 3일 간격으로 처리할 수 없습니다.

요약하자면, 이전 간격과 관련하여 일정 간격을 수행해야 한다면 timedelta 객체를 사용하십시오.
