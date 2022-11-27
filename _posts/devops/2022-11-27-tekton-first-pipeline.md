---
title: Tekton First Pipeline
categories:
  - devops 
tags:
  - tekton
---

## First Pipeline 작성
Tekton을 이용하여 Pipeline을 작성하는 것을 실습합니다. 

Pipeline은 CI/CD 워크플로의 일부로 특정 실행 순서로 정렬된 일련의 Task를 정의합니다.

이번에는 first Pipeline을 작성할 것입니다, First Pipeline에서는 이전에 작성했던 Hello World! 그리고 goodbye World! Task를 포함하는 Pipeline을 작성합니다.

goodbye task를 다음과 같이 작성하고 적용합니다.

```bash
kubectl apply -f goodbye.yaml
```


[goodbye.yaml]
```yaml
apiVersion: tekton.dev/v1beta1 
kind: Task 
metadata: 
  name: goodbye
spec:
  steps:
    - name: goodbye 
      image: alpine 
      script: |
        #!/bin/sh
        echo "Goodbye World!" 
```

## Pipeline 작성
hello-world 타스크와 goodbye 타스크를 연결하는 pipeline을 작성합니다.

```bash
kubectl apply -f hello-goodbye-pipeline.yaml
```

[hello-goodbye-pipeline.yaml]

```yaml
apiVersion: tekton.dev/v1beta1 
kind: Pipeline 
metadata: 
  name: hello-goodbye-pipeline 
spec:
  tasks:
    - name: first-task 
      taskRef:
        name: hello-world
    - name: goodbye-task
      taskRef:
        name: goodbye
```

## Pipeline Run 작성
Pipeline을 인스턴스화하는 Pipeline Run을 다음과 같이 작성해서 Kubernetes에 적용합니다.

[hello-goodbye-pipeline-run.yaml]
```bash
kubectl apply -f hello-goodbye-pipeline-run.yaml
```

```yaml
apiVersion: tekton.dev/v1beta1 
kind: PipelineRun 
metadata:
  name: hello-goodbye-pipeline-run 
spec: 
  pipelineRef:
    name: hello-goodbye-pipeline
```
