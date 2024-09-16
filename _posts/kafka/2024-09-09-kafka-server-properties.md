---
title: kafka server.properties에 대해 설명
categories:
  - kafka
tags: 
  - server
---

kafka를 시작할 때  server.properties에 대해 설명합니다.

Apache Kafka의 server.properties 파일에서 설정할 수 있는 항목인 num.partitions와 default.replication.factor에 대해 상세하게 설명하겠습니다.

- num.partitions
설명: num.partitions는 새로운 토픽이 생성될 때 기본적으로 생성되는 파티션의 수를 설정합니다. 파티션은 Kafka의 분산 메시징 시스템의 핵심 구성 요소로, 데이터를 처리하고 저장하는 단위 입니다.  

용도: 이 설정은 토픽의 초기 파티션 수를 정의하며, 더 많은 파티션을 설정할수록 데이터 병렬 처리 성능이 증가합니다. 하지만 각 파티션은 별도의 오버헤드를 가지므로, 파티션 수를 잘 고려하여 설정해야 합니다.  

기본값: Kafka의 기본값은 1입니다. 별도로 파티션 수를 설정하지 않고 토픽을 생성할 경우, 이 설정이 적용됩니다.  
즉, 새로운 토픽이 생성될 때 기본적으로 1개의 파티션이 생성됩니다.  
새로운 토픽은 기본적으로 하나의 파티션을 가지며, 필요한 경우 이 값을 늘려 성능 향상을 도모할 수 있습니다.

- default.replication.factor
설명: default.replication.factor는 새롭게 생성되는 토픽의 기본 복제본(replica)의 개수를 정의합니다. 복제본은 각 파티션의 데이터를 다른 브로커에 복사하여, 데이터 가용성과 내구성을 높이는 역할을 합니다. 장애 발생 시에도 데이터 손실을 최소화하기 위해 이 값을 2 이상으로 설정하는 것이 일반적입니다.  
**복제본의 수는 클러스터 내의 브로커 수보다 클 수 없습니다.**

용도: 이 설정은 데이터의 내구성과 가용성을 높이는 데 중요한 역할을 합니다. 예를 들어, 복제 인자가 3이라면, 각 파티션의 데이터는 3개의 브로커에 복제됩니다. 이를 통해 브로커 중 하나가 실패하더라도 데이터 손실 없이 서비스가 계속 운영될 수 있습니다.  

기본값: Kafka의 기본값은 1입니다. 
즉, 복제가 설정되지 않으면 기본적으로 각 파티션은 단일 브로커에만 저장됩니다.  
기본적으로 복제본이 생성되지 않아, 데이터 손실 위험이 있을 수 있습니다.  

- listeners
설명:

Kafka 브로커가 클라이언트 또는 다른 브로커와 통신할 때 사용할 네트워크 주소(호스트와 포트)를 지정합니다. 브로커가 수신 대기할 네트워크 인터페이스와 프로토콜을 정의하며, 여러 프로토콜을 동시에 사용할 수 있습니다. 예를 들어, PLAINTEXT, SSL, SASL_PLAINTEXT 등의 프로토콜을 사용할 수 있습니다.
이 설정은 Kafka 브로커가 클라이언트로부터의 요청을 수신할 IP 주소와 포트를 설정합니다.
기본값:

PLAINTEXT://:9092. 기본적으로 PLAINTEXT 프로토콜을 사용하며, 포트는 9092번을 사용합니다. 보안이 필요한 경우 SSL 또는 SASL을 사용하여 통신을 암호화할 수 있습니다.

요약
num.partitions: 기본 파티션 수 (기본값: 1)  
default.replication.factor: 기본 복제 인자 (기본값: 1)  
이 설정들은 Kafka 토픽의 성능 및 내구성에 직접적인 영향을 미치므로, 운영 환경 및 요구 사항에 맞춰 적절히 조정하는 것이 중요합니다.

