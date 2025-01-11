---
title: Git 마스터하기 - git checkout 명령어
categories:
  - etc 
tags:
  - git
  - checkout
---

git checkout은 Git에서 브랜치를 전환하거나 특정 커밋, 파일, 또는 경로의 상태로 작업 디렉토리를 변경하는 데 사용되는 명령어  

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/etc/git-checkout.png" alt="">
  <figcaption></figcaption>
</figure>  

**주요 역할**
1. 브랜치 전환  
git checkout은 브랜치를 변경하여 해당 브랜치의 마지막 커밋 상태로 작업 디렉토리를 업데이트합니다.

1. 파일 복원  
작업 디렉토리에서 특정 파일을 이전 커밋이나 스테이징 상태로 복원할 수 있습니다.

1. 임시 상태 탐색  
특정 커밋으로 이동하여 해당 시점의 코드를 살펴볼 수 있습니다.