---
title: Redis 시작하기 - Redis Sentinel 고가용성 예시
categories: 
  - cache
tags:
  - redis
---

## Sentinel 구성
이제 Sentinel에 대한 기본 정보를 알았으므로 Sentinel 프로세스를 어디에 배치해야 하는지, 얼마나 많은 Sentinel 프로세스가 필요한지 등이 궁금할 수 있습니다. 이 섹션에서는 몇 가지 배포 예를 보여 줍니다.
그래픽 형식의 구성 예를 보여주기 위해 ASCII 아트를 사용  하며, 이것이 다른 기호가 의미하는 바입니다

![ sentinel box]({{ "/assets/images/cache/15-cache-box.png"}} )

box 안에 Redis Instance가 실행중인있 있씁니다:

![ sentinel box]({{ "/assets/images/cache/16-cache-master-sentinel.png"}} )  

서로 다른 Box는 선으로 연결되어 대화할 수 있음을 보여줍니다:

![ sentinel box]({{ "/assets/images/cache/17-cache-s1-s1.png"}} )  

네트워크 파티션은 슬래시를 사용하여 중단된 줄로 표시됩니다

![ sentinel box]({{ "/assets/images/cache/18-cache-s1-s1-network.png"}} )  

또한 다음 사항에 유의하십시오.
* 마스터는 M1, M2, M3, ..., Mn이라고합니다.    
* 복제본은 R1, R2, R3, ..., Rn(R은 복제본을 나타냄)이라고 합니다.  
* 센티넬은 S1, S2, S3, ..., Sn이라고합니다.  
* 클라이언트는 C1, C2, C3, ..., Cn이라고 합니다.  
* Sentinel 작업으로 인해 인스턴스가 역할이 변경되면 대괄호 안에 넣으므로 [M1]은 Sentinel 개입으로 인해 이제 마스터가 된 인스턴스를 의미합니다.  

Sentinel은  장애 조치를 시작하기 위해 항상 대다수와 통신해야 하므로 두 개의 Sentinel만 사용되는 설정은 표기하지 않습니다.  

## 예시 1:  

![ sentinel box]({{ "/assets/images/cache/19-cache-m1s1-r1s2.png"}} )  

구성: quorum = 1  
* 이 설정에서 마스터 M1에 장애가 발생하면 두 Sentinel이 실패에 대한 합의에 도달할 수 있고(분명히 쿼럼이 1로 설정됨) 과반수가 2이기 때문에 장애 조치를 승인할 수 있으므로 R1이 승격됩니다. 따라서 표면적으로 작동할 수 있지만 다음 사항을 확인하여 이 설정이 손상된 이유를 확인하십시오.  
* M1이 실행 중인 서버 H/W박스가 작동을 멈추면 S1도 작동을 멈춥니다. 다른 상자 S2에서 실행 중인 Sentinel은 장애 조치(failover)를 승인할 수 없으므로 시스템을 사용할 수 없게 됩니다.  

서로 다른 장애 조치(failover)를 정렬하고 나중에 최신 구성을 모든 Sentinel에 전파하려면 과반수가 필요합니다. 또한 합의 없이 위 설정의 한 쪽에서 장애 조치(failover)하는 기능은 매우 위험합니다:

![ m1s1 box]({{ "/assets/images/cache/20-cache-m1s1-m1s2.png"}} )  

위의 구성에서 우리는 완벽하게 대칭적인 방식으로 두 개의 마스터(S2가 권한 부여 없이 장애 조치(failover)할 수 있다고 가정)를 만들었습니다. 클라이언트는 양쪽에 무기한으로 쓸 수 있습니다. 그리고 영구적인 분할  단절 상태에서는 파티션의  구성이 올바른 구성으로 복원할  방법이 없습니다

따라서 항상 **세 개의 다른 상자에 최소 세 명의 센티넬을 배치**하십시오

