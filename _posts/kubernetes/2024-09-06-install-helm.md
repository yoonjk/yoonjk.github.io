---
title:  install helm on centos
categories:
  - kubernetes
tags: 
  - helm
---

helm chart를 설치하기 위해 helm tool을 설치합니다.
[helm](https://helm.sh/docs/intro/install/)

[helm download](https://github.com/helm/helm/releases)

```bash
wget https://get.helm.sh/helm-v3.16.0-rc.1-linux-amd64.tar.gz

tar xvzf helm-v3.16.0-rc.1-linux-amd64.tar.gz
cd linux-amd64
sudo mv helm /usr/local/bin

```

