---
title: linux listen port 확인 
categories:
  - linux
tags:
  - port
---

1 방법 1: netstat  

```bash
root@zetawiki:~# netstat -tnlp
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name
tcp        0      0 127.0.0.1:8005          0.0.0.0:*               LISTEN      1212/java       
tcp        0      0 0.0.0.0:3306            0.0.0.0:*               LISTEN      1118/mysqld     
tcp        0      0 0.0.0.0:3690            0.0.0.0:*               LISTEN      919/svnserve    
tcp        0      0 0.0.0.0:8080            0.0.0.0:*               LISTEN      1212/java       
tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN      1157/apache2    
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      968/sshd
```

2 방법 2: lsof  
lsof가 설치되어 있지 않는 경우   
```
sudo yum install -y lsof
```

```bash
root@zetawiki:~# lsof -i -nP | grep LISTEN | awk '{print $(NF-1)" "$1}' | sort -u
127.0.0.1:8005 java
*:22 sshd
*:3306 mysqld
*:3690 svnserve
*:8080 java
*:80 apache2
```