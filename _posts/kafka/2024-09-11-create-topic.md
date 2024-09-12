---
title: create topic
categories:
  - kafka
tags: 
  - server
---

kafka 의 topic을 생성하기 위해 topic명이 first_topic이고, partition이 3인 topic을 생성합니다.



```bash
bin/kafka-topics.sh --zookeeper zookeeper1:2181 --create --topic first_topic --replication-factor 1 --partitions 3
```
**결과**
```bash
WARNING: Due to limitations in metric names, topics with a period ('.') or underscore ('_') could collide. To avoid issues it is best to use either, but not both.
```

> topic : first-topic
> partitions : 3

**결과**
```bash
Created topic first-topic.
```

#### producer
kafka의 producer에서 first-topic에 메시지를 전송합니다.

```bash
bin/kafka-console-producer.sh --broker-list kafka1:9092 --topic first-topic
>hi
>hello
```

#### consumer
kafka의 consumer에서 first-topic에 메시지를 수신합니다.

```bash
bin/kafka-console-consumer.sh --bootstrap-server kafka1:9092 --topic first-topic --from-beginning
```

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/kafka/04-hello-consumer.png" alt="">
  <figcaption></figcaption>
</figure> 

