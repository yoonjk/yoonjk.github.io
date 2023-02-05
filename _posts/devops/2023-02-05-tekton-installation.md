---
title: Tekton 설치 
categories:
  - devops 
tags:
  - tekton
---

## Tekton 설치
Tekton pipeline을 Kubernetes에 설치합니다.  

```bash
kubectl apply --filename https://storage.googleapis.com/tekton-releases/pipeline/latest/release.yaml
```

터미널 화면을 신규로 더 실행하여, 신규 터미널에서 tekton pipeline 설치를 확인하기 위해 다음의 명령어를 실행합니다.  
```bash
kubectl get pods --namespace tekton-pipelines -w
```
#### Tekton dashboard 설치

tekton pipeline, task를 실행되는 WEB UI를 통해 보고자 하는 경우 tekton dashboard를 활용하여 현재 설치되어 있는 pipeline, task, 실행결과를 확인 할 수 있습니다.  

```bash
kubectl apply --filename https://storage.googleapis.com/tekton-releases/dashboard/latest/release.yaml
```

tekton dashboard 설치를 확인하기 위해 다음의 명령어를 실행합니다.  
```bash
kubectl get pods --namespace tekton-pipelines -w
```

Tekton pipeline 설치에 대해 자세한 것은 아래의 [링크](https://tekton.dev/docs/pipelines/install/)를 확인하세요.  

[https://tekton.dev/docs/pipelines/install/](https://tekton.dev/docs/pipelines/install/)

Tekton dashboard 설치에 대해 자세한 것은 아래의 [링크](https://tekton.dev/docs/dashboard/install/)를 확인하세요.  

[https://tekton.dev/docs/dashboard/install/](https://tekton.dev/docs/dashboard/install/)