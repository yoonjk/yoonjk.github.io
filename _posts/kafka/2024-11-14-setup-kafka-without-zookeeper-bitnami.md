---
title: bitnami로 zookeeper 없는 kafka 설치
categories:
  - kafka
tags: 
  - bitnami
---

아파치 카프카 래프트(KRaft)는 메타데이터 관리를 위해 ZooKeeper에 대한 아파치 카프카의 의존성을 제거하기 위해 도입된 합의 프로토콜입니다.  
이것은 메타데이터에 대한 책임을 두 개의 다른 시스템으로 나누는 대신 Kafka 자체로 통합함으로써 Kafka의 아키텍처를 크게 단순화합니다:  
ZooKeeper와 Kafka. KRaft 모드는 이전 컨트롤러를 대체하고 이벤트 기반의 변형된 Raft 합의 프로토콜을 사용하는 Kafka의 새로운 쿼럼 컨트롤러 서비스를 사용합니다.  

## kafka cluster 구성 - broker,controller share 모델
kafka cluster를 구성할 때 broker only, controller only, broker and controller share model을 구성할 수 있습니다.

여기에서는 bitnami/kafka helm chart를 이용하여 share model로 설치하는 방법을 설명합니다.

#### repo 추가 
bitnami helm chart repo를 추가하고 업데이트합니다.  
```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update
```

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/kafka/kafka-add-bitnami-repo.png" alt="">
  <figcaption></figcaption>
</figure> 

#### values 수정

values 파일을 생성합니다.
size 8Gi에서 1Gi로 모두 변경합니다.  
그리고 values에서 나머지 항목을 아래와 같이 변경합니다.  

```bash
helm show values bitnami/kafka  > kafka-values.yaml
```

```bash
global:
  storageClass: "standard"

listeners:
  client:
    containerPort: 9092
    protocol: PLAINTEXT

  controller:
    name: CONTROLLER
    containerPort: 9093
    protocol: PLAINTEXT

  interbroker:
    containerPort: 9094
    protocol: PLAINTEXT    

  external:
    containerPort: 9095
    protocol: PLAINTEXT

serviceAccount:
  name: "kafka"

controller:
  replicaCount: 3
rbac:
  create: true
```

#### kafka broker and controller 공유모델 생성 

helm 을 이용하여 kafka cluster를 아래와 같이 생성합니다.  
```bash
helm install kafka bitnami/kafka -f kafka-values.yaml
```

#### kafka-client 생성
```bash
kubectl run kafka-client --restart='Never' --image docker.io/bitnami/kafka:3.8.0-debian-12-r5 --namespace default --command -- sleep infinity
```

```bash
kubectl exec --tty -i kafka-client --namespace default -- bash
kafka-topics.sh --bootstrap-server kafka-controller-headless:9092 --list
```

```bash
kubectl exec -it  kafka-client -- kafka-topics.sh --bootstrap-server kafka-controller-headless:9092 --list
```

#### kafka topic 생성

```bash
kubectl exec -it  kafka-client -- kafka-topics.sh --bootstrap-server kafka-controller-headless:9092 --create --topic testuser01 --partitions 1 --replication-factor 3
```

## 참조
- [install kafka cluster without zookeeper](https://ademahmudf.medium.com/running-kafka-without-zookeeper-production-ready-part-1-dbd0a74fd252)