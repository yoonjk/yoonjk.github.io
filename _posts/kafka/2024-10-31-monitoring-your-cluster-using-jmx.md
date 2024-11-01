---
title: logstash-plugin install logstash-input-jmx
categories:
  - kafka
tags: 
  - JMX
---

Collecting metrics is critical for understanding the health and performance of your Kafka deployment. By monitoring metrics, you can actively identify issues before they become critical and make informed decisions about resource allocation and capacity planning. Without metrics, you may be left with limited visibility into the behavior of your Kafka deployment, which can make troubleshooting more difficult and time-consuming. Setting up metrics can save you time and resources in the long run, and help ensure the reliability of your Kafka deployment.

Kafka components use Java Management Extensions (JMX) to share management information through metrics. These metrics are crucial for monitoring a Kafka cluster’s performance and overall health. Like many other Java applications, Kafka employs Managed Beans (MBeans) to supply metric data to monitoring tools and dashboards. JMX operates at the JVM level, allowing external tools to connect and retrieve management information from Kafka components. To connect to the JVM, these tools typically need to run on the same machine and with the same user privileges by default.

19.1. Enabling the JMX agent 
Copy link
Enable JMX monitoring of Kafka components using JVM system properties. Use the KAFKA_JMX_OPTS environment variable to set the JMX system properties required for enabling JMX monitoring. The scripts that run the Kafka component use these properties.

Procedure

Set the KAFKA_JMX_OPTS environment variable with the JMX properties for enabling JMX monitoring.

export KAFKA_JMX_OPTS=-Dcom.sun.management.jmxremote=true
  -Dcom.sun.management.jmxremote.port=<port>
  -Dcom.sun.management.jmxremote.authenticate=false
  -Dcom.sun.management.jmxremote.ssl=false
Replace <port> with the name of the port on which you want the Kafka component to listen for JMX connections.

Add org.apache.kafka.common.metrics.JmxReporter to metric.reporters in the server.properties file.

metric.reporters=org.apache.kafka.common.metrics.JmxReporter
Start the Kafka component using the appropriate script, such as bin/kafka-server-start.sh for a broker or bin/connect-distributed.sh for Kafka Connect.
Important
It is recommended that you configure authentication and SSL to secure a remote JMX connection. For more information about the system properties needed to do this, see the Oracle documentation.

19.2. Disabling the JMX agent 
Copy link
Disable JMX monitoring for Kafka components by updating the KAFKA_JMX_OPTS environment variable.

Procedure

Set the KAFKA_JMX_OPTS environment variable to disable JMX monitoring.

export KAFKA_JMX_OPTS=-Dcom.sun.management.jmxremote=false
Note
Other JMX properties, like port, authentication, and SSL properties do not need to be specified when disabling JMX monitoring.

Set auto.include.jmx.reporter to false in the Kafka server.properties file.

auto.include.jmx.reporter=false
Note
The auto.include.jmx.reporter property is deprecated. From Kafka 4, the JMXReporter is only enabled if org.apache.kafka.common.metrics.JmxReporter is added to the metric.reporters configuration in the properties file.

Start the Kafka component using the appropriate script, such as bin/kafka-server-start.sh for a broker or bin/connect-distributed.sh for Kafka Connect.
19.3. Metrics naming conventions 
Copy link
When working with Kafka JMX metrics, it’s important to understand the naming conventions used to identify and retrieve specific metrics. Kafka JMX metrics use the following format:

Metrics format


<metric_group>:type=<type_name>,name=<metric_name><other_attribute>=<value>
<metric_group> is the name of the metric group
<type_name> is the name of the type of metric
<metric_name> is the name of the specific metric
<other_attribute> represents zero or more additional attributes
For example, the BytesInPerSec metric is a BrokerTopicMetrics type in the kafka.server group:

kafka.server:type=BrokerTopicMetrics,name=BytesInPerSec
In some cases, metrics may include the ID of an entity. For instance, when monitoring a specific client, the metric format includes the client ID:

Metrics for a specific client


kafka.consumer:type=consumer-fetch-manager-metrics,client-id=<client_id>
Similarly, a metric can be further narrowed down to a specific client and topic:

Metrics for a specific client and topic


kafka.consumer:type=consumer-fetch-manager-metrics,client-id=<client_id>,topic=<topic_id>
Understanding these naming conventions will allow you to accurately specify the metrics you want to monitor and analyze.

