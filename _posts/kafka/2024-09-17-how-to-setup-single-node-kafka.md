---
title: setup kafka KRaft 
categories:
  - kafka
tags: 
  - KRaft
---

아래의 [링크](https://kafka.apache.org/quickstart)에 따라 kafka를 설치합니다.

```bash
wget https://downloads.apache.org/kafka/3.8.0/kafka_2.13-3.8.0.tgz
tar xvzf kafka_2.13-3.8.0.tgz
mv kafka_2.13-3.8.0 kafka
cd kafka
bin/kafka-storage.sh random-uuid
# or 
KAFKA_CLUSTER_ID="$(bin/kafka-storage.sh random-uuid)"

bin/kafka-storage.sh format -t $KAFKA_CLUSTER_ID -c config/kraft/server.properties
```

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/kafka/38-kafka-storage-random-uuid.png" alt="">
  <figcaption></figcaption>
</figure> 

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/kafka/38-kafka-storage-sh.png" alt="">
  <figcaption></figcaption>
</figure> 