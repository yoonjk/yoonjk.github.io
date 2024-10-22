---
title: Kafka 접속을 위한 JMX 설정
categories:
  - kafka
tags: 
  - JMX
---

카프카 모니터링은 카프카 배포의 최적화를 위해 사용되는 중요하고 광범위한 작업입니다. 이 프로세스는 직접 구축하는 대신 기존 모니터링 솔루션 중 하나를 적용하면 원활하고 효율적으로 수행할 수 있습니다. 프로젝트 클러스터에서 메시지 전송 및 처리를 위해 Apache Kafka와 함께 솔루션을 사용하고 이를 모니터링하고 싶다고 가정해 봅시다. 다행히도 Kafka 개발자들은 우리에게 그러한 기회를 제공합니다. 이 글에서는 Prometheus, Telegraf, Grafana와 같은 모니터링 솔루션의 설치, 설정 및 실행과 관련된 몇 가지 힌트와 예제를 통한 간략한 설명을 제공합니다. 결과적으로 Grafana 측의 대시보드에서 시스템, Kafka 브로커, Kafka 소비자, Kafka 생산자 메트릭을 볼 수 있습니다.



#### Kafka 및 Prometheus JMX 익스포터
Kafka는 Scala와 Java로 작성된 오픈 소스 스트림 처리 소프트웨어 플랫폼입니다. 일반적인 목표는 데이터 피드의 실시간 처리를 위한 통합된 고처리량, 저지연 플랫폼을 제공하는 것입니다.  
소프트웨어 플랫폼의 스토리지 계층은 스트리밍 데이터 처리 측면에서 비즈니스에 매우 유용합니다. 또한, Kafka는 Kafka Connect를 통해 외부 시스템에 연결할 수 있습니다. 아파치 카프카는 기회를 제공합니다:  


Prometheus JMX 익스포터는 JMX 대상의 mBean을 스크래핑하고 노출하기 위해 설계된 수집기입니다. 이는 독립적인 HTTP 서버뿐만 아니라 Java 에이전트로도 실행됩니다. JMX 익스포터는 다양한 애플리케이션에서 내보내고 매트릭스와 효율적으로 
작업할 수 있습니다.  

## Download Prometheus JMX exporter

```bash
sudo wget -P /opt/kafka/prometheus/ https://repo1.maven.org/maven2/io/prometheus/jmx/jmx_prometheus_javaagent/0.3.0/jmx_prometheus_javaagent-0.3.0.jar
sudo wget -P /opt/kafka/prometheus/ https://raw.githubusercontent.com/prometheus/jmx_exporter/master/example_configs/kafka-0-8-2.yml 
```

## Edit Prometheus JMX exporter config file
Prometheus JMX 내보내기 구성 파일을 편집합니다. 여기에 Kafka Consumer 및 Kafka Producer 스크래핑 쿼리를 추가하겠습니다:

```bash
Prometheus JMX 내보내기 구성 파일을 편집합니다. 여기에 Kafka Consumer 및 Kafka Producer 스크래핑 쿼리를 추가하겠습니다:
```

## 실행
이제 Jolokia JVM 에이전트로 Kafka 서비스를 시작할 준비가 완료되었습니다. 이 자료는 예시일 뿐이므로 여기서는 콘솔 버전의 Kafka Consumer와 Kafka Producer를 실행해 보겠습니다. 하지만 JVM을 기반으로 자체 소비자와 생산자를 사용하여 Jolokia 에이전트를 실행할 수 있습니다.

#### broker 설정
```bash
sudo KAFKA_HEAP_OPTS="-Xmx1000M -Xms1000M" KAFKA_OPTS="-javaagent:/opt/kafka/prometheus/jmx_prometheus_javaagent-0.3.0.jar=7071:/opt/kafka/prometheus/kafka-0-8-2.yml"  /opt/kafka/bin/kafka-server-start.sh -daemon /opt/kafka/config/server.properties
```