## 예시 2: 3개의 박스에 기본 설정  
이것은 매우 간단한 설정으로, 추가 안전을 위해 간단하게 조정할 수 있다는 장점이 있습니다. 세 개의 상자를 기반으로 하며, 각 상자는 Redis 프로세스와 Sentinel 프로세스를 모두 실행합니다.  

![m1s1-r1s2-r3s3]({{ "/assets/images/cache/21-cache-m1s1-r2s2-r3s3.png" }})  
구성: quorum = 2  

마스터 M1에 장애가 발생하면 S2와 S3는 장애에 대해 동의하고 장애 조치를 승인할 수 있으므로 클라이언트가 계속할 수 있습니다.
모든 Sentinel 설정에서 Redis는 비동기 복제를 사용하므로 지정된 승인된 쓰기가 마스터로 승격된 복제본에 도달하지 못할 수 있기 때문에 일부 쓰기가 손실될 위험이 항상 있습니다. 그러나 위의 설정에서는 다음 그림과 같이 클라이언트가 이전 마스터로 분할되기 때문에 더 높은 위험이 있습니다:  

![m1s1-r1s2-r3s3]({{ "/assets/images/cache/22-cache-m1s1-m2s2-r3s3.png" }})  

이 경우 네트워크 파티션은 이전 마스터 M1을 분리하므로 복제본 R2가 마스터로 승격됩니다. 그러나 이전 마스터와 동일한 파티션에 있는 C1과 같은 클라이언트는 이전 마스터에 데이터를 계속 쓸 수 있습니다. 이 데이터는 파티션이 복구되면 마스터가 새 마스터의 복제본으로 재구성되어 데이터 세트를 버리기 때문에 영원히 손실됩니다.  

이 문제는 마스터가 더 이상 지정된 수의 복제본으로 쓰기를 전송할 수 없음을 감지하는 경우 쓰기 수락을 중지할 수 있는 다음 Redis 복제 기능을 사용하여 완화할 수 있습니다.  
```bash
min-replicas-to-write 1
min-replicas-max-lag 10
```

위의 구성(자세한 내용은 Redis 배포판의 자체 주석 처리된 redis.conf 예제 참조)을 사용하면  마스터 역할을 할 때 Redis 인스턴스가 1개 이상의 복제본에 쓸 수 없는 경우 쓰기 수락을 중지합니다. 복제는 비동기식이므로  실제로 쓸 수 없다는 것은  복제본의 연결이 끊어 졌거나 지정된 최대 지연 시간(초) 이상 비동기 승인을 보내지 않음을 의미합니다 .  

이 구성을 사용하면 위 예제의 이전 Redis 마스터 M1을 10초 후에 사용할 수 없게 됩니다. 파티션이 복구되면 Sentinel 구성이 새 구성으로 수렴되고 클라이언트 C1은 유효한 구성을 가져올 수 있으며 새 마스터를 계속 사용할 수 있습니다.  

그러나 공짜는 없습니다. 이 구체화를 통해 두 복제본이 다운되면 마스터는 쓰기 수락을 중지합니다. 그것은 절충안입니다

## 예시 3: 클라이언트 상자의 Sentinel 

때로는 마스터와 복제본에 대해 두 개의 Redis 상자만 사용할 수 있습니다. 이 경우 예제 2의 구성은 실행 가능하지 않으므로 클라이언트가 있는 위치에 Sentinels가 배치되는 다음 구성에 의존할 수 있습니다:  

![m1s1-r1s2-r3s3]({{ "/assets/images/cache/23-cache-m1-r1-c1s1-c2s2-c3s3.png" }})  

이 설정에서 관점 Sentinels는 클라이언트와 동일하며, 대부분의 클라이언트가 마스터에 연결할 수 있는 경우 괜찮습니다. 여기서 C1, C2, C3은 일반 클라이언트이며, C1이 Redis에 연결된 단일 클라이언트를 식별한다는 의미는 아닙니다. 응용 프로그램 서버, Rails 응용 프로그램 또는 이와 유사한 것일 가능성이 더 큽니다.  

