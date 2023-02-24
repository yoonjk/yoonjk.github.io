---
title: nginx as Reverse Proxy for Jenkins
categories:
  - devops 
tags:
  - jenkins
  - nginx
---
Jenkins를 Nginx Reverse Proxy를 설정하여 접근하는 것을 설명합니다.  

## Nginx 설치
nginx를 설치하기 위해 사전에 필요한 package를 아래와 같이 설치합니다.   
```bash
yum install -y yum-utils
yum install -y epel-release
```

nginx를 설치합니다.  
```bash
yum install -y nginx
```

nginx의 status를 확인합니다.  
```bash
● nginx.service - The nginx HTTP and reverse proxy server
   Loaded: loaded (/usr/lib/systemd/system/nginx.service; disabled; vendor preset: disabled)
   Active: inactive (dead)
```
## nginx 시작
jenkins.service 파일에서 Environment의 JENKINS_PORT=9080으로 변경합니다.
```bash
systemctl start nginx
```

nginx가 정상적으로 실행되었는지 확인합니다.  
```bash
● nginx.service - The nginx HTTP and reverse proxy server
   Loaded: loaded (/usr/lib/systemd/system/nginx.service; disabled; vendor preset: disabled)
   Active: active (running) since Fri 2023-02-24 08:13:06 CST; 28s ago
  Process: 49962 ExecStart=/usr/sbin/nginx (code=exited, status=0/SUCCESS)
  Process: 49958 ExecStartPre=/usr/sbin/nginx -t (code=exited, status=0/SUCCESS)
  Process: 49956 ExecStartPre=/usr/bin/rm -f /run/nginx.pid (code=exited, status=0/SUCCESS)
 Main PID: 49964 (nginx)
   CGroup: /system.slice/nginx.service
           ├─49964 nginx: master process /usr/sbin/ngin
           ├─49965 nginx: worker proces
           └─49966 nginx: worker proces

Feb 24 08:13:06 virtualserver01.HyukSeoung-Choi-s-Account.cloud systemd[1]: Starting The nginx HTTP and reverse proxy server...
Feb 24 08:13:06 virtualserver01.HyukSeoung-Choi-s-Account.cloud nginx[49958]: nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
Feb 24 08:13:06 virtualserver01.HyukSeoung-Choi-s-Account.cloud nginx[49958]: nginx: configuration file /etc/nginx/nginx.conf test is successful
Feb 24 08:13:06 virtualserver01.HyukSeoung-Choi-s-Account.cloud systemd[1]: Started The nginx HTTP and reverse proxy server.
```

nginx configuration 테스트합니다.
```bash
nginx -t
```
google.com에서 [jenkins reverse proxy nginx](https://www.jenkins.io/doc/book/system-administration/reverse-proxy-configuration-nginx/) 키워드로 검색해서 나온 결과중에  
첫번째 검색결과항목을 클릭합니다.
```bash
upstream jenkins {
  keepalive 32; # keepalive connections
  server 127.0.0.1:8080; # jenkins ip and port
}

# Required for Jenkins websocket agents
map $http_upgrade $connection_upgrade {
  default upgrade;
  '' close;
}

server {
  listen          80;       # Listen on port 80 for IPv4 requests

  server_name     jenkins.example.com;  # replace 'jenkins.example.com' with your server domain name

  # this is the jenkins web root directory
  # (mentioned in the output of "systemctl cat jenkins")
  root            /var/run/jenkins/war/;

  access_log      /var/log/nginx/jenkins.access.log;
  error_log       /var/log/nginx/jenkins.error.log;

  # pass through headers from Jenkins that Nginx considers invalid
  ignore_invalid_headers off;

  location ~ "^/static/[0-9a-fA-F]{8}\/(.*)$" {
    # rewrite all static files into requests to the root
    # E.g /static/12345678/css/something.css will become /css/something.css
    rewrite "^/static/[0-9a-fA-F]{8}\/(.*)" /$1 last;
  }

  location /userContent {
    # have nginx handle all the static requests to userContent folder
    # note : This is the $JENKINS_HOME dir
    root /var/lib/jenkins/;
    if (!-f $request_filename){
      # this file does not exist, might be a directory or a /**view** url
      rewrite (.*) /$1 last;
      break;
    }
    sendfile on;
  }

  location / {
      sendfile off;
      proxy_pass         http://jenkins;
      proxy_redirect     default;
      proxy_http_version 1.1;

      # Required for Jenkins websocket agents
      proxy_set_header   Connection        $connection_upgrade;
      proxy_set_header   Upgrade           $http_upgrade;

      proxy_set_header   Host              $host;
      proxy_set_header   X-Real-IP         $remote_addr;
      proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
      proxy_set_header   X-Forwarded-Proto $scheme;
      proxy_max_temp_file_size 0;

      #this is the maximum upload size
      client_max_body_size       10m;
      client_body_buffer_size    128k;

      proxy_connect_timeout      90;
      proxy_send_timeout         90;
      proxy_read_timeout         90;
      proxy_buffering            off;
      proxy_request_buffering    off; # Required for HTTP CLI commands
      proxy_set_header Connection ""; # Clear for keepalive
  }

}
```

위의 내용을 클립보드에 복사하고 jenkins.conf 파링에 붙여넣기 합니다.  
```bash
cd /etc/nginx/conf.d/
vi jenkins.conf
```

jenkins.conf에서 아래의 내용으로 변경합니다.

```bash
root            /var/cache/jenkins/war/;
```

nginx configuration을 테스트하고 nginx를 재시작합니다.  
```bash
nginx -t
systemctl restart nginx
```

browser에서 jenkins server에  80 port로 접속합니다.  
만약 502 Bad Gateway가 발생하면 아래의 명령어를 실행합니다.  
```bash
setenforce permissive
```

jenkins server에 접속하여 Manage jenkins > Configure System 에 접속하여 jenkins URL을 변경합니다.  