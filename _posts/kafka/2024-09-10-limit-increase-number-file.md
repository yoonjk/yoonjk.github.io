---
title: kafka의 파일 처리 한계를 늘리기 
categories:
  - kafka
tags: 
  - configuration
---
kafka cluster를 구성하기 전에 kafka를 운영하면서 가장흔한 실수로 파일 open 개수 한계에 도달하여
kafka가 중단되는 장애가 발생합니다. 우선 파일 처리 한계를 증가시킵니다.  
kafka는 많은 파일을 열기 때문에 파일 처리 한계를 다음과 같이 증가하도록 설정합니다.  

```bash
echo "* hard nofile 100000
*  soft nofile 100000" | sudo tee --append /etc/security/limits.conf


```

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/kafka/02-limit-open-file.png" alt="">
  <figcaption></figcaption>
</figure> 

**수행결과**

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/kafka/03-append-limit-to-limits-conf.png" alt="">
  <figcaption></figcaption>
</figure> 



