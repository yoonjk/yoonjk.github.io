---
title: Jenkins 시작
categories:
  - devops 
tags:
  - jenkins
---

## Start-up Jenkins 
Jenkins server에 접속하기 brower에서 해당 서버의 http://localhost:8080 포트 접속합니다.

Jenkins에 접속하면 Jenkins admin 초기 패스워드를 입력하는 화면이 출력됩니다

터미널에서 다음과 같이 명령을 수행하여 Jenkins  admin 초기 로그인 비밀번호를 확인하고, 초기 패스워드를 입력합니다.

![Jenkins Getting started]({{ "/assets/images/jenkins/03-jenkins-initial-admin.png" }})

```bash
cat /var/lib/jenkins/secrets/initialAdminPassword
```

[수행결과]
a0f289xxxxxxxxxcd8fbb7

Jenkins 패스워드 입력화면에 복사한 패스워드를 입력하고 Continue 버튼을 클릭하고, Install suggested plugins를 선택합니다

![Jenkins Getting started]({{ "/assets/images/jenkins/04-jenkins-getting-started.png" | relative_url }})


Jenkins Plugins이 다음과 같이 설치됩니다

![Install Jenkins Plugins]({{ "/assets/images/jenkins/05-jenkins-install-plugins.png" | relative_url }})

Jenkins Admin 계정을 생성합니다. Save and Continue 버튼을 클릭합니다

![Create Admin]({{ "/assets/images/jenkins/06-jenkins-create-admin.png" | relative_url }})

Instance Configuration 확인하고, Save and Finish 버튼을 클릭하고, Start using Jenkins 버튼을 클릭합니다.
