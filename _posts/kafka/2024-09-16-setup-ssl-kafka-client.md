---
title: setup kafka client for secured kafka
categories:
  - kafka
tags: 
  - secured kafka-client
---

```bash
export CLIPASS=clientpass
# Copy CA public key
keytool -keystore kafka.client.truststore.jks -alias CARoot -import -file ca-cert -storepass $CLIPASS -keypass $CLIPASS -noprompt
keytool -list -v -keystore kafka.client.truststore.jks 
```

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/kafka/28-create-truststore-kafka-client.png" alt="">
  <figcaption></figcaption>
</figure> 

#### client.properties 생성 
```ini
security.protocol=SSL
ssl.truststore.location=/home/nexweb/ssl/kafka.client.trustore.jks
ssl.truststore.password=ddddffff
```

#### Test kafka producer
```bash
kafka-console-producer.sh --broker-list kafka1:9093 --topic kafka-security-topic --producer.config ~/ssl/client.properties
```

#### Test kafka consumer
```bash
kafka-console-consumer.sh --bootstrap-server kafka1:9093 --topic kafka-security-topic --consumer.config ~/ssl/client.properties
```
인증되지 않아서 메시지를 수신할 수 없습니다.  
```bash
kafka-console-consumer.sh --bootstrap-server kafka1:9093 --topic kafka-security-topic 
```

비보안 포트로 kafka broker에 접속해서 메시지를 수신할 수 있습니다.
```bash
kafka-console-consumer.sh --bootstrap-server kafka1:9092 --topic kafka-security-topic 
```

#### ssl authentication setup

```bash
export CLIPASS=clientpass
keytool -genkey -keystore kafka.client.keystore.jks -validity 365 -storepass $CLIPASS -keypass $CLIPASS -dname "CN=mylaptop" -alias my-local-pc -storetype pkcs12
```


<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/kafka/29-create-keystore-kafka-client.png" alt="">
  <figcaption></figcaption>
</figure> 

#### request signed file 생성

```bash
keytool -keystore kafka.client.keystore.jks -certreq -file client-cert-sign-request -alias my-local-pc -storepass $CLIPASS -keypass $CLIPASS
```


<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/kafka/30-generate-request-signed-cert.png" alt="">
  <figcaption></figcaption>
</figure> 

request signed file을 kafka broker 서버에 복사 
```bash
scp -i client-cert-sign-request root@kafka1:/tmp
```

```bash
openssl x509 -req -CA ca-cert -CAkey ca-key -in /tmp/client-cert-sign-request -out /tmp/client-cert-signed -days 365 -CAcreateserial -passin pass:$SRVPASS
# or
openssl x509 -req -CA ca-cert -CAkey ca-key -in client-cert-sign-request -out client-cert-signed -days 365 -CAcreateserial -passin pass:$SRVPASS

# result
# Ceritficate request self-signature ok
# subject=CN=mylaptop
```


<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/kafka/31-client-cert-signed-kafka-client.png" alt="">
  <figcaption></figcaption>
</figure> 

```bash
scp kafka1:/tmp/client-cert-signed   .

keytool -keystore kafka.client.keystore.jks -alias CARoot -import -file ca-cert -storepass $CLIPASS -keypass $CLIPASS -noprompt

keytool -keystore kafka.client.keystore.jks -alias my-local-pc -import -file client-cert-signed -storepass $CLIPASS -keypass $CLIPASS -noprompt
```

#### server.properties 수정

```bash
ssl.keystore.location=/app/ssl/kafka.server.keystore.jks
ssl.keystore.password=aaaabbbbcccc
ssl.key.password=aaaabbbbcccc
ssl.truststore.location=/app/ssl/kafka.server.truststore.jks
ssl.truststore.password=aaaabbbbcccc

ssl.client.auth=required
```

#### restart kafka broker
```
systemctl restart kafka
systemctl status kafka
```

#### client-ssl-auth.properties 작성

```bash
ssl.keystore.location=/app/ssl/kafka.server.keystore.jks
ssl.keystore.password=aaaabbbbcccc
ssl.key.password=aaaabbbbcccc
ssl.truststore.location=/app/ssl/kafka.server.truststore.jks
ssl.truststore.password=aaaabbobbcccc
```

#### Test kafka producer
```bash
kafka-console-producer.sh --broker-list kafka1:9093 --topic kafka-security-topic --producer.config ~/ssl/client-ssl-auth.properties
```

#### Test kafka consumer
```bash
kafka-console-consumer.sh --bootstrap-server kafka1:9093 --topic kafka-security-topic --consumer.config ~/ssl/client-ssl-auth.properties
```
인증되지 않아서 메시지를 수신할 수 없습니다.  
```bash
kafka-console-consumer.sh --bootstrap-server kafka1:9093 --topic kafka-security-topic --consumer.config ~/ssl/client.properties
```

```ini
# client.properties
security.protocol=SSL
ssl.truststore.location=/home/nexweb/ssl/kafka.client.trustore.jks
ssl.truststore.password=ddddffff
```



