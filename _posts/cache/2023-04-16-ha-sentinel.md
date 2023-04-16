---
title: Redis 시작하기 - Redis Sentinel 고가용성
categories: 
  - cache
tags:
  - redis
---

## Redis Sentinel을 통한 고가용성
클러스터되지 않은 Redis의 고가용성  
Redis Sentinel은 Redis Cluster를 사용하지 않을 때 Redis에 대한 고가용성을 제공합니다. Redis Sentinel은 모니터링, 알림과 같은 기타 부수적인 작업도 제공하고 클라이언트에 대한 구성 공급자 역할을 합니다.  

다음은 거시적 수준(즉, big picture)에서 Sentinel 기능의 전체 목록입니다.
* Monitoring. Sentinel은 마스터 및 복제본 인스턴스가 예상대로 작동하는지 지속적으로 확인합니다.  
* Notification. Sentinel은 API를 통해 시스템 관리자 또는 기타 컴퓨터 프로그램에 모니터링되는 Redis 인스턴스 중 하나에 문제가 있음을 알릴 수 있습니다.  
* Automatic failover. 마스터가 예상대로 작동하지 않는 경우 Sentinel은 복제본이 마스터로 승격되고, 다른 추가 복제본이 새 마스터를 사용하도록 다시 구성되며, Redis 서버를 사용하는 애플리케이션에 연결할 때 사용할 새 주소에 대한 알림을 받는 장애 조치 프로세스를 시작할 수 있습니다.  
* Configuration provider. Sentinel은 클라이언트 서비스 검색을 위한 권한 소스 역할을 하며, 클라이언트는 지정된 서비스를 담당하는 현재 Redis 마스터의 주소를 요청하기 위해 Sentinels에 연결합니다. 장애 조치(failover)가 발생하면 Sentinels는 새 주소를 보고합니다.  

## 분산 시스템으로서의 Sentinel
Redis Sentinel은 분산 시스템입니다:  
Sentinel 자체는 여러 Sentinel 프로세스가 함께 협력하는 구성에서 실행되도록 설계되었습니다. 여러 Sentinel 프로세스가 협력할 경우 다음과 같은 이점이 있습니다:  
1.	오류 감지는 여러 Sentinel이 지정된 마스터를 더 이상 사용할 수 없다는 사실에 동의할 때 수행됩니다. 이렇게 하면 장애발생 확률이 낮아집니다.  
2.	Sentinel은 모든 Sentinel 프로세스가 작동하지 않더라도 작동하므로 시스템이 오류에 대해 견고합니다. 그 자체로 단일 실패 지점인 장애 조치 시스템을 갖는 것은 장애에 대응이 취약합니다.  

Sentinel, Redis 인스턴스(마스터 및 복제본) 및 Sentinel 및 Redis에 연결하는 클라이언트의 합계도 특정 속성을 가진 더 큰 분산 시스템입니다. 이 문서에서는 Sentinel의 기본 속성을 이해하는 데 필요한 기본 정보부터 Sentinel의 작동 방식을 이해하기 위해 보다 복잡한 정보(선택 사항)에 이르기까지 개념을 점진적으로 소개합니다.  