## setup kafka
kafka가 설치된 KAFKA_HOME directory 아래에 config/server.properties에서 아래 4개의 항목을 수정합니다.  

- broker.id
- log.dirs
- advertised.listeners
- zookeeper.connect
- delete.topic.enable=true

#### broker.id
Kafka 클러스터에서 각 브로커를 구분하는 고유한 ID입니다.  
클러스터 내에서 각각의 Kafka 브로커가 동일한 broker.id를 가질 수 없으며, 이 값은 정수로 설정됩니다. Kafka 브로커는 클러스터 내에서 유일해야 하기 때문에, broker.id가 브로커를 식별하는 중요한 역할을 합니다.  
클러스터 내에서 브로커가 메타데이터 상에서 고유하게 식별되도록 하는 데 사용되며, 이 ID는 Zookeeper나 Kafka Controller에 의해 관리됩니다.  
이 값은 브로커가 재시작될 때도 유지되어야 하며, 클러스터에서 브로커를 식별하는 데 중요한 역할을 합니다.

기본값: 0  

기본값은 0으로 설정되어 있습니다. 클러스터를 구성할 때 이 값은 반드시 수정해야하며,  
브로커를 시작하려면 반드시 설정해야 하는 필수 항목입니다.

#### log.dirs
Kafka 브로커가 메시지 데이터를 저장하는 디렉토리 경로를 지정합니다. 각 브로커는 수신한 메시지를 로컬 디스크에 저장하며, 이 디렉토리는 파티션 데이터와 로그 세그먼트 파일들이 저장되는 위치입니다. 여러 디렉토리를 쉼표로 구분하여 지정할 수 있으며, Kafka는 여러 디스크에 데이터를 분산 저장할 수 있습니다.  
이 경로는 브로커의 저장 용량 관리에 중요한 역할을 하므로 적절한 디스크 공간이 있는 경로를 설정해야 합니다.  

기본값: /tmp/kafka-logs  
디폴트로 임시 디렉토리에 저장되며, 실제 운영 환경에서는 적절한 경로로 변경해야 합니다.  

#### advertised.listeners
- advertised.listeners

외부 클라이언트나 다른 브로커가 이 브로커에 접근할 때 사용할 네트워크 주소를 지정합니다. 이는 listeners 설정과 다르게, 브로커가 내부 네트워크에서 사용하는 IP와는 다른 IP(예: 외부 접근을 허용하는 공인 IP)일 수 있습니다.
외부에서 브로커에 접근할 때 이 주소를 통해 연결됩니다. 예를 들어, 브로커가 내부적으로 여러 네트워크 인터페이스를 가질 수 있는 경우, 외부 클라이언트는 advertised.listeners에 설정된 주소로 연결합니다.  

기본값:

기본값은 없습니다. 설정하지 않을 경우, listeners의 값이 클라이언트들에게 광고됩니다. 그러나, 일반적으로 외부 클라이언트가 접근할 주소를 명시적으로 설정하는 것이 좋습니다.  

#### zookeeper.connect
Kafka 브로커가 연결할 Zookeeper의 주소를 지정합니다. Zookeeper는 Kafka 클러스터의 메타데이터를 관리하며, 브로커와 토픽의 상태를 조율하는 역할을 합니다. Zookeeper 연결 문자열은 Zookeeper 서버의 호스트 이름 또는 IP와 포트 번호로 구성됩니다.  

예시: 
```ini
zookeeper.connect=localhost:2181
```
기본값: zookeeper.connect=localhost:2181

기본값은 다음과 같이 설정되어 있습니다.  
```ini
zookeeper.connect=localhost:2181
```
Zookeeper의 주소는 필수적으로 설정해야 합니다. Zookeeper가 여러 개 있을 경우 쉼표로 구분하여 설정합니다.

