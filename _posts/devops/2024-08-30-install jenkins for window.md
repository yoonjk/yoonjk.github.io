---
title: Install jenkins for windows
categories:
  - devops 
tags:
  - jenkins
---

jennkins를 윈도우에 설치합니다.

## jenkins 계정 추가 

windows에서 다음의 과정을 거처 계증을 추가합니다.

1. 가족 및 다른 사용자
2. 이 사람은 어떻게 로그인합니까?
3. 이 사람의 로그인 정보를 가지고 있지 않습니다.
4. 아래 사항에 동의함 > 동의
5. 계정 만들기 > Microsoft 계정 없이 사용자 추가
   
위의 과정을 거처 local 계정을 추가하고, jenkins 설치할 때 local 계정을 입력하고 Test Credentials을 선택하면 다음의 
**invalid logon** 에러가 발생합니다.
The account either does not have the privilege to logon as a service or the account was unable to be verified

이를 해결하기 위해서 Service Lonon credential 설치해야 합니다.


6. cmd 창을 관리자 권한으로실행
cmd 창을 관리자 권한으로실행하고 아래의 명령어를 순차적으로 실행
```bash
FOR %F IN ("%SystemRoot%\servicing\Packages\Microsoft-Windows-GroupPolicy-ClientTools-Package~*.mum") DO (DISM /Online /NoRestart /Add-Package:"%F")

FOR %F IN ("%SystemRoot%\servicing\Packages\Microsoft-Windows-GroupPolicy-ClientExtensions-Package~*.mum") DO (DISM /Online /NoRestart /Add-Package:"%F")
```


See here how to install Group Policy to Windows 10 Home:
https://www.itechtics.com/enable-gpedit-windows...

7. gpedit.msc 명령어를 실행

**서비스로 로그온(Log on as a service) > 속성** 을 선택 오른쪽 마우스 클릭하여 속성을 선택 

<figure style="width: 100%" class="align-left">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/jenkins/36-log-on-as-a-service.png" alt="">
  <figcaption></figcaption>
</figure> 

8. 사용자 또는 그룹선택 
   사용자 또는 그룹선택 팝업 화면이 보입니다.  

<figure style="width: 100%" class="align-left">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/jenkins/37-service-as-a-logon-property.png" alt="">
  <figcaption></figcaption>
</figure>  
   
사용자 또는 그룹선택 화면에서 jenkins 계정을 추가하고 이름확인버튼을 클릭하여 계정을 확인합니다.

<figure style="width: 100%" class="align-left">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/jenkins/38-user-or-group-select.png" alt="">
  <figcaption></figcaption>
</figure>  
      
정상적으로 계정이 확인되면 확인 버튼을 클릭하여 종료 

<figure style="width: 100%" class="align-left">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/jenkins/39-added-jenkins-on-user-or-group-property.png" alt="">
  <figcaption></figcaption>
</figure>  

