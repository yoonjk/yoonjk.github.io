---
title: filebeat 설치하기
categories:
  - kafka
tags: 
  - filebeat
---


To add the Beats repository for YUM:

Download and install the public signing key:

sudo rpm --import https://artifacts.elastic.co/GPG-KEY-elasticsearch
Create a file with a .repo extension (for example, elastic.repo) in your /etc/yum.repos.d/ directory and add the following lines:

[elastic-8.x]
name=Elastic repository for 8.x packages
baseurl=https://artifacts.elastic.co/packages/8.x/yum
gpgcheck=1
gpgkey=https://artifacts.elastic.co/GPG-KEY-elasticsearch
enabled=1
autorefresh=1
type=rpm-md
The package is free to use under the Elastic license. An alternative package which contains only features that are available under the Apache 2.0 license is also available. To install it, use the following baseurl in your .repo file:

baseurl=https://artifacts.elastic.co/packages/oss-8.x/yum
Your repository is ready to use. For example, you can install Filebeat by running:

sudo yum install filebeat
To configure Filebeat to start automatically during boot, run:

sudo systemctl enable filebeat
If your system does not use systemd then run:

sudo chkconfig --add filebeat

## 참조 
- [setup filebeat](https://www.elastic.co/guide/en/beats/filebeat/8.15/setup-repositories.html#_yum)