---
title: install python3.11 to centos
categories:
  - etc 
tags:
  - python
---


```bash
dnf -y install python3.11 python3.11-pip
python3.11 -V
ln -s /usr/bin/python3.11 /usr/bin/python3
pip3.11 -V
ln -s /usr/bin/pip3.11 /usr/bin/pip
pip install --user kafka-tools 
```