Note
To view the full list of available JMX metrics for a Strimzi installation, you can use a graphical tool like JConsole. JConsole is a Java Monitoring and Management Console that allows you to monitor and manage Java applications, including Kafka. By connecting to the JVM running the Kafka component using its process ID, the tool’s user interface allows you to view the list of metrics.

19.4. Analyzing Kafka JMX metrics for troubleshooting 
Copy link
JMX provides a way to gather metrics about Kafka brokers for monitoring and managing their performance and resource usage. By analyzing these metrics, common broker issues such as high CPU usage, memory leaks, thread contention, and slow response times can be diagnosed and resolved. Certain metrics can pinpoint the root cause of these issues.

JMX metrics also provide insights into the overall health and performance of a Kafka cluster. They help monitor the system’s throughput, latency, and availability, diagnose issues, and optimize performance. This section explores the use of JMX metrics to help identify common issues and provides insights into the performance of a Kafka cluster.

Collecting and graphing these metrics using tools like Prometheus and Grafana allows you to visualize the information returned. This can be particularly helpful in detecting issues or optimizing performance. Graphing metrics over time can also help with identifying trends and forecasting resource consumption.

19.4.1. Checking for under-replicated partitions 
A balanced Kafka cluster is important for optimal performance. In a balanced cluster, partitions and leaders are evenly distributed across all brokers, and I/O metrics reflect this. As well as using metrics, you can use the kafka-topics.sh tool to get a list of under-replicated partitions and identify the problematic brokers. If the number of under-replicated partitions is fluctuating or many brokers show high request latency, this typically indicates a performance issue in the cluster that requires investigation. On the other hand, a steady (unchanging) number of under-replicated partitions reported by many of the brokers in a cluster normally indicates that one of the brokers in the cluster is offline.

Use the describe --under-replicated-partitions option from the kafka-topics.sh tool to show information about partitions that are currently under-replicated in the cluster. These are the partitions that have fewer replicas than the configured replication factor.

If the output is blank, the Kafka cluster has no under-replicated partitions. Otherwise, the output shows replicas that are not in sync or available.

In the following example, only 2 of the 3 replicas are in sync for each partition, with a replica missing from the ISR (in-sync replica).

Returning information on under-replicated partitions from the command line

```bash
bin/kafka-topics.sh --bootstrap-server :9092 --describe --under-replicated-partitions

Topic: topic-1 Partition: 0 Leader: 4 Replicas: 4,2,3 Isr: 4,3
Topic: topic-1 Partition: 1 Leader: 3 Replicas: 2,3,4 Isr: 3,4
Topic: topic-1 Partition: 2 Leader: 3 Replicas: 3,4,2 Isr: 3,4
Here are some metrics to check for I/O and under-replicated partitions:
```

Metrics to check for under-replicated partitions

```ini
kafka.server:type=ReplicaManager,name=PartitionCount # 1
kafka.server:type=ReplicaManager,name=LeaderCount # 2
kafka.server:type=BrokerTopicMetrics,name=BytesInPerSec # 3
kafka.server:type=BrokerTopicMetrics,name=BytesOutPerSec # 4
kafka.server:type=ReplicaManager,name=UnderReplicatedPartitions # 5
kafka.server:type=ReplicaManager,name=UnderMinIsrPartitionCount # 6
```
1
Total number of partitions across all topics in the cluster.
2
Total number of leaders across all topics in the cluster.
3
Rate of incoming bytes per second for each broker.
4
Rate of outgoing bytes per second for each broker.
5
Number of under-replicated partitions across all topics in the cluster.
6
Number of partitions below the minimum ISR.
If topic configuration is set for high availability, with a replication factor of at least 3 for topics and a minimum number of in-sync replicas being 1 less than the replication factor, under-replicated partitions can still be usable. Conversely, partitions below the minimum ISR have reduced availability. You can monitor these using the kafka.server:type=ReplicaManager,name=UnderMinIsrPartitionCount metric and the under-min-isr-partitions option from the kafka-topics.sh tool.

Tip
Use Cruise Control to automate the task of monitoring and rebalancing a Kafka cluster to ensure that the partition load is evenly distributed. For more information, see Chapter 13, Using Cruise Control for cluster rebalancing.

