---
title: Interoperability Presto + Iceberg + Spark
categories:
  - watson
tags: 
  - iceberg
	- spark
	- presto
---

Setup prestodb/presto server + iceberg catalog backed by a HMS service.
Steps to Run Presto(0.282+) + Hive(3.0) + Iceberg(1.2.1 & 1.3.0) and interoperability with Apache Spark 3.2.x 

```bash
wget https://downloads.apache.org/hive/hive-standalone-metastore-3.0.0/hive-standalone-metastore-3.0.0-bin.tar.gz
tar xvzf hive-standalone-metastore-3.0.0-bin.tar.gz
mv hive-standalone-metastore-3.0.0-bin hive
cd hive
bin/schematool -dbType derby -initSchema # command will create and init the derby
# Start the hive metadata service
bin/start-metastore
```
Similarly extract the file download in step 2 and point the extracted hive location as:export HIVE_HOME=/home/user/hive


## Presto 설치 
```bash
wget https://repo1.maven.org/maven2/com/facebook/presto/presto-server/0.282/presto-server-0.282.tar.gz
tar xvzf presto-server-0.282.tar.gz
mv presto-server-0.282 presto
export PRESTO_HOME=~/presto

# create the directories under presto installation dir.
mkdir -p $PRESTO_HOME/etc/catalog

# /etc/node.properties
node.environment=production
node.id=ffffffff-ffff-ffff-ffff-ffffffffffff
node.data-dir=/home/user/presto/data
# Please note replace /home/user with a path that this process can write to.

# $PRESTO_HOME/etc/config.properties
coordinator=true
node-scheduler.include-coordinator=true
http-server.http.port=8080
query.max-memory=5GB
query.max-memory-per-node=1GB
discovery-server.enabled=true
discovery.uri=http://localhost:8080

# $PRESTO_HOME/etc/jvm.config
-Djdk.attach.allowAttachSelf=true
-server
-Xmx16G
-XX:+UseG1GC
-XX:G1HeapRegionSize=32M
-XX:+UseGCOverheadLimit
-XX:+ExplicitGCInvokesConcurrent
-XX:+HeapDumpOnOutOfMemoryError
-XX:+ExitOnOutOfMemoryError

# $PRESTO_HOME/etc/catalog/iceberg.properties
connector.name=iceberg
hive.metastore.uri=thrift://localhost:9083
iceberg.catalog.type=hive
```
## 참고
[Interoperability Presto + Iceberg + Spark](https://medium.com/@scrapcodes/interoperability-presto-iceberg-spark-4e5299ec7de5)