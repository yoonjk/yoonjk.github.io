---
title: Add jmx_prometheus_agent를  zookeeper service 에 추가 
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

```bash
openssl x509 -req -CA ca-cert -CAkey ca-key -in cert-file -out cert-signed -days 365 -CAcreateserial -passin pass:$SRVPASS
```

```bash
keytool -printcert -v -file cert-signed
```
import truststore ca 인증서   
```bash
keytool -keystore kafka.server.truststore.jks -alias CARoot -import -file ca-cert -storepass $SRVPASS -keypass $SRVPASS -noprompt
```

import keystore에 ca 인증서  
```bash
keytool -keystore kafka.server.keystore.jks   -alias CAroot -import -file ca-cert -storepass $SRVPASS -keypass $SRVPASS -noprompt
```

```bash
keytool -keystore kafka.server.keystore.jks -import -file cert-signed -storepass $SRVPASS -keypass $SRVPASS -noprompt 
```