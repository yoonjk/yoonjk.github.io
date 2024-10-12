---
title: ssh 신규 접속시 기존 ip 중복으로 연결안될 때
categories:
  - docker 
tags:
  - bitbucket
---

`ssh-keygen` 명령을 사용하여 서버의 호스트 이름 또는 IP 주소를 지정하여 호스트 키 항목을 삭제할 수 있습니다. 다음은 이를 수행하는 명령어입니다:
```bash
ssh-keygen -R 192.168.1.100
```