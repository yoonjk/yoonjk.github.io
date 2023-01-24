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

Kubernetes 접속하기 위한 Credentials 정보를 입력하면이 다음과 같이 출력됩니다. Kubernetes Cloud details 버튼을 클릭하면 상세 입력창이 출력됩니다.  
 <figure style="width: 5%; height: 20%; " class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/jenkins/14-jenkins-configure-clouds.png " alt="">
  <figcaption></figcaption>
</figure> 

Kubernetes Namespace section에 jenkins 를 입력합니다
![Kubernetes Namespace]({{ "/assets/images/jenkins/15-jenkins-kubernetes-namespace.png" | relative_url }})

Configure Clouds에서 Credentials > Add 버튼을 클릭합니다
![add jenkins in Credentials]({{ "/assets/images/jenkins/16-jenkins-add-jenkins.png" | relative_url }} )

Add Credentials 입력창에서 credentials 정보를 다음과 같이 입력합니다.  
File은 자신의 VM 서버의 root 계정의. $HOME/.kube/config 파일을 선택합니다.  
.kube/config 파일을 자신의 laptop에 download 받아서 choose file 버튼을 클릭하여 download 받은 config파일을 선택합니다.  
![add Credentials]({{ "/assets/images/jenkins/17-jenkins-add-credentials.png" | relative_url }})

Credentials Section 에서 위에서 입력한 mykubeconfig를 선택하고, Test Connection버튼을 클릭하여 minikube 연결을 테스트합니다. 다음의 메시지처럼 정상 출력되는지 확인합니다.
“Connected to Kubernetes v1.xx.x”로 표시 되는지 확인합니다
 <figure style="width: 50%; height: 20%; " class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/jenkins/18-jenkins-connected.png " alt="">
  <figcaption></figcaption>
</figure> 

WebSocket 항목을 선택합니다.  
[v] WebSocket

Pod Label Section에서key / value값을 다음과 같이 입력합니다.

<figure style="width: 100%; height: 100%; " class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/jenkins/19-jenkins-pod-labels.png " alt="">
  <figcaption></figcaption>
</figure> 

Pod Templates Section 다음과 같이 입력합니다  
 <figure style="width: 50%; height: 100%; " class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/jenkins/20-jenkins-pod-templates.png " alt="">
  <figcaption></figcaption>
</figure> 

Container Section은 다음과 같이 입력하고 저장버튼을 클릭합니다.  
Name : jnlp-slave  
Docker image : jenkinsci/jnlp-slave:latest  
Working directory : /home/jenkins/agent  
Command to run : /bin/sh -c . 

 <figure style="width: 50%; height: 100%; " class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/jenkins/21-jenkins-container-templates.png " alt="">
  <figcaption></figcaption>
</figure> 

Jenkins agent가 실행할 jenkins namespace를 다음과 같이 생성합니다.

kubectl create ns jenkins

Jenkins Console Output 화면에서 다음과 같은 메시지가 출력되면 “Message: namespaces "jenkins" not found”  위 Jenkins namespace를 생성하지 않아서 발생하는 에러입니다.

터미널창에서 default namespace에 app을 설치할 수 있는 권한을 cluster-admin 권한으로 jenkins에 부여합니다.
kubectl create clusterrolebinding jenkins-admin  --clusterrole cluster-admin --serviceaccount jenkins:default

 