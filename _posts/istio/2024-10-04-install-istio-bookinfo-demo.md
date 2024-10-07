---
title:  istio 예제 bookinfo 설치 
categories:
  - istio
tags: 
  - bookinfo
---

istio를 체험해 볼 수 있는 Bookinfo를 설치합니다.

```bash
kubectl apply -f https://raw.githubusercontent.com/istio/istio/release-1.23/samples/bookinfo/platform/kube/bookinfo.yaml

```
<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/istio/01-install-bookinfo.png" alt="">
  <figcaption></figcaption>
</figure>  

**설치 확인**
다음의 명령어로 설치를 확인합니다.  
```bash
kubectl get po
```

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/istio/02-get-pods-istio.png" alt="">
  <figcaption></figcaption>
</figure>  


Istio는 쿠버네티스 게이트웨이 API를 지원하며 향후 트래픽 관리를 위한 기본 API로 만들 계획입니다. 다음 지침은 메시에서 트래픽 관리를 구성할 때 게이트웨이 API 또는 Istio 구성 API 중 하나를 사용하도록 선택할 수 있게 해줍니다. 기본 설정에 따라 게이트웨이 API 또는 Istio API 탭 아래의 지침을 따르세요.

대부분의 쿠버네티스 클러스터에는 기본적으로 쿠버네티스 게이트웨이 API CRD가 설치되어 있지 않으므로 게이트웨이 API를 사용하기 전에 설치되어 있는지 확인해야 합니다:

```bash
kubectl get crd gateways.gateway.networking.k8s.io &> /dev/null || \
  { kubectl apply -f https://github.com/kubernetes-sigs/gateway-api/releases/download/v1.1.0/standard-install.yaml; }
```

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/istio/03-install-crd-gateway.png" alt="">
  <figcaption></figcaption>
</figure>  

Istio로 샘플을 실행하려면 애플리케이션 자체를 변경할 필요가 없습니다. 대신 각 서비스와 함께 Envoy 사이드카를 삽입하여 Istio 지원 환경에서 서비스를 구성하고 실행하기만 하면 됩니다. 결과 배포는 다음과 같습니다:

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/istio/04-bookinfo.png" alt="">
  <figcaption></figcaption>
</figure>  

모든 마이크로 서비스는 서비스에 대한 수신 및 발신 호출을 가로채는 Envoy 사이드카와 함께 패키지화되어 Istio 제어 플레인을 통해 외부에서 애플리케이션 전체에 대한 라우팅, 원격 측정 수집 및 정책 시행을 제어하는 데 필요한 훅을 제공합니다.

1. 디렉터리를 Istio 설치의 루트로 변경합니다.

기본 Istio 설치는 자동 사이드카 인젝션을 사용합니다. 애플리케이션을 호스트할 네임스페이스에 istio-injection=enabled로 레이블을 지정한다:
```bash
kubectl 레이블 네임스페이스 기본값 istio-injection=enabled
```

2. kubectl 명령을 사용하여 애플리케이션을 배포한다:

```bash
# istio-1.23.2
cd istio*
kubectl apply -f samples/bookinfo/platform/kube/bookinfo.yaml
# or
kubectl apply -f https://raw.githubusercontent.com/istio/istio/release-1.23/samples/bookinfo/platform/kube/bookinfo.yaml
```

이 명령은 bookinfo 애플리케이션 아키텍처 다이어그램에 표시된 네 가지 서비스를 모두 실행한다. 리뷰 서비스의 세 가지 버전인 v1, v2, v3이 모두 시작됩니다.

3. 모든 서비스와 파드가 올바르게 정의되고 실행 중인지 확인합니다:

```bash
kubectl get services
NAME          TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)    AGE
details       ClusterIP   10.0.0.31    <none>        9080/TCP   6m
kubernetes    ClusterIP   10.0.0.1     <none>        443/TCP    7d
productpage   ClusterIP   10.0.0.120   <none>        9080/TCP   6m
ratings       ClusterIP   10.0.0.15    <none>        9080/TCP   6m
reviews       ClusterIP   10.0.0.170   <none>        9080/TCP   6m
```


