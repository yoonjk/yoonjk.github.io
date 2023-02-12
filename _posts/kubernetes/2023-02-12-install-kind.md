---
title: Install Kind for Jenkins
categories:
  - kubernetes
tags: 
  - kind
---

## Pre-requisites : Install docker engine
docker engine 설치는 docker engine 설치 글을 참조해 주세요.  

## Step 1 : Download kind binary
kind binary를 download 받습니다.  
```bash
curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.17.0/kind-linux-amd64
chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind
```

## Step 2 : config 파일 작성성

Kind를 이용하여 Kubernetes Cluster를 생성하기 위해 jenkins-config.yaml 파일을 아래와 같이 작성합니다.  
```yaml
apiVersion: kind.x-k8s.io/v1alpha4
kind: Cluster
nodes:
- role: control-plane
- role: worker
- role: worker
```

## Step 3 : Create Cluster
Cluster를 생성합니다.  
```bash
kind create cluster --config jenkins-config.yaml
```
## Step 4 : Configure
Kind는 .kube/config파일 변경 없이 인증서 파일의 내용이 config파일에 있어서 변환할 필요는 없습니다.  
minikube와 동일하게 Jenkins를 설정합니다.  
- Install Kubernetes Plugins
- Manage Jenkins > Manage Nodes and Clouds > Configure Clouds

