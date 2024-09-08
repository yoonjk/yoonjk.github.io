---
title:  install helm on centos
categories:
  - kubernetes
tags: 
  - kafka
---

## kafka 설치 
apache kafka를 다음의 [링크](khttps://kafka.apache.org/downloads)에서 [2.8.2버전](https://archive.apache.org/dist/kafka/2.8.2/kafka_2.13-2.8.2.tgz)을 다운로드 받습니다.

```bash
yum update -y
yum install -y yum-utils
wget https://archive.apache.org/dist/kafka/2.8.2/kafka_2.13-2.8.2.tgz
mkdir /app
sudo tar xvzf kafka_2.13-2.8.2.tgz -C /app
cd /app
mv kafka_2.13-2.8.2 kafka

```

## OpenJdk 11 설치 
Jdk를 설치하기 위해  YUM 리포지토리에서 제공하는 OpenJDK 목록을 확인합니다.  
```bash
yum list java*jdk-devel
```
jdk 설치하기  
```bash
yum install -y java-11-openjdk-devel.x86_64
```

## zookeeper 서비스 등록
systemctl 명령어로 zookeeper를 시작하고 종료하기 위해 systemd에 zookeeper서비스를 등록합니다.

아래의 폴더에 zookeeper.service를 작성합니다.

zookeeper service : **/usr/lib/systemd/system/zookeeper.service**


```
vi /usr/lib/systemd/system/zookeeper.service

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
ExecStart=/app/kafka/bin/zookeeper-server-start.sh /app/kafka/config/zookeeper.properties
ExecStop=/app/kafka/bin/zookeeper-server-stop.sh
Restart=on-abnormal

[Install]
WantedBy=multi-user.target
```

## kafka 서비스 등록
```bash
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
ExecStart=/app/kafka/bin/kafka-server-start.sh -daemon /app/kafka/config/server.properties
ExecStop=/app/kafka/bin/kafka-server-stop.sh
Restart=always
TimeoutSec=20
SuccessExitStatus=130 143

[Install]
WantedBy=multi-user.target
```

zookeeper.service 를 수정하면 다음과 같이 reload합니다.
```bash
systemctl daemon-reload
systemctl enable zookeeper
systemctl start zookeeper
```
## kafka using helm chart
```bash
helm repo add confluentinc https://confluentinc.github.io/cp-helm-charts/   #(1)
helm repo update    #(2)
helm install confluentinc/cp-helm-charts --name my-confluent 
```