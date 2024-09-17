---
title: setup ca for secured kafka
categories:
  - kafka
tags: 
  - secured kafka

---

#### CA 인증서 생성
private key와 public key를 생성합니다.  
```bash
openssl req -new -newkey rsa:4096 -days 365 -x509 -subj "/CN=Kafka-Security-CA" -keyout ca-key -out ca-cert -nodes
```

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/kafka/24-generate-ca.png" alt="">
  <figcaption></figcaption>
</figure> 

#### KeyStore 생성
keystore를 생성합니다.  

```bash
export SRVPASS=serversecurity
keytool -genkey -keystore kafka.server.keystore.jks -validity 365 -storepass $SRVPASS -keypass $SRVPASS -dname "CN=kafka1.mydomain.com" -storetype pkcs12 
keytool -list -v -keystore kafka.server.keystore.jks
```

#### 인증서 요청파일 생성 
```bash
keytool -keystore kafka.server.keystore.jks -certreq -file cert-file -storepass $SRVPASS -keypass $SRVPASS
```


<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/kafka/25-gen-server-public-key.png" alt="">
  <figcaption></figcaption>
</figure> 

#### cert-signed 인증서를 생성

cert-signed 인증서를 생성합니다.
```bash
openssl x509 -req -CA ca-cert -CAkey ca-key -in cert-file -out cert-signed -days 365 -CAcreateserial -passin pass:$SRVPASS
```

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/kafka/26-gen-kafka-server-public-key.png" alt="">
  <figcaption></figcaption>
</figure> 


```bash
keytool -printcert -v -file cert-signed
```

#### truststore 를 생성, ca-cert파일을 truststore에 import

truststore 를 생성하고, ca-cert파일을 truststore에 import 합니다.  
```bash
keytool -keystore kafka.server.truststore.jks -alias CARoot -import -file ca-cert -storepass $SRVPASS -keypass $SRVPASS -noprompt
```

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/kafka/27-create-truststore.png" alt="">
  <figcaption></figcaption>
</figure> 

#### import keystore에 ca 인증서 

import keystore에 ca 인증서  
```bash
keytool -keystore kafka.server.keystore.jks   -alias CAroot -import -file ca-cert -storepass $SRVPASS -keypass $SRVPASS -noprompt
```

```bash
keytool -keystore kafka.server.keystore.jks -import -file cert-signed -storepass $SRVPASS -keypass $SRVPASS -noprompt 
```

#### Change server.properties file
```ini
listeners=PLAINTEXT://0.0.0.0:9092,SSL://0.0.0.0:9093
advertised.listeners=PLAINTEXT://kafka1.mydomain.com,SSL://kafka1.mydomain.com:9093

ssl.keystore.location=/app/ssl/kafka.server.keystore.jks
ssl.keystore.password=aaaabbbbcccc
ssl.key.password=aaaabbbbcccc
ssl.truststore.location=/app/ssl/kafka.server.truststore.jks
ssl.truststore.password=aaaabbbbcccc
```

#### restart kafka
kafka broker를 
```bash
systemctl restart kafka
systemctl status kafka
grep "EndPoint" /app/kafka/logs/server.log
# check SSL
```