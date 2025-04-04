---
title: kafka cluster를 관리를 위한 kafka-ui 
categories:
  - kafka
tags: 
  - kafka-ui
---

Apache Kafka용 UI는 데이터 흐름을 관찰할 수 있게 해주고, 문제를 더 빨리 찾아서 해결하고, 최적의 성능을 제공하는 데 도움이 되는 간단한 도구입니다. 가벼운 대시보드를 통해 브로커, 토픽, 파티션, 프로덕션, 소비 등 Kafka 클러스터의 주요 메트릭을 쉽게 추적할 수 있습니다.

kafka-ui의 주요 기능은 다음과 같습니다.  

- 멀티 클러스터 관리 - 모든 클러스터를 한 곳에서 모니터링하고 관리  
- 메트릭 대시보드를 통한 성능 모니터링 - 경량 대시보드로 주요 Kafka 메트릭을 추적  
- Kafka 브로커 보기 - 토픽 및 파티션 할당, 컨트롤러 상태 보기  
- Kafka 토픽 보기 - 파티션 수, 복제 상태, 사용자 정의 구성 보기  
- 소비자 그룹 보기 - 파티션별 파킹된 오프셋, 결합 및 파티션별 지연 보기  
- 메시지 찾아보기 - JSON, 일반 텍스트 및 Avro 인코딩으로 메시지 찾아보기  
- 동적 토픽 구성 - 동적 구성으로 새 토픽 생성 및 구성  
- 구성 가능한 인증 - 선택 사항인 Github/Gitlab/Google OAuth 2.0으로 설치를 보호  
- 사용자 정의 직렬화/역직렬화 플러그인 - AWS Glue 또는 Smile과 같이 데이터에 바로 사용할 수 있는 serde를 사용하거나 직접 코딩  
- 역할 기반 액세스 제어 - UI에 대한 액세스 권한을 세밀하게 관리  
- 데이터 마스킹 - 토픽 메시지에서 민감한 데이터를 마스킹  



## 참조
- [kafka-ui](https://github.com/provectus/kafka-ui)
- [Running Mirror Maker 2 on Kafka Connect cluster](https://medium.com/@penkov.vladimir/running-mirror-maker-2-on-kafka-connect-cluster-3b391d686efe)