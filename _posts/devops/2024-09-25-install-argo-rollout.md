---
title: deploy canary using argo rollout
categories:
  - devops 
tags:
  - argo
  - rollout
  - canary
---

Kubernetes에서 프로덕션 환경으로 배포하는 것은 상당히 스트레스가 될 수 있습니다. 의미 있고 신뢰할 수 있는 자동화된 테스트를 성공적으로 통과한 후에도 최종 버튼을 누를 때 문제가 발생하여 끔찍한 사고가 발생할 여지가 여전히 존재합니다.

다행히도 Kubernetes는 이러한 종류의 시나리오에 탄력적으로 대응할 수 있도록 만들어졌으나, 롤백은 쉬운 일이 아닙니다. 

변경 사항이 실제 사용자에게 실제로 적용되기 전에 프로덕션 환경에서 스모크 테스트를 할 수 있다면 어떨까요?  변경 사항을 모든 사용자에게 한 번에 적용하지 않고 일부 사용자에게만 점진적으로 적용할 수 있다면 어떨까요?  결함이 있는 배포를 감지하여 자동으로 롤백할 수 있다면 어떨까요?

바로 이것이 바로 카나리아 배포의 핵심입니다!


## Pre-requisites

[Kind](https://kind.sigs.k8s.io/docs/user/quick-start/#installation) or minikube
[Kubectl](https://kubernetes.io/docs/tasks/tools/)
[Argo Rollouts Kubectl Plugin](https://argoproj.github.io/argo-rollouts/installation/#kubectl-plugin-installation)
[Helm](https://helm.sh/docs/intro/install/)
[K6](https://k6.io/docs/getting-started/installation/)



#### Using Argo Rollouts with NGINX Ingress Controller

Argo 롤아웃은 NGINX 인그레스 컨트롤러와 함께 사용하면 인그레스 NGINX를 사용한 단순 카나리아 배포와 동일하지만 더 나은 결과를 얻을 수 있습니다.

#### Installing NGINX Ingress Controller

아직 읽어보지 않으셨다면, 쿠버네티스의 카나리아 배포(1부) -
 Ingress NGINX를 사용한 간단한 카나리아 배포를 읽고 Ingress NGINX를 사용한 간단한 카나리아 배포를 구현하는 방법에 대해 알아보세요!  

```bash
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm install ingress-nginx/ingress-nginx --name-template ingress-nginx --create-namespace -n ingress-nginx --values kind/ingress-nginx-values.yaml --version 4.8.3 --wait
```
이제 모든 것이 계획대로 진행되면, ingress-nginx-controller 배포가 실행되는 것을 볼 수 있을 것입니다.

```bash
➜ kubectl get deploy -n ingress-nginx
NAME                       READY   UP-TO-DATE   AVAILABLE   AGE
ingress-nginx-controller   1/1     1            1           4m35s
```

#### Installing Argo Rollouts
Argo 롤아웃은 [헬름 차트](https://github.com/argoproj/argo-helm/tree/master/charts/argo-rollouts)를 통해 설치할 수 있습니다.
```bash
helm repo add argo https://argoproj.github.io/argo-helm
helm install my-release argo/argo-rollouts
```

```
➜ kubectl get deploy -n argo-rollouts
NAME                      READY   UP-TO-DATE   AVAILABLE   AGE
argo-rollouts             1/1     1            1           13m
argo-rollouts-dashboard   1/1     1            1           13m
```

#### Configuring Rollout Resources
Ingress NGINX만 사용하는 것의 한계 중 하나는 꽤 많은 Kubernetes 리소스를 복제해야 한다는 것입니다. 1부에서 배포, 서비스, 인그레스 리소스가 거의 동일하게 복제되었다는 것을 기억하실 것입니다.
Argo 롤아웃을 사용하면 Kubernetes 리소스의 중복이 서비스 리소스 하나로 줄어듭니다.

일반 Ingress NGINX 사용의 또 다른 한계는 카나리아 배포의 증분 롤아웃(카나리아 가중치를 통한)을 카나리아 Ingress에 주석을 달아 수동으로 수행해야 한다는 점입니다.
Argo Rollouts는 이 문제를 해결하기 위해 자체 사용자 정의 리소스인 롤아웃 리소스를 만들었습니다.

```bash
helm install sample-app/helm-charts/argo-rollouts --name-template sample-app --create-namespace -n sample-app --wait
```

```bash
➜ kubectl get rollout sample-app -n sample-app
NAME         DESIRED   CURRENT   UP-TO-DATE   AVAILABLE
sample-app   1         1         1            1
```

```bash
 ls -1 sample-app/helm-charts/argo-rollouts/templates
analysistemplate.yaml
canary
ingress.yaml
rollout.yaml
service.yaml
serviceaccount.yaml
servicemonitor.yaml
```

```bash
➜ ls -1 sample-app/helm-charts/argo-rollouts/templates/canary
service.yaml
```


보시다시피, 카나리아 폴더에 복제된 리소스는 단 하나, service.yaml뿐입니다.

이제 배포 리소스는 어디로 갔는지 궁금하실 것입니다. 🤔

Argo 롤아웃에서는 배포 리소스가 롤아웃 리소스로 대체되었습니다. 몇 가지 추가 사양이 포함되어 있다는 점을 제외하면 거의 동일합니다.

실제로 파트 1의 배포.yaml과 롤아웃.yaml을 비교해 보면 롤아웃 리소스에 매우 고유한 전략 사양을 제외하고는 매우 유사하다는 것을 알 수 있습니다.

```yaml
---
apiVersion: argoproj.io/v1alpha1
kind: Rollout
:
spec:
  :
  strategy:
    canary:
      canaryService: {{ .Release.Name }}-canary
      stableService: {{ .Release.Name }}
      canaryMetadata:
        labels:
          deployment: canary
      stableMetadata:
        labels:
          deployment: stable
      trafficRouting:
        nginx:
          stableIngress: {{ .Release.Name }}
          additionalIngressAnnotations:
            canary-by-header: X-Canary
      steps:
        - setWeight: 25
        - pause: {}
        - setWeight: 50
        - pause:
            duration: 5m
        - setWeight: 75
        - pause:
            duration: 5m
  :
  ```

이제 여기서  자세히 살펴보겠습니다:

Argo 롤아웃 컨트롤러는 어떤 서비스가 canaryService이고 어떤 서비스가 stableService인지 알아야 해당 파드를 즉시 선택하도록 업데이트할 수 있습니다;   
어떤 서비스가 어떤 파드를 선택하는지 알기 위해, canaryMetadata와 stableMetadata를 통해 파드 메타데이터에 첨부할 레이블이나 어노테이션을 지정.

Argo 롤아웃 컨트롤러는 또한 어떤 ingress가 stableIngress인지 알아야만 이로부터 카나리아 인그레스를 자동으로 생성할 수 있습니다;  
마지막으로, ingress의 카나리아 가중치 annotation을 수동으로 편집하지 않아도 되기 때문에 Argo 롤아웃 컨트롤러는 단계 사양을 통해 자동으로 이를 수행할 수 있습니다.  

단계는 다음 세 가지 중 하나가 될 수 있습니다:  

- 일시 중지(pause): 롤아웃을 일시 중지 상태로 전환합니다. 
시간 제한 일시 중지(예: 기간: 5분)이거나 수동으로 재개할 때까지 무기한 일시 중지할 수 있습니다;
- setWeight: 카나리아 인그레스의 카나리아 가중치 어노테이션을 원하는 가중치로 증가시킵니다  
  (예: setWeight: 25);  

- setCanaryScale: 카나리아 서비스에서 선택한 리플리카 또는 파드의 수를 늘립니다   
  (예: setCanaryScale: 4).

#### Automating Incremental Rollouts
대시보드를 살펴보겠습니다

```bash
kubectl argo rollouts dashboard -n argo-rollouts &
```

이제 **http://localhost:3100/rollout/자신의 app rollout**명 으로 이동하면 샘플 앱 롤아웃의 상태를 보여주는 반짝이는 대시보드가 표시됩니다.

예시 : 
  - http://localhost:3100/rollout/sample-app   
  - http://localhost:3100/rollout/sample


<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/argo/01-argo-rollout-sample-app.png" alt="">
  <figcaption></figcaption>
</figure>  

지금까지 트래픽의 100%를 처리하면서 안정적으로 표시된 리비전은 하나만 관찰할 수 있습니다.

이제 컨테이너에 새 이미지를 설정하고 어떤 일이 일어나는지 살펴봅시다!  

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/argo/02-step1-canary.png" alt="">
  <figcaption></figcaption>
</figure>  

새 리비전이 생성되어 카나리아로 레이블이 지정되었습니다. 카나리아 인그레스에 대한 가중치가 25%로 설정되었으며 이제 롤아웃이 일시 중지 상태가 되었습니다.

이제 바로 확인해 봅시다!

```bash
kubectl get ingress -n sample-app
NAME                           CLASS    HOSTS        ADDRESS     ...   
sample-app                     <none>   sample.app   localhost   ...  
sample-app-sample-app-canary   <none>   sample.app   localhost   ...

kubectl describe ingress sample-app-sample-app-canary -n sample-app
...
Annotations:  kubernetes.io/ingress.class: nginx
              nginx.ingress.kubernetes.io/canary: true
              nginx.ingress.kubernetes.io/canary-by-header: X-Canary
              nginx.ingress.kubernetes.io/canary-weight: 25
```

```bash
kubectl argo rollouts get rollout sample-app  --watch -n sample-app
# or
kubectl argo rollouts get rollout sample  --watch -n sample-app
```

## 참조
[install and deploy canary using argo rollout](https://jhandguy.github.io/posts/automated-canary-deployment/)

[argo-rollout-examples](https://github.com/argoproj/rollouts-demo/tree/master/examples)
[argo-rollouts-ovewview](https://argoproj.github.io/argo-rollouts/)
[argo-rollouts-with-istio](https://velog.io/@sawa1989/ArgoRollouts-with-Istio)
[argo rollouts by redhat](https://docs.redhat.com/en/documentation/red_hat_openshift_gitops/1.14/html/argo_rollouts/index)
[sample-app using argo rollouts](https://github.com/jhandguy/canary-deployment.git)