## Sentinel quick start
#### Obtaining Sentinel
현재 버전의 Sentinel을 Sentinel 2라고 합니다. 더 강력하고 예측하기 쉬운 알고리즘(이 설명서에 설명되어 있음)을 사용하여 초기 Sentinel 구현을 다시 작성한 것입니다.  
Redis 2.8부터 Redis Sentinel의 안정적인 릴리스가 제공됩니다.  
새로운 개발은 불안정한 분기에서 수행  되며, 새로운 기능은 안정적인 것으로 간주되는 즉시 최신 안정 분기로 다시 이식되는 경우가 있습니다.
Redis 2.6과 함께 제공되는 Redis Sentinel 버전 1은 더 이상 사용되지 않으며 사용해서는 안 됩니다.  
#### Running Sentinel
redis-sentinel 실행 파일을 사용하는 경우  (또는 해당 이름의 redis-server 실행 파일에 대한 심볼릭 링크가 있는 경우  ) 다음 명령줄을 사용하여 Sentinel을 실행할 수 있습니다.:  
```bash
redis-sentinel /path/to/sentinel.conf
```
그렇지 않으면 redis-server 실행 파일을 직접 사용하여 Sentinel 모드에서 시작할 수 있습니다.:
```bash
redis-server /path/to/sentinel.conf --sentinel
```
두 가지 방법 모두 동일하게 작동합니다.  
그러나  Sentinel을 실행할 때는 이 파일이 다시 시작될 경우 다시 로드될 현재 상태를 저장하기 위해 시스템에서 사용되므로 구성 파일을 사용해야 합니다. Sentinel은 구성 파일이 제공되지 않거나 구성 파일 경로를 쓸 수 없는 경우 시작을 거부합니다.  
Sentinel은 기본적으로 TCP 포트 26379에 대한 연결을 수신하므로 Sentinels가 작동하려면 서버의 포트 26379  가 열려 있어야 다른 Sentinel 인스턴스의 IP 주소에서 연결을 수신할 수 있습니다  . 그렇지 않으면 Sentinels가 대화할 수 없고 수행할 작업에 대해 동의할 수 없으므로 장애 조치(failover)가 수행되지 않습니다.  

#### 배포하기 전에 Sentinel에 대해 알아야 할 기본 사항
1.	강력한 배포를 위해 최소 3개의 Sentinel 인스턴스가 필요합니다.  
2.	세 개의 Sentinel 인스턴스는 독립적인 방식으로 오류가 발생하는 것으로 여겨지는 컴퓨터 또는 가상 머신에 배치해야 합니다. 예를 들어 서로 다른 물리적 서버 또는 서로 다른 가용성 영역에서 실행되는 Virtual Machines는 다음과 같습니다..  
3.	Sentinel + Redis 분산 시스템은 Redis가 비동기 복제를 사용하므로 오류 중에 승인된 쓰기가 유지되도록 보장하지 않습니다. 그러나 쓰기 손실 창을 특정 순간으로 제한하는 Sentinel을 배포하는 방법이 있지만 덜 안전한 다른 방법이 있습니다.  
4.	클라이언트에서 Sentinel 지원이 필요합니다. 인기 있는 클라이언트 라이브러리는 Sentinel을 지원하지만 전부는 아닙니다.  
5.	개발 환경에서 수시로 테스트하지 않는 경우 안전한 HA 설정이 없으며, 프로덕션 환경에서 작동하는 경우 가능한 경우 더 좋습니다. 너무 늦었을 때(마스터가 작동을 멈추는 새벽 3시)에만 분명해지는 잘못된 구성이 있을 수 있습니다.  
6.	Sentinel, Docker 또는 다른 형태의 네트워크 주소 변환 또는 포트 매핑은 주의해서 혼합해야 합니다. Docker는 포트 다시 매핑을 수행하여 다른 Sentinel 프로세스의 Sentinel 자동 검색 및 마스터에 대한 복제본 목록을 중단합니다.  자세한 내용은 이 문서의 뒷부분에 있는 Sentinel 및 Docker에 대한 섹션을  확인하세요.  

##  Sentinel 구성하기 
Redis 소스 배포에는  Sentinel을 구성하는 데 사용할 수 있는 자체 문서화된 예제 구성 파일인 sentinel.conf라는 파일이 포함되어 있지만 일반적인 최소 구성 파일은 다음과 같습니다 :
```bash
sentinel monitor mymaster 127.0.0.1 6379 2
sentinel down-after-milliseconds mymaster 60000
sentinel failover-timeout mymaster 180000
sentinel parallel-syncs mymaster 1

sentinel monitor resque 192.168.1.3 6380 4
sentinel down-after-milliseconds resque 10000
sentinel failover-timeout resque 180000
sentinel parallel-syncs resque 5
```
모니터링할 마스터를 지정하기만 하면 되며, 분리된 각 마스터(복제본 수에 제한이 없을 수 있음)에 다른 이름을 부여하면 됩니다. 자동 검색되는 복제본을 지정할 필요가 없습니다. Sentinel은 복제본에 대한 추가 정보로 구성을 자동으로 업데이트합니다(다시 시작할 경우 정보를 유지하기 위해). 또한 페일오버 중에 복제본이 마스터로 승격될 때마다, 그리고 새 Sentinel이 검색될 때마다 구성이 다시 작성됩니다.  
위의 예제 구성은 기본적으로 각각 마스터와 정의되지 않은 수의 복제본으로 구성된 두 개의 Redis 인스턴스 집합을 모니터링합니다. 한 인스턴스 집합을 mymaster라고 하고 다른  인스턴스 집합을 resque라고 합니다.  

