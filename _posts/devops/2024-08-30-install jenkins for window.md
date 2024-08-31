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

## service on credentials
service as local or domain user를 선택하고
account와 Password를 입력하고 Test credentials을 클릭하면 아래와 같이 invalid logon에러가 발생합니다.  
이를 해결하기 위해서는 jenkins 계정을 추가하고, local 정책으로 서비스온 로그온 권한을 할당해야합니다.  

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/jenkins/42-invalid-service-logon-credentials.png" alt="">
  <figcaption></figcaption>
</figure>  

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/jenkins/43-invalid-logon.png" alt="">
  <figcaption></figcaption>
</figure>  

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

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/jenkins/36-log-on-as-a-service.png" alt="">
  <figcaption></figcaption>
</figure> 

**사용자 또는 그룹선택**
   사용자 또는 그룹선택 팝업 화면이 보입니다.  

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/jenkins/37-service-as-a-logon-property.png" alt="">
  <figcaption></figcaption>
</figure>  
   
사용자 또는 그룹선택 화면에서 jenkins 계정을 추가하고 이름확인버튼을 클릭하여 계정을 확인합니다.

<figure style="width: 50%" class="align-left">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/jenkins/38-user-or-group-select.png" alt="">
  <figcaption></figcaption>
</figure>  
      
정상적으로 계정이 확인되면 확인 버튼을 클릭하여 종료 

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/jenkins/39-added-jenkins-on-user-or-group-property.png" alt="">
  <figcaption></figcaption>
</figure>  

## valid Service Logon Credentials
local jenkins 계정을 추가하고, 서비스로 로그온 권한을 할당하고 다시 Test Credentials 버튼을 클릭합니다.


<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/jenkins/44-valid-service-logon-credentials.png" alt="">
  <figcaption></figcaption>
</figure>  

## select port
jenkins port를 선택합니다.
port 충돌 여부를 확인하기 위해 test Port 버튼을 클릭하여 확인 후 정상이면
다음(next) 버튼을 클릭합니다.

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/jenkins/45-port-selection.png" alt="">
  <figcaption></figcaption>
</figure>  

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/jenkins/45-test-port.png" alt="">
  <figcaption></figcaption>
</figure>  

## select java home 폴더 
java home 폴더를 선택합니다.

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/jenkins/45-select-java-home.png" alt="">
  <figcaption></figcaption>
</figure>  

## select java home 폴더 변경 
program files 폴더에서 java home 폴더를 찾아서 java home 폴더를 선택합니다.

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/jenkins/45-select-java-home.png" alt="">
  <figcaption></figcaption>
</figure>  

## java home 폴더 선택
java home 폴더를 선택합니다.

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/jenkins/46-select-java-folder.png" alt="">
  <figcaption></figcaption>
</figure>  

##  custom setup
custom setup 화면이 보이면 다음(next) 버튼을 클릭합니다.
<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/jenkins/48-custom-setup.png" alt="">
  <figcaption></figcaption>
</figure>  

##  jenkins 설치
jenkins 설치 준비가 되었습니다. install 버튼을 클릭합니다.  
<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/jenkins/49-ready-to-install-jenkins.png" alt="">
  <figcaption></figcaption>
</figure>  

##  jenkins 설치
jenkins 설치가 성공적으로 되었습니다.  

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/jenkins/50-completed-the-jenkins.png" alt="">
  <figcaption></figcaption>
</figure>

## Unlock Jenkins
browser에서 jenkins default port 8080 으로 접속하면 다음과 같이 administrator password 입력을 요구합니다.
http://localhost:8080

지정한 폴더의 파일 **C:\Users\jenkins\AppData\Local\Jenkins\.jenkins\secrets\initialAdminPassword** 을 확인합니다.

jenkins 계정을 선택하면  AppData 폴더가 숨김으로되어 있기 때문에 이를 해지 해야 합니다.

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/jenkins/51-jenkins-admin-password-folder.png" alt="">
  <figcaption></figcaption>
</figure>

jenkins 계정을 선택하고 **탐색기 메뉴 보기 > 숨김 항목**을 선택

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/jenkins/52-select-hide-holder.png" alt="">
  <figcaption></figcaption>
</figure>

숨김화면을 선택(checked)하지 않으면 폴더가 숨김으로 되어 있기 때문에 비밀번호를 확인 할 수 없습니다.
숨김폴더(appData)가 보이면 Window Power Shell 을 이용하여 비밀번호를 확인하여 브라우저에 입력합니다.  
 
```bash
type C:\Users\jenkins\AppData\Local\Jenkins\.jenkins\secrets\initialAdminPassword
```

## Customize Jenkins

Customize Jenkins 화면에서 제안된 jenkins plugins들을 설치합니다.  

<figure style="width: 100%" class="align-left">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/jenkins/53-input-password-unlock-jenkins.png" alt="">
  <figcaption></figcaption>
</figure>

<figure style="width: 100%" class="align-left">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/jenkins/54-customizing jenkins.png" alt="">
  <figcaption></figcaption>
</figure>


## admin 계정 생성
jenkins admin 계정을 입력하고 **Save and Continue** 버튼을 클릭합니다.  

<figure style="width: 100%" class="align-left">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/jenkins/55-create-admin.png" alt="">
  <figcaption></figcaption>
</figure>

## innstance configuraiton
jenkins port를 확인하고 **Save and Finish** 버튼을 클릭합니다.


<figure style="width: 100%" class="align-left">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/jenkins/56-instance-configuration.png" alt="">
  <figcaption></figcaption>
</figure>

## Jenkins is Ready

<figure style="width: 100%" class="align-left">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/jenkins/57-jenkins-is-ready.png" alt="">
  <figcaption></figcaption>
</figure>


