---
title: Tekton 개요 
categories:
  - workflow 
tags:
  - tekton
---
## Tekton 개요 
Tekton은 CI/CD(지속적 통합 및 지속적 전달) 시스템을 만들기 위한 Kubernetes 네이티브 오픈 소스 프레임워크입니다. 여러 클라우드 공급자 또는 하이브리드 환경에서 애플리케이션을 구축, 테스트 및 배포하는 데 최적화되어 있습니다.
Tekton은 CI/CD 파이프라인을 구축하기 위한 클라우드 네이티브 솔루션입니다. 빌딩 블록을 제공하는 Tekton 파이프 라인과 Tekton Cli 및 Tekton 카탈로그와 같은 지원 구성 요소로 구성되어 Tekton을 완벽한 생태계로 만듭니다. Tekton은 Linux Foundation 프로젝트인 CD Foundation의 일부입니다.

#### CI/CD는 누가 사용하는가?
-	Tekton 사용자는 일반적으로 다음 범주에 속합니다.조직의 개발자를 위한 CI/CD 시스템을 구축하는 플랫폼 엔지니어.
-	CI/CD 시스템을 사용하여 작업을 수행하는 개발자.

#### Tekton 장점

Tekton은 CI/CD 시스템의 빌드/배포 사용자에게 다음과 같은 이점을 제공합니다.
-	__사용자 정의 가능__. TEKTON 엔터티는 완전히 사용자 CUSTOMIZING 할 수 있어, 높은 수준의 유연성을 지워합니다. 플랫폼 엔지니어는 개발자가 다양한 시나리오에서 사용할 수 있도록 매우 상세한 빌딩 블록 카탈로그를 정의할 수 있습니다.
-	__재사용 가능__. TEKTON 엔티티는 완전히 이식 가능하므로, 일단 정의되면 조직 내의 모든 사용자가 주어진 파이프라인을 사용하고 해당 구성 요소를 재사용할 수 있습니다. 이를 통해 개발자는 "바퀴를 다시 발명"하지 않고도 복잡한 파이프라인을 신속하게 구축할 수 있다.
-	__확장 가능__. Tekton 카탈로그는 Tekton 빌딩 블록의 커뮤니티 중심 리포지토리입니다. Tekton 카탈로그에서 미리 만들어진 구성 요소를 사용하여 새 파이프라인을 빠르게 생성하고 기존 파이프라인을 확장할 수 있습니다.
-	__표준화__. Tekton은 Kubernetes 클러스터에 확장으로 설치 및 실행되며 잘 확립된 Kubernetes 리소스 모델을 사용합니다. Tekton 워크로드는 Kubernetes 컨테이너내에서 실행됩니다.
-	__Scalable__. 워크로드 용량을 늘리려면 클러스터에 노드를 추가하기만 하면 됩니다. Tekton은 리소스 할당이나 파이프라인에 대한 기타 수정 사항을 재정의할 필요 없이 클러스터와 함께 scalable됩니다., 

#### Tekton 구성요소

Tekton은 다음 구성 요소로 구성됩니다.

•	__Tekton Pipelines__  은 Tekton의 기반입니다. CI/CD 파이프라인을 어셈블할 수 있는 빌딩 블록 역할을 하는 Kubernetes Custom Resources세트를 정의합니다.

•	__Tekton Triggers__ 를 사용하면 이벤트를 기반으로 파이프라인을 인스턴스화할 수 있습니다. 예를 들어 GitHub 리포지토리에 대해 PR이 병합될 때마다 파이프라인의 인스턴스화 및 실행을 트리거할 수 있습니다. 특정 Tekton 트리거를 시작하는 사용자 인터페이스를 구축할 수도 있습니다.

•	__Tekton CLI__ 는 Tekton과 상호 작용할 수 있도록 Kubernetes CLI 위에 구축된 tkn이라는 CLI를 제공합니다.

•	__Tekton Dashboard__ 는 파이프라인 실행에 대한 정보를 표시하는 Tekton Pipelines용 웹 기반 유저 인터페이스입니다.

