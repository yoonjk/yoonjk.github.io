var store = [{
        "title": "Apache Airflow - DAG",
        "excerpt":"DAG (Directed Acyclic Graph) DAG(Directed Acyclic Graph)는 Airflow에서 실행할 작업들을 순서에 맞게 구성한 워크플로를 의미합니다. DAG을 구성하는 태스크(Task)라고 하며, 화살표 방향으로 순차, 병렬 실행합니다. DAG은 Python 코드로 정의하며 $AIRFLOW_HOME/dags폴더에 위치합니다. default_args DAG에서 사용될 Attribute를 default_args로 분리하여 정의하여 DAG 파라메터로 전달합니다. from airflow.models import DAG from datetime import datetime default_args =...","categories": ["workflow"],
        "tags": ["airflow","DAG"],
        "url": "/workflow/apache-airflow-dag/",
        "teaser": null
      },{
        "title": "Apache Airflow - 개요",
        "excerpt":"Airflow는 2014년 10월 Airbnb의 Maxime Beauchemin에 의해 시작되었다. 첫 번째 커밋부터 오픈 소스였으며 공식적으로 Airbnb GitHub에 포함되었으며 2015년 6월에 발표되었습니다. 이 프로젝트는 2016년 3월 Apache Software Foundation의 인큐베이터 프로그램에 합류했으며 재단은 2019년 1월 Apache Airflow를 최상위 프로젝트로 발표, 현재 아파치 재단에서 관리중인 오픈소스 프로젝트입니다. Airflow는 워크플로를 작성, 예약 및 모니터링하는...","categories": ["workflow"],
        "tags": ["airflow","workflow"],
        "url": "/workflow/apache-airflow-overview/",
        "teaser": null
      },{
        "title": "Apache Airflow - 구조",
        "excerpt":"Airflow 구조 Airflow는 다음과 같은 구조를 가지고 있습니다. Scheduler : Airflow의 DAG와 작업들을 모니터링하고 실행순서와 상태관리 Worker : Airflow의 작업을 실행하는 공간 Metadata database : Airflow에서 실행할 작업에 관한 정보를 저장 Webserver: Airflow의 User Interface 에 해당하는 dashboard DAG Directory Airflow는 스케줄러가 DAG Directory를 주기적으로 스캔하고 새로운 DAG 파일이 생성되면...","categories": ["workflow"],
        "tags": ["airflow","workflow"],
        "url": "/workflow/apache-airflow-structure/",
        "teaser": null
      },{
        "title": "Cloud-Native CI/CD 이해",
        "excerpt":"Cloud-Native CI/CD 이해 클라우드 네이티브 소프트웨어 개발이 무엇을 의미하는지 더 잘 이해 했으므로 CI/CD 파이프 라인의 맥락에서 그것이 무엇을 의미하는지 살펴 보겠습니다. Cloud-Native CI/CD는 세 가지 원칙을 기반 Containers Serverless DevOps Containers CI/CD의 컨텍스트에서 클라우드 네이티브는 모든 것이 컨테이너 내에서 실행되어야 함을 의미합니다. 응용 프로그램을 테스트하거나 패키지하기 위해 코드베이스에서 완료되는...","categories": ["devops"],
        "tags": ["tekton"],
        "url": "/devops/cloud-native-cicd/",
        "teaser": null
      },{
        "title": "Tekton First Pipeline",
        "excerpt":"First Pipeline 작성 Tekton을 이용하여 Pipeline을 작성하는 것을 실습합니다. Step 1 : Task 작성 Pipeline은 CI/CD 워크플로의 일부로 특정 실행 순서로 정렬된 일련의 Task를 정의합니다. 이번에는 first Pipeline을 작성할 것입니다, First Pipeline에서는 이전에 작성했던 Hello World! 그리고 goodbye World! Task를 포함하는 Pipeline을 작성합니다. goodbye task를 다음과 같이 작성하고 적용합니다. kubectl...","categories": ["devops"],
        "tags": ["tekton"],
        "url": "/devops/tekton-first-pipeline/",
        "teaser": null
      },{
        "title": "Getting Start Tekton",
        "excerpt":"Getting start tekton API에서 Task Kubernetes resource type이 Task로 표현되는 Task는 작업에 필요한 로직을 수행하기 위해 순차적으로 실행되는 일련의 Step을 정의합니다. 모든 Task는 Kubernetes 클러스터에서 포드로 실행되며 각 Step은 Pod내에 자신의 컨테이너에서 실행됩니다. 아래와 같이 Hello World Task를 작성하여 Kubernetes 에 적용합니다. Hello World Task 작성 kubectl apply -f hello-world.yaml...","categories": ["devops"],
        "tags": ["tekton"],
        "url": "/devops/tekton-getting-start/",
        "teaser": null
      },{
        "title": "Tekton 개요",
        "excerpt":"Tekton 개요 Tekton은 CI/CD(지속적 통합 및 지속적 전달) 시스템을 만들기 위한 Kubernetes 네이티브 오픈 소스 프레임워크입니다. 여러 클라우드 공급자 또는 하이브리드 환경에서 애플리케이션을 구축, 테스트 및 배포하는 데 최적화되어 있습니다. Tekton은 CI/CD 파이프라인을 구축하기 위한 클라우드 네이티브 솔루션입니다. 빌딩 블록을 제공하는 Tekton 파이프 라인과 Tekton Cli 및 Tekton 카탈로그와 같은...","categories": ["devops"],
        "tags": ["tekton"],
        "url": "/devops/tekton-overveiew/",
        "teaser": null
      },{
        "title": "Deploy mysql8.0 to kubernetes",
        "excerpt":"MYSQL YAML 파일 Kubernetes에 테스트용으로 Stand-alone으로 배포하여 테스트하기 위한 YAML 파일입니다. apiVersion: v1 kind: Service metadata: name: mysql labels: app: mysql spec: ports: - port: 3306 selector: app: mysql type: NodePort --- apiVersion: v1 kind: PersistentVolumeClaim metadata: name: mysql-pv-claim labels: app: mysql spec: accessModes: - ReadWriteOnce resources: requests: storage: 20Gi...","categories": ["kubernetes"],
        "tags": ["mysql"],
        "url": "/kubernetes/deploy-to-kubernetes/",
        "teaser": null
      },{
        "title": "Install local storage class to kubernetes",
        "excerpt":"kubernetes 에서 storage class가 없는 경우 실습을 목적으로 local-storage를 설치하여 실습을 목적으로 하는 경우 사용해 볼 수 있는 provisioner 입니다로 Install local-storage-class to kubernetes Kubernetes에 local-storage 를 사용하고자 하는 경우 다음의 설정을 하면 storage class를 사용할 수 있습니다. apiVersion: v1 kind: Namespace metadata: name: nfs --- apiVersion: v1 kind: ServiceAccount...","categories": ["kubernetes"],
        "tags": ["kubernetes","storageclass"],
        "url": "/kubernetes/local-storage-class-on-ks/",
        "teaser": null
      },{
        "title": "Airflow DAG 선언 유형",
        "excerpt":"Install local-storage-class to kubernetes Apache Airflow에서 DAG을 선언하는 다음과 같이 3가 유형이 있습니다. with DAG (Recommendation) with DAG ( dag_id=”myFirstDag”, default_args = default_args, schedule_interval=”@daily”, catchup=False ) as dag: op = DummyOperator(task_id=”dummy”) with DAG 예시 from airflow.models import DAG from airflow.providers.http.sensors.http import HttpSensor from datetime import datetime, timedelta default_args = {...","categories": ["workflow"],
        "tags": ["airflow"],
        "url": "/workflow/dag-type/",
        "teaser": null
      },{
        "title": "Airflow Task",
        "excerpt":"Airflow Task Task는 airflow의 기본 실행단위로 한개 이상의 Task를 이용해서 하나의 DAG을 정의합니다. Task간 순서를 표현하기 위해 작업간 «(스트림업), »(스트림다운) 종속성을 설정하여 합니다. Task는 Operator : 지정한 작읍을 수행하는 Operator Sensor : 어떤 조건이 만족하는지 주기적으로 스캔이 필요할 때 사용하며 조건이 만족하는 경우 Task가 수행. Hook : DB나 서비스 같은 외부...","categories": ["workflow"],
        "tags": ["airflow","task"],
        "url": "/workflow/tasks/",
        "teaser": null
      },{
        "title": "Airflow XCom",
        "excerpt":"Airflow XCom Airflow 작업(Task) 간에 데이터를 전달하는 첫 번째 방법은 작업 데이터를 공유하기 위한 주요 Airflow 기능인 XCom을 사용하는 것입니다. XCom은 task간 데이터를 공유가 필요할 때, 데이터를 공유하기 위해 push, pull 을 사용하여 값을 전달하고, 값을 가져올 수 있습니다.. XComs는 작업에서 보내는 의미의 “푸시” , 작업에서 수신하는 것을 의미하는 “pulled”일...","categories": ["workflow"],
        "tags": ["airflow"],
        "url": "/workflow/xcom/",
        "teaser": null
      },{
        "title": "Airflow Best Practices - I",
        "excerpt":"좀더 낳은 DAG 작성 DAG는 데이터 파이프라인에 해당합니다. DAG는 매일 사용되므로 모범 사례를 따르는 것이 중요합니다. 최적화되고, 이해하기 쉽고, 문서화되고, 잘 조직되어야 합니다. 수백 개의 DAG로 빠르게 끝날 수 있으므로이 부분을 과소 평가하지 마십시오. 그것은 당신에게 많은 고통과 문제를 덜어 줄 것입니다. DAG의 명확한 목적 정의 DAG를 만들기 전에, 당신은...","categories": ["workflow"],
        "tags": ["airflow"],
        "url": "/workflow/airflow-best-practices-1/",
        "teaser": null
      },{
        "title": "Airflow Best Practices - II",
        "excerpt":"DAG에서 default_args 설정 모든 작업에 설정, 인수 또는 정보를 적용해야 하는 경우 DAG의 일부가 아닌 최상위 코드를 사용하지 않고 default_args 설정하는 것이 가장 좋습니다. 다음과 같이 모든 인수가 있는 default_args dictionary 만들 수 있습니다. default_args ={ 'owner': 'ITGix Data Engineers', 'email_on_failure': False, 'retries': 2 } DAG 이름의 DAG 버전 관리...","categories": ["workflow"],
        "tags": ["airflow"],
        "url": "/workflow/airflow-best-practices-2/",
        "teaser": null
      },{
        "title": "Create your first Airflow DAG",
        "excerpt":"My First DAG 개발 Apache Airflow Dag 개발 절차는 다음의 7단계 절차로 구현합니다. Airflow 관련 Module import DAG Arguments 정의 Python Function 또는 task 에서 사용하는 Variable 정의 (Optional) Instatiate DAG 정의 Task 정의 Task간 의존성 정의 Verify DAG 개발절차를 예제로 살펴보면 다음과 같습니다. 1. Airflow 관련 Module import from...","categories": ["workflow"],
        "tags": ["airflow"],
        "url": "/workflow/myfirst-dag/",
        "teaser": null
      },{
        "title": "Airflow Trigger_rules",
        "excerpt":"Airflow Trigger rules 일반적으로 Task는 이전 Task들이 성공할 때만 실행됩니다. trigger rule이 default로 all_success이기 때문입니다. 기본적으로 모든 상위 작업이 성공하면 작업이 실행됩니다. 이 action은 일반적으로 기대하는 것입니다. 그러나 더 복잡한 것을 원한다면 어떻게 해야 할까요? 상위 task 중 한 개 task가 성공하자마자 작업을 수행하고 싶다면 어떻게? 아니면 작업이 실패하면 다른...","categories": ["workflow"],
        "tags": ["airflow"],
        "url": "/workflow/trigger_rules/",
        "teaser": null
      },{
        "title": "Airflow Hooks",
        "excerpt":"Airflow Hooks Hook은 DB나 서비스 같은 외부 시스템(Database, Storage)과 통신하기 위한 인터페이스를 제공하여 연결상태를 유지하여 작업을 처리하기 위해 사용합니다. Apache Airflow의 Hook에서csv to db를 또는 db to csv 작업을 할 때 대표적인 Hook은 다음과 같은 것이 있습니다. PostgresHook MySqlHook S3 HDFS Apache Airflow Hooks를 실행하는 방법? Airflow Hook을 다음의 4단계로...","categories": ["workflow"],
        "tags": ["airflow"],
        "url": "/workflow/Airflow-hooks/",
        "teaser": null
      },{
        "title": "Airflow Operator",
        "excerpt":"Airflow Operator DAG을 구성하는 작업을 Task라고 하며, DAG이 수행할 작업을 의미합니다. 한개 이상의 Task를 pipeline으로 연결해서 하나의 DAG을 완성해야 합니다. Task에는 Operator Sensor Hook 가 있습니다. Operator에서는 대표적인. Bash, Python, Empty 또는 이전버전 Dummy Operator가 있습니다. 상세한 Operator 정보는 다음의 링크를 참고하세요 https://airflow.apache.org/docs/apache-airflow/2.2.3/operators-and-hooks-ref.html Operator는 Action Operator Transfer Operator Sensor Operator...","categories": ["workflow"],
        "tags": ["airflow"],
        "url": "/workflow/Airflow-operators/",
        "teaser": null
      },{
        "title": "Airflow Sensor",
        "excerpt":"Airflow Sensor 센서는 정확히 한 가지 일을 하도록 설계된 특별한 유형의 오퍼레이터입니다 - 무언가가 발생할 때까지 기다립니다. 시간 기반이거나 파일 또는 외부 이벤트를 기다리는 것일 수 있지만 어떤 일이 발생할 때까지 기다렸다가 해당조건을 만족하면 다운스트림 작업(이후 Task)을 실행할 수 있습니다. https://airflow.apache.org/docs/apache-airflow/2.2.3/_api/airflow/sensors/index.html Sensor Task는 주기적으로 체크하면 다음 단계로 진행하지 못하고 대기모드로...","categories": ["workflow"],
        "tags": ["airflow"],
        "url": "/workflow/Airflow-Sensor/",
        "teaser": null
      },{
        "title": "Airflow TaskGroup",
        "excerpt":"Airflow TaskGroup 작업 그룹은 그래프 보기에서 작업을 계층적 그룹으로 구성하는 데 사용할 수 있습니다. 반복되는 패턴을 만들고 시각적 혼란을 줄이는 데 유용합니다.. 작업 그룹을 사용하려면 다음 import 문을 실행합니다. 기존 방식 TaskGroup from airflow.utils.task_group import TaskGroup decorator를 사용하는 경우 from airflow.decorators import task_group, task 첫 번째 예에서는 with 문을 사용하여...","categories": ["workflow"],
        "tags": ["airflow,TaskGroup"],
        "url": "/workflow/Airflow-Task-Group/",
        "teaser": null
      },{
        "title": "Airflow Hooks - MySQL",
        "excerpt":"Airflow Hooks - MySQL MySqlHook 예제입니다. from airflow import DAG from airflow.operators.python import PythonOperator from airflow.operators.empty import EmptyOperator from airflow.providers.mysql.hooks.mysql import MySqlHook # utils from airflow.utils.dates import days_ago from datetime import timedelta from tempfile import NamedTemporaryFile import csv, logging default_args = { 'start_date': days_ago(1), 'retries': 1, 'retry_delay': timedelta(minutes=5), 'schedule_interval': '@daily',...","categories": ["workflow"],
        "tags": ["airflow"],
        "url": "/workflow/Airflow-hooks-mysql/",
        "teaser": null
      },{
        "title": "Setup Apache Airflow on Docker",
        "excerpt":"Setup Apache Airflow on Docker Apache Airflow를 실습하기 위해서 개발환경을 구성하기 위해 docker를 이용합니다. laptop 이나 Server에 직접 설치하거나 방법도 있으나 학습의 목적으로 쉽고 이곳 저곳 설치하는 것 없이 docker를 이용하면 편리합니다. docker 환경 구성 docker-compose 설치 airflow docker-compose.yaml 파일 downalod 및 환경 구성 docker 환경구성을 위해 기본에는 Docker Desktop을...","categories": ["workflow"],
        "tags": ["airflow"],
        "url": "/workflow/setup-apache-airflow-on-docker/",
        "teaser": null
      },{
        "title": "Docker 기반 Bitbucket 설치",
        "excerpt":"Bitbucket on Docker Docker 기반 Bitbucket 입니다. version: '3' networks: jenkins-net: driver: bridge services: bitbucket: container_name: bitbucket image: atlassian/bitbucket-server:latest environment: - 'BITBUCKET_PROXY_PORT=' - 'BITBUCKET_PROXY_SCHEME=' - 'BITBUCKET_DELAYED_START=' - 'DOCKER_WAIT_HOST=postgres' - 'DOCKER_WAIT_PORT=5432' networks: - jenkins-net ports: - \"8990:7990\" postgres: container_name: postgres image: postgres:latest volumes: - ./data:/var/lib/postgresql/data environment: - 'POSTGRES_USER=postgres' # CHANGE THE...","categories": ["docker"],
        "tags": ["bitbucket"],
        "url": "/docker/altassian-bitbucket-jira/",
        "teaser": null
      },{
        "title": "Docker 기반 Jira 설치",
        "excerpt":"Jira on Docker Docker 기반 Jira 입니다. version: '3' networks: jenkins-net: driver: bridge services: jira: container_name: jira image: atlassian/jira-software:latest networks: - jenkins-net ports: - \"9010:8080\" postgres: container_name: postgres image: postgres:latest volumes: - ./data:/var/lib/postgresql/data environment: - 'POSTGRES_USER=postgres' # CHANGE THE PASSWORD! - 'POSTGRES_PASSWORD=admin1234' - 'POSTGRES_DB=jira' - 'POSTGRES_ENCODING=UTF8' networks: - jenkins-net ports:...","categories": ["docker"],
        "tags": ["jira"],
        "url": "/docker/altassian-jira/",
        "teaser": null
      },{
        "title": "Install MiniKube for Jenkins",
        "excerpt":"Pre-requisites - Install Docker yum utils을 설치합니다. sudo yum install -y yum-utils Docker repository 정보를 download 받습니다. sudo yum-config-manager \\ --add-repo \\ https://download.docker.com/linux/centos/docker-ce.repo 최신 버전의 Docker Engine, containerd를 설치하거나 다음 단계로 이동하여 특정 버전을 설치합니다. sudo yum install -y docker-ce docker-ce-cli containerd.io docker를 시작합니다. sudo systemctl start docker docker daemon이...","categories": ["kubernetes"],
        "tags": ["minikube"],
        "url": "/kubernetes/install-minikube/",
        "teaser": null
      },{
        "title": "Docker Engine 설치 on Centos7",
        "excerpt":"JFrog on Docker Centos7 기반 Docker Engine을 설치합니다. Step 1: Upgrade OS package dnf upgrade -y Step 2 : Install Docker engine sudo yum install -y yum-utils Docker CE repsoitory정보를 download 합니다. sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo For Docker CE edition: yum install -y docker-ce docker-ce-cli containerd Docker 를 시작합니다. sudo...","categories": ["docker"],
        "tags": ["docker","docker-compose"],
        "url": "/docker/docker/",
        "teaser": null
      },{
        "title": "Docker 기반 JFrog 설치",
        "excerpt":"JFrog on Docker Docker 기반 JFrog를 설치합니다. Step 1: Install Docker Engine on Centos7 Docker 설치 방법은 다음을 참고하세요. https://docs.docker.com/engine/install/ Step 2 : JFrog Artifactory Docker Image 를 download For CE edition: docker pull docker.bintray.io/jfrog/artifactory-cpp-ce docker images docker images \"*/jfrog/*\" ------------------------------------------------------------------------------------------- REPOSITORY TAG IMAGE ID CREATED SIZE docker.bintray.io/jfrog/artifactory-cpp-ce latest 82ca33a84e75...","categories": ["docker"],
        "tags": ["JFrog"],
        "url": "/docker/jfrog/",
        "teaser": null
      },{
        "title": "Nexus 설치 using docker",
        "excerpt":"Sonartype Nexus on Docker Centos7 기반 Docker Engine을 설치합니다. 성 Step 1: docker-compose 파일 작성 nexus container 의 데이터를 저장할 폴더를 생성합니다. mkdir ./nexus-data vi editor 로 docker-compose.yaml 파일을 아래와 같이 작성합니다. vi docker-compose.yaml version: '3.7' services: nexus3: image: sonatype/nexus3 restart: unless-stopped container_name: nexus3 # privileged: true user: root volumes:...","categories": ["docker"],
        "tags": ["nexus"],
        "url": "/docker/nexus/",
        "teaser": null
      },{
        "title": "리모트 서버에서 Harbor 서버에 docker login",
        "excerpt":"리모트 서버에서 Harbor 서버에 docker login 리모트 서버는 Centos7을 기준으로 합니다. Harbor Container Registry를 구축하고 리모트 서버에서 docker login 하기 위해 환경을 설정합니다. Step 1: Setup Docker Engine Docker Engine 설치는 아래 링크를 따라 설치과정을 참고해주세요 Docker Engine 설치 Step 2 : JFrog Artifactory Docker Image 를 download hosts file...","categories": ["docker"],
        "tags": ["Harbor"],
        "url": "/docker/%EB%A6%AC%EB%AA%A8%ED%8A%B8-%EC%84%9C%EB%B2%84%EC%97%90%EC%84%9C-Harbor-%EC%97%90-%EB%A1%9C%EA%B7%B8%EC%9D%B8%ED%95%98%EA%B8%B0/",
        "teaser": null
      },{
        "title": "Harbor로 Docker Private Registry 구축하기",
        "excerpt":"Harbor 로 Docker Private Registry 구축하기 Harbor는 Offline Install과 Online Install 두 가지 방식으로 설치를 지원하고 있습니다. 이 실습에서는 Offline Install 을 기준으로 설치하도록 합니다. Harbor는 아래 github 사이트에 릴리즈 정보를 확인하고 download 받습니다. Harbor 설치 Step 1: Root CA Certificates 생성 Docker Engine 설치는 아래 링크를 따라 설치과정을 참고해주세요...","categories": ["docker"],
        "tags": ["Harbor"],
        "url": "/docker/Harbor%EB%A1%9C-Private-Registry-%EA%B5%AC%EC%84%B1%ED%95%98%EA%B8%B0/",
        "teaser": null
      },{
        "title": "Private Gitlab Repository 구성하기",
        "excerpt":"Gitlab-CE 설치하기 git repository로 public 으로 사용할 수 있는 대표적인 것 중 하나가 github와 gitlab입니다. gitlab은 Gitlab-CE 로 기업의 Private 환경에 git 소스 Repository로 구성이 가능합니다. 상용 솔루션으로 Bitbucket도 많이 사용하지만 오픈소스 무료 솔루션으로 구성할 수도 있습니다. Step 1 : Gitlab을 위한 Pre-requisites package 설치 gitalb-ce 를 설치하기 위한 사전...","categories": ["devops"],
        "tags": ["gitlab"],
        "url": "/devops/gitlab-ce/",
        "teaser": null
      },{
        "title": "Nexus를 docker container repository로 사용하기",
        "excerpt":"Nexus를 docker container repository로 사용하기 Nexus를 docker container image의 repository로 사용하는 위한 설정입니다. Harbor 같은 전용 Docker container Registry로 사용하는 Open Source 솔루션도 있으나 애플리케이션 수가 몇개 되지 않는 것은 Nexus를 Container Image Repository로 사용할 수 있습니다. Nexus 설치는 블로그 목록을 참고해 주시고, 설정이 끝나고 추가적으로 container Image Repository를 추가하는...","categories": ["devops"],
        "tags": ["nexus","podman"],
        "url": "/devops/push-container-image-to-nexus/",
        "teaser": null
      },{
        "title": "Tekton 설치",
        "excerpt":"Tekton 설치 Tekton pipeline을 Kubernetes에 설치합니다. kubectl apply --filename https://storage.googleapis.com/tekton-releases/pipeline/latest/release.yaml 터미널 화면을 신규로 더 실행하여, 신규 터미널에서 tekton pipeline 설치를 확인하기 위해 다음의 명령어를 실행합니다. kubectl get pods --namespace tekton-pipelines -w Tekton dashboard 설치 tekton pipeline, task를 실행되는 WEB UI를 통해 보고자 하는 경우 tekton dashboard를 활용하여 현재 설치되어 있는...","categories": ["devops"],
        "tags": ["tekton"],
        "url": "/devops/tekton-installation/",
        "teaser": null
      },{
        "title": "Nginx proxy로 리모트 Minikube 연결",
        "excerpt":"Setup Minikube on minikube server Minikube는 로컬 머신에 VM을 생성하고 하나의 노드만 포함하는 경량의 클러스터를 배포하는 쿠버네티스 입니다. Minikube는 Linux, macOS 및 Windows 시스템에서 사용할 수 있습니다. Minikube가 작동하려면 하이퍼바이저(버추얼 박스 또는 KVM)가 필요하지만 이미 가상 머신 내부에 있는 경우 none 드라이버를 사용하여 추가 VM 계층 생성을 건너뛸 수 있습니다...","categories": ["kubernetes"],
        "tags": ["minikube"],
        "url": "/kubernetes/access-a-remote-minikube/",
        "teaser": null
      },{
        "title": "Install kind for Jenkins",
        "excerpt":"Pre-requisites : Install docker engine docker engine 설치는 docker engine 설치 글을 참조해 주세요. Step 1 : Download kind binary kind binary를 download 받습니다. curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.17.0/kind-linux-amd64 chmod +x ./kind sudo mv ./kind /usr/local/bin/kind Step 2 : config 파일 작성성 Kind를 이용하여 Kubernetes Cluster를 생성하기 위해 jenkins-config.yaml 파일을 아래와...","categories": ["kubernetes"],
        "tags": ["kind"],
        "url": "/kubernetes/install-kind/",
        "teaser": null
      },{
        "title": "Nginx proxy 리모트 kind cluster 접근",
        "excerpt":"사전설치환경 구성 kind를 구성하기 위해 docker를 설치합니다. docker engine 설치 blog posting을 확인하세요. Setup on kind cluster server kind 로컬 머신에 VM을 생성하고 하나의 노드만 포함하는 경량의 클러스터를 배포하는 쿠버네티스 입니다. kind는 Linux, macOS 및 Windows 시스템에서 사용할 수 있습니다. Kind가 작동하려면 하이퍼바이저(버추얼 박스 또는 KVM)가 필요하지만 이미 가상 머신...","categories": ["kubernetes"],
        "tags": ["kind"],
        "url": "/kubernetes/access-a-remote-kind/",
        "teaser": null
      },{
        "title": "kind 에 dashboard 설치하기",
        "excerpt":"Dashboard 설치 kind를 사용하여 Kubernetes cluster를 구성하고 dashboard를 구성합니다. dashboard는 다음과 같이 remote에 있는 yaml을 직접적용합니다. kubectl apply -f kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.7.0/aio/deploy/recommended.yaml port-forward로 port 오픈 port-forward를 합니다. kubectl port-forward svc/kubernetes-dashboard -n kubernetes-dashboard 443 --address 0.0.0.0 chrome 중앙의 to get chrome’s 를 클릭하고 thisisunsafe를 입력하고 enter를 누릅니다. 그러면 다음과 가이...","categories": ["kubernetes"],
        "tags": ["kind"],
        "url": "/kubernetes/install-dashboard-for-kind/",
        "teaser": null
      },{
        "title": "Jenkins 설치 따라하기",
        "excerpt":"Jenkins Pipeline 이란? Jenkins Pipeline은 지속적인 업데이트 파이프라인을 구현하고 Jenkins에 통합하는 것을 지원하는 플러그인의 집합이다. 이 과정에서 소프트웨어를 빌드하고 여러 단계의 테스트, 배포를 진행한다. Pipeline은 Pipeline Domain Specific Language라는 문법을 통해 마치 코드를 작성하는 것과 같이 Pipeline을 통해 간단한 배포 파이프라인부터 복잡한 배포 파이프라인을 코드로 모델링하기 위한 확장 가능한 도구...","categories": ["devops"],
        "tags": ["jenkins"],
        "url": "/devops/setup-jenkins/",
        "teaser": null
      },{
        "title": "Jenkins 시작",
        "excerpt":"Start-up Jenkins Jenkins server에 접속하기 brower에서 해당 서버의 http://localhost:8080 포트 접속합니다. Jenkins에 접속하면 Jenkins admin 초기 패스워드를 입력하는 화면이 출력됩니다 터미널에서 다음과 같이 명령을 수행하여 Jenkins admin 초기 로그인 비밀번호를 확인하고, 초기 패스워드를 입력합니다. cat /var/lib/jenkins/secrets/initialAdminPassword [수행결과] a0f289xxxxxxxxxcd8fbb7 Jenkins 패스워드 입력화면에 복사한 패스워드를 입력하고 Continue 버튼을 클릭하고, Install suggested plugins를...","categories": ["devops"],
        "tags": ["jenkins"],
        "url": "/devops/start-up-jenkins/",
        "teaser": null
      },{
        "title": "Jenkins Port 변경",
        "excerpt":"Jenkins Port 확인 및 복사 Jenkins Default Port를 확인하기 위해 아래와 같이 명령어를 실행합니다. systemctl edit jenkins --full JENKINS_PORT를 검색해서 아래의 내용을 clipboard에 복사합니다. Environment=\"JENKINS_PORT=8080\" Jenkins Port 변경 jenkins.service 파일에서 Environment의 JENKINS_PORT=9080으로 변경합니다. systemctl edit jenkins.service Environment=\"JENKINS_PORT=9080\" systemctl daemon-reload systemctl restart jenkins 위에서 지정한 Port로 접속해서 Port가 변경된 것을 확인합니다....","categories": ["devops"],
        "tags": ["jenkins"],
        "url": "/devops/change-jenkins-port/",
        "teaser": null
      },{
        "title": "Jenkins-Grafana 설정",
        "excerpt":"Grafana 로그인 Grafana에 로그인하고, 비밀번호를 변경합니다. Prometheus 설정 Grafana에 로그인하면 다음과 같이 화면이 출력됩니다. 설정을 선택하고, Grafana에 datasource를 추가하기 위해 Add data source를 클릭합니다. Prometheus datasource를 선택합니다. Prometheus datasource를 설정합니다. Prometheus save-test 버튼을 클릭하면 Data source is working 메시지를 출력됩니다. ![gitlab-ce](/assets/images/jenkins/07-grafana-prometheus-save-test.png Jenkins dashboard 선택 https://grafana.com/grafana/dashboards/ 에서 download jenkins dashboard를 선택합니다....","categories": ["devops"],
        "tags": ["jenkins","prometheus","grafana"],
        "url": "/devops/grafana-setup/",
        "teaser": null
      },{
        "title": "Jenkins 서버 재시작 방법",
        "excerpt":"Jenkins Port 확인 및 복사 Jenkins 를 재시작하는 방법은 3가지 있습니다. systemctl 사용 browser에서 restart browser에서 safeRestart Systemctl 사용 systemctl 명령어로 사용하는 경우 Jenkins Job이 실행중인 것이 있더라도 jenkins를 즉시 재시작합니다. Jenkins 가 재시작 이후 그존 실행중인 job은 다시 재개합니다. systemctl restart jenkins browser에서 restart Jenkins를 로그인 해서 browser url에서...","categories": ["devops"],
        "tags": ["jenkins"],
        "url": "/devops/how-to-restart-jenkins/",
        "teaser": null
      },{
        "title": "Jenkins Kubernetes Plugin 설치 및 환경구성",
        "excerpt":"Jenkins Kubernetes Plugin 설치 Jenkins Agent로 Kubernetes에 실행하기 위해 Kubernetes Plugin을 Jenkins에 설치하여 환경을 구성합니다. Jenkins UI에서 Manage Jenkins &gt; System Configuration &gt; Manage Plugins &gt;Available plugins 메뉴를 클릭합니다 Plugins 검색 입력 필드에서 Kubernetes 입력하고 다음과 같은 첫번째 Kubernetes [V] 선택, 왼쪽 하단에 Install without restart 버튼을 클릭합니다 아래의 [v]...","categories": ["devops"],
        "tags": ["jenkins"],
        "url": "/devops/install-kubernetes-plugin/",
        "teaser": null
      },{
        "title": "Jenkins master/slave 구성",
        "excerpt":"Jenkins 설치 Jenkins Master/Slave는 Controller/Agent로 명칭을 수정해서 글을 post합니다. Jenkins 설치 따라하기를 참조해서 Jenkins를 설치합니다. Jenkins Agent 개요 Jenkins Pipeline을 remote Node에서 실행할 Agent를 추가합니다. Jenkins Agent는 다음과 같이 유형의 Agent가 있습니다. Server 기반의 Agent Docker Container Kubernetes Dynamic Pod Agent Server 기반 Agent도 JNLP 기반 Agent와 ssh 기반 Agent가...","categories": ["devops"],
        "tags": ["jenkins","master","slave"],
        "url": "/devops/jenkins-controller-and-agent/",
        "teaser": null
      },{
        "title": "Jenkins Pipeline 이란",
        "excerpt":"Jenkins Pipeline 이란 Jenkins Pipeline이란 Jenkins를 사용하여 CD 파이프라인울 구현하고 통합하는 것을 지원하는 플러그인의 집합입니다. Jenkins에 의해 정의된 모든 표준 Job을 하나의 script 작성되며 git 과 같은 repository 저장할 수 있습니다. 각 단계에 대해 여러 작업을 작성하는 대신 이제 전체 워크플로를 코딩하여 하나의 Jenkinsfile에 넣을 수 있습니다. 이러한 Pipeline을 작성하는...","categories": ["devops"],
        "tags": ["jenkins"],
        "url": "/devops/jenkins-pipeline/",
        "teaser": null
      },{
        "title": "Jenkins-Prometheus/Grafana 설치",
        "excerpt":"Jenkins 와 Prometheus/Grafana 여녜 Jenkins Controller와 Agent를 를 모너터링하기 위해 Prometheus Plugin을 설치하고 Jenkins에서 수집한 Metrics정보를 기반으로 Prometheus를 통해 Metrics 정보를 주시적으로 수집하고, 수집된 정보를 기반으로 Grafana에 Visual하게 모니터링합니다. Prometheus metrics plugin 설치 Manage Jenkins &gt; Manage Plugins &gt; Available Plugins에서 Prometheus metrics Plugins을 선택, Install without restart를 클릭해서 Plugin을...","categories": ["devops"],
        "tags": ["jenkins","prometheus","grafana"],
        "url": "/devops/jenkins-with-grafana/",
        "teaser": null
      },{
        "title": "Nginx as Reverse Proxy for Jenkins",
        "excerpt":"Jenkins를 Nginx Reverse Proxy를 설정하여 접근하는 것을 설명합니다. Nginx 설치 nginx를 설치하기 위해 사전에 필요한 package를 아래와 같이 설치합니다. yum install -y yum-utils yum install -y epel-release nginx를 설치합니다. yum install -y nginx nginx의 status를 확인합니다. ● nginx.service - The nginx HTTP and reverse proxy server Loaded: loaded (/usr/lib/systemd/system/nginx.service; disabled;...","categories": ["devops"],
        "tags": ["jenkins","nginx"],
        "url": "/devops/nginx-as-a-reverse-proxy-for-jenkins/",
        "teaser": null
      },{
        "title": "Helm 설치",
        "excerpt":"Helm CLI를  설치  Helm Chart를 설치하기 위해 Helm CLI를 설치합니다.   curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 chmod 700 get_helm.sh ./get_helm.sh  ","categories": ["kubernetes"],
        "tags": ["helm","헬치"],
        "url": "/kubernetes/install-helm/",
        "teaser": null
      },{
        "title": "podman에서 max_user_namespaces 에러",
        "excerpt":"podman 실행시 다음의 에러 해결   Podman run error in non-root mode: “user namespaces are not enabled in /proc/sys/user/max_user_namespaces”   Jenkins Pipeline에서 podman 실행시 다음의 에러가 발생할 떄  user namespaces are not enabled in /proc/sys/user/max_user_namespaces Error: could not get runtime: cannot re-exec process  다음의 링크를 참조합니다.   https://github.com/containers/podman/issues/7704  ","categories": ["devops"],
        "tags": ["jenkins","podman"],
        "url": "/devops/podman-max_user_namespaces/",
        "teaser": null
      },{
        "title": "mysql docker-compose 로 실행하기",
        "excerpt":"mysql docker-compose 파일 mysql docker-compose 파일입니다. mkdir -p data vi docker-compose.yaml version: \"3\" # 파일규격버전 services: db: # 서비스이름 image: mysql:8.0.23 # 이미지 container_name: mysql # 컨테이너 이름 ports: - \"3306:3306\" # 포트 설정 외부:내부 environment: MYSQL_ROOT_PASSWORD: \"1234qwer\" # 패스워드설정 MYSQL_DATABASE: \"demo\" MYSQL_USER: \"user00\" MYSQL_PASSWORD: \"admin1234\" command: - --character-set-server=utf8 #...","categories": ["docker"],
        "tags": ["mysql"],
        "url": "/docker/mysql-docker-compose/",
        "teaser": null
      },{
        "title": "docker-compose로 postgreSQL 실행",
        "excerpt":"PostgresSQL docker-compose 파일 새로운 응용 프로그램을 만들 때 PostgreSQL을 데이터베이스 엔진으로 자주 사용합니다. 빠르고 사용하기 쉬우 며 인터넷상의 거의 모든 프로그래밍 언어 및 플랫폼과 매우 잘 통합됩니다. Windows 시스템을 실행하지 않고 macOS 또는 Linux에서 PostgreSQL 데이터베이스를 실행해야하는 경우 Docker를 사용할 수 있습니다. 몇 가지 간단한 명령만으로 도커에서 PostgreSQL을 시작하는 것은...","categories": ["docker"],
        "tags": ["postgresSQL"],
        "url": "/docker/postgresql-docker-compose/",
        "teaser": null
      },{
        "title": "docker-compose로 redis standalone으로 실행",
        "excerpt":"Redis docker-compose 파일   redis docker-compose 파일입니다.   version: '3.7' services:     redis:       image: redis:alpine       command: redis-server --port 6379       container_name: redis       labels:         - \"name=redis\"         - \"mode=standalone\"       ports:         - 6379:6379   docker-compose.yaml 파일이 있는 곳에서 docker-compose를 실행합니다.  docker-compose up -d   ","categories": ["docker"],
        "tags": ["redis"],
        "url": "/docker/redis-docker-compose/",
        "teaser": null
      },{
        "title": "mac 에서 jdk switch",
        "excerpt":"jdk 11 or 8 switch   java 기반 개발을 하면서 jdk 다양한 버전이 필요해서 설치하는 경우 있습니다. jdk를 switch하고자 하는 경우 다음과 같이 .zshrc에 추가해서 사용합니다.   ~/.zshrc 파일을 editor로 열어서 다음과 같이 JAVA_HOME을 추가하면 됩니다.  vi ~/.zshrc export JAVA_HOME=`/usr/libexec/java_home -v 1.8`    .zshrc 다시 적용합니다.  source ~/.zshrc   ","categories": ["docker"],
        "tags": ["jdk","mac"],
        "url": "/docker/jdk-switch-on-mac/",
        "teaser": null
      },{
        "title": "배너 추가",
        "excerpt":"배너 파일 Springboot의 왼쪽 하단에 있는 dashboard tab에서 springboot를 시작하면 console 로그에 자신만의 로고를 출력하고 싶을 때가 있습니다. 이때 베너를 추가하는 방법에 설명합니다. 배너 생성 Springboot에서 배너를 추가하기 위해서 resources 폴더 하위에 banner.txt 파일을 생성해서 내용을 추가하면 springboot가 시작되면서 텍스트를 읽어 출력합니다. 배너 텍스트 생성 및 복사 아래의 배너 링크...","categories": ["springboot"],
        "tags": ["banner"],
        "url": "/springboot/banner/",
        "teaser": null
      },{
        "title": "MacOS openJDK 1.8 설치하기",
        "excerpt":"open jdk  mac에서 open jdk를 설치합니다   brew tap AdoptOpenJDK/openjdk  brew install --cask adoptopenjdk8  switch jdk 1.8 to 11  jdk를 여러 버전을 설치한 경우 jdk를 필요에 따라 switch하고자 하는 경우 다음과 같이 합니다.  vi로 ~/.zshrc 파일을 편집하고 아래의 항목을 추가합니다.  export JAVA_HOME=`/usr/libexec/java_home -v 1.8`   zsh profile을 적용합니다.  source ~/.zshrc  ","categories": ["springboot"],
        "tags": ["openjdk"],
        "url": "/springboot/mac-jdk-switch/",
        "teaser": null
      },{
        "title": "CacheMager 사용하여 data 캐시하는 방법",
        "excerpt":"cacheManager 의존성 추가 Springboot 에서 data를 Cache를 하고자 하는 경우 Solution을 시용하는 경우 Redis를 고려합니다. 그러나 Redis 를 사용할 정도의 애플리케이션 아닌 경우 Local Cache만으로 충분한 경우 Singleton 패턴으로 구현할 수도 있지만 이미 만들어진 CacheManager를 사용하면 편리합니다. Springboot에서 cacheManager를 사용하기 위해서 maven 빌드 환경에서 pom.xml에 아래의 의존성을 추가합니다. &lt;dependency&gt; &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;...","categories": ["springboot"],
        "tags": ["cacheManager"],
        "url": "/springboot/how-to-cache-data-from-db-in-springboot/",
        "teaser": null
      },{
        "title": "load-on-startup",
        "excerpt":"load-on-startup  Springboot 시작시 첫 호출이 느린 경우 application.yml에 해당 내용 추가 합니다.   application.yml 파일입니다.  spring:   mvc:     servlet:       load-on-startup: 1  ","categories": ["springboot"],
        "tags": ["load-on-startup"],
        "url": "/springboot/springboot-load-on-startup/",
        "teaser": null
      },{
        "title": "Mybatis에 멀티 로우 insert or update",
        "excerpt":"Mybatis 한번에 여러건 Insert or Update Mybatis에서 한번에 여러건의 데이터를 insert 또는 update하기 기능을 Mybatis는 이를 지원하고 있다. 이 기능을 이용하여 약간의 성능에 도움을 받을 수 있습니다. Mybatis에서 여러건의 데이터를 Insert or Update 예제입니다. 다음은 Controller 입니다. @Slf4j @RestController public class HelloController { @Autowired private SampleUserDao sampleUserDao; @ApiOperation(value=\"bulkload\") @PostMapping(value=\"/users/bulkload\") public...","categories": ["springboot"],
        "tags": ["mybatis"],
        "url": "/springboot/upsert-mybatis-multi-row/",
        "teaser": null
      },{
        "title": "AOP(Aspect Oriented Programming) 구성요소",
        "excerpt":"AOP 구성요소 특정지정에 제어하고 싶은 대상에 제어하고자 하는 기능을 구현하는 AOP에 대해 알아보았습ㄴ다. 이번에는 좀더 용어에 대해 상세하게 알아보겠습니다. AOP의 구성요소는 Aspect Advice PointCut JoinPoint 로 되어 있습니다. Aspect Aspect는 AspectConfig 기능처럼 제어하고자 하는 모듈의 묶음을 의미하며, 이를 위해 어노테이션 @Aspect를 추가합니다. Advice Advice는 특정 지점에서 trigger 되었을 때 실행되는...","categories": ["springboot"],
        "tags": ["aop"],
        "url": "/springboot/aop-2/",
        "teaser": null
      },{
        "title": "AOP(Aspect Oriented Programming) 예시",
        "excerpt":"AOP 예시 @Aspect public class AspectConfig { @Pointcut(\"@annotation(org.springframework.web.bind.annotation.GetMapping)\") public void getMapping() { } @Pointcut(\"@annotation(org.springframework.web.bind.annotation.PostMapping)\") public void postMapping() { } @Pointcut(\"@annotation(org.springframework.web.bind.annotation.RequestMapping)\") public void requestMapping() { } @Pointcut(\"execution(* com.demo.microservices..*.*Service.*(..))\") public void serviceExcution() { } @Around(value=\"serviceExcution()\") public Object around(ProceedingJoinPoint pjt) throws Throwable { log.info(\"------------- Around logging Start -------------\"); Object retValue = null; try...","categories": ["springboot"],
        "tags": ["aop"],
        "url": "/springboot/aop-examples/",
        "teaser": null
      },{
        "title": "AOP(Aspect Oriented Programming) PointCut 표현식",
        "excerpt":"PointCut 의 표현식 리턴타입 패키지경로 클래스지정 메소드지정 예시) execution(* com.demo.microservices..*.*Controller.*(..)) execution(* com.demo.microservices..*.*Service.*(..)) JoinPoint PointCut Spec execution * com.demo.microservices..*.*Controller.*(..) ) 리턴타입 패키지 클래스명 매소드명 매개변수 * com.demo.microservices..*. *Controller. *(..) )   리턴타입 : * : 모든 리턴타입 허용 void : 리턴타입이 void인 메소드 선택 !void : 리턴타압이 void가 아닌 메소드 선택...","categories": ["springboot"],
        "tags": ["aop","pointcut"],
        "url": "/springboot/aop-pointcut-detail/",
        "teaser": null
      },{
        "title": "AOP(Aspect Oriented Programming) PointCut",
        "excerpt":"PointCut 의 이해 어느 시점(Operation or method)에 AOP 모듈을 trigger할지 정의하는 JoinPoint의 상세 스펙 또는 표현식(Expression) 으로 설명하였습니다. 아래 그림으로 표현하다면 주황색의 내용으로 이해하면 좋을 것 같습니다. 주황색 유형 : JoinPoint 주황색 표현식(E) : PointCut 주황색 내용 : Advice JoinPoint 설명 execution 메소드 실행 조인 포인트를 매칭한다. 스프링 AOP에서 가장...","categories": ["springboot"],
        "tags": ["aop","pointcut"],
        "url": "/springboot/aop-pointcut/",
        "teaser": null
      },{
        "title": "AOP(Aspect Oriented Programming) 란?",
        "excerpt":"AOP 개요 AOP 란 관점 지향 프로그래밍입니다. 처음에 관점 지향이라고 하면 쉽게 머리속에 그려지지 않습니다. 개발을 하면서 layer 아래와 같이 Three layer로 구성하여 구현할 때 layer별로 아래와 같은 기능을 처리해야 하는 경우 logging security 에러 공통처리 등 Filter나, Intereptor, AOP를 고려합니다. AOP는 가장 상세하게 처리를 제어할 수 있습니다. 다시 본론으로...","categories": ["springboot"],
        "tags": ["aop"],
        "url": "/springboot/aop/",
        "teaser": null
      },{
        "title": "AOP vs Interceptor vs Filter - Filter",
        "excerpt":"AOP vs Interceptor vs Filter AOP 를 내용을 살펴보면 Interceptor 와 Filter에 대해 궁금해질 것입니다. AOP와 Interceptor, Filter의 역할에 대해 간략하게 알아보기 위해 아래의 그램으로 표현하였습니다. Filter 란? 필터는 J2EE 표준 스펙으로 서블릿에 요청이 전달되기 전/후에 url 패턴에 맞는 모든 요청에 대해 원하는 처리를 할 수 있는 기능을 제공합니다. DispatcherServlet...","categories": ["springboot"],
        "tags": ["aop","filter","interceptor"],
        "url": "/springboot/filter-interceptor-aop/",
        "teaser": null
      },{
        "title": "Filter in springboot",
        "excerpt":"spring을 사용한 Filter Springboot를 이용한 filter를 사용하는 방법입니다. 이전에 GlobalLoggingFilter에서 @Component를 제거하여 이중으로 Bean이 등록되는 것을 피하고, Springboot에서 제공하는 FilterRegistrationBean 사용하여 Bean으로 등록합니다. @Slf4j public class GlobalLoggingFilter implements Filter { @Override public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException { log.info(\"-------------------전 처리-------------------\"); ContentCachingRequestWrapper req = new ContentCachingRequestWrapper((HttpServletRequest)...","categories": ["springboot"],
        "tags": ["aop","filter","interceptor"],
        "url": "/springboot/filter-using-spring/",
        "teaser": null
      },{
        "title": "인터셉터(Interceptor) 예시",
        "excerpt":"인터셉터의 사용예시 HandlerInterceptor를 구현한 MyHandler 입니다. @Component @Slf4j public class MyHandler implements HandlerInterceptor { public static final String LOG_ID = \"logId\"; private void readBody(final HttpServletRequest request) { String reqBody = (String) request.getAttribute(\"requestBody\"); /* * reqBody 값을 읽어 임의 처리. */ log.info(\"reqBody:{}\", reqBody); } public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object...","categories": ["springboot"],
        "tags": ["Interceptor"],
        "url": "/springboot/interceptor-example/",
        "teaser": null
      },{
        "title": "인터셉터(Interceptor) 란?",
        "excerpt":"인터셉터의 이해 인터셉터는 “무엇인가를 가로챈다”라는 의미입니다. Filter가 실행된 이후 인터셉터는 Controller가 호출 전/후에 무엇인가 제어 하고자할 때 사용합니다. 그리고 Filter가 WebContainer에서 동작하는 반면에 인터셉터는 Spring Container에서 동작하는 차이점이 있습니다. 대표적인 사용 목적은 logging과 인증처리에 많이 사용합니다. HandlerInterceptor를 구현 preHandle postHandle afterCompletion preHandle Controller의 메서드에 매핑된 특정 URI가 호출됐을 때 실행되는...","categories": ["springboot"],
        "tags": ["Interceptor"],
        "url": "/springboot/interceptor/",
        "teaser": null
      },{
        "title": "ArgumentResolver",
        "excerpt":"ArgumentResolver Http Request를 제어 또는 가공(Decrpt)할 수 있는 또 하나의 영역중 하나가 바로 ArgumentResolver 입니다. ArgumentRoslver는 Request 데이터를 가공하여 Constroller에 전달하고 싶을 때 사용합니다. 제어할 때상으로는 아래와 같은 유형을 대상으로 ArgumentResolver를 적용할 수 있습니다. 적용대상 Controller Annotation 이용 Argument Type 등 HandlerMethodArgumentResolver 상속하여 구현 ArgumentResolver를 이용하여 Http 요청의 데이터를 가공하고...","categories": ["springboot"],
        "tags": ["Resolver"],
        "url": "/springboot/argumentResolver/",
        "teaser": null
      },{
        "title": "Http 요청을 복호화하여 Controller에 전달하기 - RequestBodyAdvice",
        "excerpt":"화 RequestBodyAdvice Http Request를 제어 또는 가공(Decrpt)할 수 있는 또 하나의 영역중 하나가 바로 RequestBodyAdvice 입니다. ArgumentRoslver는 RestController에는 약간의 제약사항이 있으나 RequestBodyAdvice는 그러한 제약사항이 없습니다. 적용하는 방법은 ArgumentResolver와 유사하고 점도 섬세한 제어가 가능합니다. RequestBodyAdvice를 상속받아 구현 Http 요청을 했을 때 body 데이터를 제어하고자 할 떄 RequestBodyAdvice를 상속받아 아래와 같이 3개의...","categories": ["springboot"],
        "tags": ["Advice"],
        "url": "/springboot/requestbodyadvisor/",
        "teaser": null
      },{
        "title": "Controller에서 응답을 암호화하여 내보내기 - ResponseBodyAdvice",
        "excerpt":"ResponseBodyAdvice Http Response를 제어 또는 가공(Decrpt)할 수 있는 또 하나의 영역중 하나가 바로를 ReponseBodyAdvice 입니다. ReturnValueHandler는 RestController에는 적용할 수 없습니다. RequestBodyAdvice는 그러한 제약사항이 없습니다. 적용하는 방법은 RequestBodyAdvice와 유사합니다. ResponseBodyAdvice를 상속받아 구현 Http 요청을 했을 때 body 데이터를 제어하고자 할 떄 RequestBodyAdvice를 상속받아 아래와 같이 3개의 Method를 구현해야 합니다. public boolean...","categories": ["springboot"],
        "tags": ["Advice"],
        "url": "/springboot/responsebodyadvice/",
        "teaser": null
      },{
        "title": "Docker을 이용하여 Jupyter 실행",
        "excerpt":"Run Jupyter using docker   Docker 기반 Jupyter 실행  유형1  docker run -it --rm -p 10000:8888 -v \"${PWD}\":/home/jovyan/work jupyter/datascience-notebook   유형2  docker run -p 10000:8888 jupyter/scipy-notebook   Run Jupyter using docker-compose  docker-compose를 사용하여 Jupyter를 실행합니다.   version: \"3.9\"  services:   jupyter:     container_name: jupyter     image: jupyter/datascience-notebook     ports:       - \"10000:8888\"     volumes:       - ${PWD}:/home/jovyan/work  ","categories": ["docker"],
        "tags": ["Jupyter"],
        "url": "/docker/jupyter/",
        "teaser": null
      },{
        "title": "DTO에서 null인 항목은 json에서 제거",
        "excerpt":"DTO에서 null인 항목은 json에서 제거  @ToString @Getter @Setter public class CodeDto {     private int code;      @JsonInclude(Include.NON_NULL)     private String codeName; }  ","categories": ["springboot"],
        "tags": ["Advice"],
        "url": "/springboot/remove-null-dto/",
        "teaser": null
      },{
        "title": "Redis 시작하기 - Jupyter Notebook",
        "excerpt":"Jupyter Notebook을 환경에서 Python을 이용하여 Redis를 알아봅니다. redis-py를 이용하여 redis를 연결하고, 다음과 같이 데이터를 set/get을 수행하여 결과를 확인합니다.  Connect  import redis  redisClient = redis.Redis(host='localhost', port=6379, decode_responses=True)  redisClient.set('foo', 'bar') redisClient.get('foo')      ","categories": ["cache"],
        "tags": ["redis","jupyter"],
        "url": "/cache/getting-starting-jupyter/",
        "teaser": null
      },{
        "title": "Redis 시작하기 - Jupyter Notebook 설치",
        "excerpt":"Jupyter Notebook을 이용하여 Redis를 실습할 수 있는 환경을 구성합니다. Setup Redis on Docker 설치형 redis를 하지않고 학습용으로 최적의 환경인 docker를 사용하여 간단히 Redis를 실행합니다. 아래의 docker-compose.yaml 파일을 작성하고 작성된 폴더위치에서 다음과 같이 docker-compose를 실행하여 redis를 실행합니다. 그러면 redis docker image를 pull 받아서 background로 실행합니다. version: '3.7' services: redis: image: redis:alpine...","categories": ["cache"],
        "tags": ["redis","jupyter"],
        "url": "/cache/setup-jupyter/",
        "teaser": null
      },{
        "title": "Redis 시작하기 - Redis Key 규칙",
        "excerpt":"기본 Redis 데이터 형식 및 사용 방법 다음은 Redis CLI를 사용하여 핵심 Redis 데이터 유형을 학습하는 실습 자습서입니다. 데이터 형식에 대한 일반적인 개요는 데이터 형식 소개를 참조하세요. Keys Redis 키는 바이너리로부터 안전하므로 “foo”와 같은 문자열에서 JPEG 파일의 내용에 이르기까지 모든 바이너리 시퀀스를 키로 사용할 수 있습니다. 빈 문자열도 유효한 키입니다....","categories": ["cache"],
        "tags": ["redis","jupyter"],
        "url": "/cache/naming-rule/",
        "teaser": null
      },{
        "title": "Redis 시작하기 - Redis Persistence",
        "excerpt":"Redis persistence Redis가 디스크에 데이터를 쓰는 방법 지속성은 SSD(반도체 디스크)와 같은 내구성 있는 스토리지에 데이터를 쓰는 것을 말합니다. Redis는 다양한 지속성 옵션을 제공합니다. 여기에는 다음이 포함됩니다. RDB (Redis Database): RDB 지속성은 지정된 간격으로 데이터 세트의 특정 시점 스냅샷을 수행합니다. AOF (Append Only File): AOF 지속성은 서버에서 받은 모든 쓰기 작업을...","categories": ["cache"],
        "tags": ["redis"],
        "url": "/cache/redis-persistence/",
        "teaser": null
      },{
        "title": "Redis 시작하기 - Redis 데이터타입",
        "excerpt":"Redis는 일반 키-값 저장소가 아니라 실제로 다른 종류의 값을 지원하는 데이터 구조 서버입니다. 기존 키-값 저장소에서는 문자열 키를 문자열 값에 연결했지만 Redis에서는 값이 단순한 문자열로 제한되지 않고 더 복잡한 데이터 구조를 지원할 수 있습니다. 다음은 Redis에서 지원하는 모든 데이터타입 목록입니다. Binary-safe strings. Lists Sets Sorted sets Hashes Bit arrays (or...","categories": ["cache"],
        "tags": ["redis"],
        "url": "/cache/datatype/",
        "teaser": null
      },{
        "title": "Redis 시작하기 - Bitmap",
        "excerpt":"Bitmaps 비트맵은 실제 데이터 형식이 아니라 String 형식에 정의된 비트 지향 작업 집합입니다. 문자열은 이진 안전 Blob이고 최대 길이는 512MB이므로 최대 2^32비트를 설정하는 데 적합합니다. 비트 연산은 두 그룹으로 나뉩니다: 비트를 1 또는 0으로 설정하거나 값을 가져오는 것과 같은 상수 시간 단일 비트 연산과 비트 그룹에 대한 연산(예: 지정된 비트...","categories": ["cache"],
        "tags": ["redis"],
        "url": "/cache/bitmap/",
        "teaser": null
      },{
        "title": "Redis 시작하기 - Sorted Sets",
        "excerpt":"Sorted Sets 정렬된 집합은 Set과 해시 간의 혼합과 유사한 데이터 유형입니다. 집합과 마찬가지로 정렬된 집합은 반복되지 않는 고유한 문자열 요소로 구성되므로 어떤 의미에서는 정렬된 집합도 집합입니다. 그러나 집합 내의 요소는 정렬되지 않지만 정렬 된 집합의 모든 요소는 score라고하는 부동 소수점 값과 연결됩니다 (모든 요소가 값에 매핑되기 때문에 유형이 해시와 유사한...","categories": ["cache"],
        "tags": ["redis","jupyter"],
        "url": "/cache/sorted-sets/",
        "teaser": null
      },{
        "title": "Redis 시작하기 - Set",
        "excerpt":"Sets Redis 집합은 순서가 지정되지 않은 문자열 컬렉션입니다. SADD 명령은 세트에 새 요소를 추가합니다. 주어진 요소가 이미 존재하는지 테스트, 여러 집합 간의 교차, 합집합 또는 차이 수행 등과 같은 집합에 대해 여러 가지 다른 작업을 수행 할 수도 있습니다. &gt; sadd myset 1 2 3 (integer) 3 &gt; smembers myset...","categories": ["cache"],
        "tags": ["redis","jupyter"],
        "url": "/cache/set/",
        "teaser": null
      },{
        "title": "Redis 시작하기 - Hashes",
        "excerpt":"Hashes Redis 해시는 필드-값 쌍을 사용하여 “해시”가 어떻게 보이는지 정확히 보여줍니다.: &gt; hset user:1000 username antirez birthyear 1977 verified 1 (integer) 3 &gt; hget user:1000 username \"antirez\" &gt; hget user:1000 birthyear \"1977\" &gt; hgetall user:1000 1) \"username\" 2) \"antirez\" 3) \"birthyear\" 4) \"1977\" 5) \"verified\" 6) \"1\" 해시는 객체를 나타내는...","categories": ["cache"],
        "tags": ["redis","jupyter"],
        "url": "/cache/hashes/",
        "teaser": null
      },{
        "title": "Redis 시작하기 - List",
        "excerpt":"List List 데이터 유형을 설명하려면 List라는 용어가 정보 기술 담당자에 의해 부적절한 방식으로 자주 사용되기 때문에 약간의 이론으로 시작하는 것이 좋습니다. 예를 들어 “파이썬 목록”은 이름이 암시하는 것 (연결 목록)이 아니라 배열 (실제로 Ruby에서는 동일한 데이터 유형을 배열이라고 함)입니다. 매우 일반적인 관점에서 List는 정렬된 요소의 시퀀스일 뿐입니다: 10,20,1,2,3은 목록입니다. 그러나...","categories": ["cache"],
        "tags": ["redis"],
        "url": "/cache/list/",
        "teaser": null
      },{
        "title": "Redis 시작하기 - String",
        "excerpt":"Strings Redis 문자열 유형은 Redis 키와 연결할 수 있는 가장 간단한 값 유형입니다. Memcached의 유일한 데이터 유형이므로 신규 사용자가 Redis에서 사용하는 것도 매우 자연스러운 일입니다. Redis 키는 문자열이므로 문자열 유형도 값으로 사용할 때 문자열을 다른 문자열에 매핑합니다. 문자열 데이터 형식은 HTML 조각 또는 페이지 캐싱과 같은 다양한 사용 사례에 유용합니다....","categories": ["cache"],
        "tags": ["redis","jupyter"],
        "url": "/cache/string/",
        "teaser": null
      },{
        "title": "Redis 시작하기 - Redis 설치(Centos)",
        "excerpt":"Redis 설치 준비 Redis를 다음의 절차로 설치합니다. OS 업데이트 Development Tools 설치 redis download redis build redis install Centos7 OS 버전을 최신으로 업그레이드 하고, Development Tools를 설치합니다. Redis download site 에 가서 원하는 redis 를 확인하고 address link를 복사합니다. sudo yum update -y yum groupinstall 'Development Tools' sudo wget http://download.redis.io/releases/redis-7.0.10.tar.gz...","categories": ["cache"],
        "tags": ["redis"],
        "url": "/cache/install-redis/",
        "teaser": null
      },{
        "title": "Redis 시작하기 - Redis Sentinel 구성",
        "excerpt":"Redis Sentinel 소개 Redis Sentinel은 Redis의 고가용성 구성을 위한 아키텍처입니다. Sentinel은 Redis를 모니터링하고 master node가 장애가 발생시 알리고 자동으로 장애 조치할 수 있는 여러 Redis 인스턴스를 관리하기 위한 redis 컴포넌트입니다. Redis Sentinel 역할 Redis Sentinel은 Redis의 여러 인스턴스를 모니터링 및 관리하며 아래 3가지 역할을 수행하니다. redis 인스턴스 모니터링 : Sentinel은...","categories": ["cache"],
        "tags": ["redis","sentinel"],
        "url": "/cache/setup-sentinel-redis/",
        "teaser": null
      },{
        "title": "Redis 시작하기 - Redis Sentinel & HAProxy",
        "excerpt":"Redis Sentinel을 구성하고, slave의 loadbalance를 위해 haproxy를 구성합니다. haproxy의 UI화면에서 redis의 master/slave의 active/deactive를 상태를 한눈에 파악하기 쉽습니다. Haproxy 환경 구성 HAProxy 설치를 위한 의존성 패키지 설치 # HAProxy 설치를 위한 의존성 패키지 설치 yum install -y gcc openssl openssl-devel pcre-static pcre-devel systemd-devel Haproxy 설치 haproxy를 구성하기 위해 haproxy 최근 버전을...","categories": ["cache"],
        "tags": ["redis","haproxy"],
        "url": "/cache/haproxy/",
        "teaser": null
      },{
        "title": "Redis 시작하기 - 레디스 모니터링 Redis Stat",
        "excerpt":"Redis 서버의 메모리 사용량을 모니터링하고자 하는 경우 오픈소스 Redis Stat를 사용할 수 있습니다. Redis Stat 설치 Redis Stat는 ruby로 개발되어 있어서 Ruby가 설치되어 있어야 합니다. Ruby를 설치하기전에 의존성 패키지를 먼저 설치합니다. yum install -y ruby-devel gcc make rpm-build rubygems # Ruby install git clone https://github.com/rbenv/rbenv-installer cd rbenv-installer cd bin ./rbenv-installer...","categories": ["cache"],
        "tags": ["redis","redis-stat"],
        "url": "/cache/monitoring-redis-stat/",
        "teaser": null
      },{
        "title": "Redis 시작하기 - Redis Cluster",
        "excerpt":"Redis Cluster 환경구성 다음은 Redis Cluster 의 일반적인 구성입니다. 아래 구성은 Primary 3개, Replica3개로 Cluster를 구성합니다. port [각자포트] # 백그라운드에서 시작하도록 설정 daemonize yes # 클러스터를 사용하겠다. cluster-enabled yes # 클러스터 구성 내용을 저장한는 파일명 지정 (자동 생성됨) cluster-config-file nodes-[각자포트].conf # 클러스터 노드가 다운되었는지 판단하는 시간 (3s) cluster-node-timeout 3000 #...","categories": ["cache"],
        "tags": ["redis","haproxy"],
        "url": "/cache/redis-cluster/",
        "teaser": null
      },{
        "title": "@Inject과 @Autowired의 차이점",
        "excerpt":"@Inject vs @Autowired @Inject 및 @Autowired 두 주석은 응용 프로그램에서 자동 의존성주입에 사용됩니다. @Inject 어노테이션은 Java 6에 도입 된 Java CDI의 일부인 반면 @Autowire 어노테이션은 스프링프레임워크의 일부. 두 어노테이션 모두 동일한 목적을 수행하므로 응용프로그램에서 사용할 수 있는 어노테이션. Sr. No. Key @Inject @Autowired 1 Basic 그것은 자바 CDI의 일부입니다 스프링...","categories": ["springboot"],
        "tags": ["springboot"],
        "url": "/springboot/difference-autowired-inject/",
        "teaser": null
      },{
        "title": "Redis 시작하기 - Springboot Redis Cluster Failover 설정",
        "excerpt":"Redis Cluster Configuration 설정 Redis Cluster를 구성하고 failover 하기 위해서는 application config 이외에 추가적으로 Redis cluster Confugration이 필요합니다. Redis Cluster를 구성하고 Master를 강제로 종료시키면 Replica중 1개가 Master로 승격되어 지속적인 서비스를 이어갈 수 있습니다. 그리고 Lettuce를 사용하면 이를 자동으로 감지하여 서비스를 지속할 수 있습니다. 그러나 쓰기작업이 필요한 서비스는 약간의 delay를 요구하며,...","categories": ["cache"],
        "tags": ["redis"],
        "url": "/cache/failover-redis-cluster/",
        "teaser": null
      },{
        "title": "Redis 시작하기 - Docker를 이용한 클러스터링 구성",
        "excerpt":"redis.conf 편집 mkdir -p 6300 6301 6302 6400 6401 6402 redis config 파일을 다음과 같이 수정합니다. ## redis.conf 편집 vi redis.conf port 6379 cluster-enabled yes cluster-config-file nodes.conf cluster-node-timeout 3000 appendonly yes redis.conf를 각 폴더에 복사합니다. cp redis.conf 6300/ cp redis.conf 6301/ cp redis.conf 6302/ cp redis.conf 6400/ cp redis.conf 6401/...","categories": ["cache"],
        "tags": ["redis","docker"],
        "url": "/cache/redis-cluster-using-docker/",
        "teaser": null
      },{
        "title": "Redis 시작하기 - Docker를 이용하여 Redis Sentinel 구성",
        "excerpt":"Redis Sentinel 을 docker 를 사용하여 구성 - 사전준비 Redis Sentinel 을 docker기반으로 구성하기 위해서는 docker, docker-compose를 설치하여야 합니다. docker engine 설치방법은 아래의 링크를 참조하세요. Redis Sentinel - docker-compose port 설정 extra_hosts설정 redis master/replica1/2는 netowrk_mode를 host로 설정 sentinel은 client에서 접근하기 위해 port를 expose (5000,5001,5002) sentinel 구성은 QUORUM으로 구성합니다. redis master...","categories": ["cache"],
        "tags": ["redis","sentinel"],
        "url": "/cache/setup-sentinel-docker/",
        "teaser": null
      },{
        "title": "Redis 시작하기 - Docker를 이용하여 모니터링",
        "excerpt":"Redis Sentinel 을 docker 를 사용하여 구성 - 사전준비 Redis Sentinel과 Cluster를 redis-stat로 모니터링하는 것을 docker 기반으로 구성합니다. myIP는 자신의 환경에 맞는 VM Server의 IP를 설정합니다. Redis 모니터링 - docker-compose version: \"3\" services: redis-stat: container_name: redis-stat image: insready/redis-stat command: [ '--verbose', '--server', 'redis-master:6379', 'redis-replica1:6383', 'redis-replica2:6384' ] extra_hosts: - \"redis-master:myIP\" -...","categories": ["cache"],
        "tags": ["redis","sentinel"],
        "url": "/cache/redis-stat-docker/",
        "teaser": null
      },{
        "title": "Redis 시작하기 - Redis Functions",
        "excerpt":"Redis 7.0 New Feature Functions        ","categories": ["cache"],
        "tags": ["redis"],
        "url": "/cache/functions/",
        "teaser": null
      },{
        "title": "Redis 시작하기 - Redis Functions 시작하기",
        "excerpt":"Redis Functions Redis 버전 7.0에 추가된 가장 영향력 있는 기능은 모듈성, 재사용성 및 전반적인 개발자 환경 개선을 통해 스크립트를 개선하는 새로운 프로그래밍 옵션 인 Redis Functions입니다. 함수는 스크립트와 달리 .rdb 및 .aof 파일에 유지될 뿐만 아니라 모든 복제본에 자동으로 복제되므로 Redis의 일부 모듈이 됩니다. Redis는 여러 실행 엔진을 지원할 수...","categories": ["cache"],
        "tags": ["redis","lua"],
        "url": "/cache/getting-start-functions/",
        "teaser": null
      },{
        "title": "Redis 시작하기 - Redis Sentinel 고가용성 예시",
        "excerpt":"Sentinel 구성 이제 Sentinel에 대한 기본 정보를 알았으므로 Sentinel 프로세스를 어디에 배치해야 하는지, 얼마나 많은 Sentinel 프로세스가 필요한지 등이 궁금할 수 있습니다. 이 섹션에서는 몇 가지 배포 예를 보여 줍니다. 그래픽 형식의 구성 예를 보여주기 위해 ASCII 아트를 사용 하며, 이것이 다른 기호가 의미하는 바입니다 box 안에 Redis Instance가 실행중인있...","categories": ["cache"],
        "tags": ["redis"],
        "url": "/cache/ha-sentinel-example/",
        "teaser": null
      },{
        "title": "Redis 시작하기 - Redis Sentinel 고가용성",
        "excerpt":"Redis Sentinel을 통한 고가용성 클러스터되지 않은 Redis의 고가용성 Redis Sentinel은 Redis Cluster를 사용하지 않을 때 Redis에 대한 고가용성을 제공합니다. Redis Sentinel은 모니터링, 알림과 같은 기타 부수적인 작업도 제공하고 클라이언트에 대한 구성 공급자 역할을 합니다. 다음은 거시적 수준(즉, big picture)에서 Sentinel 기능의 전체 목록입니다. Monitoring. Sentinel은 마스터 및 복제본 인스턴스가 예상대로...","categories": ["cache"],
        "tags": ["redis"],
        "url": "/cache/ha-sentinel/",
        "teaser": null
      },{
        "title": "Redis 시작하기 - Redis configuration 예시(redis.conf)",
        "excerpt":"redis.conf 파일 모든 버전과 함께 제공되는 자체 문서화 된 redis.conf 파일 # Redis configuration file example. # # Note that in order to read the configuration file, Redis must be # started with the file path as first argument: # # ./redis-server /path/to/redis.conf # Note on units: when memory size...","categories": ["cache"],
        "tags": ["redis"],
        "url": "/cache/redis-config-example/",
        "teaser": null
      },{
        "title": "Redis 시작하기 - Redis 관리",
        "excerpt":"Redis 관리 Tips 프로덕션에서 Redis를 구성하고 관리할때 아래의 사항들을 고려하십시요. Redis setup tips Linux Linux 운영 체제를 사용하여 Redis를 배포합니다. Redis는 OS X에서도 테스트되며 FreeBSD 및 OpenBSD 시스템에서도 수시로 테스트됩니다. 그러나 Linux는 대부분의 스트레스 테스트가 수행되고 대부분의 프로덕션 배포가 실행되는 곳입니다. Linux 커널 오버 커밋 메모리 설정을 1로 설정합니다.. vm.overcommit_memory...","categories": ["cache"],
        "tags": ["redis"],
        "url": "/cache/redis-management/",
        "teaser": null
      },{
        "title": "Redis 시작하기 - Redis 복제",
        "excerpt":"Redis replication Redis가 복제를 통해 고가용성 및 장애 조치를 지원하는 방법 Redis 복제의 기반(Redis Cluster 또는 Redis Sentinel에서 추가 계층으로 제공하는 고가용성 기능 제외)에는 사용 및 구성이 간편한 리더 팔로워(마스터-복제본) 복제가 있습니다. 이를 통해 복제본 Redis 인스턴스는 마스터 인스턴스의 정확한 복사본이 될 수 있습니다. 복제본은 링크가 끊어질 때마다 자동으로 마스터에...","categories": ["cache"],
        "tags": ["redis"],
        "url": "/cache/replication/",
        "teaser": null
      },{
        "title": "Redis 시작하기 - Use Cases",
        "excerpt":"Redis Use Cases      Top Redis Use Cases    ","categories": ["cache"],
        "tags": ["redis","redis-stat"],
        "url": "/cache/usecase/",
        "teaser": null
      },{
        "title": "Redis 시작하기 - RediSearch",
        "excerpt":"RediSearch 소개 Redis는 다음과 같이 key/value 형식으로 조회가 가능합니다. set user1 value1 GET user1 HSET user1 name jaeguk HGETALL user1 name 그러나 아래와 같이 SQL의 WHERE 절의 Parameters 처럼 조회는 지원하지 않습니다. GET users WHERE name=”jaeguk” GET users WHERE name like “jae%” 위한 같이 SQL과 유사한 기능 사용할 슈 있게...","categories": ["cache"],
        "tags": ["redis","redisearch"],
        "url": "/cache/installl-redisearch-on-docker/",
        "teaser": null
      },{
        "title": "Redis 시작하기 - Redis with Lua",
        "excerpt":"lua Lua는 달을 뜻하는 포르투갈어이며 1993년 브라질에서 처음 개발되었으며, light-weight하며 이식성이 좋은 스크립트 언어입니다. Lua 스크립트는 다음과 같은 특징 이 있습니다. 대소 문자를 구분 다른 스크립트 언어처럼 변수 형을 선언하지 않음 변수 명의 첫글자는 영문 또는 _(언더스코어)로 시작 예약어는 다음과 같습니다. and / break / do / else / elseif...","categories": ["cache"],
        "tags": ["redis","lua"],
        "url": "/cache/redis-with-lua/",
        "teaser": null
      },{
        "title": "Springboot기반 Redis @Transactional 어노테이션 사용",
        "excerpt":"@Transactional Springboot 기반 Redis를 사용할 때 @Tranactional 사용하여 commit 과 rollback 을 처리할 수 있습니다. rollback 은 exception을 throw하면 redis cache에 데이터가 저장되지 않습니다. PlatformTransactionManager를 Bean으로 등록되어 있고, 메소드에 @tranactional 어노테이션이 있고,메소드 로직에 @redisTemplate을 사용하고 있다면 이는 트랜잭션으로 처리되어, 예외(Exception)가 발생하면 데이터베이스에 처리했던 작업이 rollback 되고, 또한 로직에서 Redis에 저장했던...","categories": ["springboot"],
        "tags": ["springboot"],
        "url": "/springboot/springboot-redis-transactional/",
        "teaser": null
      },{
        "title": "Redis 시작하기 - Redis vs Memcached",
        "excerpt":"redis와 Memcached를 비교합니다. 항목 Redis Memcached 특징 메모리 DB 고성능 분산 캐시 서버 저장방식 메모리 캐시 및 스토리지 메모리 지원 데이터 타입 다양한 데이터 타입지원 String/List/Hashes/Set/Sorted Set String key/value만 지원 키목록 조죄 모든 키목록 모든 키 목록 지원 않음 복제 Primary/replica 복제 지원 않음 클러스터 클러스터 지원 Not support Pub/Sub...","categories": ["cache"],
        "tags": ["redis","mencached"],
        "url": "/cache/redis-mencache/",
        "teaser": null
      },{
        "title": "Redis 시작하기 - Lua 에서 return String, List, JSON 형식으로 받기.",
        "excerpt":"Springboot Lettuce기반 Lua를 호출하여 결과값을 List 받는 방법을 공유합니다. Lua를 를 이용해서 Boolean, Long 타입은 별다른 어려움없이 응답을 받을 수 있습니다. 그러나 String이나 List같은 경우는 RedisTemplate 기본 설정으로는 결과를 받을 수 없고 다음과 같은 오류를 만나게 될 것입니다. 이것은 GenericJackson2JsonRedisSerializer에서 byte[]를 deserialization을 하지 못해서 발생하는 에러입니다. com.fasterxml.jackson.core.JsonParseException: Unrecognized token 'test':...","categories": ["cache"],
        "tags": ["redis","Lua"],
        "url": "/cache/return-list-using-lua/",
        "teaser": null
      },{
        "title": "Redis 시작하기 - Lua 스크립트 등록 및 실행",
        "excerpt":"스크립팅을 사용하면 Redis 내에서 복잡한 작업을 실행할 수 있습니다. Redis 스크립트를 사용하면 제어 구조와 같은 프로그래밍 도구를 사용할 수 있으며 거의 ​​모든 Redis 명령에 액세스 할 수 있습니다. 그렇다면 왜 명령을 직접 실행하여 또는 응용 프로그램 자체에서 Redis 스크립트를 사용합니까? 작업이 Redis Cache 서버에서 직접 실행되 성능이 크게 증가합니다. Logic은...","categories": ["cache"],
        "tags": ["redis","lua"],
        "url": "/cache/run-lua-on-redis-cli/",
        "teaser": null
      },{
        "title": "Redis 시작하기 - Pre Loading a Lua Script into Redis With Lettuce",
        "excerpt":"양상추를 사용하여 redis에 대해 루아 스크립트를 실행하는 것을 우리는 매번 인수와 함께 전체 스크립트 redis가 원자 적으로 실행될 것를 보냈습니다. 매우 작은 스크립트의 경우 문제가 될 것 같지 않지만 EVALSHA를 사용하여이를 수행하는 더 효율적인 방법이 있습니다 . EVALSHA evalsha 없이 lua 스크립트를 실행한다는 것은 이미 다룬 것처럼 매번 스크립트와 인수를...","categories": ["cache"],
        "tags": ["redis","Lua"],
        "url": "/cache/preload-lua-script/",
        "teaser": null
      },{
        "title": "Redis 시작하기 - Usecases - Leaderboard",
        "excerpt":"LUA 스크립팅의 효율적인 방법으로 수행 할 수 있는 사례에 사용될 수 사례를 살펴봅니다. 여기에는 Redis zset에 유지되는 리더 보드가 있으며, 현재 사용 사례를 위해 주어진 사용자의 경우 해당 사용자의 순위와 리더 보드에서 사용자의 주변의 rank를 얻을 수도 있습니다. 아래의 2 개의 명령이 연속적으로 수행했을 때 정확한 결과를 가져오는가? 첫 번째는...","categories": ["cache"],
        "tags": ["redis","jupyter"],
        "url": "/cache/usecases-leaderboard/",
        "teaser": null
      },{
        "title": "Redis 시작하기 - PubSub - springboot",
        "excerpt":"Redis에서 Pub/Sub을 지원합니다. 특정 topic에 메시지를 전송하는 것을 Springboot을 이용하여 구현하는 것을 알아봅니다. application.yml 설정 spring: main.allow-circular-references: true application: name: redis-cluster redis: topic: ${MY_TOPIC:topic1} ChatMessage Model @Getter @Setter @ToString public class ChatMessage { private String sender; private String context; } ChatMessage Dto @Getter @Setter @ToString public class ChatMessageDto { private...","categories": ["cache"],
        "tags": ["redis","springboot"],
        "url": "/cache/pub-sub/",
        "teaser": null
      },{
        "title": "maven에서 jdk 버전이 변경되지 않는 경우",
        "excerpt":"jdk1.8 에서 jdk11로 전환하여 개발을 하는 경우 jdk는 11로 변경되었지만 maven은 여전히 jdk1.8로 빌드를 하는 경우 다음과 같이 추가합니다.  vi $HOME/.mavenrc  export JAVA_HOME=$(/usr/libexec/java_home -v 110)  ","categories": ["springboot"],
        "tags": ["quickfix"],
        "url": "/springboot/change-jdk11-to-maven/",
        "teaser": null
      },{
        "title": "VS Code에서 사용하거나 사용하지 않는 import 클래스 단축키로 일용등록/삭제.",
        "excerpt":"맥북 개발자가 springboot기반으로 개발환경을 사용할 때 자동 import 를 하거나 사용하지 않는 Class가 import되어 있는 것이 있을 때 이를 단축키로 자동으로 제거하는 명렁어는 Shift + alt(option) + o 를 동시에 누르면 Never used 로 되어 있는 import 클래스를 삭제해줍니다.   ","categories": ["springboot"],
        "tags": ["quickfix"],
        "url": "/springboot/quick-fix/",
        "teaser": null
      },{
        "title": "Redis 시작하기 - Lua 중급으로 가는길",
        "excerpt":"Lua를 이용하여 Redis에 있는 데이터를 월별 합계를 계산하거나, from ~ to 기간을 입력받아 합계를 계산할 수 도 있습니다. 다음은 그 예시입니다. 초기 데이터 로드 127.0.0.1:6379&gt; hmset SiteID:TotalCnt 20180101 10 20180102 2 20180103 5 20180120 10 20180131 30 20180205 20 20180210 5 20180331 23 20181230 1230 20190130 130 20190301 310 20200102...","categories": ["cache"],
        "tags": ["redis","lua"],
        "url": "/cache/lua-example/",
        "teaser": null
      },{
        "title": null,
        "excerpt":"lua 설치 - 사전준비 사전에 compiler가 설치되어 있어야 합니다. Compiler가 설치되어 있지 않는 경우 다음을 실행합니다. sudo yum update -y yum groupinstall -y 'Development Tools' lua 설치 curl -R -O http://www.lua.org/ftp/lua-5.4.4.tar.gz tar zxf lua-5.4.4.tar.gz cd lua-5.4.4 make all test lua cli 실행 lua를 실행하고 Hello World를 출력합니다. src/lua str =...","categories": [],
        "tags": null,
        "url": "/2023-04-16-install-lua/",
        "teaser": null
      }]
