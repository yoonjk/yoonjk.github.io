---
title: Add support for helm parameter maps for extraConfig using bitnami
categories:
  - kafka
tags: 
  - config
---

bitnami/kafka 28.1.1

What is the problem this feature will solve?
With the migration to Kafka 3.5, an extraConfig parameter was added to the chart.
We regret that this is just a text value instead of a helm parameter map.
This choice blocks the overloading of a certain setting via additional values.yaml layers.
With the current implementation, you need to duplicate all extraConfig if you want to change a single parameter in it.

As an example, instead of this

```ini
extraConfig: |
  max.message.bytes = 1048576
  offsets.topic.replication.factor = 3
  default.replication.factor = 3
  delete.topic.enable = true
  auto.create.topics.enable = false
```

## 참고
- [Add support for helm parameter maps for extraConfig](https://github.com/bitnami/charts/issues/25646)
  