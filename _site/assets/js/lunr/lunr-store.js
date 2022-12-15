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
        "excerpt":"First Pipeline 작성 Tekton을 이용하여 Pipeline을 작성하는 것을 실습합니다. Pipeline은 CI/CD 워크플로의 일부로 특정 실행 순서로 정렬된 일련의 Task를 정의합니다. 이번에는 first Pipeline을 작성할 것입니다, First Pipeline에서는 이전에 작성했던 Hello World! 그리고 goodbye World! Task를 포함하는 Pipeline을 작성합니다. goodbye task를 다음과 같이 작성하고 적용합니다. kubectl apply -f goodbye.yaml [goodbye.yaml] apiVersion:...","categories": ["devops"],
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
        "title": "Airflow Xcom",
        "excerpt":"Airflow Xcom Airflow task간 데이터를 공유가 필요할 때, 데이터를 공유하기 위해 push, pull 을 사용하여 값을 전달하고, 값을 가져오기 위해 사용합니다. Airflow에서는 여러 분산환경에서 서로 다른 Work에서 Task가 실행 될 수 있기 때문에 Xcom을 사용합니다. Variable과 비슷하지만 Xcom은 특정 DAG내부에서만 공유되는 특징이 있습니다. 여러 DAG에서 공유해서 사용하려면 Variable을 사용해야 합니다....","categories": ["workflow"],
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
      }]
