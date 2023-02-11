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
        "title": "Jenkins Kubernetes Plugin 설치 및 환경구성",
        "excerpt":"Jenkins Kubernetes Plugin 설치 Jenkins Agent로 Kubernetes에 실행하기 위해 Kubernetes Plugin을 Jenkins에 설치하여 환경을 구성합니다. Jenkins UI에서 Manage Jenkins &gt; System Configuration &gt; Manage Plugins &gt;Available plugins 메뉴를 클릭합니다 Plugins 검색 입력 필드에서 Kubernetes 입력하고 다음과 같은 첫번째 Kubernetes [V] 선택, 왼쪽 하단에 Install without restart 버튼을 클릭합니다 아래의 [v]...","categories": ["devops"],
        "tags": ["jenkins"],
        "url": "/devops/install-kubernetes-plugin/",
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
        "excerpt":"JFrog on Docker Centos7 기반 Docker Engine을 설치합니다. Step 1: Upgrade OS package dnf upgrade -y Step 2 : Install Docker engine sudo yum install -y yum-utils Docker CE repsoitory정보를 download 합니다. sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo For Docker CE edition: docker pull docker.bintray.io/jfrog/artifactory-cpp-ce yum install -y docker-ce docker-ce-cli containerd Docker...","categories": ["docker"],
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
        "title": "Jenkins Pipeline 이란",
        "excerpt":"Jenkins Pipeline 이란 Jenkins Pipeline이란 Jenkins를 사용하여 CD 파이프라인울 구현하고 통합하는 것을 지원하는 플러그인의 집합입니다. Jenkins에 의해 정의된 모든 표준 Job을 하나의 script 작성되며 git 과 같은 repository 저장할 수 있습니다. 각 단계에 대해 여러 작업을 작성하는 대신 이제 전체 워크플로를 코딩하여 하나의 Jenkinsfile에 넣을 수 있습니다. 이러한 Pipeline을 작성하는...","categories": ["devops"],
        "tags": ["jenkins"],
        "url": "/devops/jenkins-pipeline/",
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
        "title": "리모트 minikube 연결",
        "excerpt":"Setup Minikube on minikube server Minikube는 로컬 머신에 VM을 생성하고 하나의 노드만 포함하는 경량의 클러스터를 배포하는 쿠버네티스 입니다. Minikube는 Linux, macOS 및 Windows 시스템에서 사용할 수 있습니다. Minikube가 작동하려면 하이퍼바이저(버추얼 박스 또는 KVM)가 필요하지만 이미 가상 머신 내부에 있는 경우 none 드라이버를 사용하여 추가 VM 계층 생성을 건너뛸 수 있습니다...","categories": ["kubernetes"],
        "tags": ["minikube"],
        "url": "/kubernetes/access-a-remote-minikube/",
        "teaser": null
      }]
