---
title: Nexus를 docker container repository로 사용하기
categories:
  - devops 
tags:
  - nexus
  - podman
---

## Nexus를 docker container repository로 사용하기
Nexus를 docker container image의 repository로 사용하는 위한 설정입니다.
Harbor 같은 전용 Docker container Registry로 사용하는 Open Source 솔루션도 있으나
애플리케이션 수가 몇개 되지 않는 것은 Nexus를 Container Image Repository로 사용할 수 있습니다.  

Nexus 설치는 블로그 목록을 참고해 주시고, 설정이 끝나고 추가적으로 container Image Repository를 추가하는 부분만 소개합니다.  

## Step 1 : docker 유형 Repository 생성  
create repository를 선택합니다.  
![nexus docker repository]({{ "/assets/images/nexus/06-jenkins-nexus-create-repository.png" }})

Repository 유형중에 docker(hosted) repository를 선택합니다.  
![nexus docker repository]({{ "/assets/images/nexus/07-jenkins-nexus-select-docker-repository.png" }})

docker-repo 이름으로 다음과 같이 정보를 선택하고 repository를 생성합니다.  
![nexus docker repository]({{ "/assets/images/nexus/08-jenkins-nexus-docker-repository.png" }})

## Step 2: Add docker bearer token to Realms

Realms 에 Docker Bearer token을 추가하고, 저장합니다.  

![add realm]({{ "/assets/images/nexus/08-jenkins-nexus-realms-docker-bearer-token.png" }})

## Step 2: podman 을 사용하여 nexus에 로그인

Podman을 사용하여 http로 login 합니다.  

```bash
# nexus-server-ip : remote server ip 또는 localhost
podman login -u deploy-user -p Passw0rd@ --tls-verify=false nexus-server-ip:5000
```

Nexus 가 local에 있는 경우 nexus-server-id를 localhost로 지정합니다.  

```bash
podman login -u deploy-user -p Passw0rd@ --tls-verify=false localhost:5000
```