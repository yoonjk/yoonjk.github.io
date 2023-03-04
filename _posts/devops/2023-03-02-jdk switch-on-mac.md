---
title: mac 에서 jdk switch
categories:
  - docker 
tags:
  - jdk
  - mac
---

## jdk 11 or 8 switch 

java 기반 개발을 하면서 jdk 다양한 버전이 필요해서 설치하는 경우 있습니다. jdk를 switch하고자 하는 경우
다음과 같이 .zshrc에 추가해서 사용합니다.

~/.zshrc 파일을 editor로 열어서 다음과 같이 JAVA_HOME을 추가하면 됩니다.  
```bash
vi ~/.zshrc
export JAVA_HOME=`/usr/libexec/java_home -v 1.8`

```

.zshrc 다시 적용합니다.  
```bash
source ~/.zshrc
```


