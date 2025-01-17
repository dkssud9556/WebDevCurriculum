# Check-List

## ElasticSearch는 어떤 DB인가요? 기존의 RDB와 어떻게 다르고 어떤 장단점을 가지고 있나요?

ElasticSearch는 JSON 구조를 사용하며 스키마를 고정하지 않는 NoSQL 데이터베이스다. 또한 Lucene이라는 검색 라이브러리를 기반으로 검색 기능을 제공하는 오픈소스 검색엔진이다.

- RDB와의 차이점
  - 용어
  - 저장 구조
  - 역색인
- 장점
  - 오픈소스 검색엔진이다. 오픈소스 커뮤니티를 통해 개선 및 발전되고 있다.
  - 전문 검색 기능
  - 비정형 로그 데이터를 수집하여 통계 분석할 수 있다.
  - RESTful API를 활용하여 다양한 플랫폼에서 활용 가능하다.
  - 서로 다른 인덱스라도 검색할 필드명만 같으면 여러 인덱스를 한 번에 조회할 수 있다.
  - 역색인 기능을 가지고 있다.
  - shard라는 단위로 분산 구성하여 확장이 가능하다.
- 단점
  - 내부적으로 복잡한 과정을 거치기 때문에 완전 실시간은 불가능하다.
  - Transaction Rollback을 지원하지 않는다.
  - 데이터 업데이트를 할 때 기존 문서를 삭제하고 새로운 문서를 생성하는 방식을 사용한다. 업데이트 비용을 지불해 불변성이라는 이점을 얻었다.

## AWS의 ElasticSearch Service는 어떤 서비스인가요? ElasticSearch를 직접 설치하거나 elastic.co에서 직접 제공하는 클라우드 서비스와 비교하여 어떤 장단점이 있을까요?

AWS의 ElasticSearch Service는 ElasticSearch 클러스터를 쉽게 배포, 운영 및 조정할 수 있는 관리형 서비스이다. AWS에서 제공하는 ElasticSearch SaaS라고 할 수 있다.

- 장점
  - AWS의 타 서비스와 통합하기 쉽다.
  - 자동 스냅샷으로 백업을 지원한다.
- 단점
  - AWS ES는 AWS에서 엘라스틱 OSS 라이센스를 임의 설치 배포하는 AWS 자체 서비스이고, Elastic사와 어떠한 기술협약도 없기 때문에 이슈가 발생하면 지원이 불가하며, 엘라스틱 공식 기술 가이드, 업그레이드 사항 등이 적용되지 않는다.

## Grafana의 Panel 형식에는 어떤 것이 있을까요? 로그를 보기에 적합한 판넬은 어떤 형태일까요?

- Time series
- Bar chart
- Stat
- Gauge
- Bar gauge
- Table
- Pie chart
- Heat map

# Advanced

## ElasticSearch와 Grafana는 어떤 라이센스로 배포되고 있을까요? AWS와 같은 클라우드 제공자들이 이러한 오픈소스를 서비스화 하는 것을 둘러싼 논란은 어떤 논점일까요?

ElasticSearch와 Grafana 모두 오픈소스 라이센스로 배포되고 있다. 하지만 AWS와 같은 대형 클라우드 업체가 ElasticSearch 코드를 가져가서 상용 서비스를 만들면서 Elastic과 갈등이 생겼다. Elastic은 이러한 것을 막기 위해서 ElasticSearch의 라이센스 정책을 변경하였고, AWS는 이에 대해서 Elastic Search가 더이상 오픈소스가 아니게 되었다고 비판했다. AWS는 오픈소스에 기여도 하지 않으면서 자신들의 이익만 챙긴다는 비판이 생겼고, Elastic은 ElasticSearch가 오픈소스라서 얻은 혜택도 상당하기 때문에 이제와서 다른 기업의 소스코드 사용을 제한하는 것에 대한 비판을 받았다.