#### producer JMX 설정
```bash
KAFKA_OPTS="-javaagent:/opt/kafka/prometheus/jmx_prometheus_javaagent-0.3.0.jar=7072:/opt/kafka/prometheus/kafka-0-8-2.yml" /opt/kafka/bin/kafka-console-consumer.sh --bootstrap-server 0.0.0.0:9092 --topic test --from-beginning
```

### consumer JMX 설정
```bash
KAFKA_OPTS="-javaagent:/opt/kafka/prometheus/jmx_prometheus_javaagent-0.3.0.jar=7073:/opt/kafka/prometheus/kafka-0-8-2.yml" /opt/kafka/bin/kafka-console-producer.sh --broker-list 0.0.0.0:9092 --topic test
```

## prometheus 

#### install prometheus
```bash
wget https://github.com/prometheus/prometheus/releases/download/v2.2.1/prometheus-2.2.1.linux-amd64.tar.gz -P /tmp/
sudo tar -zxvf /tmp/prometheus-2.2.1.linux-amd64.tar.gz -C /tmp/
sudo cp /tmp/prometheus-2.2.1.linux-amd64/{prometheus,promtool} /usr/local/bin/
sudo chmod +x  /usr/local/bin/{prometheus,promtool}
sudo cp  /tmp/prometheus-2.2.1.linux-amd64/prometheus.yml /etc/prometheus/
sudo cp -r /tmp/prometheus-2.2.1.linux-amd64/{consoles,console_libraries} /etc/prometheus/
```

/etc/prometheus/prometheus.yml을 추가합니다:
```yaml
 - job_name: 'kafka-server'
    static_configs:
      - targets: ['127.0.0.1:7071']

  - job_name: 'kafka-consumer'
    static_configs:
      - targets: ['127.0.0.1:7072']

  - job_name: 'kafka-producer'
    static_configs:
      - targets: ['127.0.0.1:7073']

  - job_name: 'telegraf'
    static_configs:
      - targets: ['127.0.0.1:9200']
```

#### Prometheus systemd service

systemd에 prometheus를 등록합니다.  

```ini
[Unit]
Description=Prometheus
Wants=network-online.target
After=network-online.target

[Service]
User=root
Group=root
Type=simple
ExecStart=/usr/local/bin/prometheus \
	--config.file /etc/prometheus/prometheus.yml \
	--storage.tsdb.path /var/lib/prometheus/ \
	--web.console.templates=/etc/prometheus/consoles \
	--web.console.libraries=/etc/prometheus/console_libraries

[Install]
WantedBy=multi-user.target
```
prometheus 실행
```bash
sudo systemctl enable prometheus.service && sudo service prometheus start
```

## Telegraf


Telegraf는 Go로 작성된 강력한 오픈소스 데이터 수집 에이전트입니다. 시스템과 서비스의 성능 메트릭을 수집합니다. 텔레그래프는 데이터를 모니터링하고, 처리하고, 다양한 서비스로 푸시할 수 있는 기회를 제공합니다.  
이 에이전트에는 데이터 수집 및 보고 측면에서 좋은 선택이 될 수 있는 몇 가지 유익한 특징이 있습니다:  

#### Add an Influx repo

```bash
curl -sL https://repos.influxdata.com/influxdb.key | sudo apt-key add -
source /etc/lsb-release
echo "deb https://repos.influxdata.com/${DISTRIB_ID,,} ${DISTRIB_CODENAME} stable" | sudo tee /etc/apt/sources.list.d/influxdb.list
```

#### Install Telegraf
```bash
sudo apt-get update && sudo apt-get install telegraf
```

```
  listen = ":9200"
  collectors_exclude = ["gocollector", "process"]
```

#### telegraf 실행 
```bash
sudo systemctl enable telegraf.service
sudo service telegraf start
```
## 참고 
[Kafka Monitoring with Prometheus, Telegraf, and Grafana](https://activewizards.com/blog/kafka-monitoring-with-prometheus-telegraf-and-grafana/)