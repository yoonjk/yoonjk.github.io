---
title: argo rollouts demo
categories:
  - devops 
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
```bash
kubectl apply -f https://raw.githubusercontent.com/argoproj/argo-rollouts/master/docs/getting-started/basic/rollout.yaml
kubectl apply -f https://raw.githubusercontent.com/argoproj/argo-rollouts/master/docs/getting-started/basic/service.yaml
# or
wget https://raw.githubusercontent.com/argoproj/argo-rollouts/master/docs/getting-started/basic/rollout.yaml
wget https://raw.githubusercontent.com/argoproj/argo-rollouts/master/docs/getting-started/basic/service.yaml

kubectl apply -f rollout.yaml
kubectl apply -f service.yaml
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