•	__Tekton Catalog__ 는 자체 파이프라인에서 사용할 준비가 된 고품질의 커뮤니티에  Tekton 빌딩 블록(Task, Pipeline 등)의 리포지토리입니다.

•	__Tekton Hub__ 는 Tekton 카탈로그에 액세스하기 위한 웹 기반 그래픽 인터페이스입니다.

•	__Tekton Operator__ 는 Kubernetes 클러스터에서 Tekton 프로젝트를 설치, 업데이트 및 제거할 수 있는 Kubernetes Operator 패턴입니다.

#### Tekton Concept
Tekton으로 무엇을 할 수 있습니까?

Tekton은 실행하려는 워크로드를 지정하는 Task개념을 도입했습니다.

•	__Task__ – 일련의 순차적인 Step을 정의하고 각 Step은 특정 inputs 세트에 대해 특정 빌드 도구를 호출하고 다음 단계에서 입력으로 사용할 수 있는 특정 outputs세트를 생성합니다.

•	__Pipeline__ - defines a series of ordered Tasks, and just like Steps in a Task, a Task in a Pipeline can use the output of a previously executed Task as its input. 일련의 순차적인 Tasks를 정의하고 작업의 단계와 마찬가지로 파이프라인의 작업은 이전에 실행된 작업의 출력을 입력으로 사용할 수 있습니다.

•	__TaskRun__ - 특정 입력과 출력 집합을 생성하기 위해 지정한 Task를 인스턴스화합니다. 다시 말해서, Task는 Tekton에게 무엇을 해야 하는지 알려주고, TaskRun은 Tekton에게 무엇을 할 것인지와 빌드 플래그와 같이 정확히 수행하는 방법에 대한 추가 세부 정보를 알려줍니다.

•	__PipelineRun__ - 특정 입력 집합에서 특정 대상에 대한 특정 출력 집합을 생성하기 위해 저정한 파이프라인을 인스턴스화합니다.

각 Task는 Kubernetes Pod로 실행됩니다. 따라서 기본적으로 파이프라인 내의 작업은 데이터를 공유하지 않습니다. 작업 간에 데이터를 공유하려면 다음 작업에서 출력을 사용할 수 있도록 하고 이전에 실행된 Task의 출력을 입력으로 사용하도록 명시적으로 각 작업을 구성해야 합니다.

#### 언제 어떤 것을 사용합니까?
•	__Task__ - 테스트 실행, 린트 실행 또는 Kaniko 캐시 구축과 같은 단순한 워크로드에 유용합니다. 하나의 Task는 Kubernetes Pod로 실행되고 단일 디스크를 사용하며 일반적으로 작업을 단순하게 유지합니다.

•	__Pipeline__ - 정적 분석, 테스트, 빌드,  복잡한 프로젝트 프로젝트처럼 복잡한 워크로드에 유용합니다.

#### 개념모델

Tekton 구성요소 및 데이터 모델

- Steps
- Tasks
- Pipelines

Step은 Python 웹 앱에 대한 일부 단위 테스트 실행 또는 Java 프로그램 컴파일과 같은 CI/CD 워크플로의 작업입니다. Tekton은 제공한 컨테이너 이미지로 각 Step을 수행합니다. 예를 들어, 공식 Go 이미지를 사용하여 로컬 워크스테이션(go 빌드)에서와 동일한 방식으로 Go 프로그램을 컴파일할 수 있습니다.


#### Task는 순차적인 Step의 모음입니다. 

Tekton은 Kubernetes Pod형식으로 Task를 실행하며, 여기서 각 Step은 Pod에서 실행 중인 컨테이너가 됩니다. 이 디자인을 사용하면 여러 관련 단계에 대한 공유 환경을 설정할 수 있습니다. 예를 들어 Task의 각 Step내에서 액세스할 수 있는 Kubernetes 볼륨을 작업에 탑재할 수 있습니다.

<figure style="width: 50%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/01-tekton-task.png" alt="">
  <figcaption></figcaption>
</figure> 


