---
title: Install jenkins for windows
categories:
  - devops 
tags:
  - jenkins
---

jennkins를 윈도우에 설치합니다.

## Pre-requisites 
'서비스로 로그온' 권한을 정의하려는 컴퓨터의 로컬 보안 정책:

- 관리자 권한으로 컴퓨터에 로그온합니다.
- 관리 도구를 열고 로컬 보안 정책을 엽니다.
- 시스템에 로컬 보안 정책이 없는 경우 Microsoft Community에서 Windows 10 Home용 GPEdit.msc를 다운로드하는 방법은? 질문의 답변을 참조하여 문제를 해결합니다.
- 로컬 정책[참고: ... Windows Server의 정책]을 확장하고 사용자 권한 할당을 클릭합니다.
- 오른쪽 창에서 서비스로 로그온을 마우스 오른쪽 버튼으로 클릭하고 속성을 선택합니다.
- 사용자 또는 그룹 추가... 버튼을 클릭하여 새 사용자를 추가합니다.
- 사용자 또는 그룹 선택 대화 상자에서 입력하려는 사용자를 찾고 확인을 클릭합니다.
- 서비스로 로그온 속성에서 확인을 클릭하여 변경 사항을 저장합니다.

## jenkins 계정 추가 
**windows에서 다음의 과정을 거처 jenkins 계정을 추가**

1. 가족 및 다른 사용자
2. 이 사람은 어떻게 로그인합니까?
3. 이 사람의 로그인 정보를 가지고 있지 않습니다.
4. 아래 사항에 동의함 > 동의
5. 계정 만들기 > Microsoft 계정 없이 사용자 추가
   
위의 과정을 거처 local 계정을 추가하고, jenkins 설치할 때 local 계정을 입력하고 Test Credentials을 선택하면 다음의 
**invalid logon** 에러가 발생합니다.
The account either does not have the privilege to logon as a service or the account was unable to be verified

이를 해결하기 위해서 Service Lonon credential 설치해야 합니다.

## Install gpedit.msc
**Install gpedit.msc** 
cmd 창을 관리자 권한으로실행하고 아래의 명령어를 순차적으로 실행
```bash
FOR %F IN ("%SystemRoot%\servicing\Packages\Microsoft-Windows-GroupPolicy-ClientTools-Package~*.mum") DO (DISM /Online /NoRestart /Add-Package:"%F")

FOR %F IN ("%SystemRoot%\servicing\Packages\Microsoft-Windows-GroupPolicy-ClientExtensions-Package~*.mum") DO (DISM /Online /NoRestart /Add-Package:"%F")
```


See here how to install Group Policy to Windows 10 Home:
https://www.itechtics.com/enable-gpedit-windows...


## 관리 도구를 열고 로컬 보안 정책 설정 
**gpedit.msc 명령어를 실행**

**서비스로 로그온(Log on as a service) > 속성** 을 선택 오른쪽 마우스 클릭하여 속성을 선택 

<figure style="width: 50%" class="align-left">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/jenkins/36-log-on-as-a-service.png" alt="">
  <figcaption></figcaption>
</figure> 

**사용자 또는 그룹선택**
   사용자 또는 그룹선택 팝업 화면이 보입니다.  

<figure style="width: 50%" class="align-left">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/jenkins/37-service-as-a-logon-property.png" alt="">
  <figcaption></figcaption>
</figure>  
   
사용자 또는 그룹선택 화면에서 jenkins 계정을 추가하고 이름확인버튼을 클릭하여 계정을 확인합니다.

<figure style="width: 50%" class="align-left">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/jenkins/38-user-or-group-select.png" alt="">
  <figcaption></figcaption>
</figure>  
      
정상적으로 계정이 확인되면 확인 버튼을 클릭하여 종료 

<figure style="width: 50%" class="align-left">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/jenkins/39-added-jenkins-on-user-or-group-property.png" alt="">
  <figcaption></figcaption>
</figure>  


