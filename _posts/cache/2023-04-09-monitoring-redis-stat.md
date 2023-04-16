---
title:  Redis 시작하기 - 레디스 모니터링 Redis Stat
categories:
  - cache 
tags:
  - redis
  - redis-stat
---
Redis 서버의 메모리 사용량을 모니터링하고자 하는 경우 오픈소스 Redis Stat를 사용할 수 있습니다.

## Redis Stat 설치
Redis Stat는 ruby로 개발되어 있어서 Ruby가 설치되어 있어야 합니다. Ruby를 설치하기전에 의존성 패키지를 먼저 설치합니다.
```bash
yum install -y ruby-devel gcc make rpm-build rubygems
# Ruby install
git clone https://github.com/rbenv/rbenv-installer
cd rbenv-installer
cd bin
./rbenv-installer 
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bashrc
source ~/.bashrc
rbenv install 2.6.0
rbenv global 2.6.0
gem install redis-stat
```
redis-stat를 다음과 같이 실행합니다.

redis-stat 주소:포트번호 주소:포트번호 주소:포트번호  --verbose --daemon --server=8888
```bash
redis-stat localhost:6300 localhost:6301 localhost:6302 localhost:6400 localhost:6401 localhost:6402 --daemon --server=8888
```
브라우저 Url 입력창에 http://localhost:8888 접속하여 Redis Stat UI console에 접속합니다.

![Jupyter log]({{ "/assets/images/cache/12-cache-redis-stat-1.png" }})

![Jupyter log]({{ "/assets/images/cache/12-cache-redis-stat-2.png" }})