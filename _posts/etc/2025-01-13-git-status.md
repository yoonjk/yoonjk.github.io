---
title: Git 마스터하기 - status 명령어
categories:
  - etc 
tags:
  - git
  - status
---

git status란 무엇인가?
git status 명령어는 현재 작업 중인 Git 리포지토리의 상태를 확인하는 데 사용됩니다.
- 워킹 디렉토리(Working Directory), 스테이징 영역(Staging Area), 그리고 브랜치 상태를 종합적으로 보여줍니다.  
- Git에서의 모든 작업은 파일 상태에 따라 이루어지기 때문에, git status는 작업 흐름의 중요한 출발점입니다.  

- 우리가 작업하는 Working Directory의 모든 파일은 크게 Tracked(관리대상임)와 Untracked(관리대상이 아님)로 나뉜다.
  이 중 'Tracked 파일'만 파일 상태를 가진다. 

**파일 상태의 종류 3가지**
1. Unmodified상태 : 마지막 커밋 이후 아직 아무것도 수정하지 않은 파일의 상태      ㄴ> 처음 저장소를 Clone 하면 모든 파일은 Tracked이면서 Unmodified 상태  

2. Modified상태 : Unmodified 상태 파일을 수정하면 Git은 알아서 그 파일을 Modified 상태로 인식  
3. Staged상태 : Modified상태 파일을 "Staging Area에 추가"하면 Staged 상태      
   ㄴ> Staged 상태의 파일만 커밋가능하다.  
   ㄴ> "Staging Area에 추가" = "파일을 (add = stage = 스테이징 = Index에 등록 = 추가)한다."  


## git status 출력 설명

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/etc/git-status.png" alt="">
  <figcaption></figcaption>
</figure>  


git status를 실행하면 일반적으로 아래와 같은 정보가 출력됩니다.
실행 결과 메시지는 다음과 같습니다.  
  ㄴ> **On branch branch-name**  
  ㄴ> **Changes to be committed** 에 들어 있는 파일은 Staged 상태라는 것  
  ㄴ> **Changes not staged for commit** 에 들어 있는 파일은 수정한 파일이 Tracked 상태이지만 아직 Staged 상태는 아니라는 것  
  ㄴ> **Untracked files** 부분에 속해 있는 파일은 Untracked 상태라는 것을 의미한다   
  
1. 브랜치 정보
```bash
On branch <branch-name>
```
- 현재 작업 중인 브랜치 이름을 표시합니다.  
- 브랜치가 최신 상태인지, 아니면 커밋이 뒤처져 있는지를 알려줍니다.   




 