19.4.2. Identifying performance problems in a Kafka cluster 
Copy link
Spikes in cluster metrics may indicate a broker issue, which is often related to slow or failing storage devices or compute restraints from other processes. If there is no issue at the operating system or hardware level, an imbalance in the load of the Kafka cluster is likely, with some partitions receiving disproportionate traffic compared to others in the same Kafka topic.

To anticipate performance problems in a Kafka cluster, it’s useful to monitor the RequestHandlerAvgIdlePercent metric. RequestHandlerAvgIdlePercent provides a good overall indicator of how the cluster is behaving. The value of this metric is between 0 and 1. A value below 0.7 indicates that threads are busy 30% of the time and performance is starting to degrade. If the value drops below 50%, problems are likely to occur, especially if the cluster needs to scale or rebalance. At 30%, a cluster is barely usable.

Another useful metric is kafka.network:type=Processor,name=IdlePercent, which you can use to monitor the extent (as a percentage) to which network processors in a Kafka cluster are idle. The metric helps identify whether the processors are over or underutilized.

To ensure optimal performance, set the num.io.threads property equal to the number of processors in the system, including hyper-threaded processors. If the cluster is balanced, but a single client has changed its request pattern and is causing issues, reduce the load on the cluster or increase the number of brokers.

It’s important to note that a single disk failure on a single broker can severely impact the performance of an entire cluster. Since producer clients connect to all brokers that lead partitions for a topic, and those partitions are evenly spread over the entire cluster, a poorly performing broker will slow down produce requests and cause back pressure in the producers, slowing down requests to all brokers. A RAID (Redundant Array of Inexpensive Disks) storage configuration that combines multiple physical disk drives into a single logical unit can help prevent this issue.

Here are some metrics to check the performance of a Kafka cluster:

Metrics to check the performance of a Kafka cluster

```ini
kafka.server:type=KafkaRequestHandlerPool,name=RequestHandlerAvgIdlePercent # 1
# attributes: OneMinuteRate, FifteenMinuteRate
kafka.server:type=socket-server-metrics,listener=([-.\w]+),networkProcessor=([\d]+) # 2
# attributes: connection-creation-rate
kafka.network:type=RequestChannel,name=RequestQueueSize # 3
kafka.network:type=RequestChannel,name=ResponseQueueSize 4
kafka.network:type=Processor,name=IdlePercent,networkProcessor=([-.\w]+) # 5
kafka.server:type=KafkaServer,name=TotalDiskReadBytes # 6
kafka.server:type=KafkaServer,name=TotalDiskWriteBytes # dd7
```

1
Average idle percentage of the request handler threads in the Kafka broker’s thread pool. The OneMinuteRate and FifteenMinuteRate attributes show the request rate of the last one minute and fifteen minutes, respectively.
2
Rate at which new connections are being created on a specific network processor of a specific listener in the Kafka broker. The listener attribute refers to the name of the listener, and the networkProcessor attribute refers to the ID of the network processor. The connection-creation-rate attribute shows the rate of connection creation in connections per second.
3
Current size of the request queue.
4
Current sizes of the response queue.
5
Percentage of time the specified network processor is idle. The networkProcessor specifies the ID of the network processor to monitor.
6
Total number of bytes read from disk by a Kafka server.
7
Total number of bytes written to disk by a Kafka server.
19.4.3. Identifying performance problems with a Kafka controller 
Copy link
The Kafka controller is responsible for managing the overall state of the cluster, such as broker registration, partition reassignment, and topic management. Problems with the controller in the Kafka cluster are difficult to diagnose and often fall into the category of bugs in Kafka itself. Controller issues might manifest as broker metadata being out of sync, offline replicas when the brokers appear to be fine, or actions on topics like topic creation not happening correctly.

There are not many ways to monitor the controller, but you can monitor the active controller count and the controller queue size. Monitoring these metrics gives a high-level indicator if there is a problem. Although spikes in the queue size are expected, if this value continuously increases, or stays steady at a high value and does not drop, it indicates that the controller may be stuck. If you encounter this problem, you can move the controller to a different broker, which requires shutting down the broker that is currently the controller.

Here are some metrics to check the performance of a Kafka controller:

Metrics to check the performance of a Kafka controller

