---
title: setup kerberos with kafka
categories:
  - kafka
tags: 
  - secured kafka-client
---



[kerberos error](https://github.com/steveloughran/kerberos_and_hadoop/blob/master/sections/errors.md)

yum install -y krb5-server

vi /var/kerberos/krb5kdc/kdc.conf

vi /var/kerberos/krb5kdc/kadm5.acl

vi /etc/krb5.conf

/usr/sbin/kdb5_util create -s -r KAFKA.SECURE -P this-is-unsecure



<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/kafka/32-create-kerberos.png" alt="">
  <figcaption></figcaption>
</figure> 

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/kafka/33-add-principal.png" alt="">
  <figcaption></figcaption>
</figure> 

#### Setup kerberos
```bash
systemctl restart  krb5kdc
systemctl status  krb5kdc

systemctl restart  kadmin
systemctl status  kadmin
```
#### add reader
```bash
kadmin.local -q "add_principal -randkey reader@KAFKA.SECURE"
```

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/kafka/34-add-principal-admin-local.png" alt="">
  <figcaption></figcaption>
</figure> 

#### add writer
```bash
kadmin.local -q "add_principal -randkey writer@KAFKA.SECURE"
```


<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/kafka/35-add-principal-writer.png" alt="">
  <figcaption></figcaption>
</figure> 

#### add admin
```bash
kadmin.local -q "add_principal -randkey admin@KAFKA.SECURE"
```

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/kafka/36-add-principal-admin.png" alt="">
  <figcaption></figcaption>
</figure> 

#### add kafka
```bash
kdmin.local -q "add_principal -randkey kafka/kafka1.mydomain.com@KAFKA.SECURE"
```

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/kafka/37-add-principan-kafka.png" alt="">
  <figcaption></figcaption>
</figure> 

#### xst

```bash
kadmin.local -q "xst -kt /app/manager/kerberos/reader.user.keytab reader@KAFKA.SECURE"
kadmin.local -q "xst -kt /app/manager/kerberos/writer.user.keytab writer@KAFKA.SECURE"
kadmin.local -q "xst -kt /app/manager/kerberos/admin.user.keytab admin@KAFKA.SECURE"
kadmin.local -q "xst -kt /app/manager/kerberos/kafka.service.keytab kafka/kafka1.mydomain.com@KAFKA.SECURE"
```
#### Setup kerberos client
```bash
kinit
bash: kinit: command not found
```
```bash
yum -y install krb5-workstation
```

```bash
kinit -kt /app/manager/kerberos/admin.user.keytab admin
klist

klist -kt /app/manager/kerberos/kafka.service.keytab
klist

kinit -kt /app/manager/kerberos/kafka.service.keytab kafka/kafka1.mydomain.com
klist
```

#### setup kafka broker
```ini
listeners=PLAINTEXT://0.0.0.0:9092,SSL://0.0.0.0:9093,SASL://0.0.0.0:9094
adviertised.listeners=PLAINTEXT://kafka1.mydomain.com:9092,SSL://kafka1.mydomain.com:9093,SASL_SSL://kafka1.mydomain.com:9094

sasl.enabled.mechanisms=GSSAPI
sasl.kerberos.service.name=kafka

```

#### kafka-server_jaas.conf
```ini
KafkaServer {
  com.sun.security.auth.module.Krb5LoginModule required
  useKeyTab=true
  storeKey=true
  keyTab="/app/manager/kerberos/kafka.service.keytab"
  principal="kafka/kafka1.mydomain.com@KAFKA.SECUrE"
};
```

#### setup kafka service
```ini
Environment="KAFKA_OPTS=-Djava.security.auth.login.config=/app/kafka/config/kafka_server_jaas.conf"
```

```bash
systemctl daemon-reload
systemctl restart kafka
```

#### setup kafka client for kerberos
```bash
vi kafka_client_jaas.conf
```
```ini
KafkaClient {
  com.sun.security.auth.module.Krb5LoginModule requried
  useTicketCache=true;
};
```

#### setup kafka_client_kerberos.properties 
```ini
vi kafka_client_kerberos.properties
security.protocol=SASL_SSL
sasl.kerberos.service.name=kafka
ssl.truststore.location=/home/kafka/ssl/kafka.client.truststore.jks
ssl.truststore.password=ccccdddd
```
