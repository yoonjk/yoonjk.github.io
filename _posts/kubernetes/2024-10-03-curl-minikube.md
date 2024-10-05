---
title: minikube에서 service 테스트 하기 
categories:
  - kubernetes
tags:
  - minikube
---

minikube에서 각 namespace에 배포되어 있는 서비스를 테스트하는 방법입니다.

#### curl pod 생성
```bash
kubectl run curl --image=alpine/curl:8.2.1 -n kube-system -i --tty --rm -- sh
```

#### curl을 이용하여 test

```bash
kubectl exec -it curl -n kube-system -- sh
for i in `seq 1 10000`; do curl canary-demo-stable.bluegreen/;echo ""; sleep 1 ; done
# or
for i in `seq 1 10000`; do curl canary-demo-canary.bluegreen/;echo ""; sleep 1 ; done

for i in `seq 1 10000`; do curl -H "host: canary-demo.com" ;echo ""; sleep 1 ; done
```

#### ingress 을 이용하여 test
ingress의 yaml 파일은 다음과 같습니다.  

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: canary-demo-stable
spec:
  ingressClassName: nginx
  rules:
  - host: canary-demo.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: canary-demo-stable
            port:
              number: 80
```

```bash
GATEWAY_URL=$(minikube ip)
for i in `seq 1000`; do curl -H "host: canary-demo.com"   $GATEWAY_URL; echo ""; sleep 1; don
```