```ini
kafka.controller:type=KafkaController,name=ActiveControllerCount # 1
kafka.controller:type=KafkaController,name=OfflinePartitionsCount # 2
kafka.controller:type=ControllerEventManager,name=EventQueueSize # 3
```
1 : Number of active controllers in the Kafka cluster. A value of 1 indicates that there is only one active controller, which is the desired state.
2 : Number of partitions that are currently offline. If this value is continuously increasing or stays at a high value, there may be a problem with the controller.
3 : Size of the event queue in the controller. Events are actions that must be performed by the controller, such as creating a new topic or moving a partition to a new broker. if the value continuously increases or stays at a high value, the controller may be stuck and unable to perform the required actions.
19.4.4. Identifying problems with requests  

Copy link
You can use the RequestHandlerAvgIdlePercent metric to determine if requests are slow. Additionally, request metrics can identify which specific requests are experiencing delays and other issues.

To effectively monitor Kafka requests, it is crucial to collect two key metrics: count and 99th percentile latency, also known as tail latency.

The count metric represents the number of requests processed within a specific time interval. It provides insights into the volume of requests handled by your Kafka cluster and helps identify spikes or drops in traffic.

The 99th percentile latency metric measures the request latency, which is the time taken for a request to be processed. It represents the duration within which 99% of requests are handled. However, it does not provide information about the exact duration for the remaining 1% of requests. In other words, the 99th percentile latency metric tells you that 99% of the requests are handled within a certain duration, and the remaining 1% may take even longer, but the precise duration for this remaining 1% is not known. The choice of the 99th percentile is primarily to focus on the majority of requests and exclude outliers that can skew the results.

This metric is particularly useful for identifying performance issues and bottlenecks related to the majority of requests, but it does not give a complete picture of the maximum latency experienced by a small fraction of requests.

By collecting and analyzing both count and 99th percentile latency metrics, you can gain an understanding of the overall performance and health of your Kafka cluster, as well as the latency of the requests being processed.

Here are some metrics to check the performance of Kafka requests:

Metrics to check the performance of requests

```ini
# requests: EndTxn, Fetch, FetchConsumer, FetchFollower, FindCoordinator, Heartbeat, InitProducerId,
# JoinGroup, LeaderAndIsr, LeaveGroup, Metadata, Produce, SyncGroup, UpdateMetadata 1
kafka.network:type=RequestMetrics,name=RequestsPerSec,request=([\w]+) # 2
kafka.network:type=RequestMetrics,name=RequestQueueTimeMs,request=([\w]+) # 3
kafka.network:type=RequestMetrics,name=TotalTimeMs,request=([\w]+) # 4
kafka.network:type=RequestMetrics,name=LocalTimeMs,request=([\w]+) # 5
kafka.network:type=RequestMetrics,name=RemoteTimeMs,request=([\w]+) # 6
kafka.network:type=RequestMetrics,name=ThrottleTimeMs,request=([\w]+) # 7
kafka.network:type=RequestMetrics,name=ResponseQueueTimeMs,request=([\w]+) # 8
kafka.network:type=RequestMetrics,name=ResponseSendTimeMs,request=([\w]+) # 9
```
# attributes: Count, 99thPercentile 10
1
Request types to break down the request metrics.
2
Rate at which requests are being processed by the Kafka broker per second.
3
Time (in milliseconds) that a request spends waiting in the broker’s request queue before being processed.
4
Total time (in milliseconds) that a request takes to complete, from the time it is received by the broker to the time the response is sent back to the client.
5
Time (in milliseconds) that a request spends being processed by the broker on the local machine.
6
Time (in milliseconds) that a request spends being processed by other brokers in the cluster.
7
Time (in milliseconds) that a request spends being throttled by the broker. Throttling occurs when the broker determines that a client is sending too many requests too quickly and needs to be slowed down.
8
Time (in milliseconds) that a response spends waiting in the broker’s response queue before being sent back to the client.
9
Time (in milliseconds) that a response takes to be sent back to the client after it has been generated by the broker.
10
For all of the requests metrics, the Count and 99thPercentile attributes show the total number of requests that have been processed and the time it takes for the slowest 1% of requests to complete, respectively.
19.4.5. Using metrics to check the performance of clients 
Copy link
By analyzing client metrics, you can monitor the performance of the Kafka clients (producers and consumers) connected to a broker. This can help identify issues highlighted in broker logs, such as consumers being frequently kicked off their consumer groups, high request failure rates, or frequent disconnections.

