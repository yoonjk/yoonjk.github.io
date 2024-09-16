---
title: grafana 설치
categories:
  - kafka
tags: 
  - kafka-monitor
  - grafana
  - prometheus
---

```bash
get https://dl.grafana.com/oss/release/grafana-9.5.0.linux-amd64.tar.gz
tar xvzf grafana-9.5.0.linux-amd64.tar.gz
mv grafana-9.5.0.linux-amd64 grafana
cp -rp grafana /app/manager
```

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/kafka/13-default-ini.png" alt="">
  <figcaption></figcaption>
</figure> 

```
bin/grafana server
```

#### enable grafana service

grafana를 service로 enable하기 위해 아래와 같이 grafana.service를 작성합니다.  
```bash
vi /usr/lib/systemd/system/grafana.service
```


```ini
# grafana service

[Unit]
Description=Grafana Server
Documentation=https://grafana.com/docs
After=network.target remote-fs.target
Requires=network.target remote-fs.target

[Service]
Type=Simple
User=root
Group=root
WorkingDirectory=/app/manager/grafana
ExecStart=/app/manager/grafana/bin/grafana-server

[Install]
WantedBy=multi-user.target
```

grafana service를 시작합니다.

```bash
systemctl daemon-reload
systemctl enable grafana.service
systemctl start grafana
```

#### import kafka dashboard 


<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/kafka/14-setup-grafana.png" alt="">
  <figcaption></figcaption>
</figure> 

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/kafka/14-setup-grafana.png" alt="">
  <figcaption></figcaption>
</figure> 

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/kafka/15-add-datasource.png" alt="">
  <figcaption></figcaption>
</figure> 

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/kafka/16-add-datasource.png" alt="">
  <figcaption></figcaption>
</figure> 

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/kafka/17-select-prometheus.png" alt="">
  <figcaption></figcaption>
</figure> 

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/kafka/18-select-datasource.png" alt="">
  <figcaption></figcaption>
</figure> 

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/kafka/19-select-import.png" alt="">
  <figcaption></figcaption>
</figure> 

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/kafka/20-copy-dashboard-id.png" alt="">
  <figcaption></figcaption>
</figure> 

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/kafka/21-paste-dashboard-id.png" alt="">
  <figcaption></figcaption>
</figure> 

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/kafka/22-import-dashboard-id.png" alt="">
  <figcaption></figcaption>
</figure> 

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/kafka/22-import-dashboard-id.png" alt="">
  <figcaption></figcaption>
</figure> 

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/kafka/23-kafka-dashboard.png" alt="">
  <figcaption></figcaption>
</figure> 

