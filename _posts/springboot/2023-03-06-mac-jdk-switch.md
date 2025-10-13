---
title: MacOS openJDK 1.8 설치하기
categories:
  - springboot
tags: 
  - openjdk
---

MacOS에서 jdk base 설치 위치는 다음과 같습니다.  

```bash
ls -al /Library/Java/JavaVirtualMachines
```

<figure style="width: 100%" class="align-left">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/springboot/install_java_base_home.png" alt="">
  <figcaption></figcaption>
</figure>  



## Install jdk1.8
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

## switch jdk 1.8 to 21
jdk를 여러 버전을 설치한 경우 jdk를 필요에 따라 switch하고자 하는 경우 다음과 같이 합니다.  
vi로 ~/.zshrc 파일을 편집하고 아래의 항목을 추가합니다.  


```bash
export JAVA_HOME=`/usr/libexec/java_home -v 21`
```

zsh profile을 적용합니다.
```bash
source ~/.zshrc
```
## Install openjdk@21
brew 명령어로 openjdk 21 version을 설치하고 symlink 를 생성합니다.

```bash
brew install openjdk@21
ls -al /opt/homebrew/Cellar/openjdk@21/21.0.8
cd /Library/Java/JavaVirtualMachines/
mkdir -p openjdk21/Contents/Home
cd /Library/Java/JavaVirtualMachines/openjdk21/Contents
sudo ln -s /opt/homebrew/Cellar/openjdk@21/21.0.8 Home
```
