---
title: Install kind for Jenkins
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

## Step 4 : Kubernetes Dashboard 설치

Kubernetes dashboard yaml파일을 remote에 있는 것을 직접 kubernetes cluster에 적용합니다.  
```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.4.0/aio/deploy/recommended.yaml
```

## Step 5 : Kubernetes Dashboard 접속
kubectl proxy로 8001 port를 다음과 같이 오픈합니다.  
```bash
kubectl port-forward svc/kubernetes-dashboard -n kubernetes-dashboard 443:443 --address 0.0.0.0
```

브라우저에서 dashboard에 접속합니다.
```bash
https://Your-Server-IP/
```

![kube-dashboard]({{ "/assets/images/k8s/04-k8s-kubernetes-dashboard.png"  }})

## Step 6 : Token 생성
- kubernetes-dashboard namespace에 admin-user Serviceaccount를 생성  
```bash
kubectl create sa admin-user -n kubernetes-dashboard
```

- cluster-admin을 clusterrolebinding합니다.  
```bash
kubectl create clusterrolebinding admin --clusterrole cluster-admin --serviceaccount kubernetes-dashboard:admin-user
```

- token을 생성   
```bash  
kubectl create token admin-user -n kuberneetes-dashboard
# [수행결과] 
eyJhbGciOiJSUzI1NiIsImtpZCI6ImgxSUxfYzA4Zk54TFdRNF9pdDY3VFgtall1N1M5b1BPMFp2c3JXRVFodFUifQ.eyJhdWQiOlsiaHR0cHM6Ly9rdWJlcm5ldGVzLmRlZmF1bHQuc3ZjLmNsdXN0ZXIubG9jYWwiXSwiZXhwIjoxNjc2Mjk2MDE3LCJpYXQiOjE2NzYyOTI0MTcsImlzcyI6Imh0dHBzOi8va3ViZXJuZXRlcy5kZWZhdWx0LnN2Yy5jbHVzdGVyLmxvY2FsIiwia3ViZXJuZXRlcy5pbyI6eyJuYW1lc3BhY2UiOiJrdWJlcm5ldGVzLWRhc2hib2FyZCIsInNlcnZpY2VhY2NvdW50Ijp7Im5hbWUiOiJhZG1pbi11c2VyIiwidWlkIjoiNTAwNGUwMDYtMTNjYy00YWYwLWE2MWEtZjFmYWJiMjczNzBhIn19LCJuYmYiOjE2NzYyOTI0MTcsInN1YiI6InN5c3RlbTpzZXJ2aWNlYWNjb3VudDprdWJlcm5ldGVzLWRhc2hib2FyZDphZG1pbi11c2VyIn0.AVfEFQBnSHW4DQR3Iyf15-BRMDdIAloSkC1BGpUaK-gLVHt-5EB72EK9XX1TK675-DClXEHbNTgEHey_ViP68JPTr99B3mRLy5KXD8gOxjueRMSvQbHo-le85j-DwIOu3TfE9Zyo7NlkGVglU61IBylIfZbg7Sh1TeYpoD6qmTAub6EVWMw1m5OGThBRd7Da6WMd1nI0MMlrT8hGUkCPml3F-x4ExNETjukTfhQTbz0HwRg-jVkad9QwFuCN9_uGuUvw4QUPeZ04hdccADP7fwbd7r4U0Jx2YANVZYNefbmSRl3M4s_Lu5aVxZ4PdcTFR04yiZBQ1C911lluT6hOGw
```

생성한 token을 dashboard token 입력항목에 붙여넣기 합니다.  