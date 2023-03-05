---
title: MacOS openJDK 1.8 설치하기
categories:
  - springboot
tags: 
  - jdk
---

## open jdk
mac에서 open jdk를 설치합니다

```bash
brew tap AdoptOpenJDK/openjdk

brew install --cask adoptopenjdk8
```
## switch jdk 1.8 to 11
jdk를 여러 버전을 설치한 경우 jdk를 필요에 따라 switch하고자 하는 경우 다음과 같이 합니다.  
vi로 ~/.zshrc 파일을 편집하고 아래의 항목을 추가합니다.  
```bash
export JAVA_HOME=`/usr/libexec/java_home -v 1.8`
```

zsh profile을 적용합니다.  
```bash
source ~/.zshrc
```