---
title: Git 마스터하기 - revert 명령어
categories:
  - etc 
tags:
  - git
  - revert
---

git revert는 Git에서 특정 커밋의 변경 내용을 취소하고, 이를 새로운 커밋으로 기록하는 명령어입니다. 이미 공유된 브랜치에서 안전하게 작업 내용을 되돌릴 때 사용하는 것이 적합합니다.  

git reset과 달리, 기존 커밋 기록은 유지하며, 협업 환경에서도 신뢰할 수 있는 방식으로 커밋을 되돌릴 수 있습니다.  

git revert의 기본 동작  
- 지정한 커밋의 변경 사항을 반대로 적용하여 되돌립니다.  
- 이 반전된 변경 사항을 새로운 커밋으로 저장합니다.  

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/etc/git-revert.png" alt="">
  <figcaption></figcaption>
</figure> 

