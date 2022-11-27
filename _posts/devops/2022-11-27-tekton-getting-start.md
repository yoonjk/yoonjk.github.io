---
title: Getting Start Tekton
categories:
  - devops 
tags:
  - tekton
---

## Getting start tekton
API에서 Task Kubernetes resource type이 Task로 표현되는 Task는 작업에 필요한 로직을 수행하기 위해 순차적으로 실행되는 일련의 Step을 정의합니다. 모든 Task는 Kubernetes 클러스터에서 포드로 실행되며 각 Step은 Pod내에 자신의 컨테이너에서 실행됩니다.

아래와 같이 Hello World Task를 작성하여 Kubernetes 에 적용합니다.

## Hello World Task 작성

```bash
kubectl apply -f hello-world.yaml
```

[hello-world.yaml 파일]

```yaml
apiVersion: tekton.dev/v1beta1
kind: Task
metadata:
  name: hello-world
spec:
  steps:
    - name: hello-world
      image: alpine
      script: |
        #!/bin/sh
        echo "Hello World"
```
## Run Task 작성 
이 Task를 실행하려면 TaskRun을 사용하여 인스턴스화해야 합니다. 
다음 내용으로 hello-world-run.yaml이라는 다른 파일을 만듭니다.

```bash
kubectl apply -f hello-world-run.yaml
```

[hello-world-run.yaml]

```yaml
apiVersion: tekton.dev/v1beta1
kind: TaskRun 
metadata:
  name: hello-world-run
spec: 
  taskRef:
    name: hello-world
```