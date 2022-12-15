---
title: Airflow Trigger_rules
categories:
  - workflow
tags: 
  - airflow

---

## Airflow Trigger rules
일반적으로 Task는 이전 Task들이 성공할 때만 실행됩니다. 
trigger rule이 default로 all_success이기 때문입니다. 기본적으로 모든 상위 작업이 성공하면 작업이 실행됩니다. 이 action은 일반적으로 기대하는 것입니다. 

그러나 더 복잡한 것을 원한다면 어떻게 해야 할까요?
상위 task 중 한 개 task가 성공하자마자 작업을 수행하고 싶다면 어떻게? 
아니면 작업이 실패하면 다른 작업 세트를 실행하고 싶습니까?
또는 작업이 성공하거나 실패하거나 이벤트가 건너 뛸 경우에 따라 다르게 action 을 해야 하는 경우?


좀더 복잡한 workflow는 Task간 다양한 의존성이 존재합니다. 일반적인 워크플로 동작은  모든 직접 업스트림 작업이 성공할 때 작업을 트리거하는 것이지만 Airflow는 더 복잡한 종속성 설정을 허용합니다.
이러한 다양한 의존성을 지원하기 위한 Trigger Rule들이 다음과 같이 존재합니다

모든 Operator 에는  생성된 작업이 트리거되는 규칙을 정의하는 trigger_rule 인수가 있습니다. trigger_rule  의 기본값은 all_success이며 "모든 직접 업스트림 작업이 성공하면 이 작업 트리거"로 정의할 수 있습니다. 여기에 설명된 다른 모든 규칙은 직접 상위 작업을 기반으로 하며 작업을 만드는 동안 모든위 Operator에게 전달할 수 있는 값입니다.

- all_success: (default) 모든 상위 Task가 성공한 경우
- all_failed: 모든 Parent Task가 실패 또는 upstream_failed 상태일 떄 하위 Task가 실행
- all_done: 모든 상위 Task가 완료된 경우 하위 Task 실행.
- one_failed: 적어도 한 부모가 실패하자마자 모든 부모가 완료 될 때까지 기다리지 않고 실행됩니다.
- one_success: 적어도 한 부모가 성공하자마자 모든 부모가 완료 될 때까지 기다리지 않고 Trigger 됩니다.
- none_failed: 모든 상위 Task가 실패가 없는 경우(failed or upstream_failed) i.e. 모든 부모가 성공했거나 skip인 경우 하위 Task 실행.
- none_skipped:상위 Task의 상태가 Skip이 없는 경우 하위 Task 실행, i.e. all parents are in a success, failed, or upstream_failed state

아래의 task Graph view 처럼 trigger rule이 all_success인 경우 end task는 실행되지 않고 skip하게 되는 경우도 있습니다. 

<figure style="width: 100%" class="align-left">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/08-trigger_rule-none_ailed_min_one_success.png" alt="">
  <figcaption></figcaption>
</figure> 

어떤 dag은 이전 Task에 실패가 없고 최소한 한개 이상 성공한 경우end task를 항상 실행하고자 할 때 end task에 trigger rule을 none_failed_min_one_success
로 설정하면 다음과 같이 end task를 실행할 수 있습니다.

<figure style="width: 100%" class="align-left">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/08-trigger_rule-none_ailed_min_one_success.png" alt="">
  <figcaption></figcaption>
</figure> 

예시)

```python
t1 = EmptyOperator(task_id=’end’, trigger_rule=’ none_failed_min_one_success’)
```

#### all_success  
이것은 매우 간단하고 이미 보았습니다. 모든 업스트림 작업 (부모)이 성공했을 때 작업이 시작됩니다

<figure style="width: 100%" class="align-left">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/08-trigger_rule-all_success2.png" alt="">
  <figcaption></figcaption>
</figure> 

<figure style="width: 100%" class="align-left">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/08-trigger_rule-all_success3.png" alt="">
  <figcaption></figcaption>
</figure> 

#### all_failed
모든 상위 작업이 실패하면 Task C 는 작업이 Trigger 됩니다

<figure style="width: 100%" class="align-left">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/08-trigger_rule-all_failed.png" alt="">
  <figcaption></figcaption>
</figure> 

