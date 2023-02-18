---
title: Nginx proxy 리모트 kind cluster 접근
categories:
  - kubernetes
tags: 
  - kind
---

## 사전설치환경 구성
kind를 구성하기 위해 docker를 설치합니다. docker engine 설치  blog posting을 확인하세요.  

## Setup  on kind cluster server
kind 로컬 머신에 VM을 생성하고 하나의 노드만 포함하는 경량의 클러스터를 배포하는 쿠버네티스 입니다. kind는 Linux, macOS 및 Windows 시스템에서 사용할 수 있습니다. 

Kind가 작동하려면 하이퍼바이저(버추얼 박스 또는 KVM)가 필요하지만 이미 가상 머신 내부에 있는 경우 none 드라이버를 사용하여 추가 VM 계층 생성을 건너뛸 수 있습니다  
이번에는 VM에 Docker 엔진을 설치하고, 가상화 대신 도커를 사용하여 local server에서 remote kind cluster에 접근하는 구성합니다.  

docker를 성공적으로 설치한 후 다음 명령을 사용하여 로컬 Kubernetes를 시작할 차례입니다.

[kind Quick 설치 가이드](https://kind.sigs.k8s.io/docs/user/quick-start/)

Linux 환경에서 설치  
```bash
curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.17.0/kind-linux-amd64
chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind
```

kind를 시작하기 위해 kind cluster config 파일을 다음과 같이 control-plane, 2개의 worker node로 구성된 cluster를 작성합니다.  
```yaml
kind: Cluster
networking:
  apiServerAddress: "119.81.103.70"
  apiServerPort: 58350
nodes:
  - role: control-plane
  - role: worker
  - role: worker
```

kind cluster를 작성합니다.
```bash
kind create cluster --config jenkins-config.yaml
```


원격 호스트에서 실행되는 Kubernetes 클러스터가 있습니다. Kind는 홈 디렉토리의 .kube/ 디렉토리 안에 config 파일을 생성합니다.

kubernetes의 config 파일에는 다음의 내용이 있습니다.  
•	certificate-authority(인증 기관) - 사용자가 제어하는 CA(인증 기관)에서 서명한 TLS 인증서를 프로비저닝할 수 있는 API를 제공합니다. 이러한 CA 및 인증서는 워크로드에서 신뢰를 설정하는 데 사용할 수 있습니다.  
•	server - 파드, 서비스, 복제 컨트롤러 등을 포함하는 API 객체에 대한 데이터의 유효성을 검사하고 구성하는 쿠버네티스 API 서버의 주소이다.  
•	client-certificate -.쿠버네티스/미니큐브는 TLS를 통한 인증을 위해 PKI 인증서가 필요하다.  
•	client-key - 클라이언트 인증서와 일치하는 키입니다.  

.kube/config에 들어있는 인증서 내용을 x509 형식으로 변환합니다.
- client-certificate-data 데이터를 base64로 decoding  
- client-key-data 데이터를 base64로 decode  

```bash

cat .kube/config

ca_crt=$(cat .kube/config|grep certificate-authority-data|cut -d":" -f2-|cut -d" " -f1-)

client_crt=$(cat .kube/config|grep client-certificate-data|cut -d":" -f2-|cut -d" " -f1-)

client_key=$(cat .kube/config|grep client-key-data|cut -d":" -f2-|cut -d" " -f1-)

```


# convert encoded certificates to x509 format
```bash
mkdir -p $HOME/.kind
echo $client_crt | base64 -d > .kind/client.crt
echo $client_key | base64 -d > .kind/client.key
```
## Install nginx for Reverse Proxy on  Kind Cluster server
리모트에서 Kind에 접근하기 위해 reverse proxy를 구성합니다.  

미니큐브 앞에 Nginx Reverse 프록시를 배포합니다.

쿠버네티스 API 서버는 커맨드 라인 도구 kubectl을 사용할 때 모든 요청이 전달되는 지점입니다. kubectl을 사용하면 쿠버네티스 클러스터에 대해 명령을 실행할 수 있다. 이 예에서 내 kube-apiserver의 주소는 https://Your-ServierIP:58350 Kind의 IP 주소입니다. Kind는 로컬에서만 액세스할 수 있으나, 원격으로 액세스할 수 없습니다. 이러한 이유로 Kind 옆에 Nginx 역방향 프록시를 배포하여 원격 클라이언트의 요청을 수신한 다음 kube-apiserver로 전달할 수 있도록 해야 합니다. 

docker를 통해 배포하므로 마운트에 필요한 디렉토리와 파일을 만들어야합니다.

```bash
$ mkdir -p /etc/nginx/conf.d/ /etc/nginx/certs
$ cat <<EOF > /etc/nginx/conf.d/default.conf 
server {
    listen       80;
    listen  [::]:80;
    server_name  localhost;
    auth_basic "Administrator's Area";
    auth_basic_user_file /etc/nginx/.htpasswd;

    location / {
        proxy_pass https://Your-Kind-ServerIP:58443;
        proxy_ssl_certificate /etc/nginx/certs/kind-client.crt;
        proxy_ssl_certificate_key /etc/nginx/certs/kind-client.key;
    }
}
EOF
```

아직 사용자 이름/암호 쌍을 만들지 않았습니다. 이를 위해 htpasswd라는 cmd 도구를 사용합니다  
. 아직 설치하지 않은 경우 yum 을 통해 설치하십시오.  
```bash
sudo yum install -y httpd-tools 
htpasswd -c /etc/nginx/.htpasswd kind-kind
```

Ubuntu 환경인 경우 htpasswd 유틸 설치  
```bash
apt-get install apache2-utils -y
htpasswd -c /etc/nginx/.htpasswd kind-kind
```
이제 사용자이름/암호가 /etc/nginx/.htpasswd 파일에 저장됩니다. 필요한 구성 파일이 이미 있으므로 다음 명령을 사용하여 Nginx를 배포 할 준비가 되었습니다.  

```bash
docker run -d \
--name nginx \
--network kind \
-p 9080:80 \
-v /root/.kind/client.key:/etc/nginx/certs/kind-client.key \
-v /root/.kind/client.crt:/etc/nginx/certs/kind-client.crt \
-v /etc/nginx/conf.d/:/etc/nginx/conf.d \
-v /etc/nginx/.htpasswd:/etc/nginx/.htpasswd \
nginx
```

브라우저에서 Nginx에 요청하려고 하면 사용자 이름과 비밀번호가 필요하다는 다음 팝업 창이 나타납니다. 브라우저에서 페이지를 열려면 다음 주소로 이동하십시오  
```bash
http://<YOUR_SERVER_IP>:9080  
```

## Install kubectl on local computer

Kind에 접속할려는 서버에 kubectl 를 설치합니다.  

```bash
sudo curl -L "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl" -o /usr/local/bin/kubectl

sudo chmod +x /usr/local/bin/kubectl
```

이미 kubectl이 설치되어 있으므로이 단계를 건너 뜁니다.  
이제 미니큐브에 대한 kubectl을 구성해야 한다. 원격 호스트에서 구성 파일의 내용을 복사하고(Img.3 참조) 로컬 server 붙여넣습니다.  

```bash
mkdir -p ~/.kube/  # execute on local computer
```

아래 이미지에는 변경해야 할 강조 표시된 줄이 있습니다.  
remote 서버에 있는 config 파일을 복사하고 강조 표시된 부분을 수정합니다.  
ENTER_YOUR_PASSWORD_HERE : remote 서버에서 설정한 kind-kind 비밀번호  
YOUR_SERVER_IP : remote 서버  
•	certificate-authority , client-certificate , and client-key  
```bash  
http://kind-kind:<ENTER_YOUR_PASSWORD_HERE>@<YOUR_SERVER_IP>:9080
```

```yaml
cat <<EOF > .kube/config
apiVersion: v1
clusters:
- cluster:
    server: http://kind-kind:admin1234@@Your-KindClusterServerIP:9080
  name: kind-kind
contexts:
- context:
    cluster: kind-kind
    user: kind-kind
  name: kind-kind
current-context: kind-kind
kind: Config
preferences: {}
users:
- name: kind-kind
  user:
EOF
```