#### delete.topic.enable
- delete.topic.enable
Kafka에서 토픽 삭제 기능을 활성화할지 여부를 설정합니다. 기본적으로 이 기능은 비활성화되어 있으며, 토픽 삭제를 활성화하면 관리자가 불필요하거나 사용되지 않는 토픽을 삭제할 수 있습니다. 토픽 삭제는 클러스터의 데이터를 정리하고 저장소 공간을 확보하는 데 유용하지만, 실수로 중요한 토픽을 삭제할 위험도 있습니다.

기본값: false  
기본적으로 토픽 삭제는 비활성화되어 있으며, 설정을 true로 변경하면 토픽 삭제가 가능해집니다.


#### unclean.leader.election.enable
리더 선출 과정에서 복제되지 않은(즉, 최신 데이터가 없는) 브로커가 리더로 선출될 수 있는지 여부를 제어하는 설정입니다. true로 설정하면, 정상적인 리더가 없을 경우 복제되지 않은 브로커도 리더가 될 수 있습니다. 이 설정은 데이터 가용성을 높이는 대신, 데이터 일관성을 희생할 수 있습니다.
false로 설정하면, 복제된 데이터가 없는 브로커는 리더로 선출되지 않으며, 데이터 일관성이 유지됩니다. 그러나 리더를 선출할 수 없을 경우 잠재적으로 가용성이 낮아질 수 있습니다.

기본값: true  
기본적으로 리더 선출 시 복제되지 않은 브로커도 리더가 될 수 있습니다.

#### num.io.threads
Kafka 브로커에서 파일 및 네트워크 I/O 작업을 처리하는 스레드 수를 설정합니다.  
이 스레드는 클라이언트와의 통신, 데이터 전송 등 브로커의 I/O 관련 작업을 담당합니다.  
브로커가 더 많은 클라이언트와 통신하거나 많은 데이터를 처리해야 할 때 스레드 수를 늘릴 수 있습니다.  

기본값: 8  
기본적으로 8개의 I/O 스레드가 할당됩니다.  

#### num.network.threads  
네트워크 요청을 처리하는 스레드 수를 지정합니다. 
브로커가 클라이언트의 요청을 받아들이고, 응답을 보내는 네트워크 처리 작업에 사용됩니다.  
네트워크 처리 부하가 많은 경우 이 값을 증가시킬 수 있습니다.  

기본값: 3  

기본적으로 3개의 네트워크 스레드가 사용됩니다.

#### num.recovery.threads.per.data.dir

브로커 재시작 시 로그 복구 작업을 처리하는 스레드 수를 지정합니다. 브로커가 여러 데이터 디렉토리를 사용할 경우 각 디렉토리마다 지정된 스레드 수만큼 로그 복구를 병렬로 처리합니다.
이 설정은 브로커가 재시작될 때 성능에 영향을 미칩니다. 높은 복구 성능이 필요하면 값을 늘릴 수 있습니다.
기본값:

기본적으로 데이터 디렉토리당 하나의 복구 스레드가 사용됩니다.

#### num.replica.fetchers
리더 브로커로부터 복제를 받을 때 사용할 스레드 수를 설정합니다. 각 복제본(replica)은 리더로부터 데이터를 가져와 복제하는데, 이 작업을 병렬로 처리하는 스레드의 수를 결정합니다.  
클러스터에서 많은 복제본을 처리해야 하는 경우 값을 늘려 복제 성능을 향상시킬 수 있습니다.

기본값: 1

기본적으로 하나의 스레드가 복제를 처리합니다.
offsets.retention.minutes
설명:

소비자 오프셋 데이터를 보존하는 시간(분 단위)입니다. Kafka는 소비자가 마지막으로 읽은 메시지의 위치를 저장하는데, 이 오프셋 정보를 얼마나 오랫동안 보관할지를 설정합니다.
클러스터에 많은 소비자가 있을 경우 이 값을 적절히 조정해야 디스크 공간을 효율적으로 사용할 수 있습니다.
기본값:

