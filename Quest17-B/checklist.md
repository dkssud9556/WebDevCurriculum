# Check-List

## CI/CD는 무엇일까요? CI/CD 시스템을 구축하면 어떤 장점이 있을까요?

- CI : Continuous Integration의 약자로, 지속적 통합을 뜻한다. 새로운 코드 변경 사항이 정기적으로 빌드 및 테스트되어 레포지토리에 통합되는 시스템이다.
- CD
  - Continuous Delivery : 지속적 전달이라는 뜻으로, 코드 변경 사항이 자동적으로 테스트된 후에 운영 팀에 의해 실제 프로덕션 환경으로 배포될 수 있는 레포지토리에 업로드되는 시스템이다.
  - Continuous Deployment : 지속적 배포라는 뜻으로, 코드 변경 사항이 자동적으로 레포지토리에서 부터 사용자들이 사용할 수 있는 프로덕션 환경으로 배포되는 시스템이다.
- 장점
  - 코드 통합 및 배포가 자동화되기 때문에 개발자가 이러한 과정을 신경쓸 필요가 없어진다.
  - 개발 과정에서 발생할 수 있는 문제를 빠르고 쉽게 발견하고 대처할 수 있다.
  - 수작업으로 서버를 일일이 배포할 때 발생할 수 있는 실수를 방지할 수 있다.

## CI 시스템인 Travis CI, Jenkins, Circle CI, Github Actions, AWS Codebuild의 차이점과 장단점은 무엇일까요?

- Circle CI
  - 특징 : 클라우드 기반 시스템이기 때문에 전용 서버가 필요하지 않으며, 이를 관리할 필요도 없다. 하지만 사설 클라우드 또는 데이터 센터를 위한 온프레미스 솔루션도 제공한다.
  - 장점
    - 빠른 시작
    - 엔터프라이즈 프로젝트를 위한 무료 플랜이 있다.
    - 시작하기 쉽고 빠르다.
    - 가볍고 읽기 쉬운 YAML로 구성된다.
  - 단점
    - 무료 우분투 12.04, 14.04와 유료 MacOS만을 지원한다.
    - 커스터마이징을 위해서 서드파티 소프트웨어를 필요로 할 수도 있다.

- Travis CI
  - 특징 : Circle CI와 유사하게 클라우드 기반 시스템이며, YAML로 구성하고, 도커를 지원한다. Circle CI보다 많은 언어를 지원한다.
  - 장점
    - 빌드 매트릭스를 지원한다. (여러 다른 버전의 언어, 패키지 환경에서 테스트를 실행해 볼수 있는 기능)
    - 빠른 시작
    - YAML 구성
    - 오픈 소스 프로젝트를 위한 무료 플랜이 있다.
    - 전용 서버가 필요없다.
  - 단점
    - 무료 엔터프라이즈 플랜이 없으며, Circle CI에 비해 가격이 비싸다.
    - 커스터마이징을 위해 서드파티 소프트웨어를 필요로 할 수도 있다.
- Jenkins
  - 특징 : 자바 기반의 자급하는(self-contained) 프로그램이다. 실행하면 웹 화면을 생성하여 REST API 호출을 통해 구동된다.
  - 장점
    - 무료다.
    - 시스템을 직접 다 제어할 수 있다.
    - 플러그인을 통해 커스터마이징이 가능하다. (많은 플러그인이 이미 제공된다.)
  - 단점
    - 전용 서버가 필요하다.
    - 설정과 커스터마이징을 위한 시간이 필요하다.
- Github Actions
  - 특징 : Github에서 직접 제공하는 CI/CD 도구다. Github Actions의 workflow는 Github에서 호스팅하는 Linux, MacOS, Windows 환경에서 실행된다. 사용자간에 workflow를 공유할 수 있다.
  - 장점
    - 별다른 절차없이 Github에서 CI/CD 파이프라인을 구축할 수 있다.
    - 설정이 간편하다.
    - 전용 서버가 필요없다.
  - 단점
    - workflow에서 단일 작업만 다시 실행할 수 없다.
    - 저장소가 동일한 조직 내에 있는 경우에도 다른 개인 저장소에서 작업에 액세스할 수 없다.
- AWS Codebuild
  - 특징 : AWS에서 제공하는 빌드 툴이다. 빌드 서버를 프로비저닝 및 관리할 필요없으며, 특정 프로그래밍 언어 및 도구에 맞는 빌드 환경을 제공한다.
  - 장점
    - 전용 서버가 필요없다.
    - 빌드 환경을 제공하기 때문에 빌드스크립트 선택 및 작성 후 시작할 수 있다.
    - 빌드 요구사항 충족을 위한 확장/축소가 가능하다.
  - 단점
    - 빌드 시간에 비례해 비용이 비싸진다.

# Advanced

## 빅테크 회사들이 코드를 빌드하고 배포하는 시스템은 어떻게 설계되고 운영되고 있을까요?