M1 및 S1이 실행 중인 상자에 오류가 발생하면 장애 조치(failover)가 문제 없이 발생하지만 다른 네트워크 파티션으로 인해 다른 동작이 발생한다는 것을 쉽게 알 수 있습니다. 예를 들어 Redis 마스터와 복제본을 모두 사용할 수 없으므로 클라이언트와 Redis 서버 간의 네트워크 연결이 끊어지면 Sentinel을 설정할 수 없습니다.  

C3가 M1로 분할되는 경우(위에서 설명한 네트워크에서는 거의 불가능하지만 다른 레이아웃에서는 또는 소프트웨어 계층의 오류로 인해 가능할 가능성이 높음) 예제 2에서 설명한 것과 유사한 문제가 발생하지만 여기서는 복제본과 마스터만 있기 때문에 대칭을 깰 방법이 없다는 차이점이 있습니다.  따라서 마스터는 복제본과의 연결이 끊어지면 쿼리 수락을 중지할 수 없으며, 그렇지 않으면 복제본 오류 중에 마스터를 사용할 수 없습니다.  

따라서 이것은 유효한 설정이지만 예제 2의 설정은 Redis 자체와 동일한 상자에서 실행되는 Redis의 HA 시스템과 같은 이점이 있어 관리가 더 간단할 수 있으며 소수 파티션의 마스터가 쓰기를 수신할 수 있는 시간에 제한을 두는 기능이 있습니다.  

예시 4: 클라이언트가 3개 미만인 Sentinel 클라이언트 

예제 3에 설명된 설정은 클라이언트 측에 3개 미만의 상자(예: 웹 서버 3개)가 있는 경우 사용할 수 없습니다. 이 경우 다음과 같은 혼합 설정에 의존해야 합니다.:  

![m1s1-r1s2-r3s3]({{ "/assets/images/cache/24-cache-m1s1-r1s2-c1s3-c2s4.png" }})  
구성: quorum = 3  

이는 예제 3의 설정과 유사하지만 여기서는 사용 가능한 4개의 상자에서 4개의 Sentinel을 실행합니다. 마스터 M1을 사용할 수 없게 되면 다른 세 명의 센티넬이 페일오버를 수행합니다.  

이론적으로 이 설정은 C2 및 S4가 실행 중인 상자를 제거하고 쿼럼을 2로 설정하는 방식으로 작동합니다. 그러나 애플리케이션 계층에서 고가용성을 갖지 않고 Redis 측에서 HA를 원할 가능성은 거의 없습니다.  

## Sentinel, Docker, NAT 및 가능한 문제

도커는 포트 매핑이라는 기술을 사용합니다: 도커 컨테이너 내에서 실행되는 프로그램은 프로그램이 사용하는 것으로 생각되는 것과 다른 포트로 노출될 수 있습니다. 이는 동일한 서버에서 동시에 동일한 포트를 사용하여 여러 컨테이너를 실행하는 데 유용합니다.  

Docker는 이러한 일이 발생하는 유일한 소프트웨어 시스템이 아니며 포트를 다시 매핑할 수 있는 다른 네트워크 주소 변환 설정이 있으며 때로는 포트가 아니라 IP 주소도 있습니다.  

포트와 주소를 다시 매핑하면 두 가지 방법으로 Sentinel에 문제가 발생합니다.:  
1.	다른 Sentinel의 Sentinel 자동 검색은  각 Sentinel이 연결을 수신 대기 중인 포트 및 IP 주소를 알리는 hello 메시지를 기반으로 하기 때문에 더 이상 작동하지 않습니다. 그러나 Sentinel은 주소 또는 포트가 다시 매핑되었음을 이해할 수 있는 방법이 없으므로 다른 Sentinel이 연결하기에 올바르지 않은 정보를 출력합니다.  
2.	복제본은 비슷한 방식으로 Redis 마스터의 INFO 출력에 나열됩니다  : 주소는 TCP 연결의 원격 피어를 확인하는 마스터에 의해 감지되는 반면, 포트는 핸드 셰이크 중에 복제본 자체에 의해 통지되지만 포트 포인트 1에 노출 된 것과 같은 이유로 잘못 될 수 있습니다.  

