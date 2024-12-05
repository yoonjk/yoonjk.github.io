---
title: oracle express docker container 설치 및 구성 
categories:
  - docker 
tags:
  - oracle
---

oracle express docker container 버전을 설치하여 dbeaver tool을 연결합니다.

##  Pre-requsities

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/docker/create-connect-for-oracle.png" alt="">
  <figcaption></figcaption>
</figure> 

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/docker/select-oracle.png" alt="">
  <figcaption></figcaption>
</figure> 

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/docker/set-oracle-info.png" alt="">
  <figcaption></figcaption>
</figure> 

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/docker/download-oracle-driver.png" alt="">
  <figcaption></figcaption>
</figure> 

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/docker/images/startiing-oracle.png" alt="">
  <figcaption></figcaption>
</figure> 

```yaml
version: '3.8'
services:
  # Source DB's
  oracle:
    image: container-registry.oracle.com/database/express:21.3.0-xe
    container_name: oracle
    environment:
      - ORACLE_PWD=Admin12340
      - ORACLE_CHARACTERSET=KO16MSWIN949
    volumes:
      - oradata:/opt/oracle/oradata
    ports:
      - 1521:1521
volumes:
  oradata: {}
```


```bash
conn / as sysdba
alter session set "_ORACLE_SCRIPT"=true;
select tablespace_name from user_tablespaces;
create user scott identified by admin1234 default tablespace users temporary tablespace temp;
grant resource, connect to scott;
conn scott/admin1234
```

![alt text](image.png)