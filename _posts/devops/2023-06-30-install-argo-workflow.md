---
title: Argo Workflow 설치 및 로그인 없이 UI 접근
categories:
  - devops 
tags:
  - workflow
	- argo
---
## Argo Workflow 설치 
```bash
kubectl apply -n argo -f https://github.com/argoproj/argo-workflows/releases/download/v3.4.6/namespace-install.yaml
```

## Argo Workflow server login 변경없이 접근
Argo Workflow 3.x 이후 부터 UI에 접근하기 위해 로그인하도록 변경되었습니다.
그존 방식처럼 로그인 없이 사용하기 위해 다음과 같이 설정합니다.
```bash
kubectl patch deployment   argo-server   --namespace argo   --type='json'   -p='[{"op": "replace", "path": "/spec/template/spec/containers/0/args", "value": [
  "server",
  "--auth-mode=server"
]}]'
```