---
title: Apache Airflow - DAG
categories:
  - workflow
tags: 
  - airflow
  - DAG
---

## DAG (Directed Acyclic Graph) 
DAG(Directed Acyclic Graph)는 Airflow에서 실행할 작업들을 순서에 맞게 구성한 워크플로를 의미합니다.
DAG을 구성하는 태스크(Task)라고 하며, 화살표 방향으로 순차, 병렬 실행합니다.
DAG은 Python 코드로 정의하며 $AIRFLOW_HOME/dags폴더에 위치합니다. 

-	default_args

DAG에서 사용될 Attribute를 default_args로 분리하여 정의하여 DAG  파라메터로 전달합니다.

```python
from airflow.models import DAG
from datetime import datetime

default_args = {
  “start_date”: datetime(2022,1,2)
}

with DAG(
“myFirstDag”, 
schedule_interval=”@daily”, 
default_args=default_args, 
catchup=False
) as dag:
```

-	catchup

DAG을 생성할 때 전달하는 파라메터로써 Airflow에서는 default로 true로 설정되어 있는 옵션입니다. catchup기본 설정은 airflow.cfg 파일에 catchup_by_default값을 변경합니다. 
catchup은 DAG이 스케줄링에서 dagrun을 실행하지 못했던 것을 채우기 위한 기능으로 backfill 이라고도 합니다. 

-	Cron Preset

DAG을 실행하기 위한 스케줄링에 사용하며, DAG을 정의할때 schedule_interval인자로 전달합니다.

![transparent black overlay]({{ "/assets/images/03-cron-preset.png" | relative_url }})


<figure style="width: 100%" class="align-left">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/04-cron-preset.png" alt="">
  <figcaption></figcaption>
</figure> 

예시 )

<figure style="width: 100%" class="align-left">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/05-ex-cron-preset.png" alt="">
  <figcaption></figcaption>
</figure> 

-	스케줄링 간격 정의(timedelta)

스케줄 간격 정의 – 빈도 기반
cron expression은 간격(빈도)마다 스케줄을 정의할 수는 없습니다. 예를 들면 DAG을 3일에 한번씩 실행하는 cron을 정의하는 것은 어렵습니다. Airflow에서는 timedelta 인스턴스를 지원하여 빈도기반 스케줄링을 정의할 수 있습니다.
예를 들면 3일마다 또는 3시간마다 실행하도록 하는 것을 timedelta 인스턴스를 활용할 수 있습니다.

## DAG Runs
DAG Run은 Task 인스턴스들을 DAG 에 정의된 특정 execution_date에 실행하는 DAG의 인스턴스입니다. 
execution_date는 Airflow 2.2에서는 local_date로 변경되었습니다.
DAG는 Airflow 스케줄러 또는 외부 Trigger에 의해 실행될 수 있습니다. 
Execution_date가 다른 여개 개의 DAG가 동시에 실행될 수 있습니다.

<figure style="width: 100%" class="align-left">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/06-dag-runs.png" alt="">
  <figcaption></figcaption>
</figure> 

DAG Runs를 선택하면 다음과 같이 실행 중이거나 종료된 DAG의 실행이력이 표시됩니다. CLI 명령어는 다음과 같습니다.

```bash
airflow dags list
```