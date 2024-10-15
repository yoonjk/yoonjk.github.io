---
title: Add jmx_prometheus_agent를  zookeeper service 에 추가 
categories:
  - kafka
tags: 
  - kafka-monitor
  - zookeeper
  - prometheus
---

prometheus로 zookeeper를 모니터링하기 위한 설정을 합니다.  

아래의 [링크](https://github.com/prometheus/jmx_exporter.git)에서 [example_configs](https://github.com/prometheus/jmx_exporter/tree/main/example_configs)에 있는 zookeeper.yaml 파일을 download 받습니다.  

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/kafka/13-jmx-exporter.png" alt="">
  <figcaption></figcaption>
</figure> 

```bash
cd /app/manager/prometheus
wget https://raw.githubusercontent.com/prometheus/jmx_exporter/main/example_configs/zookeeper.yaml
```

#### zookeeper service 수정

```bash
vi /usr/lib/systemd/system/zookeeper.service
```

```ini
# Zookeeper server management (Kafka-embedded)

[Unit]
Description=Apache Zookeeper server (Kafka-embedded)
Documentation=http://zookeeper.apache.org
Requires=network.target remote-fs.target
After=network.target remote-fs.target

[Service]
Type=simple
User=root
Group=root
SysLogIdentifier=zookeeper
Environment="EXTRA_ARGS=-javaagent:/app/manager/prometheus/jmx_prometheus_javaagent-1.0.1.jar=8090:/app/manager/prometheus/zookeeper.yaml"
ExecStart=/app/kafka/bin/zookeeper-server-start.sh /app/kafka/config/zookeeper.properties
ExecStop=/app/kafka/bin/zookeeper-server-stop.sh
Restart=on-abnormal
SuccessExitStatus=130 143
TimeoutSec=20

[Install]
WantedBy=multi-user.target
```

#### prometheus.yaml 수정 

