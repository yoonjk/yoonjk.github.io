---
title: Jenkins Port 변경
categories:
  - devops 
tags:
  - jenkins
---

## Jenkins Port 확인 및 복사
Jenkins Default Port를 확인하기 위해 아래와 같이 명령어를 실행합니다.  
```bash
systemctl edit jenkins --full
```
JENKINS_PORT를 검색해서  아래의 내용을 clipboard에 복사합니다.  
```bash
Environment="JENKINS_PORT=8080"
```

## Jenkins Port 변경
jenkins.service 파일에서 Environment의 JENKINS_PORT=9080으로 변경합니다.
```bash
systemctl edit jenkins.service
Environment="JENKINS_PORT=9080"
```

```bash
systemctl daemon-reload
systemctl restart jenkins
```

위에서 지정한 Port로 접속해서 Port가 변경된 것을 확인합니다.
