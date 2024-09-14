---
title: create topic
categories:
  - kafka
tags: 
  - go
---
burrow를 설치하합니다. 

[go lang](https://go.dev/dl/go1.23.1.linux-amd64.tar.gz)을 download 합니다.


![](img/2024-09-15-03-48-07.png)
```bash
git clone github.com/linkedin/Burrow
cd Burrow
```

**go lang path 추가**
```bash
vi ~/.bash_profile

# Add go's path to exist PATH
export PATH=$PATH:/usr/local/go/bin
```

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/kafka/05-install-go-lang-linux.png" alt="">
  <figcaption></figcaption>
</figure> 

**GOPATH 추가**
GOPATH는 일반적으로 **~/home/go**가  **GOPATH**로 지정합니다.  
그래서 go lang source를 build하면 $GOPATH/bin 폴더에 build binary 파일이 생성됩니다.  

참고로 GOROOT는 go lang을 설치한 경로입니다.
- linux인 경우 /usr/local/go  
- windows 는  c:\go

![](img/2024-09-15-03-43-07.png)
**build**
```bash
# cd Burrow, after clone source
go mod tidy
go install
```

**Running Burrow**
```bash
# Running Burrow
$GOPATH/bin/Burrow --config-dir $HOME/Burrow/config
```