Sentinels는 마스터 INFO 출력 정보를 사용하여 복제본을 자동 감지하므로  감지된 복제본에 연결할 수 없으며 시스템 관점에서 좋은 복제본이 없기 때문에 Sentinel은 마스터를 장애 조치할 수 없습니다. 따라서 Docker에 포트 1:1을 매핑하도록 지시하지 않는 한 현재 Docker와 함께 배포된 마스터 및 복제본 인스턴스 집합을 Sentinel로 모니터링할 수 있는 방법이 없습니다.  

첫 번째 문제의 경우, 전달된 포트(또는 포트가 다시 매핑되는 다른 NAT 설정)와 함께 Docker를 사용하여 Sentinel 인스턴스 집합을 실행하려는 경우 다음 두 가지 Sentinel 구성 지시문을 사용하여 Sentinel이 특정 IP 및 포트 집합을 표기하도록 강제할 수 있습니다:  

```bash
sentinel announce-ip <ip>
sentinel announce-port <port>
```

Docker에는 호스트 네트워킹 모드에서 실행할 수 있는 기능이 있습니다  (  자세한 내용은 --net=host 옵션 확인). 이 설정에서 포트가 다시 매핑되지 않으므로 문제가 발생하지 않습니다.  

## IP 주소 및 DNS 이름
이전 버전의 Sentinel은 호스트 이름을 지원하지 않았으며 모든 곳에서 IP 주소를 지정해야 했습니다. 버전 6.2부터 Sentinel은  호스트 이름을 선택적으로 지원합니다  

__이 기능은 기본적으로 비활성화되어 있습니다. DNS/호스트 이름 지원을 활성화하려는 경우 다음 사항에 유의하세요__.:
1.	Redis 및 Sentinel 노드의 이름 확인 구성은 안정적이어야 하며 주소를 빠르게 확인할 수 있어야 합니다. 주소 확인의 예기치 않은 지연은 Sentinel에 부정적인 영향을 미칠 수 있습니다.  
2.	모든 곳에서 호스트 이름을 사용하고 호스트 이름과 IP 주소를 혼합하지 않아야 합니다. 이렇게 하려면  모든 Redis 및 Sentinel 인스턴스에 대해 각각 replica-announce-ip <hostname>  및 sentinel announce-ip <hostname>를 사용합니다.  

resolve-hostnames 글로벌 구성을 활성화하면 Sentinel이 호스트 이름을 수락할 수 있습니다:

* sentinel monitor 명령의 일부로 
* 복제본 주소로, 복제본이 replica-announce-ip에 호스트 이름 값을 사용하는 경우

Sentinel은 호스트 이름을 유효한 입력으로 받아들이고 확인하지만, 인스턴스를 발표하거나 구성 파일을 업데이트할 때 여전히 IP 주소를 참조합니다.  

announce-hostnames 전역 구성을 활성화하면 Sentinel이 호스트 이름을 대신 사용합니다. 이는 클라이언트에 대한 응답, 구성 파일에 기록된 값, 복제본에 실행된 REPLICAOF 명령 등에 영향을 줍니다.  

이 동작은 IP 주소를 명시적으로 예상할 수 있는 모든 Sentinel 클라이언트와 호환되지 않을 수 있습니다.
클라이언트가 TLS를 사용하여 인스턴스에 연결하고 인증서 ASN 일치를 수행하기 위해 IP 주소 대신 이름이 필요한 경우 호스트 이름을 사용하는 것이 유용할 수 있습니다.
