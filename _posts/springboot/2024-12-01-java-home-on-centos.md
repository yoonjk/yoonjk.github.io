---
title: centos에서 openjdk home
categories:
  - springboot
tags: 
  - openjdk
---

Centos에서 openjdk를 설치하고 JAVA_HOME을 설정하기 위해 openjdk 설치 위치를 확인하는 방법입니다.  

## Install Java 11 using yum:
```bash
yum install java-11-openjdk-devel
```

## Get all the Java configurations available in your machine:
```bash
alternatives --config java
```

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/springboot/openjdk-11-centos.png" alt="">
  <figcaption></figcaption>
</figure> 

## 참고
- [Installing OpenJDK 11 on CentOS using yum](https://stackoverflow.com/questions/53378483/installing-openjdk-11-on-centos-using-yum)

