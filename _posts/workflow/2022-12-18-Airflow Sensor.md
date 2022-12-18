---
title: Airflow Sensor
categories:
  - workflow
tags: 
  - airflow

---

## Airflow Sensor 
센서는 정확히 한 가지 일을 하도록 설계된 특별한 유형의 오퍼레이터입니다  - 무언가가 발생할 때까지 기다립니다. 시간 기반이거나 파일 또는 외부 이벤트를 기다리는 것일 수 있지만 어떤 일이 발생할 때까지 기다렸다가 해당조건을 만족하면  다운스트림 작업(이후 Task)을 실행할 수 있습니다.

<https://airflow.apache.org/docs/apache-airflow/2.2.3/_api/airflow/sensors/index.html>

Sensor Task는 주기적으로 체크하면 다음 단계로 진행하지 못하고 대기모드로 유지되기 때문에 Airflow DAG에서의 Sensor는 Worker의 슬롯 한 개를 점유합니다. Sensor는 BaseSensorOperator를 상속하여 구현합니다. BaseSensorOperator는 다음의 옵션을 지원합니다.

|구분|타입|기본값|설명|
|---|---|---|---|
|poke_interval|float|60|조건 확인을 위한 재시도 주기이며 단위는 second|
|timeout|float|60 * 60 * 24 * 7 | Sesnor의 조건 확인을 위해 대기하는 시간이며 단위는 Second|
|mode|str|"poke"|poke는 특정 조건을 만족할 때까지 worker 슬롯 점유 <br> reschedule은 조건을 확인할때만 worker 슬롯 점유|


Sensor의 유형 중에 대표적인 Sensor는 

  - FileSensor

이며 그외 다음과 같은 Sensor들이 있습니다.

|구분|모듈 경로|설명|
|---|---|---|
|BaseSensor|airflow.sensors.bash|조건 확인의 재시도 주기이며 단위는 Second|
|DatetimeSensor<br>DateTimeSensorAsync|airflow.sensors.date_time|Sensor의 조건 확인 대기 시간이며 단위 Second|
|ExternalTaskSensor|airflow.sensors.external_task|다른 DAG의 Task가 종료까지 대기하면서 모니터링하는 DAG의 external Task가 종료되면 ExternalTaskSensor가 실행|

