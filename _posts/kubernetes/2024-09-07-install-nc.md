---
title:  install helm on centos
categories:
  - kubernetes
tags: 
  - kafka
---

“nc"라고도 하는 Netcat은 네트워크를 통해 TCP 및 UDP 연결을 설정하고 상호 작용할 수 있는 간단한 방법을 제공하는 명령줄 도구입니다. 넷캣은 클라이언트와 서버 역할을 모두 수행할 수 있으며 네트워크를 통해 데이터를 주고받는 데 사용할 수 있습니다.

Netcat은 네트워크 연결 디버깅, 파일 전송, 포트 스캔 등 다양한 용도로 사용할 수 있는 강력하고 유연한 도구입니다. 원격 시스템에 간단한 백도어를 만들고, 원격 시스템에 연결하여 파일을 전송하고, 네트워크 서비스를 테스트 및 검증하는 데 사용할 수 있습니다.

Netcat은 일반적으로 유닉스 및 유닉스와 유사한 운영 체제에 설치되지만, Windows 및 기타 운영 체제에서도 사용할 수 있습니다. 이 도구는 다양한 옵션과 기능을 갖추고 있어 네트워크 관리자와 보안 전문가에게 인기가 높습니다.


#### Steps to Install netcat ‘nc’ on Redhat/Centos
How to install netcat nc on linux using yum
Install netcat
```bash
yum install nc -y
# Command to check the installed netcat package
rpm -qa | grep -i nmap-ncat
# Test nc command
nc -v google.com 443
```
