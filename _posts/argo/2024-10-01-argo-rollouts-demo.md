---
title: argo rollouts demo
categories:
  - argo
tags:
  - argo
  - rollout
---

argo rollouts에 대한  demo 입니다.  

이 가이드에서는 롤아웃의 배포, 업그레이드, 프로모션 및 중단을 진행하면서 Argo 롤아웃의 다양한 개념과 기능을 설명합니다.  

**요구 사항**
- argo rollouts이 설치된 kubernetes cluster[설치 가이드 참조](https://argo-rollouts.readthedocs.io/en/stable/installation/#controller-installation)).
- argo rollouts plugin 이 설치된 kubectl ([설치 가이드 참조](https://argo-rollouts.readthedocs.io/en/stable/installation/#kubectl-plugin-installation)).


1. Deploying a Rollout  
먼저 롤아웃 리소스와 해당 롤아웃을 대상으로 하는 쿠버네티스 서비스를 배포한다. 이 가이드의 롤아웃 예시에서는 트래픽의 20%를 카나리아로 전송한 다음 수동 프로모션, 마지막으로 나머지 업그레이드 동안 점진적으로 자동화된 트래픽을 증가시키는 카나리아 업데이트 전략을 활용합니다. 이 동작은 롤아웃 사양의 다음 부분에 설명되어 있습니다:  

```yaml
spec:
  replicas: 5
  strategy:
    canary:
      steps:
      - setWeight: 20
      - pause: {}
      - setWeight: 40
      - pause: {duration: 10}
      - setWeight: 60
      - pause: {duration: 10}
      - setWeight: 80
      - pause: {duration: 10}
```

다음 명령을 실행하여  롤아웃 및 서비스를 배포합니다:  

rollout.yaml 파일은 다음과 같습니다.  

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: rollouts-demo
spec:
  replicas: 5
  strategy:
    canary:
      canaryService: rollouts-demo-canary
      stableService: rollouts-demo-stable
      steps:
      - setWeight: 20
      - pause: {}
      - setWeight: 40
      - pause: {duration: 10}
      - setWeight: 60
      - pause: {duration: 10}
      - setWeight: 80
      - pause: {duration: 10}
      - setWeight: 100
  revisionHistoryLimit: 2
  selector:
    matchLabels:
      app: rollouts-demo
  template:
    metadata:
      labels:
        app: rollouts-demo
    spec:
      containers:
      - name: rollouts-demo
        image: argoproj/rollouts-demo:blue
        ports:
        - name: http
          containerPort: 8080
          protocol: TCP
        resources:
          requests:
            memory: 32Mi
            cpu: 5m
```

services.yaml 파일은 다음과 같습니다.

```yaml


```
apiVersion: v1
kind: Service
metadata:
  name: rollouts-demo-canary
spec:
  ports:
  - port: 80
    targetPort: http
    protocol: TCP
    name: http
  selector:
    app: rollouts-demo

---
apiVersion: v1
kind: Service
metadata:
  name: rollouts-demo-stable
spec:
  ports:
  - port: 80
    targetPort: http
    protocol: TCP
    name: http
  selector:
    app: rollouts-demo
```bash
kubectl apply -f kubectl apply -f https://raw.githubusercontent.com/argoproj/argo-rollouts/master/docs/getting-started/nginx/rollout.yaml
kubectl apply -f https://raw.githubusercontent.com/argoproj/argo-rollouts/master/docs/getting-started/nginx/services.yaml
# or
wget https://raw.githubusercontent.com/argoproj/argo-rollouts/master/docs/getting-started/nginx/rollout.yaml
wget https://raw.githubusercontent.com/argoproj/argo-rollouts/master/docs/getting-started/nginx/services.yaml

kubectl apply -f rollout.yaml
kubectl apply -f services.yaml
```

롤아웃을 처음 생성하면 업그레이드가 발생하지 않았기 때문에 즉시 레플리카가 100%로 확장된다

Argo 롤아웃 kubectl 플러그인을 사용하면 롤아웃과 관련 리소스(레플리카셋, 파드, 분석 실행)를 시각화하고 발생 시 라이브 상태 변경 사항을 표시할 수 있다. 롤아웃이 배포되는 것을 보려면, 플러그인에서 get rollout --watch 명령을 실행하세요:

```basyh
kubectl argo rollouts get rollout rollouts-demo --watch
```

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/argo/10-deploy-initial-rollouts-demo.png" alt="">
  <figcaption></figcaption>
</figure>  

2.  Rollout 업데이트
다음으로 업데이트를 수행할 차례이다. 디플로이먼트와 마찬가지로, 파드 템플릿 필드(spec.template)를 변경하면 새 버전(즉, 레플리카셋)이 디플로이된다. 롤아웃을 업데이트하려면 롤아웃 스펙을 수정하고, 일반적으로 컨테이너 이미지 필드를 새 버전으로 변경한 다음, 새 매니페스트에 대해 kubectl 적용을 실행해야 한다.  
편의를 위해, 롤아웃 플러그인은 라이브 롤아웃 오브젝트에 대해 이러한 단계를 제자리에서 수행하는 설정 이미지 명령을 제공한다. 다음 명령을 실행하여 롤아웃 데모 롤아웃을 컨테이너의 “노란색” 버전으로 업데이트한다:  

```bash
kubectl argo rollouts set image rollouts-demo \
  rollouts-demo=argoproj/rollouts-demo:yellow
```

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/argo/11-update-rollouts.png" alt="">
  <figcaption></figcaption>
</figure>  


롤아웃 업데이트가 진행되는 동안 컨트롤러는 롤아웃의 업데이트 전략에 정의된 단계를 진행합니다. 예제 롤아웃은 카나리아에 20% 트래픽 가중치를 설정하고 사용자가 롤아웃을 일시 중지/추진하기 위한 조치를 취할 때까지 롤아웃을 무기한 일시 중지합니다. 이미지를 업데이트한 후 롤아웃이 일시 중지 상태에 도달할 때까지 롤아웃을 다시 관찰합니다.

```bash
kubectl argo rollouts get rollout rollouts-demo --watch
```

데모 롤아웃이 두 번째 단계에 도달하면, 플러그인에서 롤아웃이 일시 중지된 상태이며 이제 5개 리플리카 중 1개는 새 버전의 포드 템플릿을 실행하고 5개 리플리카 중 4개는 이전 버전을 실행하는 것을 볼 수 있습니다. 이는 setWeight: 20 단계에 정의된 20% 카나리아 가중치에 해당합니다.

3. Promoting a Rollout

이제 롤아웃이 일시 중지된 상태입니다. 롤아웃이 기간 없이 일시 중지 단계에 도달하면 다시 시작/승격될 때까지 무기한 일시 중지 상태로 유지됩니다. 롤아웃을 다음 단계로 수동으로 승격하려면 플러그인의 승격 명령을 실행하세요.

```bash
kubectl argo rollouts promote rollouts-demo
```
승격 후 롤아웃은 나머지 단계를 실행하기 위해 진행됩니다. 이 예의 나머지 롤아웃 단계는 완전히 자동화되어 있으므로 롤아웃은 결국 새 버전으로 완전히 전환될 때까지 단계를 완료하게 됩니다. 모든 단계가 완료될 때까지 롤아웃을 다시 지켜보세요:

```bash
kubectl argo rollouts get rollout rollouts-demo --watch
```

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/argo/12-prompting-rollouts-demo.png" alt="rollouts-demo">
  <figcaption></figcaption>
</figure>  

4. Aborting a Rollout

다음으로 업데이트 중 롤아웃을 수동으로 중단하는 방법을 알아보겠습니다. 먼저 이미지 설정 명령을 사용하여 컨테이너의 새 “red” 버전을 배포하고 롤아웃이 일시 중지된 단계에 다시 도달할 때까지 기다립니다:

```bash
kubectl argo rollouts set image rollouts-demo \
  rollouts-demo=argoproj/rollouts-demo:red
```

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/argo/12-abort-rollouts-demo.png" alt="rollouts-demo">
  <figcaption></figcaption>
</figure> 

이번에는 롤아웃을 다음 단계로 승격하는 대신 업데이트를 중단하여 '안정' 버전으로 돌아갑니다. 플러그인은 업데이트 중 언제든지 롤아웃을 수동으로 중단할 수 있는 방법으로 중단 명령을 제공합니다:

```bash
kubectl argo rollouts abort rollouts-demo
```
롤아웃이 중단되면 레플리카셋의 “안정적인” 버전(이 경우 노란색 이미지)은 스케일업되고 다른 모든 버전은 스케일다운됩니다. 레플리카셋의 안정 버전이 실행 중이고 정상적으로 작동하더라도 원하는 버전(빨간색 이미지)이 실제로 실행 중인 버전이 아니므로 전체 롤아웃은 여전히 성능 저하된 것으로 간주됩니다.


<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/argo/13-stable-rollouts-demo.png" alt="rollouts-demo">
  <figcaption></figcaption>
</figure> 

```
kubectl argo rollouts set image rollouts-demo \
  rollouts-demo=argoproj/rollouts-demo:yellow
```
이 명령을 실행하면 롤아웃이 즉시 정상 상태가 되고 새 레플리카셋이 생성되는 것과 관련된 활동이 없는 것을 확인할 수 있습니다.

롤아웃이 아직 원하는 상태에 도달하지 않은 경우(예: 롤아웃이 중단되었거나 업데이트 도중) 안정적인 매니페스트가 다시 적용되면 롤아웃은 이를 업데이트가 아닌 롤백으로 감지하고 분석 및 단계를 건너뛰어 안정적인 레플리카 세트의 배포를 빠르게 추적합니다.

