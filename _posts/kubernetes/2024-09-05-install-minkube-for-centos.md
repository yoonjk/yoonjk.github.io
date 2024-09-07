---
title:  Minikube 를 centos에 설치
categories:
  - kubernetes
tags: 
  - minikube
---

minikube 를 아래의 [link](https://minikube.sigs.k8s.io/docs/start/?arch=%2Flinux%2Fx86-64%2Fstable%2Fbinary+download)
![](img/2024-09-07-13-08-43.png)

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/k8s/08-download-minikube-for-centos.png" alt="">
  <figcaption></figcaption>
</figure>  

```bash
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube && rm minikube-linux-amd64
```

## Start your cluster
minikube를 시작합니다.  
```bash
minikube start
```

## Interact with your cluster
kubernetes의 pod를 조회합니다.  
```bash
minikube kubectl -- get po -A
```
dashboard를 접근하기 위해 다음과 같이 명령어를 실행합니다.  
```bash
minikube  dashboard
```

다음과 나타나면 metrics-server를 enable합니다. 

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/k8s/09-dashboard.png" alt="">
  <figcaption></figcaption>
</figure>  

```bash
minikube addons enable metrics-server
kubectl proxy --address='0.0.0.0' --disable-filter=true &
minikube dashboard
```

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/k8s/10-dashboard-8001-port.png" alt="">
  <figcaption></figcaption>
</figure>  


<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/k8s/11-dashboard.png" alt="">
  <figcaption></figcaption>
</figure>  

```bash
http://127.0.0.1:34443/api/v1/namespaces/kubernetes-dashboard/services/http:kubernetes-dashboard:/proxy/
# 위의 IP와 port(34443)을 자신의 VM 서버의 IP와 8001 port로 대채합니다.
# 127.0.0.1 -> VM IP
# 34443 -> 8001
http://your VM IP:8001/api/v1/namespaces/kubernetes-dashboard/services/http:kubernetes-dashboard:/proxy/

```


## Download kubectl command tool
kubectl 을 아래 [Link](https://kubernetes.io/docs/tasks/tools/)에서 download합니다.  

```bash
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo mv kubectl /usr/local/bin
sudo chmod 755 /usr/local/bin/kubectl
kubectl get pods
```

## Add node using minikube 
```bash
minikube node add --worker
```

## minikube 상태 확인
다음 명령을 사용하여 minikube가 실행 중인지 확인합니다.
```bash
minikube status
```

## 3개의 node를 갖는 cluster 생성
```bash
minikube start --nodes 4 -p minikube
```

## Label Nodes
Redis 및 Apache 파드를 배포할 때 제어 영역에 배포하지 않으려면 두 번째 및 세 번째 노드에 “worker”라는 레이블을 지정해야 합니다. 다음 명령을 사용하여 k8cluster-m02 및 k8cluster-m03 노드에 작업자 레이블을 적용합니다. 위의 각 노드에 대해 한 번씩 두 번 명령을 실행해야 합니다.

```bash
kubectl label node <node_name> node-role.kubernetes.io/worker=worker
or
kubectl label nodes <node_name> role=worker

# 예시 
kubectl label node minikube-m02 node-role.kubernetes.io/worker=worker
```

다음 명령을 사용하여 새로 레이블이 지정된 노드를 볼 수 있습니다.
```bash
kubectl get nodes
```
<figure style="width: 50%; height: 50%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/k8s/12-labeled-get-nodes.png" alt="">
  <figcaption></figcaption>
</figure>  