1440 (1일). 기본적으로 오프셋 데이터는 1일 동안 보관됩니다.
6. zookeeper.session.timeout.ms
설명:

Kafka 브로커가 Zookeeper와의 세션이 만료되기 전까지 기다리는 시간(밀리초 단위)을 설정합니다. 이 시간이 지나면 Zookeeper는 해당 브로커의 세션을 종료하고, 클러스터에서 해당 브로커를 제거할 수 있습니다.
기본값:

18000 (18초). 기본적으로 18초 동안 Zookeeper와의 연결이 이루어지지 않으면 세션이 만료됩니다.
7. broker.rack
설명:

브로커가 위치한 랙(rack)을 지정합니다. 랙 정보를 설정하면 Kafka는 장애가 발생했을 때 데이터 복제본을 물리적으로 다른 랙에 배치하여 데이터의 가용성을 보장하는 랙 인식(replica rack awareness) 기능을 활용할 수 있습니다.
기본값:

기본값은 없습니다. 필요시 설정해야 합니다.
#### default.replication.factor
새롭게 생성되는 토픽의 기본 복제본(replica) 수를 설정합니다. 복제본 수가 많을수록 데이터 가용성은 높아지지만, 그만큼 자원 사용량도 증가합니다.

기본값: 1

기본적으로 복제본은 하나만 생성됩니다.

#### num.partitions
새롭게 생성되는 토픽의 기본 파티션 수를 설정합니다. 파티션 수는 클러스터의 병렬 처리 성능과 부하 분산에 큰 영향을 미칩니다. 파티션 수가 많을수록 클러스터의 처리 능력이 향상됩니다.

기본값: 1

기본적으로 하나의 파티션이 생성됩니다.

#### quota.producer.default
각 프로듀서가 사용할 수 있는 기본 트래픽 용량(일반적으로 byte/sec)을 설정합니다. 이 설정을 통해 특정 프로듀서의 과도한 자원 사용을 제한할 수 있습니다.

기본값:

기본값은 설정되어 있지 않으며, 필요 시 사용자가 설정해야 합니다.

#### quota.consumer.default
각 소비자가 사용할 수 있는 기본 트래픽 용량(일반적으로 byte/sec)을 설정합니다. 이를 통해 특정 소비자의 과도한 자원 사용을 제한할 수 있습니다.

기본값:

기본값은 설정되어 있지 않으며, 필요 시 사용자가 설정해야 합니다.

#### default server.properties

