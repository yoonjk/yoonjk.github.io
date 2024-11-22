---
title: pure java compile 방법
categories:
  - springboot
tags: 
  - java
---

original 방식으로 java source를 컴파일하는 방법입니다.   

```bash
JAVA_HOME=/usr/java8_64
export set CLASSPATH=.:../libs/dtxpi.jar:../libs/m4java.jar
rm com/aa/bb/cc/*.class
$JAVA_HOME/bin/javac -d . *.java
$JAVA_HOME/bin/jar cvf testserver.jar com

cp testserver.jar ../libs
```

