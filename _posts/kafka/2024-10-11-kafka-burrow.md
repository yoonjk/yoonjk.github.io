---
title:  kafka burrow
categories:
  - kafka
tags: 
  - management
  - burrow
---

Burrow는 LinkedIn에서 개발한 Kafka 모니터링 도구로, 특히 **Kafka 소비자 그룹(consumer groups)**의 상태를 모니터링하는 데 중점을 둔 도구입니다. Burrow는 Kafka의 **컨슈머 그룹 오프셋과 지연(latency)**을 모니터링하고, 각 컨슈머 그룹이 데이터 처리를 얼마나 효율적으로 하고 있는지를 추적하는 데 탁월합니다.

Burrow의 주요 기능
소비자 그룹 오프셋 및 지연 모니터링

Burrow는 Kafka 컨슈머 그룹의 **오프셋(offset)**과 **지연(latency)**을 모니터링합니다. 이를 통해 소비자 그룹이 특정 시점에 어느 위치까지 데이터를 처리했는지, 리더 브로커가 얼마나 빠르게 메시지를 제공하고 있는지 파악할 수 있습니다.
Burrow는 오프셋 이동 추적을 통해 소비자가 정상적으로 데이터를 처리하고 있는지 감시하며, 컨슈머 그룹이 리더로부터 제공된 메시지를 소비하지 못하고 있을 때, 즉 처리 지연이 발생할 경우 경고를 제공합니다.
건강 상태 평가

Burrow는 컨슈머 그룹의 상태를 평가하여 OK(정상), WARN(경고), ERR(오류) 등의 상태를 보고합니다. 이를 통해 컨슈머 그룹이 올바르게 작동하고 있는지 신속하게 파악할 수 있습니다.
상태 평가 기준은 주로 소비 지연 시간을 기준으로 하며, 지정된 임계값을 초과하면 WARN 또는 ERR 상태를 반환합니다.
자동 경고 및 알림

Burrow는 모니터링 도중 문제가 감지되면 자동으로 경고를 발생시키고, 이를 알리기 위해 알림 시스템과 연동할 수 있습니다. 예를 들어, Slack, PagerDuty와 같은 알림 도구와 통합하여 경고를 즉시 전달할 수 있습니다.
이 기능은 컨슈머 그룹이 데이터를 제대로 소비하지 못하거나 지연이 발생할 때 관리자가 즉시 문제를 인지하고 해결할 수 있도록 도와줍니다.
REST API 제공

Burrow는 다양한 정보를 조회할 수 있는 REST API를 제공합니다. 이 API를 통해 Kafka 클러스터의 상태, 컨슈머 그룹의 오프셋 정보, 지연 상태 등을 요청하고 데이터를 수집할 수 있습니다.
REST API는 다른 모니터링 도구나 자동화된 시스템과의 통합에 유용합니다.
다중 클러스터 지원

Burrow는 여러 개의 Kafka 클러스터를 동시에 모니터링할 수 있습니다. 이를 통해 대규모 환경에서도 각 클러스터의 컨슈머 그룹 상태를 한눈에 파악할 수 있습니다.
지속적인 데이터 수집

Burrow는 클러스터의 소비자 오프셋과 관련된 메타데이터를 주기적으로 수집하여 데이터 상태를 평가하고, 문제가 발생하면 바로 감지할 수 있습니다. 이를 통해 Kafka 클러스터의 소비자 그룹 동작을 지속적으로 추적합니다.
Burrow 아키텍처
Burrow는 크게 오프셋 수집기(offset collector), 컨슈머 그룹 평가기(consumer evaluator), 알림 시스템으로 구성됩니다.

Offset Collector: 각 컨슈머 그룹의 오프셋 이동과 브로커의 로그를 수집합니다. 이를 통해 소비자 그룹이 어느 시점까지 데이터를 소비했는지와 브로커가 최신으로 보유하고 있는 메시지 오프셋을 비교합니다.

Consumer Evaluator: 수집된 오프셋 데이터를 평가하여 소비 지연 시간을 계산하고, 지정된 임계값과 비교하여 컨슈머 그룹의 상태를 평가합니다. 평가 결과는 OK, WARN, ERR로 구분됩니다.

Notifier: WARN 또는 ERR 상태가 발생할 경우, Burrow는 알림 시스템을 통해 관리자에게 이를 알립니다. 이 알림은 다양한 채널로 전송될 수 있으며, 빠른 대응을 돕습니다.

