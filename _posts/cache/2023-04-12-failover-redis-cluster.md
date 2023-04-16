---
title: Redis 시작하기 - Redis Cluster Failover 설정
categories:
  - cache 
tags:
  - redis
---

## Redis Cluster Configuration 설정
Redis Cluster를 구성하고 failover 하기 위해서는 application config 이외에 추가적으로  Redis cluster Confugration이 필요합니다.
Redis Cluster를 구성하고 Master를 강제로 종료시키면 Replica중 1개가 Master로 승격되어 지속적인 서비스를 이어갈 수 있습니다.  
그리고 Lettuce를 사용하면 이를 자동으로 감지하여 서비스를 지속할 수 있습니다. 
그러나 쓰기작업이 필요한 서비스는 약간의 delay를 요구하며, Redis Cluster 상태가 refresh되면 정상적인 쓰기 작업이 가능해집니다.
물론 일기작업은 다음의 설정으로 변함없이 지속적으로 서비스가 가능합니다.  
#### 지속적인 읽기 작업
Replica중 1개 또는 모두 종료되더라도 지속적으로 일기 서비스가 가능하도록 하기 위해서는 다음의 설정이 필요합니다.  

__REPLICA_PREFERRED__

#### 지속적인 쓰기 작업
Redis Cluster Master중 1개가 종료되더라도 지속적으로 쓰기 서비스가 가능하도록 하기 위해서는 다음의 설정이 필요합니다.
아래의 설정값이 default 값이 false로 되어 있기 때문에 true로 설정을 변경해야 master가 종료되고 replica중 1개가 master로 승격되어 서비스를 계속할 수 있게되고, 이를 Lettuce가 감지하여 애플리케이션에서도 서비스를 지속하기 위해 아래의 설정을 하여야 합니다.

__enablePeriodicRefresh__

그리고 Refresh time을 설정하여 Lettuce가 이를 빠르게 감지하도록 설정합니다.
__refreshPeriod__

다음의 코드는 Redis Cluster를 구성하고 replica가 종료되거나 cluster의 master가 종료되더라도 읽기 작업과 쓰기 작업을 지속할 수 있도록 하기 위한 설정정보입니다.

전체 소스는 아래의 [github 링크](https://github.com/yoonjk/redis-cluster.git)에 있습니다.
[https://github.com/yoonjk/redis-cluster.git](https://github.com/yoonjk/redis-cluster.git)
```java
import java.time.Duration;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisClusterConfiguration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettuceClientConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;

import io.lettuce.core.ReadFrom;
import io.lettuce.core.cluster.ClusterClientOptions;
import io.lettuce.core.cluster.ClusterTopologyRefreshOptions;

@Configuration
public class RedisConfig {
	@Value("${spring.redis.cluster.nodes}")
	private List<String> clusterNodes;
    // lettuce 사용시
    @Bean
    public RedisConnectionFactory redisConnectionFactory(){
        LettuceClientConfiguration clientConfiguration = LettuceClientConfiguration.builder()
        		.clientOptions(ClusterClientOptions.builder()
        				.topologyRefreshOptions(ClusterTopologyRefreshOptions.builder()
        						.refreshPeriod(Duration.ofMinutes(1))
        						.enableAdaptiveRefreshTrigger()
        						.enablePeriodicRefresh(true)    // Default 가 False
        						.build())
        				.build())
        		
                .readFrom(ReadFrom.REPLICA_PREFERRED) // 복제본 노드에서 읽지 만 사용할 수없는 경우 마스터에서 읽습니다.
                .build();
        

        // 모든 클러스터(master, slave) 정보를 적는다. (해당 서버중 접속되는 서버에서 cluster nodes 명령어를 통해 모든 클러스터 정보를 읽어오기에 다운 됐을 경우를 대비하여 모든 노드 정보를 적어두는편이 좋다.)
        RedisClusterConfiguration redisClusterConfiguration = new RedisClusterConfiguration(clusterNodes);
        
        LettuceConnectionFactory lettuceConnectionFactory = new LettuceConnectionFactory(redisClusterConfiguration, clientConfiguration);

        return lettuceConnectionFactory;
    }
        
}
```
