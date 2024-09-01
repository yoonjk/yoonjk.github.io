---
title:  Install minikube for windows
categories:
  - kubernetes
tags: 
  - minkube
---

minikube를 다음의 [링크](https://minikube.sigs.k8s.io/docs/start/?arch=%2Fwindows%2Fx86-64%2Fstable%2F.exe+download)windows에 설치합니다.

## 다운로드 minikube for windows
Power Shell을 실행하고 minikube를 다운로드 합니다.  


```bash
New-Item -Path 'c:\' -Name 'minikube' -ItemType Directory -Force
Invoke-WebRequest -OutFile 'c:\minikube\minikube.exe' -Uri 'https://github.com/kubernetes/minikube/releases/latest/download/minikube-windows-amd64.exe' -UseBasicParsing
```

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/k8s/07-download-minikube.png" alt="">
  <figcaption></figcaption>
</figure>  

## Power Shell 을 administrator 권한으로 실행
Power Shell 을 administrator 권한으로 실행하고, path에 minikube를 추가하기 위해 다음을 실행합니다.  
```bash
$oldPath = [Environment]::GetEnvironmentVariable('Path', [EnvironmentVariableTarget]::Machine)
if ($oldPath.Split(';') -inotcontains 'C:\minikube'){
  [Environment]::SetEnvironmentVariable('Path', $('{0};C:\minikube' -f $oldPath), [EnvironmentVariableTarget]::Machine)
}
```

## start minikube
minikube를 시작합니다.
```bash
minikube start
```

## Download minikube for mac


```bash
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-darwin-amd64
sudo install minikube-darwin-amd64 /usr/local/bin/minikube
```

## Create 3 nodes
우리는 마스터 노드 하나와 두 개의 워커 노드로 구성된 3노드 클러스터를 만들기 위해, 다음 명령을 사용하여 3노드 클러스터를 만들 수 있습니다.  
**minikube start --nodes # -p <cluster_name>**
```bash
minikube start --nodes 5 -p k8scluster
```

## cluster 삭제
```bash
minikube stop
minikube delete
```

## node 추가
```bash
minikube node add
```