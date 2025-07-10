---
title: mac에 python 삭제 
categories:
  - etc 
tags:
  - python
---

## clean python on mac
- '파인더 - 메뉴 - 이동 - 폴더로 이동'  
/Library/Frameworks/Python.framework/Versions 입력 및 이동  
- 기존 버전 3.X 폴더 삭제  
- '파인더 - 응용프로그램 (또는 Application)'에서 Python 3.X 폴더 삭제  
- 기존 버전 삭제  
```bash
rm -rf /usr/local/bin/python*
rm -rf/usr/local/bin/
```

- pip*▷ 환경변수 삭제  
```bash 
brew doctor
brew cleanup
``

