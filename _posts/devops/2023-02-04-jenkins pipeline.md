---
title: Jenkins Pipeline 이란 
categories:
  - devops 
tags:
  - jenkins
---

## Jenkins Pipeline 이란 
Jenkins Pipeline이란 Jenkins를 사용하여 CD 파이프라인울 구현하고 통합하는 것을 지원하는 플러그인의 집합입니다.
Jenkins에 의해 정의된 모든 표준 Job을 하나의 script 작성되며 git 과 같은 repository 저장할 수 있습니다.
각 단계에 대해 여러 작업을 작성하는 대신 이제 전체 워크플로를 코딩하여 하나의 Jenkinsfile에 넣을 수 있습니다.
이러한 Pipeline을 작성하는 데에는 크게 두 가지, 선언적(Declarative) 구문 방식, 스크립팅(Scripted) 방식의 두 가지 유형의 구문을 사용하여 작성할 수 있습니다.  


#### Declarative Pipeline
선언적 파이프 라인은 Jenkins Pipeline에 비교적 최근에 추가 된 것으로, 파이프 라인 위에 보다 단순화되고 구조적인 구문을 제공합니다.
모든 유효한 선언적 파이프라인은 파이프라인 블록 내에 포함되어야 합니다.

•	agent
•	tools
•	options
•	environment
•	stages
o	stage
•	post



## Pipeline section

```bash
pipeline {
    /* insert Declarative Pipeline here */
}
```

선언적 파이프라인에서 유효한 기본 문 및 식은 Groovy의 구문과 동일한 규칙을 따르지만 다음과 같은 예외가 있습니다.
•	파이프라인의 최상위 수준은 블록이어야 합니다: pipeline { }.
•	statement 구분 기호로 세미콜론이 없습니다. 각 문장은 한 줄에 있어야합니다.
•	선언 파이프라인의 섹션은 일반적으로 하나 이상의 지시사항( 순서, 지시문) 또는steps을 포함합니다.
•	속성 참조 문은 인수 없는 메서드 호출로 처리됩니다. 예를 들어, 입력은 input()으로 처리됩니다.

선언적 파이프라인에서는 지시문과 섹션 구성을 시작을 도와주기 위해 선언적 지시문 생성기를 사용하여 지원합니다.
현재 pipeline{} 블록 내에서 코드의 최대 크기를 제한하는 미해결 문제가 있습니다. 이 제한은 Scripted Pipeline에는 적용되지 않습니다.
선언적 파이프라인의 섹션에는 일반적으로 하나 이상의 지시문 또는 단계가 포함됩니다.

#### Declarative Pipeline : pipeline
Agent section은  선언형 Pipeline에서는 필수section 입니다.
Jenkins 환경에서 에이전트 섹션이 위치에 따라 전체 파이프라인 또는 특정 stage가 실행되는 위치에 지정할 수 있습니다.
agent가 최상위 부분에 위치할 때는 pipeline이 실행되는node가 됩니다. agent any는 사용가능한 node중에 random 하게 사용하겠다는 의미입니다. 또는 agent에 label을 지정하여 지정된 node에서  pipeline을 실행할 수 있도록 label을 지정할 수 있습니다.
agent none으로 지정한 경우 각 stage에서 agent를 설정하겠다는 의미입니다.
agent { docker …} 로 설정한 경우 pipeline을 실행할 때 docker container에서 실행하고자 하는 경우 사용합니다.  이러한 경우 일반적으로 top level agent는 none으로 설정하고 stage 에서 agent를 필요한 docker container image를 사용하기 위해 선언합니다.  
```bash
pipeline {
    agent none 
    stages {
        stage('Example Build') {
            agent { docker 'maven:3.8.7-eclipse-temurin-11' } 
            steps {
                echo 'Hello, Maven'
                sh 'mvn --version'
            }
        }
        stage('Example Test') {
            agent { docker 'openjdk:8-jre' } 
            steps {
                echo 'Hello, JDK'
                sh 'java -version'
            }
        }
    }
}
```
#### Declarative Pipeline : agent
agent { kubernetes … } 로 설정되는 경우 dynamic agent로 동적으로 pipeline을 실행할 때만 resource를 사용하고 종료되면 resource를 반환하는 것으로 kubernetes 환경에서 Jenkins agent를 운영하고자 하는 경우 사용합니다.  