```ini
# Licensed to the Apache Software Foundation (ASF) under one or more
# contributor license agreements.  See the NOTICE file distributed with
# this work for additional information regarding copyright ownership.
# The ASF licenses this file to You under the Apache License, Version 2.0
# (the "License"); you may not use this file except in compliance with
# the License.  You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# see kafka.server.KafkaConfig for additional details and defaults

############################# Server Basics #############################

# The id of the broker. This must be set to a unique integer for each broker.
broker.id=0

############################# Socket Server Settings #############################

# The address the socket server listens on. It will get the value returned from
# java.net.InetAddress.getCanonicalHostName() if not configured.
#   FORMAT:
#     listeners = listener_name://host_name:port
#   EXAMPLE:
#     listeners = PLAINTEXT://your.host.name:9092
#listeners=PLAINTEXT://:9092

# Hostname and port the broker will advertise to producers and consumers. If not set,
# it uses the value for "listeners" if configured.  Otherwise, it will use the value
# returned from java.net.InetAddress.getCanonicalHostName().
#advertised.listeners=PLAINTEXT://your.host.name:9092

# Maps listener names to security protocols, the default is for them to be the same. See the config documentation for more details
#listener.security.protocol.map=PLAINTEXT:PLAINTEXT,SSL:SSL,SASL_PLAINTEXT:SASL_PLAINTEXT,SASL_SSL:SASL_SSL

# The number of threads that the server uses for receiving requests from the network and sending responses to the network
num.network.threads=3

# The number of threads that the server uses for processing requests, which may include disk I/O
num.io.threads=8

# The send buffer (SO_SNDBUF) used by the socket server
socket.send.buffer.bytes=102400

# The receive buffer (SO_RCVBUF) used by the socket server
socket.receive.buffer.bytes=102400

# The maximum size of a request that the socket server will accept (protection against OOM)
socket.request.max.bytes=104857600


############################# Log Basics #############################

# A comma separated list of directories under which to store log files
log.dirs=/tmp/kafka-logs

# The default number of log partitions per topic. More partitions allow greater
# parallelism for consumption, but this will also result in more files across
# the brokers.
num.partitions=1

# The number of threads per data directory to be used for log recovery at startup and flushing at shutdown.
# This value is recommended to be increased for installations with data dirs located in RAID array.
num.recovery.threads.per.data.dir=1

############################# Internal Topic Settings  #############################
# The replication factor for the group metadata internal topics "__consumer_offsets" and "__transaction_state"
# For anything other than development testing, a value greater than 1 is recommended to ensure availability such as 3.
offsets.topic.replication.factor=1
transaction.state.log.replication.factor=1
transaction.state.log.min.isr=1

############################# Log Flush Policy #############################

# Messages are immediately written to the filesystem but by default we only fsync() to sync
# the OS cache lazily. The following configurations control the flush of data to disk.
# There are a few important trade-offs here:
#    1. Durability: Unflushed data may be lost if you are not using replication.
#    2. Latency: Very large flush intervals may lead to latency spikes when the flush does occur as there will be a lot of data to flush.
#    3. Throughput: The flush is generally the most expensive operation, and a small flush interval may lead to excessive seeks.
# The settings below allow one to configure the flush policy to flush data after a period of time or
# every N messages (or both). This can be done globally and overridden on a per-topic basis.

# The number of messages to accept before forcing a flush of data to disk
#log.flush.interval.messages=10000

# The maximum amount of time a message can sit in a log before we force a flush
#log.flush.interval.ms=1000

############################# Log Retention Policy #############################

# The following configurations control the disposal of log segments. The policy can
# be set to delete segments after a period of time, or after a given size has accumulated.
# A segment will be deleted whenever *either* of these criteria are met. Deletion always happens
# from the end of the log.

# The minimum age of a log file to be eligible for deletion due to age
log.retention.hours=168

# A size-based retention policy for logs. Segments are pruned from the log unless the remaining
# segments drop below log.retention.bytes. Functions independently of log.retention.hours.
#log.retention.bytes=1073741824

# The maximum size of a log segment file. When this size is reached a new log segment will be created.
log.segment.bytes=1073741824

# The interval at which log segments are checked to see if they can be deleted according
# to the retention policies
log.retention.check.interval.ms=300000

############################# Zookeeper #############################

# Zookeeper connection string (see zookeeper docs for details).
# This is a comma separated host:port pairs, each corresponding to a zk
# server. e.g. "127.0.0.1:3000,127.0.0.1:3001,127.0.0.1:3002".
# You can also append an optional chroot string to the urls to specify the
# root directory for all kafka znodes.
zookeeper.connect=localhost:2181

# Timeout in ms for connecting to zookeeper
zookeeper.connection.timeout.ms=18000


############################# Group Coordinator Settings #############################

# The following configuration specifies the time, in milliseconds, that the GroupCoordinator will delay the initial consumer rebalance.
# The rebalance will be further delayed by the value of group.initial.rebalance.delay.ms as new members join the group, up to a maximum of max.poll.interval.ms.
# The default value for this is 3 seconds.
# We override this to 0 here as it makes for a better out-of-the-box experience for development and testing.
# However, in production environments the default value of 3 seconds is more suitable as this will help to avoid unnecessary, and potentially expensive, rebalances during application startup.
group.initial.rebalance.delay.ms=0
```
