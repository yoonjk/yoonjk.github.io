---
title: maven에서 jdk 버전이 변경되지 않는 경우
categories:
  - springboot
tags: 
  - quickfix
--- 
jdk1.8 에서 jdk11로 전환하여 개발을 하는 경우 jdk는 11로 변경되었지만 maven은 여전히 jdk1.8로 빌드를 하는 경우 다음과 같이 추가합니다.
```bash
vi $HOME/.mavenrc

export JAVA_HOME=$(/usr/libexec/java_home -v 110)
```