#### Declarative Pipeline : tools
tools section은 stage에서 사용하는 tool을 사용하기 위해 정의하는 section입니다. agent none인 경우 tools는 무시됩니다. optional 항목입니다.  

#### Declarative Pipeline : environemt
environment section은 pipeline 또는 stage에서 사용하는 key-value 형식의 환경변수를 정의해서 stage에서 사용하는 section입니다.  credentials 를 미리 load,  value에 저장하여 stage에 사용할 수 있습니다.  

#### Declarative Pipeline : stages
stages section은 최소한 하나 이상의 stage에 대한 모음을 정의합니다. 대두분의 작업, 예를 들면 Build, Test, Deploy stage와 같이 작업들이 stages의 아래에 위치합니다.  

#### Declarative Pipeline : stage
stage section stages section안에 정의하며,하나의 steps section 을 포함합니다.  

#### Declarative Pipeline : steps
steps section은 선언적 pipeline에서만 지원하는 것으로 steps내에 실제 해야 할 작업을 정의하는 영역입니다.

#### Declarative Pipeline : script
script section은 scripted pipeline의 블록을 가져와 선언적 pipeline에서 실행합니다. 대부분의 사용 사례에서 script 단계는 선언적 파이프라인에서 필요하지 않지만 groovy 문법을 사용해야 하는 경우 사용할 수 있습니다.   script가 로직이 길고 복잡한 블록인 경우 대신 공유 라이브러리로 이동해야 합니다.  

#### Declarative Pipeline : post
post section은 pipeline 또는 stage 실행 상태,  성공,실패, 또는 성공과 실패에 상관없이 항상 실행하고자 할 떄 사용하는 기능입니다.  
•	pipeline block의 끝에 위치하거나 stage 에 위치
•	always, success, failure, changed, fixed, regression, aborted, unstable, unsuccessfull, cleanup을 지원합니다.  

post는 Condition의 기능입니다.  
__always__  
파이프라인 또는 단계 실행의 완료 상태에 관계없이 실행합니다.
__changed__   
현재 파이프라인의 실행이 이전 실행과 완료 상태가 다른 경우에만 changed 를 실행합니다.  
__fixed__    
현재 파이프라인의 실행이 성공하고 이전 실행이 실패했거나 불안정한 경우에만 post 에 서 이 fixed 를 실행합니다 
__regression__   
현재 파이프라인 또는 상태가 실패, 불안정 또는 중단되고 이전 실행이 성공한 경우에만실행합니다.  
__aborted__      
현재 파이프라인의 실행이 "중단됨" 상태인 경우(일반적으로 파이프라인이 수동으로 중단되었기 때문에) 사후 단계를 실행합니다. 일반적으로 웹 UI에서 회색으로 표시됩니다.  
__failure__    
현재 파이프라인 또는 stage의 실행이 "실패" 상태(일반적으로 웹 UI에서 빨간색으로 표시됨)인 경우에만 실행합니다.  
__success__    
현재 파이프라인 또는 스테이지의 실행이 "성공" 상태(일반적으로 웹 UI에서 파란색 또는 녹색으로 표시됨)인 경우에만 실행합니다.  
__cleanup__    
파이프라인 또는 stage의 상태에 관계없이 다른 모든 사후 조건이 평가된 후 cleanup 실행합니다.  

```bash
pipeline {
    agent any
    stages {
        stage('Example') {
            steps {
                echo 'Hello World'
            }
        }
    }
    post { 
        always { 
            echo 'I will always say Hello again!'
        }
    }
}
```

