---
title: install go lang and burrow on linux
categories:
  - kafka
tags: 
  - go
---
go lang과 burrow를 설치합니다. 

[go lang](https://go.dev/dl/go1.23.1.linux-amd64.tar.gz)을 download 합니다.

go lang 설치 및 path 추가 
 
```bash
rm -rf /usr/local/go && tar -C /usr/local -xzf go1.23.1.linux-amd64.tar.gz
```

/usr/local/go/bin to the PATH environment 에 추가 
**go lang path 추가**
```bash
vi ~/.bash_profile

# Add go's path to exist PATH
export PATH=$PATH:/usr/local/go/bin
```

burrow 를 github에서 git clone합니다.  
```bash
git clone github.com/linkedin/Burrow
cd Burrow
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


<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/kafka/06-goroot-or-gopath.png" alt="">
  <figcaption></figcaption>
</figure> 

.bash_profile 은 다음과 같습니다.
![](img/2024-09-15-04-29-12.png)
<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/kafka/04-bash-profile.png" alt="">
  <figcaption></figcaption>
</figure> 

**build**
```bash
# cd Burrow, after clone source
go mod tidy
go install
```

**burrow.toml 파일수정**
```ini
[zookeeper]
servers=[ "zookeeper1:2181","zookeeper2:2181", "zookeeper3:2181" ]
timeout=6
root-path="/burrow"

[client-profile.profile]
kafka-version="0.11.0"
client-id="docker-client"

[cluster.local]
client-profile="profile"
class-name="kafka"
servers=[ "kafka1:9092","kafka2:9092","kafka3:9092" ]
topic-refresh=60
offset-refresh=30
groups-reaper-refresh=30

[consumer.local]
class-name="kafka"
cluster="local"
servers=[ "kafka1:9092","kafka2:9092","kafka3:9092"]
group-denylist="^(console-consumer-|python-kafka-consumer-).*$"
group-allowlist=""

[consumer.local_zk]
class-name="kafka_zk"
cluster="local"
servers=[ "zookeeper1:2181","zookeeper2:2181", "zookeeper3:2181" ]
zookeeper-path="/local"
zookeeper-timeout=30
group-denylist="^(console-consumer-|python-kafka-consumer-).*$"
group-allowlist=""

[httpserver.default]
address=":8000"
```

**burrow.toml 복사**
burrow.toml 파일을 Burrow/config 폴더에 복사합니다.
```bash
cp burrow.toml $HOME/Burrow/config
```

**Running Burrow**
```bash
# Running Burrow
$GOPATH/bin/Burrow --config-dir $HOME/Burrow/config
```
