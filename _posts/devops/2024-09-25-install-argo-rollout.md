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


Translated with www.DeepL.com/Translator (free version)

## 참조
[install and deploy canary using argo rollout](https://jhandguy.github.io/posts/automated-canary-deployment/)
