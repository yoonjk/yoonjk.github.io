---
title: setup prometheus and add jmx_prometheus_javaagent
categories:
  - kafka
tags: 
  - kafka-monitor
  - grafana
  - prometheus
---

kafka 모니터링을 위해 grafana/prometheus를 설치 및 구성합니다.  

#### downlad jmx_prometheus
googling을 이용하여 jmx_prometheus 를 검색하여 maven repository에서 최근 버전의 jmx_prometheus_javaagent download 합니다.  

```bash
mkdir prometheus
cd prometheus

wget https://repo1.maven.org/maven2/io/prometheus/jmx/jmx_prometheus_javaagent/1.0.1/jmx_prometheus_javaagent-1.0.1.jar
wget https://raw.githubusercontent.com/prometheus/jmx_exporter/master/example_configs/kafka-0-8-2.yml
```

#### setup jmx_prometheus_agent
kafka.service에 아래의 내용을 추가하고, kafka 서비스를 재시작합니다.


```ini
Environment="KAFKA_HEAP_OPTS=-Xmx256M -Xms128M"
Environment="KAFKA_OPTS=-javaagent:/app/manager/prometheus/jmx_prometheus_javaagent-1.0.1.jar=8080:/app/manager/prometheus/kafka-0-8-2.yml"
```

kafka.service의 전체 내용입니다.  

```ini
# Kafka server (broker) management

[Unit]
Description=Apache Kafka server (broker)
Documentation=http://kafka.apache.org/documentation.html
Requires=network.target remote-fs.target zookeeper.service
After=network.target remote-fs.target zookeeper.service

[Service]
Type=simple
User=root
Group=root
Environment="KAFKA_HEAP_OPTS=-Xmx256M -Xms128M"
Environment="KAFKA_OPTS=-javaagent:/app/manager/prometheus/jmx_prometheus_javaagent-1.0.1.jar=8080:/app/manager/prometheus/kafka-0-8-2.yml"
ExecStart=/app/kafka/bin/kafka-server-start.sh /app/kafka/config/server.properties
ExecStop=/app/kafka/bin/kafka-server-stop.sh
Restart=on-abnormal
TimeoutSec=20
SuccessExitStatus=130 143

[Install]
WantedBy=multi-user.target
```

kafka 서비스를 재시작합니다.  

```bash
systemctl stop kafka
systemctl daemon-reload
systemctl start kafka
```
#### download prometheus
prometheus를 아래의 [링크](https://prometheus.io/download/)

```bash
wget https://github.com/prometheus/prometheus/releases/download/v3.0.0-beta.0/prometheus-3.0.0-beta.0.linux-amd64.tar.gz
```


#### prometheus.yml 작성

```bash
curl localhost:8080/metrics
```

```yaml
# my global config
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: "kafka"
    static_configs:
      - targets:
        - kafka1:8080
```

#### Running prometheus
prometheus를 아래의 같이 실행하고, browser에서 9090으로 접속합니다.  
```bash
./prometheus --config.file=config/prometheus.yml
```

#### Prometheus service 작성
prometheus를 /app/manager/prometheus 폴더로  복사합니다.
original prometheus.yml은 prometheus-template.yml 로 이름을 변경합니다.

```bash
cp -rp prometheus /app/manager
cd /app/manager/prometheus
mv prometheus.yml prometheus-template.yml
```

prometheus.service 파일을 작성합니다.
```bash
 vi /usr/lib/systemd/system/prometheus.service
```
```ini
[Unit]
Descrition=Prometheus Server for monitoring kafka
Documentation=https://prometheus.io/docs/introduction/overview/
After=network-online.target


[Service]
User=root
Group=root
ExecStart=/app/manager/prometheus/prometheus --config.file=/app/manager/prometheus/config/prometheus.yml --storage.tsdb.path=/app/manager/prometheus/data --web.enable-lifecycle
ExecStop=/bin/bash -c "curl -X POST localhost:9090/-/quit"
TimeoutSec=20
SuccessExitStatus=130 143

[Install]
WantedBy=multi-user.target
```

#### Enable prometheus service using systemctl

```bash
systemctl daemon-reload
systemctl enable prometheus
systemctl start prometheus
systemctl status prometheus
```




