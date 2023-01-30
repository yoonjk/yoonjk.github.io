---
title: Harbor로 Docker Private Registry 구축하기
categories:
  - docker 
tags:
  - Harbor
---

## Harbor 로 Docker Private Registry 구축하기

Harbor는 Offline Install과 Online Install 두 가지 방식으로 설치를 지원하고 있습니다. 이 실습에서는 Offline Install 을 기준으로 설치하도록 합니다. Harbor는 아래 github 사이트에 릴리즈 정보를 확인하고 download 받습니다.  


[Harbor 설치](https://github.com/goharbor/harbor/releases/)


## Step 1: Root CA Certificates  생성

Docker Engine 설치는 아래 링크를 따라 설치과정을 참고해주세요  

```bash
mkdir -p ~/certs
openssl genrsa -out ca.key 4096
openssl req -x509 -new -nodes -sha512 -days 365 -key ca.key -subj "/CN=*.example.com" -out ca.crt
```


## Step 2 : Server Private Key 생성

Harbor 서버의 인증서를 생성합니다.   

```bash
# Server의 비밀키 생성
openssl genrsa -out server.key 4096
```


## Step 3 : Harbor 서버의 CSR 생성 
Server의 CSR 파일 생성  
```bash
openssl req -sha512 -new -key server.key -out server.crt -subj "/CN=server1.example.com"
```

## Step 4: SAN 등록

Harbor 서버의 IP : 169.56.100.106  
```bash
echo "subjectAltName = IP:169.56.100.106,IP:127.0.0.1,DNS:server.example.com" > v3ext.cnf
```

## Step 5: Server 인증서 생성
Harbor Domain 이 server1.example.com 이라고 가정하고,  
로그인 사용자가 user01로 생성되어 있다면 다음과 같이 수행합니다.  
```bash
openssl x509 -req -sha512 -days 365  -CA ca.crt -CAkey ca.key -CAcreateserial -in server.csr -out server.crt -extfile v3ext.cnf
```
Server 인증서 변환
```bash
openssl x509 -inform PEM -in server.crt -out server.cert
```

## Step 6: 인증서 업데이트
certificates 업데이트 합니다.  

```bash
# server.example.com
mkdir -p /etc/docker/certs.d/server1.example.com
mkdir -p /etc/pki/ca-trust/source/anchors/
mkdir -p /etc/pki/ca-trust/source/anchors/

cp -u server.cert /etc/docker/certs.d/server1.example.com
cp -u server.key  /etc/docker/certs.d/server1.example.com
cp -u ca.crt      /etc/docker/certs.d/server1.example.com
cp -u ca.crt      /etc/pki/ca-trust/source/anchors/
cp -u server.crt  /etc/pki/ca-trust/source/anchors/

update-ca-trust
```

## Step 7: 호스트에 도메인 등록

```bash
echo "119.81.103.68 server1.example.com" >> /etc/hosts
```

## Step 8: Download Harbor
```bash
wget https://github.com/goharbor/harbor/releases/download/v2.7.0/harbor-offline-installer-v2.7.0.tgz
tar xzvf harbor-offline-installer-v2.7.0.tgz
```

## Step 9: Configure harbor in harbor.yml 
Harbor 폴더로 이동하고 harbor.yml 을 수정합니다.  

```bash
# harbor.yml 작성
cd harbor
cp harbor.yml.tmpl harbor.yml

# harbor.yml 편집
vi harbor.yml
# ---------------------
by external clients.
hostname: server1.example.com

# http related config
http:
  # port for http, default is 80. If https enabled, this port will redirect to https port
  port: 80

# https related config
https:
  # https port for harbor, default is 443
  port: 443
  # The path of cert and key files for nginx
  certificate: /etc/docker/certs.d/server1.example.com/server.cert
  private_key: /etc/docker/certs.d/server1.example.com/server.key
```

## Step 10: Install Harbor
```bash
./prepare
./install.sh

# 수행결과
[Step 0]: checking if docker is installed ...

Note: docker version: 20.10.23

[Step 1]: checking docker-compose is installed ...

Note: Docker Compose version v2.14.2

[Step 2]: loading Harbor images ...
Loaded image: goharbor/prepare:v2.7.0
716575e41c45: Loading layer  145.8MB/145.8MB

[Step 3]: preparing environment ...

[Step 4]: preparing harbor configs ...
prepare base dir is set to /root/harbor
Clearing the configuration file: /config/registry/passwd
Clearing the configuration file: /config/registry/config.yml

[Step 5]: starting Harbor ...
[+] Running 10/10
 ⠿ Network harbor_harbor        Created       0.1s
 ⠿ Container harbor-log         Started                                         0.8s
 ⠿ Container harbor-db          Started                                         2.2s
 ⠿ Container registry           Started                                         2.2s
 ⠿ Container registryctl        Started                                         1.7s
 ⠿ Container redis              Started                                         1.8s
 ⠿ Container harbor-portal      Started                                         2.2s
 ⠿ Container harbor-core        Started                                         2.7s
 ⠿ Container harbor-jobservice  Started                                         3.8s
 ⠿ Container nginx              Started                                         3.9s

----Harbor has been installed and started successfully.----
```