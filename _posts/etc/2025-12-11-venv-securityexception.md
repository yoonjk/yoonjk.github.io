---
title: PSSecurityException 에러
categories:
  - etc 
tags:
  - python
---

실행 정책이 Restricted 또는 AllSigned 같은 상태면 서명 안 된 ps1 파일은 전부 막음.  PSSecurityException 이 발생합니다.  

```bash
.\.venv\Scripts\Activate.ps1
```

- 현재 실행 정책 확인

PowerShell에서 한 번 실행해 보세요:  
CurrentUser 또는 LocalMachine에 Restricted로 되어 있으면 원인입니다.  

```bash
Get-ExecutionPolicy -List
```

- 가장 많이 쓰는 해결 방법 (사용자 계정만 완화)  
RemoteSigned :  

인터넷에서 받은 ps1은 서명 필요

내가 로컬에서 만든 ps1 (가상환경 Activate.ps1 포함)은 실행 가능  
회사 정책이 너무 빡빡하지 않다면 보통 이 설정은 허용되는 편입니다.

```bash
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

- 그리고 다시 일반 PowerShell에서:
```bash
cd 프로젝트_폴더
python -m venv .venv          # 이미 만들었다면 생략
.\.venv\Scripts\Activate.ps1
# 또는
.\.venv\Scripts\Activate
```
