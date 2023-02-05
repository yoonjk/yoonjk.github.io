---
title: Install MiniKube for Jenkins
categories:
  - kubernetes
tags: 
  - minikube
---

## Pre-requisites - Install Docker

yum utils을 설치합니다.
```bash
sudo yum install -y yum-utils
```

Docker repository 정보를 download 받습니다. 
```bash
sudo yum-config-manager \
--add-repo \
https://download.docker.com/linux/centos/docker-ce.repo
```

최신 버전의 Docker Engine, containerd를 설치하거나 다음 단계로 이동하여 특정 버전을 설치합니다.
```bash
sudo yum install -y docker-ce docker-ce-cli containerd.io
```

docker를 시작합니다.
```bash
sudo systemctl start docker
```

docker daemon이 정상 설치되었는지 hello-world docker image를 pull하기 위해 다음 명령어를 수행하여 확인합니다.
```bash
docker pull hello-world 
```

[수행결과]
![docker pull hello-world]({{ "/assets/images/jenkins/07-jenkins-docker-hello-world.png" }})

docker images를 수행하여 아래와 같이 출력되는 확인합니다
```bash
docker images
```

[수행결과]
![docker pull hello-world]({{ "/assets/images/jenkins/08-jenkins-docker-images.png" }})

## Install MiniKube

minikube를 download 하고 minikube를 설치합니다.
```bash
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo mv minikube-linux-amd64 /usr/local/bin/minikube
chmod +x /usr/local/bin/minikube
```

minikube를 다음과 같이 시작합니다.
```bash
minikube start --driver=docker --force
```

kubectl CLI download 합니다
```bash
curl -L "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl" -o /usr/local/bin/kubectl

chmod +x /usr/local/bin/kubectl

kubectl get po -A
```

## Configure for connecting Jenkins

jenkins에서 minikube에 접속하기 위해  Kubernetes 의 credentials 정보가 있는 $HOME/.kube/config 파일을 확인합니다.  
```bash
less ~/.kube/config
```

![kube-config]({{ "/assets/images/jenkins/09-jenkins-kube-config.png" }})

위의 cluster CA 정보의 client 인증서 파일 경로를 데이터의 내용으로 변경 합니다
![kube-config]({{ "/assets/images/jenkins/10-jenkins-kube-config-2.png" }})

아래의 명령어로 ca.crt, client.crt, client.key 파일의 내용을 다음의 명령어로 변환합니다.  

```bash
cat /root/.minikube/ca.crt|base64 -w0;echo
cat /root/.minikube/profiles/minikube/client.crt|base64 -w0;echo
cat /root/.minikube/profiles/minikube/client.key|base64 -w0;echo
```

certificate-authority => certificate-authority-data로 변경
client-certificate => client-certificate-data 로 변경
client-key => client-key-data 로 변경 

![kube-config]({{ "/assets/images/jenkins/11-jenkins-change-kube-config.png"  }})

default namespace의 pod 목록이 조회되는지 다음과 같이 확인합니다.  
```bash
kubectl get pods 

## 수행결과
No resources found in default namespace.
```