sentinel monitor 문의 인수의 의미  는 다음과 같습니다.:
```bash
sentinel monitor <master-name> <ip> <port> <quorum>
```
명확성을 위해 구성 옵션이 의미하는 바를 한 줄씩 확인해 보겠습니다:  
첫 번째 줄은 주소 127.0.0.1 및 포트 6379(쿼럼 2)에 있는 mymaster라는 마스터를 모니터링하도록 Redis에 지시하는 데 사용됩니다.마지막 인수는 쿼럼 인수 입니다.:  
* 쿼럼은 마스터를  실제로 실패로 표시하고 가능한 경우 장애 조치(failover) 절차를 시작하기 위해 마스터에 연결할 수 없다는 사실에 동의해야 하는 Sentinel의 수입니다.
* 그러나 쿼럼은 오류를 감지하는 데만 사용됩니다. 실제로 장애 조치(failover)를 수행하려면 센티넬 중 하나가 장애 조치(failover)의 리더로 선출되고 계속 진행할 수 있는 권한을 부여받아야 합니다. 이것은 Sentinel 프로세스의 대다수의 투표에서만 발생합니다.
예를 들어 5개의 Sentinel 프로세스가 있고 지정된 마스터의 쿼럼이 값 2로 설정된 경우 다음과 같은 일이 발생합니다:
* 두 센티넬이 동시에 마스터에 연결할 수 없다는 데 동의하면 둘 중 하나가 장애 조치를 시작하려고 시도합니다.
* 총 3개 이상의 Sentinel에 연결할 수 있는 경우 장애 조치(failover)가 승인되고 실제로 시작됩니다.

실제로 이는 대부분의 Sentinel 프로세스가 통신할 수 없는 경우  (즉, 소수 파티션에서 장애 조치 없음) 장애 발생 시 Sentinel이 장애 조치를 시작하지 않음을 의미합니다.  
## Sentinel 추가옵션
다른 옵션은 거의 항상 다음과 같은 형식입니다.:
```
sentinel <option_name> <master_name> <option_value>
```
그리고 다음과 같은 목적으로 사용됩니다:
* down-after-milliseconds는 Sentinel이 다운되었다고 생각하기 시작하는 인스턴스에 연결할 수 없어야 하는 시간(밀리초 단위)입니다(PING에 응답하지 않거나 오류로 응답함).  
* parallel-syncs는 장애 조치 후 동시에 새 마스터를 사용하도록 재구성할 수 있는 복제본 수를 설정합니다. 숫자가 낮을수록 장애 조치(failover) 프로세스가 완료되는 데 더 많은 시간이 걸리지만 복제본이 이전 데이터를 제공하도록 구성된 경우 모든 복제본이 동시에 마스터와 다시 동기화되는 것을 원하지 않을 수 있습니다. 복제 프로세스는 대부분 복제본에 대해 차단되지 않지만 마스터에서 대량 데이터를 로드하기 위해 중지되는 순간이 있습니다. 이 옵션을 값 1로 설정하여 한 번에 하나의 복제본에만 연결할 수 없도록 할 수 있습니다.  
추가 옵션은 이 문서의 나머지 부분에 설명되어 있으며  Redis 배포와 함께 제공되는 예제 sentinel.conf 파일에 설명되어 있습니다.
구성 매개변수는 런타임에 수정할 수 있습니다:  
* 마스터별 구성 매개변수는 SENTINEL SET를 사용하여 수정됩니다.  
* 글로벌 구성 매개변수는 SENTINEL CONFIG SET를 사용하여 수정됩니다..  

 자세한 내용은 [Reconfiguring Sentinel at runtime](https://redis.io/docs/management/sentinel/#reconfiguring-sentinel-at-runtime) 섹션을 참조하십시오.
