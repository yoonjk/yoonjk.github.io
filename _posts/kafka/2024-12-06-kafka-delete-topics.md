---
title: kafka delete all topics
categories:
  - kafka
tags: 
  - topic
---

kafka delete all topics

```bash
#!/bin/bash
# Set you KAFKA_HOME to use

TOPICS=$($KAFKA_HOME/bin/kafka-topics.sh --bootstrap-server kafka1:9092 --list)

for T in $TOPICS
do
  if [ "$T" != "__consumer_offsets" ]; then
    $KAFKA_HOME/bin/kafka-topics.sh --bootstrap-server kafka1:9092 --delete --topic $T
  fi
done
```