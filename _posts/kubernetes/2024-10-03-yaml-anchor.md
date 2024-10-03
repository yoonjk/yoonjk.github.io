---
title: &label , *label을 대한 설명
categories:
  - kubernetes
tags:
  - yaml
---

YAML에서 &와 *을 사용하여 **앵커(anchor)**와 **별칭(alias)**를 정의하고 참조하는 방식은 코드를 재사용하고 중복을 줄이는 데 매우 유용한 기능입니다. 이를 통해 동일한 값을 여러 곳에서 참조할 수 있어 유지보수 및 가독성이 향상됩니다.

**앵커(&)**
&는 앵커를 정의할 때 사용됩니다. 특정 값을 앵커로 설정하여, 나중에 이 값을 참조할 수 있게 합니다. 예를 들어, &labels는 labels라는 이름으로 해당 값을 앵커로 정의하는 것입니다.

**별칭(*)**
*는 앵커를 참조할 때 사용됩니다. 앵커로 지정된 값을 별칭(alias)으로 불러와 재사용합니다. 예를 들어, *labels는 &labels로 정의된 값을 가져와 그대로 사용하겠다는 의미입니다.

YAML에서 &와 *의 사용 예시

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-deployment
  labels: &labels         # 앵커 정의
    app: my-app
    env: production
spec:
  selector:
    matchLabels: *labels   # 별칭을 통해 앵커 참조
  template:
    metadata:
      labels: *labels      # 별칭을 통해 앵커 참조
```
이 예시에서의 흐름:
앵커 정의 (&labels):

```yaml
labels: &labels
  app: my-app
  env: production
```
이 부분에서 app: my-app와 env: production 라벨 세트를 labels라는 이름으로 앵커로 정의합니다. 앵커는 일종의 변수처럼 생각할 수 있습니다. YAML 내 다른 곳에서 이 값을 재사용할 수 있도록 저장하는 것입니다.

별칭 사용 (*labels):

```yaml
matchLabels: *labels
```
이 부분에서 *labels는 앞서 정의한 &labels 앵커를 참조하는 것입니다. 이는 &labels로 지정된 라벨 세트를 matchLabels에 그대로 복사해 사용하는 것과 동일한 효과를 줍니다. 같은 방식으로 template.metadata.labels에서도 *labels를 사용하여 동일한 라벨을 재사용합니다.

장점:  
중복 방지: 동일한 데이터를 여러 번 작성하지 않아도 됩니다. 라벨, 설정 값 등이 여러 곳에서 반복될 경우 앵커와 별칭을 통해 이를 줄일 수 있습니다.  
유지보수 용이: 값이 바뀔 때, 한 곳에서만 변경하면 참조된 모든 곳에서 자동으로 업데이트됩니다. 예를 들어, 위 YAML 파일에서 app: my-app을 app: your-app으로 바꾸려면 &labels에서 한 번만 변경하면 됩니다.  
가독성 향상: 코드가 더 간결해지고 불필요한 중복이 없어져 가독성이 향상됩니다.   
실제 사용 시 예시
특히 Kubernetes와 같은 설정 파일에서 여러 리소스에 동일한 라벨을 적용할 때 앵커와 별칭을 유용하게 사용할 수 있습니다. 예를 들어, 여러 Deployment에서 동일한 라벨을 반복해 사용해야 하는 상황이라면 앵커로 라벨을 정의하고 이를 참조하면 쉽게 관리할 수 있습니다.

```yaml
labels: &common-labels
  app: my-app
  tier: backend
  env: production

---
apiVersion: v1
kind: Service
metadata:
  name: my-service
  labels: *common-labels
spec:
  selector:
    matchLabels: *common-labels

---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-deployment
  labels: *common-labels
spec:
  selector:
    matchLabels: *common-labels
  template:
    metadata:
      labels: *common-labels
```
이 경우, Service와 Deployment 모두 동일한 common-labels를 참조하고 있습니다. 라벨이 변경되면 한 곳에서만 수정해도 됩니다.