Kafka 클러스터와 Burrow의 상호작용
Burrow는 Kafka 클러스터의 오프셋 정보를 수집하여 각 컨슈머 그룹의 오프셋 이동과 최신 메시지 오프셋을 비교합니다.
컨슈머 그룹이 특정 시점의 오프셋에 도달하지 못하고 지연이 발생하면, Burrow는 이를 경고 상태로 처리하고 알림을 보냅니다.
이를 통해 Kafka 클러스터가 대규모 트래픽을 처리할 때도, 소비자 그룹의 정상적인 동작 여부를 모니터링할 수 있습니다.
장점
지연 모니터링의 특화: Burrow는 Kafka 컨슈머 그룹의 지연 상태를 실시간으로 추적하여 데이터를 얼마나 신속하게 처리하고 있는지 파악할 수 있습니다. 이로 인해 컨슈머 그룹의 성능 저하나 장애를 빠르게 감지할 수 있습니다.

자동 경고 시스템: Burrow는 임계값을 설정하여 경고를 자동으로 발생시키고, Slack, PagerDuty 등과 연동하여 실시간 알림을 받을 수 있습니다. 이는 Kafka 관리자의 빠른 대응을 가능하게 합니다.

REST API 제공: Burrow는 REST API를 통해 외부 시스템과 쉽게 통합할 수 있으며, 이를 통해 Kafka 클러스터 모니터링 데이터를 수집하고 분석할 수 있습니다.

다중 클러스터 지원: Burrow는 여러 개의 Kafka 클러스터를 동시에 모니터링할 수 있어, 복잡한 대규모 Kafka 환경에서도 유용합니다.

설치 및 구성
설치 방법

Burrow는 Go 언어로 작성되어 있으며, Docker 이미지로도 제공됩니다. Docker를 이용하면 간편하게 설치할 수 있습니다.

```bash
docker run -d \
-v /path/to/burrow/config:/etc/burrow \
-p 8000:8000 \
--name burrow \
linkedin/burrow
```

구성 파일

Burrow의 설정 파일은 Kafka 클러스터 정보와 알림 설정을 정의합니다. Kafka 클러스터의 zookeeper 정보, 오프셋 임계값, 알림 시스템과의 통합 설정을 구성해야 합니다.
REST API 사용

Burrow는 다양한 API 엔드포인트를 제공하여 Kafka 클러스터 및 컨슈머 그룹의 상태를 조회할 수 있습니다. 예를 들어, 아래의 명령을 사용하여 컨슈머 그룹의 상태를 조회할 수 있습니다.

```bash
curl http://localhost:8000/v3/kafka/{cluster}/consumer/{consumer_group}/status
```

Burrow의 사용 사례
Kafka 컨슈머 그룹 상태 추적: Burrow는 Kafka 클러스터에서 지연이 발생하는 소비자 그룹을 실시간으로 추적하고, 문제가 발생할 때 빠르게 대응할 수 있게 도와줍니다.

알림 시스템 통합: Burrow는 Kafka 클러스터에서 이상 징후를 감지하면 즉시 Slack이나 PagerDuty 등과 같은 알림 시스템에 경고를 보낼 수 있어, Kafka 클러스터의 안정적인 운영을 유지할 수 있습니다.

대규모 Kafka 모니터링: Burrow는 여러 Kafka 클러스터를 동시에 모니터링할 수 있어, 대규모 Kafka 배포 환경에서도 소비자 그룹의 상태를 효율적으로 추적할 수 있습니다.

요약
Burrow는 Kafka의 컨슈머 그룹 오프셋과 지연을 모니터링하는 도구로, 소비자 그룹이 데이터를 제대로 처리하고 있는지 실시간으로 추적합니다.
REST API와 자동 경고 기능을 제공하여 Kafka 클러스터 관리자가 즉각적으로 문제를 파악하고 대응할 수 있도록 도와줍니다.
여러 Kafka 클러스터를 지원하며, Slack이나 PagerDuty 같은 외부 알림 시스템과 쉽게 통합할 수 있습니다.
Kafka 클러스터의 안정성과 성능을 보장하기 위해 필수적인 도구로, 컨슈머 그룹 상태를 효율적으로 모니터링하고 빠르게 문제를 해결하는 데 매우 유용합니다.


## Pre-requisistes

go lang download  및 설치  
```bash
wget wget https://go.dev/dl/go1.22.3.dragonfly-amd64.tar.gz
rm -rf /usr/local/go && tar -C /usr/local -xzf go1.22.3.linux-amd64.tar.gz
```