Here are some metrics to check the performance of Kafka clients:

Metrics to check the performance of client requests

```ini
kafka.consumer:type=consumer-metrics,client-id=([-.\w]+) # 1
# attributes: time-between-poll-avg, time-between-poll-max
kafka.consumer:type=consumer-coordinator-metrics,client-id=([-.\w]+) # 2
# attributes: heartbeat-response-time-max, heartbeat-rate, join-time-max, join-rate, rebalance-rate-per-hour
kafka.producer:type=producer-metrics,client-id=([-.\w]+) # 3
# attributes: buffer-available-bytes, bufferpool-wait-time, request-latency-max, requests-in-flight
# attributes: txn-init-time-ns-total, txn-begin-time-ns-total, txn-send-offsets-time-ns-total, txn-commit-time-ns-total, txn-abort-time-ns-total
# attributes: record-error-total, record-queue-time-avg, record-queue-time-max, record-retry-rate, record-retry-total, record-send-rate, record-send-total

1 : (Consumer) Average and maximum time between poll requests, which can help determine if the consumers are polling for messages frequently enough to keep up with the message flow. The time-between-poll-avg and time-between-poll-max attributes show the average and maximum time in milliseconds between successive polls by a consumer, respectively.
2 : (Consumer) Metrics to monitor the coordination process between Kafka consumers and the broker coordinator. Attributes relate to the heartbeat, join, and rebalance process.
3 : (Producer) Metrics to monitor the performance of Kafka producers. Attributes relate to buffer usage, request latency, in-flight requests, transactional processing, and record handling.
19.4.6. Using metrics to check the performance of topics and partitions 
Copy link
Metrics for topics and partitions can also be helpful in diagnosing issues in a Kafka cluster. You can also use them to debug issues with a specific client when you are unable to collect client metrics.

Here are some metrics to check the performance of a specific topic and partition:

Metrics to check the performance of topics and partitions

```ini
#Topic metrics
kafka.server:type=BrokerTopicMetrics,name=BytesInPerSec,topic=([-.\w]+)   #1
kafka.server:type=BrokerTopicMetrics,name=BytesOutPerSec,topic=([-.\w]+)  #2
kafka.server:type=BrokerTopicMetrics,name=FailedFetchRequestsPerSec,topic=([-.\w]+) #3
kafka.server:type=BrokerTopicMetrics,name=FailedProduceRequestsPerSec,topic=([-.\w]+)  #4
kafka.server:type=BrokerTopicMetrics,name=MessagesInPerSec,topic=([-.\w]+) #5
kafka.server:type=BrokerTopicMetrics,name=TotalFetchRequestsPerSec,topic=([-.\w]+) # 6
kafka.server:type=BrokerTopicMetrics,name=TotalProduceRequestsPerSec,topic=([-.\w]+) # 7
#Partition metrics
kafka.log:type=Log,name=Size,topic=([-.\w]+),partition=([\d]+)) # 8
kafka.log:type=Log,name=NumLogSegments,topic=([-.\w]+),partition=([\d]+)) # 9
kafka.log:type=Log,name=LogEndOffset,topic=([-.\w]+),partition=([\d]+)) # 10
kafka.log:type=Log,name=LogStartOffset,topic=([-.\w]+),partition=([\d]+)) # 11
```


1 : Rate of incoming bytes per second for a specific topic.
2 : Rate of outgoing bytes per second for a specific topic.
3 : Rate of fetch requests that failed per second for a specific topic.

4 : Rate of produce requests that failed per second for a specific topic.

5 : Incoming message rate per second for a specific topic.

6 : Total rate of fetch requests (successful and failed) per second for a specific topic.

7 : Total rate of fetch requests (successful and failed) per second for a specific topic.

8 : Size of a specific partition’s log in bytes.

9 : Number of log segments in a specific partition.

10 : Offset of the last message in a specific partition’s log.

11 : Offset of the first message in a specific partition’s log


## 참조  
- [Monitoring your cluster using JMX](https://docs.redhat.com/en/documentation/red_hat_streams_for_apache_kafka/2.7/html/using_streams_for_apache_kafka_on_rhel_in_kraft_mode/monitoring-str#monitoring-str)