---
title: Redis 시작하기 - Redis 관리
categories: 
  - cache
tags:
  - redis
---

## Redis 관리 Tips
프로덕션에서 Redis를 구성하고 관리할때 아래의 사항들을 고려하십시요.

## Redis setup tips
#### Linux
* Linux 운영 체제를 사용하여 Redis를 배포합니다. Redis는 OS X에서도 테스트되며 FreeBSD 및 OpenBSD 시스템에서도 수시로 테스트됩니다. 그러나 Linux는 대부분의 스트레스 테스트가 수행되고 대부분의 프로덕션 배포가 실행되는 곳입니다.  
* Linux 커널 오버 커밋 메모리 설정을 1로 설정합니다.. vm.overcommit_memory = 1을 /etc/sysctl.conf에  추가합니다.
 그런 다음 재부팅하거나   
sysctl vm.overcommit_memory=1 명령을 실행하여  설정을 활성화합니다.  
* Linux 커널 기능인 Transparent Huge Pages가 Redis 메모리 사용량 및 대기 시간에 영향을 주지 않도록 하려면 다음 명령을 사용합니다:  
```bash
echo never > /sys/kernel/mm/transparent_hugepage/enabled 
```

#### Memory
* 스왑이 활성화되어 있고 스왑 파일 크기가 시스템의 메모리 양과 같은지 확인했습니다. Linux에 스왑이 설정되어 있지 않고 Redis 인스턴스가 실수로 너무 많은 메모리를 사용하는 경우 메모리가 부족할 때 Redis가 충돌하거나 Linux 커널 OOM 킬러가 Redis 프로세스를 종료할 수 있습니다. 스와핑이 활성화되면 지연 시간 급증을 감지하고 이에 대한 조치를 취할 수 있습니다.  
* 인스턴스에서 명시적 maxmemory 옵션 제한을 설정하여 시스템 메모리 제한에 거의 도달했을 때 실패하는 대신 오류를 보고하도록 합니다. maxmemory는  데이터 이외의 Redis에 대한 오버헤드와 조각화 오버헤드를 계산하여 설정해야 합니다. 따라서 사용 가능한 메모리가 10GB라고 생각되면 8 또는 9로 설정하십시오.  
* 쓰기 중심의 애플리케이션에서 Redis를 사용하는 경우 RDB 파일을 디스크에 저장하거나 AOF 로그를 다시 쓰는 동안 Redis는 일반적으로 사용되는 메모리의 최대 2배를 사용할 수 있습니다. 사용되는 추가 메모리는 저장 프로세스 중에 쓰기에 의해 수정된 메모리 페이지 수에 비례하므로 이 시간 동안 터치된 키(또는 집계 유형 항목)의 수에 비례하는 경우가 많습니다. 그에 따라 메모리 크기를 조정해야 합니다.
*  문제 해결에 도움이 되는 LATENCY DOCTOR  및 MEMORY DOCTOR 명령을 참조하십시오.  

## Imaging
* daemontools에서 실행하는 경우, use daemonize no.

## Replication
* Redis가 사용하는 메모리 양에 비례하여 중요한 복제 백로그를 설정합니다. 백로그를 사용하면 복제본을 기본(마스터) 인스턴스와 훨씬 더 쉽게 동기화할 수 있습니다.  
* 복제를 사용하는 경우 Redis는 지속성이 비활성화된 경우에도 RDB 저장을 수행합니다. (디스크 없는 복제에는 적용되지 않습니다.) 마스터에 디스크 사용량이 없는 경우 디스크 없는 복제를 사용하도록 설정합니다.  
* 복제를 사용하는 경우 마스터가 지속성을 사용하도록 설정되어 있는지 또는 충돌 시 자동으로 다시 시작되지 않는지 확인합니다. 복제본은 마스터의 정확한 복사본을 유지하려고 하므로 마스터가 빈 데이터 세트로 다시 시작되면 복제본도 지워집니다.  

