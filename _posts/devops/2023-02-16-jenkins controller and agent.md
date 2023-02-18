---
title: Jenkins master/slave 구성
categories:
  - devops 
tags:
  - jenkins
  - master
  - slave
---

## Jenkins 설치

Jenkins Master/Slave는 Controller/Agent로 명칭을 수정해서 글을 post합니다.  

[Jenkins 설치 따라하기](https://yoonjk.github.io/devops/setup-jenkins/)를 참조해서 Jenkins를 설치합니다.  

## Jenkins Agent 개요

Jenkins Pipeline을 remote Node에서 실행할 Agent를 추가합니다.  
Jenkins Agent는 다음과 같이 유형의 Agent가 있습니다.  

- Server 기반의 Agent
- Docker Container 
- Kubernetes Dynamic Pod Agent

Server 기반 Agent도 JNLP 기반 Agent와 ssh 기반 Agent가 있습니다.
JNLP기반 Agent는 분산된 서버에 agent.jar를 설치하고, 
java agent를 실행하고 Jenkins Master(Controller)와 연될되어 Pipeline을 실행합니다.  

Docker Container 기반 Agent는 선언형 Pipeline에서 각 stage별로 적합한 container를 설정하여 docker를 실행합니다.  

Dynmaic Kubernetes Pod Agent는 pipeline을 Kubernetes cluster에 Pod로 실행하고, 종료되면 Pod가 소별하는 방식입니다.  

## Jenkins Agent Node  
Agent Node에 jenkins 계정을 생성하고, jenkins 패스워드를 지정합니다.  
```bash
useradd jenkins
su - jenkins
mkdir -p .ssh
exit
passwd jenkins
```

## Jenkins Controller Node
Jenkins Controller에서 인증서를 생성합니다.    
![New Node]({{ "/assets/images/jenkins/22-jenkins-master-agent.png" }})

공개 키를 Agent Node에 복사합니다.
Are you sure you want to continue connecting (yes/no)? yes를 입력합니다.  
Agent Node에서 ~/.ssh 폴더에 authorized_keys 파일이 생성된 것을 확인합니다.  
```bash
scp  ~/.ssh/id_rsa.pub jenkins@Your-AgentNodeIP:/home/jenkins/.ssh/authorized_keys
```
![New Node]({{ "/assets/images/jenkins/22-jenkins-scp-credentials.png" }})

## Jenkins Agent Node  
Agent Node에서 .ssh 폴더와 authorized_keys의 접근권한을 설정합니다.  
```bash
chmod 700 .ssh
chmod 644 ~/.ssh/authorized_keys
```
## Jenkins Controller Node  
Jenkins Controller Node에서 ssh로 Jenkins Agent로 접속하여 비밀번호를 없이 접속되는지 확인합니다.  
```bash
ssh jenkins@Your-Jenkins-AgentIP
```

![New Node]({{ "/assets/images/jenkins/22-jenkins-ssh-connect.png" }})

## Agent 환경구성 

Manage Jenkins를 선택하고, Manage Nodes and Clouds를 선택  
![New Node]({{ "/assets/images/jenkins/23-jenkins-manage-nodes-clouds.png" }})

New Node를 선택합니다.  
![New Node]({{ "/assets/images/jenkins/24-jenkins-new-agent.png" }})

Agent에 name, label agent root directory를 설정합니다.
Number of executors는 Agent의 vcpu 개수만큼 지정합니다.      
![New Node]({{ "/assets/images/jenkins/25-jenkins-agent-root-dir.png" }})

Agent Node IP 설정 및 ssh로 접속하기 위해 credentials을 설정합니다.  
![New Node]({{ "/assets/images/jenkins/24-jenkins-launch-method.png" }})

Add credentials을 선택합니다.  
![New Node]({{ "/assets/images/jenkins/26-jenkins-add-credentials.png" }})

Kind 선택항목에서 username with private key 를 선택하고, ID, Description, username을 설정합니다.  
![New Node]({{ "/assets/images/jenkins/28-jenkins-username-with-private-key.png" }})

Private Key 항목에서 Enter directly를 선택하고, Add 버튼을 클릭합니다.   
![New Node]({{ "/assets/images/jenkins/27-jenkins-private-key-enter-directly.png" }})

Jenkins Controller Node에서 생성한 private key 인증서의 내용을 복사하여 붙여넣기하고 저장합니다.  
```bash
cat ~/.ssh/id_rsa
```
Jenkins Controller Node에서  ~/.ssh/id_rsa 인증서 내용을 복사합니다.  
![New Node]({{ "/assets/images/jenkins/29-jenkins-copy-id_rsa.png" }})

id_rsa 인증서 내용을 붙여넣기하고 Add버튼클 클릭합니다.  
![New Node]({{ "/assets/images/jenkins/29-jenkins-paste-private-key-and-save.png" }})

Jenkins Agent에서 Credentials을 선택하고, Host Key Verification Strategy 에서 Manually trusted key Verification Strategy를 선택하고, 저장버튼을 클릭합니다.  
![New Node]({{ "/assets/images/jenkins/30-jenkins-select-credentials.png" }})

Jenkins Controller 인 Built-in-Node를 선택해서 Number of executors의 항목을 0으로 설정하고 저장합니다. 

![New Node]({{ "/assets/images/jenkins/31-jenkins-build-in-node.png" }})



