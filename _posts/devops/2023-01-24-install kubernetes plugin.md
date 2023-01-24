---
title: Kubernetes Plugin 설치 및 환경구성 
categories:
  - devops 
tags:
  - jenkins
---

## Kubernetes Plugin 설치
Jenkins Agent로 Kubernetes에 실행하기 위해 Kubernetes Plugin을 Jenkins에 설치하여 환경을 구성합니다.

Jenkins UI에서 Manage Jenkins > System Configuration > Manage Plugins >Available plugins 메뉴를 클릭합니다

Plugins 검색 입력 필드에서 Kubernetes 입력하고 다음과 같은 첫번째  Kubernetes [V] 선택, 왼쪽 하단에 Install without restart 버튼을 클릭합니다

![Install Kubernetes Plugin]({{ "/assets/images/jenkins/12-jenkins-install-kubernetes-plugin.png" | relative_url }})

아래의 [v] “Restart Jenkins when installation is complete and no jobs are running” 버튼을 선택하여 jenkins를 재시작 합니다. admin 계정으로 로드인을 합니다

Manage Jenkins > System Configuration > Manage Nodes and Clouds를 선택합니다.

Configure Clouds를 선택하고, Combo 박스에서 Kubernetes를 선택합니다.

![Install Kubernetes Plugin]({{ "/assets/images/jenkins/13-jenkins-add-new-cloud.png" | relative_url }})

Kubernetes 접속하기 위한 Credentials 정보를 입력하면이 다음과 같이 출력됩니다.
![Configure Clouds]({{ "/assets/images/jenkins/14-jenkins-configure-clouds.png" | relative_url }})

Kubernetes Cloud details 버튼을 클릭하면 상세 입력창이 출력됩니다.
Kubernetes Namespace section에 jenkins 를 입력합니다
![Kubernetes Namespace]({{ "/assets/images/jenkins/15-jenkins-kubernetes-namespace.png" | relative_url }})

Configure Clouds에서 Credentials > Add 버튼을 클릭합니다
![add jenkins in Credentials]({{ "/assets/images/jenkins/16-jenkins-add-jenkins.png" | relative_url }})

Add Credentials 입력창에서 credentials 정보를 다음과 같이 입력합니다.
File은 자신의 VM 서버의 root 계정의. $HOME/.kube/config 파일을 선택합니다.
.kube/config을 자신의. laptop에 download받아서 choose file 버튼을 클릭하여 download 받은 config파일을 선택합니다.
![add Credentials]({{ "/assets/images/jenkins/17-jenkins-add-credentials.png" | relative_url }})

