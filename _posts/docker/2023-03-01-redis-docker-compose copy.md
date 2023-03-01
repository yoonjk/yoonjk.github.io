---
title: docker-compose로 postgreSQL 실행
categories:
  - docker 
tags:
  - postgresSQL
---

## PostgresSQL docker-compose 파일
새로운 응용 프로그램을 만들 때 PostgreSQL을 데이터베이스 엔진으로 자주 사용합니다. 빠르고 사용하기 쉬우 며 인터넷상의 거의 모든 프로그래밍 언어 및 플랫폼과 매우 잘 통합됩니다.  
Windows 시스템을 실행하지 않고 macOS 또는 Linux에서 PostgreSQL 데이터베이스를 실행해야하는 경우 Docker를 사용할 수 있습니다. 몇 가지 간단한 명령만으로 도커에서 PostgreSQL을 시작하는 것은 매우 쉽습니다.  

이 글은 매우 간단하고 따라하기 쉽습니다. docker-compose 파일을 작성하여 standalone PostgreSQL 데이터베이스를 실행할 수 있습니다.  

컨테이너에서 데이터베이스를 실행하는 것은 개발 환경뿐만 아니라 프로덕션 환경에서도 매우 이상적입니다. 호스팅 환경의 전체 아키텍처를 변경하지 않고도 쉽게 확장하고 사용자의 요구에 맞게 조정할 수 있습니다.
스마트한 방식으로 작업하는 경우(열심히 작업하지 않고 스마트하게 작업) 데이터베이스를 CI/CD 파이프라인에 통합하여 애플리케이션과 연결된 데이터베이스가 항상 있고 팀의 다른 개발자도 수많은 소프트웨어를 로컬로 다운로드하여 설치하지 않고도 개발 머신에서 새로운 기능을 테스트할 수 있도록 합니다.

## 도커 작성을 사용하여 PostgreSQL을 실행하는 방법
도커 작성을 사용하여 인프라를 코드로 지정하면 PostgreSQL을 시작하는 것은 매우 쉽습니다.  
아래는 PostgreSQL을 쉽게 시작하고 실행하는 방법을 보여주는 전체 docker-compose.yaml 파일입니다. 
여기에는  데이터베이스 데이터에 대한 로컬 볼륨(경로)을 자동으로 생성하는 볼륨 섹션이 포함되어 있습니다. 이렇게 하면 컨테이너가 다시 시작되어도 데이터가 손실되지 않습니다. 일반적으로 모든 데이터는 컨테이너 내부의 메모리에 있지만 이렇게하면 유지할 수 있습니다.


## username and password 설정

항상 환경 변수 내에서 민감한 데이터를 구성하여 작성 파일 내부에 노출되지 않도록 합니다. 이렇게 하면 다른 개발자가 내 자격 증명을 몰라도 작성 파일을 공유 할 수 있습니다.  
환경. 구성해야 하는 변수는 다음과 같습니다.  
-	POSTGRES_USER
-	POSTGRES_PASSWORD
필요에 따라 자격 증명을 설정할 수 있습니다. 다음은 데모를 위한 작성 파일 내의 자격 증명입니다.  

postgreSQL docker-compose 파일입니다.

```yaml
version: '3.5'

services:
  postgres:
    container_name: postgres
    image: postgres:latest
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: admin1234
      PGDATA: /data/postgres
    volumes:
       - postgres-db:/data/postgres
    ports:
      - "5432:5432"

volumes:
  postgres-db:
    driver: local
```
위의 코드를 자신의 도커 작성 파일에 복사 할 수 있습니다.  이 데모에서 내 이름을 docker-compose.yaml로 지정했습니다  

docker-compose.yaml 파일이 있는 곳에서 docker-compose를 실행합니다.  
Mac 또는 Linux (GUI) 컴퓨터를 사용하는 경우 터미널을 불러와 작성 파일을 저장 한 폴더 내에서 아래 명령을 실행할 수 있습니다. 하드 코어이고 CLI에서만 작업하는 경우 아래 명령을 실행합니다.  
```bash
docker-compose up -d
```
이렇게 하면 Docker Hub에서 최신 버전의 PostgreSQL을 가져옵니다.  
컨테이너가 실행 중인지 확인하려면 터미널에서 다음 명령을 실행할 수 있습니다. 그러면 모든 Docker 프로세스가 나열됩니다.  
```bash
docker ps
```
또는  
```bash
docker-compose ps
```


