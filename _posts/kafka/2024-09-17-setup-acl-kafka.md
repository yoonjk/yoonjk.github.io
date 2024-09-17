---
title: setup acl with kafka
categories:
  - kafka
tags: 
  - acl
---


```ini
authorizer.class.name=kafka.security.auth.SimpleAclAuthorizer
super.users=User:admin;User:kafka
allow.everyone.if.no.acl.found=false
security.inter.broker.protocol=SASL_SSL
```
Reader User 생성  
```bash
kafka-acls.sh --authorizer-properties zookepper.connect=zookeeper1.mydomain.com:2181 --add \
--allow-principal User:reader --allow-principal User:writer \
--operation Read \
--group=* \
--topic acl-test
```

Writer User 생성
```bash
kafka-acls.sh --authorizer-properties zookepper.connect=zookeeper1.mydomain.com:2181 --add \
--allow-principal User:writer \
--operation Writer \
--topic acl-test
```

```bash
kafka-acls.sh --authorizer-properties zookepper.connect=zookeeper1.mydomain.com:2181 --add \
--list  \
--topic acl-test
```
Read 권한 삭제  
```bash
kafka-acls.sh --authorizer-properties zookeeper.connect=zookeeper1.mydomain.com:2181 \
--remove \
--allow-principal User:reader
--topic acl-test
```