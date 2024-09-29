---
title:  Install Gateways
categories:
  - kubernetes
tags: 
  - istio
---

Istio는 쿠버네티스 [게이트웨이 API](https://istio.io/latest/blog/2024/gateway-mesh-ga/)를 지원하며 향후 트래픽 관리를 위한 기본 API로 만들 계획입니다.  
게이트웨이 API를 사용하는 경우, 이 문서에 설명된 대로 게이트웨이 배포를 설치 및 관리할 필요가 없습니다.  
기본적으로 게이트웨이 배포 및 서비스는 게이트웨이 구성에 따라 자동으로 프로비저닝됩니다.  
자세한 내용은 [게이트웨이 API](https://istio.io/latest/docs/tasks/traffic-management/ingress/gateway-api/#automated-deployment) 작업을 참조하세요. 

서비스 메시를 생성하는 것과 함께 Istio를 사용하면 메시의 에지에서 실행되는 Envoy 프록시인 게이트웨이를 관리하여 메시로 들어오고 나가는 트래픽을 세밀하게 제어할 수 있습니다.

Istio의 기본 제공 [구성 프로필](https://istio.io/latest/docs/setup/additional-setup/config-profiles/) 중 일부는 설치 중에 [게이트웨이](https://istio.io/latest/docs/concepts/traffic-management/#gateways)를 배포합니다.  
예를 들어, [기본 설정](https://istio.io/latest/docs/setup/install/istioctl/#install-istio-using-the-default-profile)으로 istioctl 설치를 호출하면 컨트롤 플레인과 함께 인그레스 게이트웨이가 배포됩니다.  
평가 및 간단한 사용 사례에는 괜찮지만 게이트웨이를 컨트롤 플레인과 결합하여 관리 및 업그레이드가 더 복잡해집니다.  
프로덕션 Istio 배포의 경우, 독립적으로 작동할 수 있도록 분리하는 것이 좋습니다.  

#### Pre-requisites
이 가이드를 계속 진행하려면 Istio 컨트롤 플레인이 설치되어 있어야 합니다.

최소 프로필(예: istioctl install --set profile=minimal)을 사용하여 설치 중에 게이트웨이가 배포되지 않도록 할 수 있습니다. 

#### Deploying a gateway

프록시 구성도 유사하게 자동 인젝션할 수 있습니다.

게이트웨이 배포에 자동 주입을 사용하면 개발자가 게이트웨이 배포를 완전히 제어할 수 있을 뿐만 아니라 운영도 간소화할 수 있으므로 권장됩니다. 새 업그레이드가 사용 가능하거나 구성이 변경된 경우 게이트웨이 포드를 다시 시작하기만 하면 업데이트할 수 있습니다. 따라서 게이트웨이 배포 운영 환경이 사이드카 운영 환경과 동일해집니다.

기존 배포 도구를 사용하는 사용자를 지원하기 위해 Istio는 게이트웨이를 배포하는 몇 가지 다른 방법을 제공합니다. 각 방법은 동일한 결과를 생성합니다. 가장 익숙한 방법을 선택하세요.

**istioOperator**를 이용한 설치 

아래에 나열된 모든 메서드는 런타임에 추가 파드 설정을 채우기 위해 주입에 의존합니다. 이를 지원하려면 게이트웨이가 배포되는 네임스페이스에 istio-injection=disabled 레이블이 없어야 합니다. 레이블이 있는 경우, 파드가 생성될 때 대체되는 플레이스홀더인 자동 이미지를 가져오려고 시도하는 파드가 시작에 실패하는 것을 볼 수 있습니다.



```yaml
apiVersion: install.istio.io/v1alpha1
kind: IstioOperator
metadata:
  name: ingress
spec:
  profile: empty # Do not install CRDs or the control plane
  components:
    ingressGateways:
    - name: istio-ingressgateway
      namespace: istio-ingress
      enabled: true
      label:
        # Set a unique label for the gateway. This is required to ensure Gateways
        # can select this workload
        istio: ingressgateway
  values:
    gateways:
      istio-ingressgateway:
        # Enable gateway injection
        injectionTemplate: gateway
```

