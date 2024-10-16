
---
title: LC_CTYPE: cannot change locale (UTF-8): No such file or directory
categories:
  - etc 
tags:
  - linux
---

## LC_CTYPE cannot change locale
```bash
vi /etc/environment
```
아래의 내용을 추가 후 재 로그인하면 해결결

```bash
LANG=en_US.utf-8
LC_ALL=en_US.utf-8
```