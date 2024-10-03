---
title: argo rollouts에서 X-Canary란 무엇인가?
categories:
  - kubernetes
tags:
  - istio
  - argo rollouts
  - canary
---

Argo Rollouts에서 **X-Canary**는 카나리 배포(Canary Deployment) 시 카나리 트래픽을 구분하고 제어하기 위해 사용되는 HTTP 헤더입니다. 이를 통해 카나리 버전의 애플리케이션으로 트래픽을 보낼지, **안정적인 버전(Stable Version)**으로 보낼지 결정할 수 있습니다.

카나리 배포에서 X-Canary의 역할
카나리 배포는 새로운 버전의 애플리케이션을 점진적으로 배포하면서 일부 트래픽만 새로운 버전으로 라우팅하여 안정성을 테스트하는 방식입니다. 이때, 특정 요청을 카나리 버전으로 라우팅할지 여부를 결정하는 여러 방식이 있는데, HTTP 헤더를 사용하는 방식이 그 중 하나입니다.

X-Canary는 이러한 카나리 트래픽을 라우팅할 때 사용하는 HTTP 헤더로, 일반적으로 Ingress Controller나 Service Mesh(예: Istio, Linkerd) 등에서 이 헤더를 감지하고 카나리 트래픽을 처리하는 데 사용됩니다.

주요 기능:
트래픽 제어: 특정 요청을 카나리 버전으로 라우팅할 때 X-Canary 헤더를 사용하여 트래픽을 제어합니다. 예를 들어, 이 헤더가 설정된 요청은 카나리 버전의 애플리케이션으로 보내고, 설정되지 않은 요청은 안정적인 버전으로 보낼 수 있습니다.
실시간 트래픽 라우팅 테스트: X-Canary를 통해 실시간으로 일부 요청만 카나리 버전으로 보내어, 새로운 버전이 제대로 동작하는지 안전하게 테스트할 수 있습니다.
X-Canary 헤더 설정 예시
다음은 카나리 배포에서 X-Canary 헤더를 활용하는 일반적인 시나리오입니다. 이 예시는 Ingress Controller 또는 Service Mesh가 트래픽을 라우팅할 때 X-Canary 헤더를 감지하여, 해당 트래픽을 카나리 버전으로 보내는 방식입니다.

1. Ingress에서의 활용 (예: NGINX Ingress Controller):
NGINX Ingress Controller를 사용하여 트래픽을 라우팅할 때 X-Canary를 활용할 수 있습니다.

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-app-ingress
  annotations:
    nginx.ingress.kubernetes.io/canary: "true"
    nginx.ingress.kubernetes.io/canary-by-header: "X-Canary"
spec:
  rules:
  - host: my-app.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: my-app-stable
            port:
              number: 80
      - path: /
        pathType: Prefix
        backend:
          service:
            name: my-app-canary
            port:
              number: 80
```

nginx.ingress.kubernetes.io/canary: "true": 이 설정은 Ingress가 카나리 배포를 지원함을 의미합니다.
nginx.ingress.kubernetes.io/canary-by-header: "X-Canary": 이 설정은 NGINX가 요청의 HTTP 헤더에 X-Canary가 있는지 확인하고, 이 헤더가 있으면 해당 트래픽을 카나리 서비스(my-app-canary)로 라우팅하도록 합니다.  

1. Service Mesh에서의 활용 (예: Istio):
Istio와 같은 서비스 메쉬에서도 X-Canary와 같은 HTTP 헤더를 기반으로 트래픽을 제어할 수 있습니다.

```yaml
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: my-app
spec:
  hosts:
  - my-app.example.com
  http:
  - match:
    - headers:
        X-Canary:
          exact: "true"
    route:
    - destination:
        host: my-app-canary
        subset: v2
  - route:
    - destination:
        host: my-app-stable
        subset: v1
```

match.headers.X-Canary: 이 부분은 요청의 HTTP 헤더에 X-Canary: true가 있는지 확인합니다.
destination.host: my-app-canary: X-Canary 헤더가 있는 요청은 my-app-canary로 라우팅됩니다.
destination.host: my-app-stable: X-Canary 헤더가 없는 요청은 my-app-stable로 라우팅됩니다.

요약
**X-Canary**는 Argo Rollouts에서 카나리 배포 시 트래픽을 제어하기 위해 사용하는 HTTP 헤더입니다.
이 헤더를 기반으로 특정 요청을 카나리 버전으로 라우팅하여 새로운 버전의 안정성을 테스트할 수 있습니다.
Ingress Controller나 Service Mesh와 같은 트래픽 관리 도구에서 X-Canary 헤더를 감지하여 카나리 및 안정적인 서비스로 트래픽을 분산합니다.