PATH 환경 변수에 /usr/local/go/bin을 추가하고 저장합니다.  
```
vi ~/.bash_profile

GOPATH=$HOME/go
export PATH=$PATH:/usr/local/go/bin:$GOPATH/go/bin
```

profile 다시 적용  
```bash
source ~/.bash_profile
```

## burrow build

```bash
git clone https://github.com/linkedin/Burrow.git
cd Burrow
```

Burronw에서 사용하는 go lang모듈을 download받기 위해 다음 명령어를 실행합니다.

```bash
go mod tidy
```
Burrow 모듈을 build합니다.  

```bash
go install
```

## burrow.toml

http://localhost:8000/v3/kafka/myKafka

```ini
[general]
pidfile="burrow.pid"
stdout-logfile="burrow.out"
access-control-allow-origin="mysite.example.com"

[logging]
filename="logs/burrow.log"
level="info"
maxsize=100
maxbackups=30
maxage=10
use-localtime=false
use-compression=true

[zookeeper]
servers=[ "zookeeper1:2181", "zookeeper2:2181", "zookeeper3:2181" ]
timeout=6
root-path="/burrow"

[client-profile.test]
client-id="burrow-test"
kafka-version="0.10.0"

[cluster.myKafka]
class-name="kafka"
servers=[ "kafka1:9092", "kafka2:9092", "kafka3:9092" ]
client-profile="test"
topic-refresh=120
offset-refresh=30
groups-reaper-refresh=0

[consumer.myKafka]
class-name="kafka"
cluster="myKafka"
servers=[ "kafka1:9092", "kafka2:9092", "kafka3:9092" ]
client-profile="test"
group-denylist="^(console-consumer-|python-kafka-consumer-|quick-).*$"
group-allowlist=""

[consumer.local_zk]
class-name="kafka_zk"
cluster="myKafka"
servers=[ "zookeeper1:2181", "zookeeper2:2181", "zookeeper3:2181" ]
zookeeper-path="/kafka-cluster"
zookeeper-timeout=30
group-denylist="^(console-consumer-|python-kafka-consumer-|quick-).*$"
group-allowlist=""

[httpserver.default]
address=":8000"
```

## burrow-dashboard - docker

```bash
docker run -e BURROW_BACKEND=http://your-burrow-domain joway/burrow-dashboard:latest
```

docker compose file
```yaml
version: '3.6'
services:
  burrow_dashboard:
    image: joway/burrow-dashboard:latest
    container_name: burrow-dashboard
    environment:
      BURROW_BACKEND: "http://burrow:8100"
    ports:
      - "8300:80"
    extra_hosts:
      - "burrow:10.117.25.140"
```

## burrow-dashboard - kubernetes

```yaml
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: kafka-burrow
  namespace: infra
  labels:
    app: kafka-burrow
spec:
  replicas: 1
  selector:
    matchLabels:
      app: kafka-burrow
  template:
    metadata:
      labels:
        app: kafka-burrow
    spec:
      imagePullSecrets:
      - name: docker.in
      nodeSelector:
        role: infra
      containers:
      - name: kafka-burrow
        image: joway/docker-burrow
        env:
        - name: ZOOKEEPER_SERVERS
          value: '"zk:2181"'
        - name: KAFKA_BROKERS
          value: '"kafka1:9092","kafka2:9092"'
        - name: KAFKA_VERSION
          value: 0.10.1.0
        ports:
        - containerPort: 8000
          name: api
          protocol: TCP
      - name: kafka-burrow-dashboard
        image: joway/burrow-dashboard:latest
        env:
          - name: BURROW_BACKEND
            value: http://kafka-burrow-svc:8000
        ports:
        - containerPort: 80
          name: web
          protocol: TCP
---
apiVersion: v1
kind: Service
metadata:
  name: kafka-burrow-svc
  namespace: infra
  labels:
    app: kafka-burrow
spec:
  ports:
  - port: 8000
    name: api
    targetPort: 8000
  - port: 80
    name: web
    targetPort: 80
  selector:
    app: kafka-burrow
```

##  관련정보 

- [데브원영](https://blog.voidmainvoid.net/245)
- [Kafka Burrow partition lag](https://www.redpanda.com/guides/kafka-performance-kafka-burrow-partition-lag)
- [Monitoring Kafka with Burrow and Prometheus Operator](https://github.com/ignatev/burrow-kafka-dashboard)
- [Burrow Dashboard](https://github.com/joway/burrow-dashboard)
- [kafka 관련 성능 고찰](https://team-platform.tistory.com/6)
- [kafk 내장 성틍 tool](https://blair2dev.tistory.com/9)