#### Pipeline 은 순차적 Task의 모음입니다.
Tekton은 모든 작업을 수집하여 DAG(방향성 비순환 그래프)로 연결하고 그래프를 순서대로 실행합니다. 즉, 여러 Kubernetes 포드를 생성하고 각 포드가 원하는 대로 성공적으로 실행을 완료하도록 합니다. Tekton은 개발자에게 프로세스에 대한 완전한 제어 권한을 부여합니다. 작업 완료의 fan-in/fan-out 시나리오를 설정하거나, 불안정한 테스트가 있는 경우 자동으로 재시도하도록 Tekton에 요청하거나, 작업이 진행하기 전에 충족해야 하는 조건을 지정할 수 있습니다.

<figure style="width: 70%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/01-tekton-pipeline.png" alt="">
  <figcaption></figcaption>
</figure> 


Task 및 Pipeline은 Kubernetes 클러스터에서 사용자 지정 리소스로 지정됩니다.

<figure style="width: 70%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/01-tekton-pipeline-on-kubernetes.png" alt="">
  <figcaption></figcaption>
</figure> 

## TaskRun and PipelineRun
PipelineRun은 이름에서 알 수 있듯이 특정 Pipeline을 실행입니다. 예를 들어 Tekton에 CI/CD 워크플로를 하루에 두 번 실행하도록 요청할 수 있으며 각 실행은 Kubernetes 클러스터에서 추적할 수 있는 PipelineRun 리소스가 됩니다. PipelineRuns를 사용하여 각 작업 실행의 세부 사항을 포함하여 CI/CD 워크플로의 상태를 볼 수 있습니다.

마찬가지로 taskRun은 지정한 Task를 실행합니다. TaskRun은 Pipeline인 외부에서 지정한 Task를 선택하여 실행 할 수 있습니다. 이를 통해 작업의 각 단계 실행에 대한 세부 사항을 볼 수 있습니다.

. __TaskRuns 및 pipelineRuns__ 는 Task 및 Pipeline 리소스를 연결합니다. 설계를 통해 개발자는 다양한 입력 및 출력에 대해 Task와Pipleline을 재사용할 수 있습니다.

taskRuns 또는 pipelineRuns를 수동으로 생성하여 Tekton Task 또는 Pipeline을 즉시 실행하도록 트리거할 수 있습니다. 또는 Tekton Triggers와 같은 Tekton 구성 요소에 요청 시 자동으로 실행을 생성하도록 요청할 수 있습니다. 예를 들어 새 pull 요청이 git 리포지토리에 체크인될 때마다 파이프라인을 실행할 수 있습니다.

<figure style="width: 70%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/01-tekton-arch.png" alt="">
  <figcaption></figcaption>
</figure> 


## Tekton 작동원리

Tekton Pipelines는 각 단계를 래핑하여 작동합니다. 보다 구체적으로 말하면 Tekton Pipelines는 단계 컨테이너에 진입점 바이너리를 주입하여 시스템이 준비될 때 지정한 명령을 실행합니다.
Tekton Pipelines는 Kubernetes annotation을 사용하여 파이프라인의 상태를 추적합니다. 이러한 annotation은 Kubernetes Downward API를 사용하여 파일 형식으로 각 step컨테이너 내부에 투영됩니다. 진입점 바이너리는 투영된 파일을 자세히 관찰하고 특정 주석이 파일로 나타나는 경우에만 제공된 명령을 시작합니다. 

예를 들어, Tekton에 작업에서 두 단계를 연속적으로 실행하도록 요청하면 두 번째 step컨테이너에 주입된 진입점 바이너리는 첫 번째 단계 컨테이너가 성공적으로 완료되었다고 annotation이 보고할 때까지 유휴 상태로 기다립니다.

또한 Tekton Pipelines는 입력 리소스 검색 및 blob 스토리지 솔루션에 대한 출력 업로드와 같은 특정 기본 제공 기능을 지원하기 위해 일부 컨테이너가 Step컨테이너 전후에 자동으로 실행되도록 예약합니다. taskRuns 및 pipelineRuns를 통해 실행 상태도 추적할 수 있습니다. 시스템은 또한 단계 컨테이너를 실행하기 전에 환경을 설정하기 위해 여러 다른 작업을 수행합니다. 
