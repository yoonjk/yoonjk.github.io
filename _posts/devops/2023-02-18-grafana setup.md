---
title: Jenkins-Grafana 설정
categories:
  - devops 
tags:
  - jenkins
  - prometheus
  - grafana
---

## Grafana 로그인
Grafana에 로그인하고, 비밀번호를 변경합니다.  
![gitlab-ce]({{ "/assets/images/jenkins/03-grafana-login.png" }})

## Prometheus 설정
Grafana에 로그인하면 다음과 같이 화면이 출력됩니다.  
![gitlab-ce]({{ "/assets/images/jenkins/04-grafana-first.png" }})

설정을 선택하고, Grafana에 datasource를 추가하기 위해 Add data source를 클릭합니다.  
![gitlab-ce]({{ "/assets/images/jenkins/05-grafana-add-datasource.png" }})

Prometheus datasource를 선택합니다.  
![gitlab-ce]({{ "/assets/images/jenkins/06-grafana-prometheus-datasource.png" }})

Prometheus datasource를 설정합니다.  
![gitlab-ce]({{ "/assets/images/jenkins/06-grafana-prometheus-setting.png" }})

Prometheus save-test 버튼을 클릭하면 Data source is working 메시지를 출력됩니다.  
![gitlab-ce]({{ "/assets/images/jenkins/07-grafana-prometheus-save-test.png" }}

## Jenkins dashboard 선택

[https://grafana.com/grafana/dashboards/](https://grafana.com/grafana/dashboards/) 에서 download jenkins dashboard를 선택합니다.    

![gitlab-ce]({{ "/assets/images/jenkins/08-grafana-select-dashboard.png" }})

Jenkins Dashbaord Id를 clipboard에 복사합니다.  
![gitlab-ce]({{ "/assets/images/jenkins/09-grafana-copy-clipboard.png" }})

Grafana에 Jenkins Dashboard ID를 반입합니다.  
![gitlab-ce]({{ "/assets/images/jenkins/10-grafana-import-id.png" }})

Dashboard ID를 load합니다.  
![gitlab-ce]({{ "/assets/images/jenkins/11-grafana-load.png" }})

Dashboard ID를 load합니다.  
![gitlab-ce]({{ "/assets/images/jenkins/11-grafana-load.png" }})

Prometheus 항목에서 Prometheus-jenkins를 선택하고 import 버튼을 클릭합니다.  
![gitlab-ce]({{ "/assets/images/jenkins/12-grafana-import-prometheus.png" }})

Jenkins Dashboard가 import 된 화면이 출력됩니다.  
![gitlab-ce]({{ "/assets/images/jenkins/12-grafana-import-prometheus.png" }})

Jenkins Dashboard 첫 화면이 출력됩니다.  
![gitlab-ce]({{ "/assets/images/jenkins/13-grafana-first-logon.png" }})