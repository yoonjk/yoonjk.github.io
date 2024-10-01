---
title:  RollingUpdate in k8s
categories:
  - kubernetes
tags: 
  - istio
---

Kubernetes의 Deployment에서 strategy가 RollingUpdate일 때, 애플리케이션을 중단 없이 점진적으로 업데이트하는 방식으로 Pod를 교체합니다. 이때 업데이트 과정을 세밀하게 제어하는 두 가지 중요한 속성이 있습니다: **maxUnavailable**과 maxSurge.

1. maxUnavailable
정의: 업데이트하는 동안 사용할 수 없는 Pod의 최대 개수를 정의합니다.
의미: 이 값은 업데이트 중 동시에 삭제될 수 있는 기존 Pod의 최대 개수를 나타냅니다. 이 값은 절대값(정수)이나 퍼센트(%)로 설정할 수 있으며, 전체 replicas의 일부가 비워질 수 있는지에 대한 한계를 설정합니다.
기본값: 25% (즉, 전체 Pod 중 25%까지 사용할 수 없는 상태로 허용)  

예시:
```yaml
yaml
Copy code
strategy:
  type: RollingUpdate
  rollingUpdate:
    maxUnavailable: 1
```
여기서는 한 번에 1개의 Pod만 비워지거나 사용할 수 없는 상태로 있을 수 있다는 뜻입니다.   

```yaml
strategy:
  type: RollingUpdate
  rollingUpdate:
    maxUnavailable: 30%
```
총 replicas가 10인 경우, 최대 3개의 Pod가 동시에 다운될 수 있습니다.  

2. maxSurge
정의: 업데이트하는 동안 추가로 생성할 수 있는 Pod의 최대 개수를 정의합니다.
의미: 이 값은 업데이트 중 기존 Pod 수보다 더 많은 Pod를 얼마나 추가로 생성할 수 있는지를 나타냅니다. Pod가 중지되기 전에 새로운 Pod가 미리 준비될 수 있는 한계를 설정합니다. 이 값은 절대값(정수)이나 퍼센트(%)로 설정할 수 있습니다.
기본값: 25% (즉, 전체 Pod 수에 25%까지 더 생성 가능)
예시:
설정:

```yaml
strategy:
  type: RollingUpdate
  rollingUpdate:
    maxSurge: 2
```

여기서는 한 번에 최대 2개의 Pod를 추가로 생성할 수 있습니다.
설정:

```yaml
strategy:
  type: RollingUpdate
  rollingUpdate:
    maxSurge: 30%
```

총 replicas가 10인 경우, 3개의 Pod를 추가로 생성할 수 있습니다.

동작 방식:  
RollingUpdate 전략에서는 기존 Pod를 하나씩 중지하고 새로운 버전의 Pod를 하나씩 시작합니다.  
**maxUnavailable**과 **maxSurge**는 이 과정을 최적화하여 서비스 중단 없이 업데이트가 이루어지도록 조정하는 역할을 합니다.  
maxUnavailable은 한 번에 다운될 수 있는 Pod의 수를 제한하여 가용성을 보장합니다.  
maxSurge는 새로운 Pod가 기존 Pod보다 더 많은 수로 미리 배치될 수 있도록 하여 업데이트 속도를 높일 수 있습니다.  

예시 상황:  
만약 replicas가 10인 Deployment에서 maxUnavailable이 2, maxSurge가 3으로 설정된 경우, 업데이트 과정에서는 다음이 발생할 수 있습니다:   

최대 3개의 새로운 Pod가 한꺼번에 생성될 수 있고,  
동시에 최대 2개의 기존 Pod가 삭제될 수 있습니다.  
이 설정을 통해 높은 가용성을 유지하면서도 빠르게 새로운 버전으로 전환할 수 있습니다.  

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
spec:
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1
      maxSurge: 0
  replicas: 4
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
        - name: myapp
          image: nexweb1/myapp:v1
          ports:
            - name: http
              containerPort: 8181
          startupProbe:
            httpGet:
                path: /version
                port: 8181
            failureThreshold: 30
            periodSeconds: 20              
```

```yaml
apiVersion: v1
kind: Service
metadata:
  name: myapp
spec:
  selector:
    app: myapp
  ports:
    - port: 8181
      targetPort: http
```



```

#### image tag 변경

```bash
kubectl set image deployment/myapp myapp=nexweb1/myapp:v2
# or
kubectl patch deployment myapp --type='json' -p='[{"op": "replace", "path": "/spec/template/spec/containers/0/image", "value": "aputra/myapp-171:v2" }]'
```

#### 록밸 

```bash
kubectl rollout undo deployments/myapp
```

#### 테스트 
```bash
kubectl run curl --image=alpine/curl:8.2.1 -n kube-system -i --tty --rm -- sh

 for i in `seq 1 10000`; do curl myapp.default:8181/version; echo ""; sleep 1; done
```

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/k8s/09-curl.png" alt="">
  <figcaption></figcaption>
</figure>  