```bash
kubectl get pods
NAME                             READY     STATUS    RESTARTS   AGE
details-v1-1520924117-48z17      2/2       Running   0          6m
productpage-v1-560495357-jk1lz   2/2       Running   0          6m
ratings-v1-734492171-rnr5l       2/2       Running   0          6m
reviews-v1-874083890-f0qf0       2/2       Running   0          6m
reviews-v2-1343845940-b34q5      2/2       Running   0          6m
reviews-v3-1813607990-8ch52      2/2       Running   0          6m
```

4. bookinfo가 실행중인지 다음의 명령어로 확인합니다.  
```bash
kubectl exec "$(kubectl get pod -l app=ratings -o jsonpath='{.items[0].metadata.name}')" -c ratings -- curl -sS productpage:9080/productpage | grep -o "<title>.*</title>"

```

5. minikube tuennel 

```
minikube tunnel --alsologtostderr --v=2
```

6. install curl 

```bash
kubectl run curl --image=alpine/curl:8.2.1 -n kube-system -i --tty -- sh
```

kubectl exec -it curl -n kube-system -- sh 

7. bookinfo gateway 설치  
   
```bash
kubectl apply -f samples/bookinfo/gateway-api/bookinfo-gateway.yaml
```
책정보 게이트웨이 리소스에서 게이트웨이 주소와 포트를 가져옵니다:
```bash
export INGRESS_HOST=$(kubectl get gtw bookinfo-gateway -o jsonpath='{.status.addresses[0].value}')
export INGRESS_PORT=$(kubectl get gtw bookinfo-gateway -o jsonpath='{.spec.listeners[?(@.name=="http")].port}')
```
GATEWAY_URL을 설정합니다.
```bash
export GATEWAY_URL=$INGRESS_HOST:$INGRESS_PORT
```

minikube ip를 실행하여 tunnel IP를 확인하고 /etc/hosts에 demo.exmaple.com을 등록합니다.
```bash
minikube ip

## /etc/hosts
192.168.49.2   demo.example.com
```

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/istio/05-minikube-ip.png" alt="">
  <figcaption></figcaption>
</figure>  

8. bookinfo-gateway 수정

```bash
apiVersion: gateway.networking.k8s.io/v1beta1
kind: Gateway
metadata:
  name: bookinfo-gateway
spec:
  gatewayClassName: istio
  listeners:
  - name: http
    hostname: "demo.example.com"
    port: 80
    protocol: HTTP
    allowedRoutes:
      namespaces:
        from: Same
```

9. bookinfo 연결 테스트 

```bash

curl -s  -H "host: demo.example.com" "http://${GATEWAY_URL}/productpage" | grep -o "<title>.*</title>"
```

반복해서 트래픽을 발생합니다.
```bash
for i in `seq 1 10000`
do
curl -s  -H "host: demo.example.com" "http://${GATEWAY_URL}/productpage" | grep -o "<title>.*</title>"
sleep 1
done

```

10. kiali addons에서 kiali 설치 하고 dashboard로 확인합니다.
samples/addons에 있는 kiali를 설치합니다.  
```bash
kubectl apply -f samples/addons
```

kiali가 설치되어 있는지 확인합니다.  

```bash
kubectl get po -n istio-system 
istioctl dashboard kiali --address 0.0.0.0
```


<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/istio/install-addons.png" alt="">
  <figcaption></figcaption>
</figure>  

11. bookinfo 트래픽 발생

bookinfo의 productpage uri 에 트패픽을 발생합니다.
```bash
for i in `seq 1 10000`; do curl -s  -H "host: demo.example.com" "http://${GATEWAY_URL}/productpage" | grep -o "<title>.*</title>"; sleep 1; done
```

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/istio/traffic-grapah.png" alt="">
  <figcaption></figcaption>
</figure> 

for i in `seq 1 10000`
do
curl -s  -H "host: demo.example.com" "http://${GATEWAY_URL}/success" 
echo ""
sleep 1
done