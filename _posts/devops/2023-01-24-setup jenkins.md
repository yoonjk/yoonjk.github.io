---
title: Jenkins 설치 따라하기
categories:
  - devops 
tags:
  - jenkins
---

## Jenkins Pipeline 이란?
Jenkins Pipeline은 지속적인 업데이트 파이프라인을 구현하고 Jenkins에 통합하는 것을 지원하는 플러그인의 집합이다. 이 과정에서 소프트웨어를 빌드하고 여러 단계의 테스트, 배포를 진행한다. 
Pipeline은 Pipeline Domain Specific Language라는 문법을 통해 마치 코드를 작성하는 것과 같이 Pipeline을 통해 간단한 배포 파이프라인부터 복잡한 배포  파이프라인을 코드로 모델링하기 위한 확장 가능한 도구 집합을 제공합니다.
. 
Jenkins 파이프 라인의 정의는 프로젝트의 소스 제어 저장소에 commit될 수 있는 텍스트 파일 (Jenkinsfile이라고 함)에 저장합니다.


-	__Install Jenkins on Linux(Centos)__

Jenkins를 설치하기 전에 사전에 JDK와 Maven을 설치합니다. 
상세한 설치 정보는 다음의 링크를 참조합니다.

https://www.jenkins.io/doc/book/installing/linux/

java-11-openjdk을 설치합니다.

```bash
sudo dnf upgrade -y
sudo dnf install -y java-11-openjdk
```

다음의 링크를 접속하여 Maven 설치합니다.
https://maven.apache.org/download.cgi 에서 최근  maven 링크를 복사합니다

<figure style="width: 100%" class="align-left">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/jenkins/01-jenkins-install-maven.png" alt="">
  <figcaption></figcaption>
</figure> 


설치하고자 하는 경로에 압축파일을 다운 받아 압축을 해제한 후, 해당 폴더가 위치한 곳을 MAVEN_HOME으로 설정합니다.

```bash
wget https://dlcdn.apache.org/maven/maven-3/3.8.7/binaries/apache-maven-3.8.7-bin.tar.gz

tar xvzf apache-maven-3.8.7-bin.tar.gz -C /usr/local
```

~/.bash_profile을 vi editor로 열어MAVEN_HOME 환경정보를 추가합니다.

```bash
export MAVEN_HOME=/usr/local/apache-maven-3.8.7 
PATH=$PATH:$MAVEN_HOME/bin 

bash profile을 설정하고 저장하고, bash_profile을 최신으로 적용합니다.
source ~/.bash_profile 
```

maven 설정되었는지 다음의 명령어로 수행하여 아래의 내용이 출력되는지 확인합니다.

mvn

[수행결과]
![transparent black overlay]({{ "/assets/images/jenkins/02-jenkins-mvn.png" | relative_url }})

다음과 같이Git 설치합니다.

```bash
sudo dnf install -y git
```

레포지터리에 젠킨스 레드햇 안정화 버전 레포지터리를 추가합니다.

```bash
wget https://pkg.jenkins.io/redhat-stable/jenkins.repo -O /etc/yum.repos.d/jenkins.repo 
```

rpm에 젠킨스를 추가합니다.

```bash
sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io.key
```

Jenkins 를 다음과 같이 설치합니다.
```bash
sudo dnf install -y jenkins
```

OS 부팅 시 Jenkins 서비스가 시작되도록 설정합니다.
```bash
sudo systemctl enable jenkins
```

다음 명령을 사용하여 Jenkins 서비스를 시작합니다.
```bash
sudo systemctl start jenkins
```

다음 명령을 사용하여 Jenkins 서비스의 상태를 확인할 수 있습니다.
```bash
sudo systemctl status jenkins
```

docker container image 빌드를 위해 빌드 툴인 Podman을 설치합니다.
```bash
yum install -y podman 
```
