---
title: Jenkins 서버 재시작 방법 
categories:
  - devops 
tags:
  - jenkins
---

## Jenkins Port 확인 및 복사
Jenkins 를 재시작하는 방법은 3가지 있습니다.
- systemctl 사용
- browser에서 restart
- browser에서 safeRestart

## Systemctl 사용
systemctl 명령어로 사용하는 경우 Jenkins Job이 실행중인 것이 있더라도 jenkins를 즉시 재시작합니다.  
Jenkins 가 재시작 이후 그존 실행중인 job은 다시 재개합니다.   
```bash
systemctl restart jenkins
```
## browser에서 restart
Jenkins를 로그인 해서 browser url에서 your-jenkins/restart를 입력하면 다음과 같이 재시작 여부를 묻는 메시지가 출력됩니다.

Are you sure you want to restart Jenkins?  

Yes 버튼을 클릭합니다.

## browser에서 safeRestart
browser에서 safeRestart를 수행하면 다음과 같이 메시지가 출력됩니다. 기존 수행중인 Job 은 중단되고, Jenkins가 재시작하면 다시 재게합니다.  
Yes 버튼을 클릭합니다.  

Are you sure you want to restart Jenkins? Jenkins will restart once all running jobs are finished. (Pipeline builds may prevent Jenkins from restarting for a short period of time in some cases, but if so, they will be paused at the next available opportunity and then resumed after Jenkins restarts.)
