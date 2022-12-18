---
title: Setup Apache Airflow on Oocker
categories:
  - workflow
tags: 
  - airflow

---

## Setup Apache Airflow on Docker
Apache Airflow를 실습하기 위해서 개발환경을 구성하기 위해 docker를 이용합니다.

laptop 이나 Server에 직접 설치하거나 방법도 있으나 학습의 목적으로 쉽고 이곳 저곳 설치하는 것 없이
docker를 이용하면 편리합니다.

- docker 환경 구성 
- docker-compose 설치
- airflow docker-compose.yaml 파일 downalod 및 환경 구성

docker 환경구성을 위해 기본에는 Docker Desktop을 사용했으나 라이선스 이슈로 대체 솔루션을 구성해서 사용하고 있습니다.
그중에 rancher desktop을 추천합니다. docker 와 docker-compose를 기존과 동일하게 사용이 가능하는 장점이 있습니다.

Rancher Desktop은 아래 링크에서 자신의 laptop 환경에 맞는 것을 설치하시면 됩니다.

<https://rancherdesktop.io/>

Rancher Desktop을 설치하고 시작하고, 다음과 같이 설정해서 Docker Destop에서 사용했던 것 같이 동일하게 사용할 수 있습니다.

<figure style="width: 100%" class="align-left">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/11-rancher-desktop.png" alt="">
  <figcaption></figcaption>
</figure> 

## docker-compose.yaml 다운로드

```bash
curl -LfO 'https://airflow.apache.org/docs/apache-airflow/2.5.0/docker-compose.yaml'
```

## 환경구성 

```bash
mkdir -p ./dags ./logs ./plugins
echo -e "AIRFLOW_UID=$(id -u)" > .env
```

## Initialize the database

Airflow example을 원하지 않는 경우 docker-compose.yaml 파일의 airflow-common의 AIRFLOW__CORE__LOAD_EXAMPLES: 'false' 추가합니다.

```YAML
  environment:
      :
      AIRFLOW__CORE__LOAD_EXAMPLES: 'false'
```

모든 운영 체제에서 데이터베이스 마이그레이션을 실행하고 첫 번째 사용자 계정을 만들어야합니다.이

다음과 같이 실행하십시오

```bash
docker compose up airflow-init
```

초기화가 완료되면 이와 같은 메시지가 표시됩니다

```bash
airflow-init_1       | Upgrades done
airflow-init_1       | Admin user airflow created
airflow-init_1       | 2.5.0
start_airflow-init_1 exited with code 0
```
## Airflow 시작

이제 모든 서비스를 시작하기 위해 다음과 같이 수행합니다.

```bash
# foreground 로 수행
docker-compose up

# 또는 
# background 로 수행

docker-compose up -d
```

## localhost:8080 으로 접속

<http://localhost:8080>으로 접속하여 default admin 계정/비밀번호 인 airflow/airflow로 접속합니다.