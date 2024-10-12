---
title:  kafka cluster 설치 및 구성 
categories:
  - kafka
tags: 
  - cluster
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
TimeoutSec=20
SuccessExitStatus=130 143

[Install]
WantedBy=multi-user.target
```
zookeeper.service 를 수정하면 다음과 같이 reload합니다.
```bash
systemctl daemon-reload
systemctl enable zookeeper.service
systemctl start zookeeper
```

## kafka 서비스 등록
```bash
vi /usr/lib/systemd/system/kafka.service

# Kafka server management

[Unit]
Requires=zookeeper.service
After=zookeeper.service
Description=Apache Kafka server (broker)
Documentation=http://kafka.apache.org/documentation.html
Requires=network.target remote-fs.target zookeeper.service
After=network.target remote-fs.target zookeeper.service

[Service]
Type=simple
User=root
Group=root
ExecStart=/app/kafka/bin/kafka-server-start.sh /app/kafka/config/server.properties
ExecStop=/app/kafka/bin/kafka-server-stop.sh
Restart=always
TimeoutSec=20
SuccessExitStatus=130 143

[Install]
WantedBy=multi-user.target
```


kafka process를 종료합니다.

```bash
# Kafka 종료 
bin/kafka-server-stop.sh
# kafka process 확인 
ps -ef|grep server.properties
```
kafka.service 를 수정하면 다음과 같이 reload합니다.
```bash
systemctl daemon-reload
systemctl enable kafka.service
systemctl start kafka
```

## zookeeper quorum
zookeeper의   데이터 폴더에 myid 값을 설정합니다.
zookeeper1에 myid 값을 1로 설정하고, 나머지 zookeeper 에 순차적으로 값을 설정합니다.
```bash
# zookeeper1
echo "1" > myid

# zookeeper2
echo "2" > myid

# zookeeper3 
echo "3" > myid
```

## zookeeper.properties 설정

1. tickTime  
설명: tickTime은 Zookeeper 서버에서 사용하는 시간 단위로, 밀리초 단위로 설정됩니다. 이 값은 Zookeeper의 다양한 시간 관련 설정의 기본 단위가 됩니다.  
용도: Zookeeper는 이 시간 단위를 사용하여 클라이언트 세션의 타임아웃, heartbeat 간격 등을 결정합니다. 기본값은 2000ms(2초)입니다.  
2. initLimit  
설명: initLimit는 Zookeeper 서버가 초기화 중에 팔로우 서버가 리더 서버로부터 얼마나 많은 tickTime 동안 응답을 기다릴지를 설정합니다.  
용도: 이 값은 Zookeeper 클러스터의 리더가 팔로워에게 자신의 상태를 전송하는 동안, 팔로워가 이를 처리하는 데 필요한 시간의 최대값을 결정합니다.  기본값은 10입니다. 즉, 10 * tickTime 만큼의 시간 동안 응답을 기다립니다.  
3. syncLimit  
설명: syncLimit는 Zookeeper 서버가 리더와 팔로워 간의 동기화를 위한 최대 허용 지연 시간을 설정합니다.  
용도: 이 값은 리더와 팔로워 간 데이터 동기화 과정에서 팔로워가 리더에게 얼마나 늦게 반응할 수 있는지를 결정합니다. 기본값은 5입니다. 즉, max tickTime의 5배까지 지연이 허용됩니다.  
4. maxClientCnxns  
설명: maxClientCnxns는 한 클라이언트가 Zookeeper 서버에 동시에 열 수 있는 최대 연결 수를 설정합니다.
용도: 이 설정은 리소스 관리를 위해 중요한 역할을 하며, 특정 클라이언트가 Zookeeper 서버에 과도하게 연결하여 서버 성능에 영향을 주는 것을 방지하는 데 도움을 줍니다. 기본값은 보통 60입니다.  
이 설정들은 Zookeeper의 성능과 안정성을 확보하는 데 중요한 역할을 하므로, 클러스터의 요구에 맞게 적절히 조정하는 것이 좋습니다.  

max tickTime이라는 용어는 Zookeeper의 특정 설정값이 아니라, 여러 설정값들과 관련하여 구성되는 "tickTime"의 곱으로 해석될 수 있습니다.   Zookeeper에서 "tickTime"은 시간 단위이고, "initLimit"과 "syncLimit" 설정에 곱해져 Zookeeper의 동작에 영향을 미칩니다. 하지만 max tickTime이라는 특정 설정은 존재하지 않습니다. 대신에 다음과 같이 이해할 수 있습니다.  

**tickTime 관련**
tickTime: 앞서 설명한 것처럼, Zookeeper의 기본 시간 단위를 나타냅니다. 이 값은 기본적으로 2000ms(2초)로 설정됩니다.
initLimit 및 syncLimit에 관련된 tickTime  
maxInitLimit: 초기화 프로세스에 대한 제한을 설정합니다. initLimit은 팔로워가 초기화하는 데 소요될 수 있는 최대 tickTime의 수를 나타냅니다.  
maxSyncLimit: 클라이언트와 리더 간의 데이터 동기화 프로세스에 대한 지연 시간을 설정합니다. syncLimit도 최대 tickTime의 수를 사용하여 표현됩니다.  

**예시**
예를 들어, tickTime이 2000ms이고, initLimit이 10이라면, 최대 20초(20000ms)까지 초기화에 소요될 수 있습니다.  
tickTime이 2000ms이고, syncLimit이 5라면, 최대 10초(10000ms) 동안 동기화 지연이 허용됩니다.  
결론적으로, "max tickTime"이라는 개념은 존재하지 않지만, tickTime을 기준으로 여러 제한을 설정하면서 시스템의 성능을 조절하는 방식이므로, 각 설정의 조합을 통해 Zookeeper 클러스터의 안정성을 관리할 수 있습니다.  

## zookeeper whitelist 초기화 방법

다음의 명령어를 실행했을 때 whitelist 없기 때문에 실행할 수 없다고 아래와 같이 메시지가 출력되는 경우

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/kafka/01-how-to-initialize-zookeeper-whitelist.png" alt="">
  <figcaption></figcaption>
</figure> 

zookeeper.properties에 다음의 항목을 추가합니다.

```bash
# 4개의 keyword command 
4lw.commands.whitelist=stat, ruok, conf, isro
# or
4lw.commands.whitelist=*
```




## kafka using helm chart
```bash
helm repo add confluentinc https://confluentinc.github.io/cp-helm-charts/   #(1)
helm repo update    #(2)
helm install confluentinc/cp-helm-charts --name my-confluent 
```