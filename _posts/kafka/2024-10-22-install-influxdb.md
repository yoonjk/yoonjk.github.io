---
title:  Install InfluxDB using Docker Compose
categories:
  - kafka
tags: 
  - influxdb
---

```yaml
# compose.yaml
services:
  influxdb2:
    image: influxdb:2
    ports:
      - 8086:8086
    environment:
      DOCKER_INFLUXDB_INIT_MODE: setup
      DOCKER_INFLUXDB_INIT_USERNAME_FILE: /run/secrets/influxdb2-admin-username
      DOCKER_INFLUXDB_INIT_PASSWORD_FILE: /run/secrets/influxdb2-admin-password 
      DOCKER_INFLUXDB_INIT_ADMIN_TOKEN_FILE: /run/secrets/influxdb2-admin-token
      DOCKER_INFLUXDB_INIT_ORG: docs 
      DOCKER_INFLUXDB_INIT_BUCKET: home
    secrets:
      - influxdb2-admin-username
      - influxdb2-admin-password
      - influxdb2-admin-token
    volumes:
      - type: volume
        source: influxdb2-data
        target: /var/lib/influxdb2
      - type: volume
        source: influxdb2-config
        target: /etc/influxdb2
secrets:
  influxdb2-admin-username:
    file: ~/.env.influxdb2-admin-username
  influxdb2-admin-password:
    file: ~/.env.influxdb2-admin-password
  influxdb2-admin-token:
    file: ~/.env.influxdb2-admin-token
volumes:
  influxdb2-data:
  influxdb2-config:
```

## 참고 
[Install InfluxDB using Docker Compose](https://docs.influxdata.com/influxdb/v2/install/use-docker-compose/)