## Security
* 기본적으로 Redis는 인증이 필요하지 않으며 모든 네트워크 인터페이스를 수신 대기합니다. Redis를 인터넷이나 공격자가 접근할 수 있는 다른 장소에 노출된 상태로 두면 큰 보안 문제가 됩니다. 예를 들어 이 공격이 얼마나 위험한지 확인하십시오.  Redis를 보호하는 방법에 대한 자세한 내용은 보안 페이지 및 빠른 시작을 확인하세요.  

## Running Redis on EC2
* PV 기반 인스턴스가 아닌 HVM 기반 인스턴스 사용.  
* 이전 인스턴스 패밀리를 사용하지 마십시오. 
  예를 들어 PV와 함께 m1.medium 대신 HVM과 함께 m3.medium을 사용합니다.  
* EC2 EBS 볼륨에서 Redis 지속성을 사용하는 것은 EBS 볼륨의 지연 시간이 긴 특성을 갖는 경우가 있으므로 주의해서 처리해야 합니다.
* 복제본이 마스터와 동기화될 때 문제가 있는 경우 새 디스크 없는 복제를 시도할 수 있습니다.  
가동 중지 시간 없이 Redis 인스턴스 업그레이드 또는 다시 시작
Redis는 서버에서 장기 실행 프로세스로 설계되었습니다. CONFIG SET 명령을 사용하여 다시 시작하지 않고도 많은 구성 옵션을 수정할 수 있습니다. Redis를 다시 시작하지 않고도 AOF에서 RDB 스냅샷 지속성으로 전환하거나 그 반대로 전환할 수도 있습니다.  자세한 내용은 CONFIG GET * 명령의 출력을 확인하십시오.
예를 들어 Redis 프로세스를 최신 버전으로 업그레이드하거나 현재 CONFIG 명령에서 지원하지 않는 구성 매개 변수를 수정해야 하는 경우 다시 시작해야 합니다.

## 가동 중지 시간을 방지하려면 다음 단계를 따르십시오
* 새 Redis 인스턴스를 현재 Redis 인스턴스의 복제본으로 설정합니다. 이렇게 하려면 다른 서버 또는 두 개의 Redis 인스턴스를 동시에 실행할 수 있는 충분한 RAM이 있는 서버가 필요합니다.  
* 단일 서버를 사용하는 경우 복제본이 마스터 인스턴스와 다른 포트에서 시작되었는지 확인하고, 그렇지 않으면 복제본을 시작할 수 없습니다.  
* 복제 초기 동기화가 완료될 때까지 기다립니다. 복제본의 로그 파일 확인.  
* INFO를 사용하여 마스터와 복제본의 키 수가 동일한지 확인합니다. redis-cli를 사용하여 복제본이 예상대로 작동하고 명령에 응답하는지 확인합니다.  
* CONFIG SET slave-read-only no를 사용하여 복제본에 쓰기 허용.  
* 새 인스턴스(복제본)를 사용하도록 모든 클라이언트를 구성합니다. CLIENT PAUSE 명령을 사용하여 전환 중에 클라이언트가 이전 마스터에 쓸 수 없도록 할 수 있습니다.  
* 마스터가 더 이상 쿼리를 수신하지 않는 것을 확인하면(MONITOR 명령을 사용하여 이를 확인할 수 있음) REPLICAOF NO ONE 명령을 사용하여 마스터할 복제본을 선택한  다음 마스터를 종료합니다.  

Redis Sentinel 또는 Redis Cluster를 사용하는 경우 최신 버전으로 업그레이드하는 가장 간단한 방법은 복제본을 하나씩 업그레이드하는 것입니다. 그런 다음 수동 장애 조치(failover)를 수행하여 업그레이드된 복제본 중 하나를 마스터로 승격하고 마지막으로 마지막 복제본을 승격할 수 있습니다 