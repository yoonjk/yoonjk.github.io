---
title: podman에서 max_user_namespaces 에러 
categories:
  - devops 
tags:
  - jenkins
  - podman
---

## podman 실행시 다음의 에러 해결 

Podman run error in non-root mode: "user namespaces are not enabled in /proc/sys/user/max_user_namespaces"  

Jenkins Pipeline에서 podman 실행시 다음의 에러가 발생할 떄  
```bash
user namespaces are not enabled in /proc/sys/user/max_user_namespaces
Error: could not get runtime: cannot re-exec process
```