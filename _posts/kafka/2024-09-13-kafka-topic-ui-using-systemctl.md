---
title: create topic
categories:
  - kafka
tags: 
  - server
---

```ini
[Unit]
Description=Kafka Topic UI docker container
After=docker.service
Requires=docker.service kafka.service

[Service]
Type=Simple
User=root
Group=root
ExecStart=/bin/bash -c "docker compose -f /app/manager/kafka-topic-ui/docker-compose.yaml up"
ExecStop=/bin/bash -c "docker compose -f /app/manager/kafka-topic-ui/docker-compose.yaml stop"
Restart=always
TimeoutSec=20
SuccessExitStatus=130 143

[Install]
WantedBy=multi-user.target
```