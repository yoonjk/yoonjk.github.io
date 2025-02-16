---
title: 테스트케이스란
categories:
  - springboot
tags: 
  - testcase
---

테스트케이스는 특정 기능이 올바르게 동작하는지 확인하기 위한
- 입력
- 실행조건
- 예상결과
를 정의한 문서 또는 코드입니다.


Spring Boot에서는 보통 JUnit과 같은 테스트 프레임워크를 사용하여 테스트 케이스를 코드로 작성합니다  
즉 테스트 코드는 테스트케이스를 코드로 구현한 것  
@Test 메소드는 내부의  
- 입력 데이터(Given) 
- 실행(When) 
- 검증(Then)부분
이 테스트 케이스에 해당  

**예제**
<table>
<thead>
    <tr>  
        <td styled="width=%10%">테스트 </td>
        <td tyled="width=%20%">테스트 목적</td>
        <td tyled="width=%40%">입력 데이터</td>
        <td tyled="width=%30%"> 예상결과 </td>
    </tr>
</thead>
<tbody>
    <tr>  
        <td>TC001</td>
        <td>회원가입 성공 케이스</td>
        <td>email="user@test.com", password="password123"</td>
        <td>회원가입 성공, 201 Created</td>
    </tr>
</tbody>
</table>

<figure style="width: 40%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/springboot/testcase-scenario.png" alt="">
  <figcaption></figcaption>
</figure> 
