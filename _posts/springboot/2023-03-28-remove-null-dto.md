---
title: DTO에서 null인 항목은 json에서 제거
categories:
  - springboot
tags: 
  - Advice
---

## DTO에서 null인 항목은 json에서 제거
 ```java
@ToString
@Getter
@Setter
public class CodeDto {
    private int code;

    @JsonInclude(Include.NON_NULL)
    private String codeName;
}
```