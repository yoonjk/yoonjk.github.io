---
title: Jenkins-Prometheus/Grafana 설치
categories:
  - devops 
tags:
  - jenkins
  - prometheus
  - grafana
---

## Jenkins 와 Prometheus/Grafana 여녜

Jenkins Controller와 Agent를 를 모너터링하기 위해 Prometheus Plugin을 설치하고 Jenkins에서 수집한 
Metrics정보를 기반으로 Prometheus를 통해 Metrics 정보를 주시적으로 수집하고, 수집된 정보를 기반으로 Grafana에 Visual하게
모니터링합니다.  

## Prometheus metrics plugin 설치 

Manage Jenkins > Manage Plugins > Available Plugins에서 Prometheus metrics Plugins을 선택, 
Install without restart를 클릭해서 Plugin을 설치합니다.  

![gitlab-ce]({{ "/assets/images/jenkins/01-prometheus-plugin.png" }})

## Prometheus 설정
prometheus.yml 파일을 작성합니다.  
```bash
global:
  scrape_interval:     15s # By default, scrape targets every 15 seconds.
  evaluation_interval: 15s
  scrape_timeout:      10s

  # Attach these labels to any time series or alerts when communicating with
  # external systems (federation, remote storage, Alertmanager).
  external_labels:
    monitor: 'codelab-monitor'

# A scrape configuration containing exactly one endpoint to scrape:
# Here it's Prometheus itself.
scrape_configs:
  # The job name is added as a label `job=<job_name>` to any timeseries scraped from this config.
  - job_name: 'prometheus'

    # Override the global default and scrape targets from this job every 5 seconds.
    scrape_interval: 5s

    static_configs:
      - targets: ['localhost:9090']
  - job_name: 'jenkins'
    metrics_path: /prometheus/
    static_configs:
      - targets: ['Your-JenkinsIP:8080']
```

## Prometheus/Grafana 설정
Prometheus/Grafana 폴더를 binding하기 위해 폴더를 생성합니다.  
```bash
mkdir -p prometheus grafana/provisioning grafana/volume
```
grafana.ini 파일을 작성합니다.  
```bash
app_mode = production
instance_name = virtualserver01.HyukSeoung-Choi-s-Account.cloud

#################################### Server ########################
protocol = http
http_addr =
http_port = 3000

#################################### Database #######################
[database]
type = mysql
host = db:3306
name = grafana
user = grafana
password = grafana


#################################### Logging ########################
[log]
mode = console
level = info

#################################### Alerting ########################
[alerting]
enabled = true
```

![gitlab-ce]({{ "/assets/images/jenkins/02-prometheus-folder.png" }})



## Prometheus/Grafana 작성
Prometheus/Grafana docker-compose 파일을 작성합니다.  
```yaml
version: "3.9"

networks:
  monitering:
    driver: bridge

volumes:
  mysql-data: {}
  grafana-data: {}
  prometheus-data: {}

services:
  db:
    container_name: mysql
    image: mysql:5.7
    restart: unless-stopped
    environment:
      MYSQL_ROOT_PASSWORD: grafana
      MYSQL_DATABASE: grafana
      MYSQL_USER: grafana
      MYSQL_PASSWORD: grafana
    volumes:
      - mysql-data:/var/lib/mysql
    networks:
      - monitering
    logging:
      driver: "json-file"
      options:
        max-size: "8m"
        max-file: "10"

  node-exporter:
    image: prom/node-exporter:latest
    container_name: node-exporter
    restart: unless-stopped
    volumes:
      - /proc:/host/proc:ro
      - /sys:/host/sys:ro
      - /:/rootfs:ro
    command:
      - '--path.procfs=/host/proc'
      - '--path.rootfs=/rootfs'
      - '--path.sysfs=/host/sys'
      - '--collector.filesystem.mount-points-exclude=^/(sys|proc|dev|host|etc)($$|/)'
    ports:
      - "9100:9100"
    networks:
      - monitering

  prometheus:
    image: prom/prometheus:latest
    container_name: prometheus
    restart: unless-stopped
    volumes:
      - ./prometheus/prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus-data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--web.console.libraries=/etc/prometheus/console_libraries'
      - '--web.console.templates=/etc/prometheus/consoles'
      - '--web.enable-lifecycle'
    ports:
      - "9090:9090"
    networks:
      - monitering

  grafana:
    container_name: grafana
    image: grafana/grafana
    user: "104"
    ports:
      - "3000:3000"
    volumes:
      - ./grafana/grafana.ini:/etc/grafana/grafana.ini:ro
      - grafana-data:/var/lib/grafana
    depends_on:
      - prometheus
      - db
    networks:
      - monitering
    logging:
      driver: "json-file"
      options:
        max-size: "8m"
        max-file: "10"
```

## Prometheus/Grafana 실행
docker-compose.yaml 파일이 있는 폴더에서  docker-compose를 실행합니다.  
```bash
docker-compose up -d
```

