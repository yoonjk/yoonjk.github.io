---
title: setup zookeeper properties
categories:
  - kafka
tags: 
  - zookeeper
---

zookeeper.properties 의 설정정보입니다. 

#### tickTime
기본값: 3000 밀리초 (3초)
상세 설명:
목적: ZooKeeper에서 클라이언트와 서버 간의 하트비트 주기를 정의하는 속성입니다. tickTime은 ZooKeeper의 클라이언트와 서버가 서로 살아있는지 확인하기 위한 기본 시간 단위입니다.

동작:

tickTime은 ZooKeeper 서버와 클라이언트 간의 하트비트 주기를 밀리초 단위로 설정합니다. 서버가 클라이언트로부터 tickTime 내에 응답을 받지 못하면, 해당 클라이언트가 더 이상 활성 상태가 아니라고 판단할 수 있습니다.
클러스터의 성능에 따라 tickTime을 조정할 수 있습니다. 성능이 좋다면 짧게 설정할 수 있고, 지연이 많은 환경에서는 더 길게 설정할 수 있습니다.
사용 예시: ZooKeeper와 Kafka 간의 연결이 불안정하거나 네트워크 지연이 있는 환경에서는 tickTime을 늘려 ZooKeeper가 클라이언트의 비정상 종료를 잘못 감지하지 않도록 할 수 있습니다.

#### initLimit
기본값: 10  

목적: ZooKeeper에서 팔로워(follower) 노드가 리더(leader) 노드와의 초기 연결을 완료하는 데 허용되는 최대 tickTime 수를 정의합니다.

동작:

클러스터 내에서 팔로워가 리더와 통신을 시작할 때, 연결이 설정되고 초기 데이터를 동기화해야 합니다. 이 초기 동기화 과정이 완료되기까지 걸릴 수 있는 최대 시간을 정의하는 것이 initLimit입니다.
이 값은 tickTime의 배수로 계산되며, 팔로워가 initLimit * tickTime 시간 안에 리더와 연결되지 않으면, 해당 팔로워는 비정상 상태로 간주되어 다시 재연결을 시도하게 됩니다.
사용 예시: 클러스터 환경이 느리거나 네트워크 지연이 있을 경우, 이 값을 늘려 초기 동기화 시간에 충분한 여유를 줄 수 있습니다.

#### syncLimit
기본값: 5

목적: ZooKeeper에서 리더와 팔로워 간의 동기화가 완료되는 데 허용되는 최대 tickTime 수를 정의합니다.

동작:

리더는 팔로워들에게 상태 정보를 지속적으로 전송하고, 팔로워는 이 정보를 통해 동기화된 상태를 유지합니다. syncLimit은 리더가 팔로워에게 정보를 보낼 수 있는 최대 시간(리더가 응답을 기다리는 시간)을 설정하는 값입니다.
리더는 syncLimit * tickTime 내에 팔로워로부터 응답을 받아야 하며, 그렇지 않으면 해당 팔로워는 비정상적으로 간주됩니다.
사용 예시: 이 값을 너무 낮게 설정하면 네트워크 지연이 있을 때 팔로워가 자주 탈락할 수 있으며, 반대로 너무 높게 설정하면 비정상적인 팔로워 노드를 감지하는 데 더 오랜 시간이 걸릴 수 있습니다.


#### initTime
기본값: 이 속성은 ZooKeeper 설정에서 명시적으로 사용되지는 않으며, initLimit * tickTime과 유사한 개념으로 설명됩니다. 이는 초기 연결 시간(initLimit * tickTime)과 유사하게 이해할 수 있습니다.  

#### 속성 간의 관계
**tickTime:** ZooKeeper의 기본 시간 단위로, 클라이언트와 서버 간의 하트비트 주기를 설정합니다. 이 값은 다른 시간 관련 속성의 기준이 됩니다.

**initLimit:** 팔로워가 리더와 초기 연결을 설정하고 동기화하는 데 걸리는 최대 시간을 정의합니다. 이 시간은 tickTime의 배수로 계산됩니다. 예를 들어, t**ickTime=3000과 initLimit=10이면, 팔로워가 리더와 연결하는 데 최대 30초가 허용됩니다.

**syncLimit:** 리더와 팔로워 간의 동기화 과정이 완료되는 데 걸리는 최대 시간을 정의합니다. 마찬가지로, 이 시간은 tickTime의 배수로 계산됩니다. 예를 들어, tickTime=3000과 syncLimit=5이면, 리더와 팔로워 간 동기화는 최대 15초 내에 완료되어야 합니다.

관계 정리:

**tickTime**은 ZooKeeper의 기본 시간 단위로, 클라이언트와 서버 간 하트비트, 리더-팔로워 간 동기화 등의 작업에 사용됩니다.  
initLimit과 syncLimit은 각각 초기 연결과 동기화에 소요될 수 있는 최대 시간을 정의하며, 이 값들은 모두 tickTime의 배수로 계산됩니다.
**initLimit이 초기 연결 시간과 관련된 값**이라면, **syncLimit은 정상적인 동기화 상태를 유지**하는 데 필요한 시간입니다. 
두 값 모두 tickTime을 기준으로 설정되므로, tickTime을 짧게 설정할 경우 동기화 및 초기 연결 시간도 줄어듭니다.

**요약**
tickTime: 기본 시간 단위 (기본 3000ms)로 ZooKeeper에서 하트비트 주기를 설정.
initLimit: 팔로워가 리더와 초기 연결을 설정하는 데 걸릴 수 있는 최대 시간 (tickTime의 배수).
syncLimit: 리더와 팔로워 간 동기화가 완료되는 데 걸릴 수 있는 최대 시간 (tickTime의 배수).
이 설정들은 ZooKeeper에서 클라이언트와 서버, 그리고 리더와 팔로워 간의 연결 유지와 상태 동기화에 필수적이며, 네트워크 환경에 따라 적절하게 조정할 필요가 있습니다.

```ini
dataDir=/app/zookeeper
# the port at which the clients will connect
clientPort=2181
# disable the per-ip limit on the number of connections since this is a non-production config
maxClientCnxns=0
# Disable the adminserver by default to avoid port conflicts.
# Set the port to something non-conflicting if choosing to enable this
admin.enableServer=true
admin.serverPort=8080

# Define custom
tickTime=2000
syncLimit=5
initLimit=10

4lw.commands.whitelist=stat, ruok, conf, isro, cons

server.1=zookeeper1:2888:3888
server.2=zookeeper2:2888:3888
server.3=zookeeper3:2888:3888
```