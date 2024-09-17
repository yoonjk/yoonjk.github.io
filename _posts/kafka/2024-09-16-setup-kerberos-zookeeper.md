---
title: setup kerberos with zookeeper
categories:
  - kafka
tags: 
  - secured zookeeper
---

```bash
vi config/zookeeper.properties
```

```bash
:
authProvider.1=org.apache.zookeeper.server.auth.SASLAuthenticationProvider
jaasLoginRenew=3600000
```

#### zookeeper_jaas.conf 작성
```bash
Server {
    com.sun.security.auth.module.Krb5LoginModule required
    useKeyTab=true
    storeKey=true
    keyTab="/appp/manager/kerberos/zookeeper.service.keytab"
    principal="zookeeper/zookeeper1.mydomain.com@KAFKA.SECURE";
};

Client {
    com.sun.security.auth.module.Krb5LoginModule required
    useKeyTab=true
    storeKey=true
    keyTab="/app/manager/kerberos/zookeeper.service.keytab"
    principal="zookeeper/zookeeper1.mydomain.com@KAFKA.SECURE";
};
```

#### zookeeper service

```ini
Environment="KAFKA_OPTS=-Djava.security.auth.login.config=/home/kafka/config/zookeeper_jaas.conf"
ExecStart=/app/kafka/bin/zookeeper-server-start.sh ...
```

```bash
systemctl daemon-realod
systemctl stop kafka
systemctl restart zookeeper
systemctl start kafka

journalctl -u zookeeper|grep authenticated
journalctl -u kafka | grep -i saslauthenticated
```

#### authorize zookeeper
```bash
vi config/zookeeper.properties
```

```ini
authProvider.1=org.apache.zookeeper.server.auth.SASLAuthenticationProvider
jaasLoginRenew=3600000

kerberos.removeHostFromPrincipal=true
kerberos.removeRealmFromPrincipal=true
```

```bash
systemctl restart zookeeper
systemctl restart kafka
```

