---
title: Git 마스터하기 - revert hands-on 가이드
categories:
  - etc 
tags:
  - git
  - revert
---
# Git Revert Hands-on 가이드

## **Git Revert란?**

Git에서 `revert` 명령어는 **특정 커밋을 되돌리는** 방법입니다. 하지만 `reset`과 달리 **Git의 히스토리를 보존**하며, 새로운 "되돌림" 커밋을 생성합니다. 협업 환경에서 안전하게 커밋을 취소하려는 경우에 유용합니다.

---

## **Git Revert의 주요 특징**

- **히스토리 보존**: 기존 커밋 로그를 유지하면서, 되돌림에 대한 새로운 커밋이 추가됩니다.
- **협업 친화적**: 팀원들과의 협업 시 문제가 없도록 현재 브랜치 상태를 유지합니다.
- **부분 취소 가능**: 특정 커밋만 선택적으로 되돌릴 수 있습니다.

---

## **Git Revert Hands-on 가이드**

### **1. 환경 준비**

1. 새 디렉토리 생성 및 초기화:
   ```bash
   mkdir git-revert-demo
   cd git-revert-demo
   git init
   ```

2. 테스트 파일 생성:
   ```bash
   echo "Initial commit" > file.txt
   git add file.txt
   git commit -m "Initial commit"
   ```

3. 몇 가지 커밋 추가:
   ```bash
   echo "Change 1" >> file.txt
   git commit -am "Add Change 1"

   echo "Change 2" >> file.txt
   git commit -am "Add Change 2"

   echo "Change 3" >> file.txt
   git commit -am "Add Change 3"
   ```

4. 현재 로그 확인:
   ```bash
   git log --oneline
   ```
   출력 예시:
   ```
   abc1234 (HEAD -> main) Add Change 3
   def5678 Add Change 2
   ghi9012 Add Change 1
   jkl3456 Initial commit
   ```

---

### **2. 특정 커밋 되돌리기**

1. 마지막 커밋 되돌리기:
   ```bash
   git revert HEAD
   ```

   - 편집기가 열리며 기본 메시지("Revert \"Add Change 3\"")를 확인할 수 있습니다.
   - 저장 후 종료하면, 새로운 커밋이 생성됩니다.

2. 로그 확인:
   ```bash
   git log --oneline
   ```
   출력 예시:
   ```
   xyz9876 (HEAD -> main) Revert "Add Change 3"
   abc1234 Add Change 3
   def5678 Add Change 2
   ghi9012 Add Change 1
   jkl3456 Initial commit
   ```

   - "Revert \"Add Change 3\""라는 새 커밋이 추가된 것을 확인할 수 있습니다.

---

### **3. 특정 과거 커밋 되돌리기**

1. 원하는 커밋 식별:
   ```bash
   git log --oneline
   ```

2. 특정 커밋 되돌리기:
   ```bash
   git revert <커밋 해시>
   ```
   예:
   ```bash
   git revert def5678
   ```

3. 변경 사항 확인:
   ```bash
   git log --oneline
   ```
   출력 예시:
   ```
   abc6543 (HEAD -> main) Revert "Add Change 2"
   xyz9876 Revert "Add Change 3"
   abc1234 Add Change 3
   def5678 Add Change 2
   ghi9012 Add Change 1
   jkl3456 Initial commit
   ```

---

### **4. 여러 커밋 한 번에 되돌리기**

1. 연속된 커밋 되돌리기:
   - 최신 2개의 커밋 되돌리기:
     ```bash
     git revert HEAD~2..HEAD
     ```

2. 비연속적인 커밋 되돌리기:
   - 각 커밋을 개별적으로 되돌립니다:
     ```bash
     git revert abc1234 def5678
     ```

---

### **5. 되돌림 취소하기**

`revert` 커밋도 일반 커밋처럼 취소 가능합니다.

1. 잘못된 `revert` 커밋 확인:
   ```bash
   git log --oneline
   ```

2. 취소:
   ```bash
   git revert <revert 커밋 해시>
   ```

---

## **Git Revert vs Git Reset**

| **특징**             | **git revert**                          | **git reset**                          |
|----------------------|-----------------------------------------|----------------------------------------|
| **히스토리 보존**    | 히스토리를 보존하며 새 커밋 생성        | 히스토리를 변경하거나 삭제             |
| **협업 친화적**      | 안전하게 병합 가능한 방식               | 협업 중 히스토리 수정 시 문제 발생 가능 |
| **사용 목적**        | 특정 커밋을 되돌리되 로그를 유지하려는 경우 | 특정 상태로 되돌려 과거 히스토리를 수정 |
| **영향 범위**        | 특정 커밋만 되돌림                     | 워킹 디렉토리, 스테이징 영역까지 영향 |

---

## **결론**

`git revert`는 Git의 강력한 도구로, 협업 환경에서 안전하게 과거 커밋을 되돌릴 수 있습니다. 이 가이드를 따라 직접 실습하며 `git revert`의 동작 방식을 익혀보세요. 실습을 통해 커밋 취소, 히스토리 관리, 충돌 해결 능력을 더욱 향상시킬 수 있습니다!

