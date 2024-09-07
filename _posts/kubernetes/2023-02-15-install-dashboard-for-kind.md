---
title: kind 에 dashboard 설치하기 
categories:
  - kubernetes
tags: 
  - kind
---

## Dashboard 설치
kind를 사용하여 Kubernetes cluster를 구성하고 dashboard를 구성합니다.
dashboard는 다음과 같이 remote에 있는 yaml을 직접적용합니다.  
```bash
kubectl apply -f kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.7.0/aio/deploy/recommended.yaml
```

## port-forward로 port 오픈
port-forward를 합니다.  
```bash
kubectl port-forward svc/kubernetes-dashboard -n kubernetes-dashboard  443 --address 0.0.0.0
```
chrome 중앙의 to get chrome's 를 클릭하고 thisisunsafe를 입력하고 enter를 누릅니다.   

![port-forward]({{ "/assets/images/k8s/03-k8s-yourconnection-is-not-private.png"}})

그러면 다음과 가이 dashboard 로그인 화면이 나타납니다.  
![port-forward]({{ "/assets/images/k8s/04-k8s-kubernetes-dashboard.png"}})

## Create serviceaccount and role, token
kubernetes dashboard를 위한 serviceaccount와 cluster-role를 생성한 다음 token을 생성합니다. 그리고 생성한 token 값을 
dashboard login token 입력항목에 붙여넣기를 합니다.  
```bash
kubectl create sa dashboard-admin -n kubernetes-dashboard
kubectl create clusterrolebinding dashbaord-admin --clusterrole admin --serviceaccount kubernetes-dashboard:dashboard-admin
kubectl create token dashboard-admin -n kubernetes-dashboard

[수행결과]
eyJhbGciOiJSUzI1NiIsImtpZCI6IjcxeDlkdFlKOVhLZjRXOFdfNzVmLTZpUFVLOUtvQVM5M0RUMlMxcVBtblEifQ.eyJhdWQiOlsiaHR0cHM6Ly9rdWJlcm5ldGVzLmRlZmF1bHQuc3ZjLmNsdXN0ZXIubG9jYWwiXSwiZXhwIjoxNjc2NDkzNzA3LCJpYXQiOjE2NzY0OTAxMDcsImlzcyI6Imh0dHBzOi8va3ViZXJuZXRlcy5kZWZhdWx0LnN2Yy5jbHVzdGVyLmxvY2FsIiwia3ViZXJuZXRlcy5pbyI6eyJuYW1lc3BhY2UiOiJrdWJlcm5ldGVzLWRhc2hib2FyZCIsInNlcnZpY2VhY2NvdW50Ijp7Im5hbWUiOiJkYXNoYm9hcmQtYWRtaW4iLCJ1aWQiOiIwNDdlM2RjYS03N2JiLTRmYzMtYTkzZS0yMjAwNWNkZDBkOWYifX0sIm5iZiI6MTY3NjQ5MDEwNywic3ViIjoic3lzdGVtOnNlcnZpY2VhY2NvdW50Omt1YmVybmV0ZXMtZGFzaGJvYXJkOmRhc2hib2FyZC1hZG1pbiJ9.uDhrySLj1sZgsRovMS7TqT4DuTipdhaa2n1uKDLnfGq_-JNwQma7S0qOuLY20FAXfIGceax_k_LY5js0SP0GFWHSrw8m2S2jOEeDXkcvEkBQVDXi5DY-bp6p_y2dI4CleUxauFgPXOwXTOu8Un1fOfgltMCvGBcf68qPjZ1pxrni5_HlPi_o9xjhmfbggUxEq8zx0n2H5j0ssVITM7jH38F6eO7rMPVHRBngMok2qqOydviQZ0994TPgq_NByKkWDk1npCXOvrt03z9X6I7Q5-k6yX8vVEZSKq9rbq0lAJQLKlpKlttTHz6YJf0YEQwgygcakDxKCRsCk07kgEXP2Q
```
token을 입력합니다.  
![port-forward]({{ "/assets/images/k8s/05-k8s-input-token-dashboard.png"}})

dashboard 로그인 화면입니다.  
![port-forward]({{ "/assets/images/k8s/06-k8s-dashboard-login.png"}})
