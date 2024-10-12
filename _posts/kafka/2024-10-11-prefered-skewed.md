---
title:  kafka broker에서  Preferred Replicas?
categories:
  - kafka
tags: 
  - broker
  - skewed
---

1. Preferred Replicas %
**Preferred Replicas %**는 Kafka 클러스터에서 **선호 리더 복제본(Preferred Leader Replica)**이 실제로 리더 역할을 하고 있는 파티션의 비율을 나타냅니다.

Preferred Replica란?
Kafka는 각 파티션의 복제본 중 리더 역할을 맡을 하나의 복제본을 선호하도록 설정하는데, 이를 Preferred Replica라고 합니다.
파티션이 처음 생성될 때, 특정 브로커가 해당 파티션의 리더 역할을 맡으며, 이 브로커가 **선호 리더 복제본(Preferred Replica)**로 간주됩니다.
시간이 지남에 따라 Kafka는 장애 복구나 리밸런싱 작업 등의 이유로 리더가 다른 브로커로 전환될 수 있는데, 이 경우 선호 복제본이 아닌 복제본이 리더가 될 수 있습니다.

Preferred Replicas % 의미
**Preferred Replicas %**는 전체 파티션 중 **선호 복제본(Preferred Replica)**이 실제로 리더 역할을 하고 있는 파티션의 비율입니다.
이 비율이 높을수록 Kafka 클러스터가 원활하게 동작하고 있으며, 리더 역할이 적절히 분산되고 있다는 의미입니다.
반대로 Preferred Replicas %가 낮다면, 파티션 리더가 특정 브로커에 몰려 있거나 클러스터의 부하가 불균형하게 분산되었을 가능성이 큽니다.
권고사항

**Preferred Replicas %**가 **100%**에 가깝도록 유지하는 것이 이상적입니다.

이를 위해, 리더 재조정(Leader Rebalancing) 작업을 정기적으로 수행하여 각 파티션의 선호 리더가 실제로 리더 역할을 하도록 조정합니다.
Kafka에서는 kafka-preferred-replica-election.sh 스크립트를 사용하여 선호 복제본이 리더 역할을 하도록 강제로 리밸런싱할 수 있습니다

2. Brokers Leader Skewed %
**Brokers Leader Skewed %**는 Kafka 클러스터에서 리더 파티션이 특정 브로커에 몰려 있는 정도를 나타내는 지표입니다.

Brokers Leader Skewed % 의미
Leader Skew는 리더 파티션이 고르게 분산되지 않고, 특정 브로커에 집중되어 있는 상태를 의미합니다.

**Brokers Leader Skewed %**는 브로커 간에 리더 파티션이 얼마나 균등하게 분산되어 있는지를 나타냅니다.
0%에 가까울수록 모든 브로커에 리더 파티션이 고르게 분산되어 있음을 의미합니다.
%가 높을수록 특정 브로커에 리더가 몰려있고, 그 브로커가 다른 브로커보다 과도한 부하를 받고 있음을 나타냅니다.
왜 Leader Skew가 발생할까?
리더 전환: 장애가 발생하면 Kafka는 다른 복제본을 리더로 전환합니다. 리더 전환 작업이 반복되면서 특정 브로커에 리더가 몰릴 수 있습니다.
리더 리밸런싱 미실행: 새로운 브로커 추가 후 리더 재조정 작업이 이루어지지 않으면, 기존 브로커가 계속해서 많은 리더 역할을 맡게 됩니다.
권고사항
**Brokers Leader Skewed %**를 가능한 낮게 유지하는 것이 중요합니다. 이상적으로는 0%에 가까워야 하며, 이는 모든 브로커가 균등하게 리더 역할을 수행하고 있음을 의미합니다.

리더 재조정(Leader Rebalancing) 작업을 정기적으로 수행하여, 리더 파티션이 특정 브로커에 집중되지 않도록 합니다.

이를 위해, kafka-preferred-replica-election.sh 스크립트를 사용하여 선호 리더로 재조정할 수 있습니다.
Kafka 설정 파일에서 리더 자동 리밸런싱(auto.leader.rebalance.enable) 기능을 활성화해두면, Kafka가 자동으로 리더를 재조정하여 클러스터의 부하를 고르게 분산할 수 있습니다.

```bash
auto.leader.rebalance.enable=true
```
모니터링 도구 사용: Kafka Manager나 Prometheus 같은 모니터링 도구를 사용하여 **Brokers Leader Skewed %**를 지속적으로 확인하고, 필요 시 리밸런싱 작업을 수행하는 것이 중요합니다.

요약
**Preferred Replicas %**는 선호 복제본이 리더 역할을 하고 있는 파티션 비율을 나타냅니다. 100%에 가까울수록 리더 파티션이 고르게 분산되어 성능이 최적화된 상태입니다.

권고사항: 리더 재조정 스크립트(kafka-preferred-replica-election.sh) 실행 또는 자동 리더 리밸런싱 활성화.
**Brokers Leader Skewed %**는 리더 파티션이 특정 브로커에 몰려 있는 정도를 나타냅니다. 0%에 가까울수록 리더 파티션이 고르게 분산된 상태입니다.

권고사항: 정기적인 리더 리밸런싱 작업을 통해 부하를 고르게 분산하고, 모니터링을 통해 스큐 상태를 지속적으로 점검합니다.
