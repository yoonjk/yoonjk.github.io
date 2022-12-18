---
title: Airflow Hooks - MySQL
categories:
  - workflow
tags: 
  - airflow

---

## Airflow Hooks - MySQL

MySqlHook 예제입니다.

```python
from airflow import DAG 
from airflow.operators.python import PythonOperator
from airflow.operators.empty import EmptyOperator 
from airflow.providers.mysql.hooks.mysql import MySqlHook 
# utils
from airflow.utils.dates import days_ago 
from datetime import timedelta 
from tempfile import NamedTemporaryFile 
import csv, logging 

default_args = {
  'start_date': days_ago(1),
  'retries': 1,
  'retry_delay': timedelta(minutes=5),
  'schedule_interval': '@daily',
  'catchup': False
}

MYSQL_CONN_ID ='mysql-conn'

def export_db_to_dsv():
  logging.info("Staring mysql_hook")
  hook = MySqlHook(conn_id = MYSQL_CONN_ID)
  conn = hook.get_conn() 
  cursor = conn.cursor()
  cursor.execute('use demo')
  cursor.execute('select * from users')
  
  with open('/opt/airflow/data/employee.csv', 'w') as f: 
    csv_writer = csv.writer(f) 
    csv_writer.writerow([i[0] for i in cursor.dscription])
    csv_writer.writerows(cursor)
    f.flush()
    cursor.close() 
    conn.close()
    logging.info('Saved data in csv file: %s', '/opt/airflow/data/employee.csv')
    
with DAG(
  dag_id = 'mysql-hook-db-to-csv',
  default_args = default_args,
  tags = ['training']
) as dag: 
  export_task = PythonOperator(
        task_id="mysql_to_csv",
        python_callable=export_db_to_dsv
  )
  
  start = EmptyOperator(task_id='start')
  end = EmptyOperator(task_id='end') 
  
  start >> export_task >> end  
```

