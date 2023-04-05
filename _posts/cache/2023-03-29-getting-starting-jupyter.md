---
title: Getting Start Redis using Jupyter Notebook
categories:
  - cache
tags: 
  - redis
  - jupyter
---
Jupyter Notebook을 이용하여 Redis를 실습할 수 있는 환경을 구성합니다.

## Setup Redis on Docker
설치형 redis를 하지않고 학습용으로 최적의 환경인 docker를 사용하여 간단히 Redis를 실행합니다.
아래의 docker-compose.yaml 파일을 작성하고 작성된 폴더위치에서 다음과 같이 docker-compose를 실행하여 redis를 실행합니다.
그러면 redis docker image를 pull 받아서 background로 실행합니다.  
```yaml
version: '3.7'
services:
    redis:
      image: redis:alpine
      command: redis-server --port 6379
      container_name: redis
      labels:
        - "name=redis"
        - "mode=standalone"
      ports:
        - 6379:6379
```
#### Run redis 
docker-compose 를 사용하여 redis를 실행합니다.  
```bash
docker-compose up -d
```

## Setup Jupyter using Docker
Jupyter notebook을 이용하여 GUI 환경에서 Python을 이용하여 Redis를 실습할 수 있습니다.  
아래의 [링크](https://yoonjk.github.io/docker/jupyter/)를 통해 Jupyter Notebook을 docker-compose 파일을 작성하고 아래와 같이 실행합니다.  

```bash
docker-compose up -d
docker logs -f jupyter
```


브라우저에서 http://localhost:0000 으로 접속하면 패스워드 변경화면이 나타납니다.  
위에서 docker log에서 token 값을 확인 후  
![Jupyter log]({{ "/assets/images/cache/01-cache-jupyter-log.png" }})  

아래와 같이 token값을 입력하고 패스워드를 입력하고 Lo in and set new password 버튼을 클릭합니다.  

![Jupyter log]({{ "/assets/images/cache/02-cache-setup-a-password.png" }})

Jupyter Home 화면이 아래와 같이 출력됩니다.
![Jupyter log]({{ "/assets/images/cache/03-cache-jupyter-home.png" }})

Notebook category에서 python3를 선택합니다.  
![Jupyter log]({{ "/assets/images/cache/04-cache-python3-notebook.png" }})

python에서 redis를 연결하기 위해 redis module을 다음과 같이 notebook에 입력하고 실행버튼을 클릭하여 redis module을 설치합니다.    

```bash
!pip install redis
```

![Jupyter log]({{ "/assets/images/cache/05-cache-pip-install-redis.png" }})
