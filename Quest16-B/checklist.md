# Check-List

## 컨테이너는 어떻게 동작하나요? 다른 배포판을 사용할 수 있게 하는 원리가 무엇일까요?

- 컨테이너의 동작
  - 기존의 VM이 OS 자체를 가상화하는 것과 다르게 컨테이너는 호스트 OS 커널을 공유하여 하나의 격리되어 있는 프로세스로써 동작한다.
  - 컨테이너를 격리시키기 위해서 OCI (Open Container Initiative) 스펙을 구현한 컨테이너 기술의 구현체를 사용한다. OCI 스텍은 cgroups, namespaces와 같은 기술을 표준으로 정의한다.
    - namespaces : 각 컨테이너별로 독립적인 공간을 제공하고 서로 충돌하지 않도록 하는 기능
    - cgroups : 자원에 대한 제어를 가능하게 해주는 기능
  - OCI 스펙을 구현하는 구현체로는 LXC, LibContainer, runC 등이 있다. 도커 1.8 버전 이전까지는 LXC를 이용하여 구현했지만 최근에는 runC라는 자체 구현체를 사용한다. (runC : LibContainer의 리팩토링 구현체)
- 다른 배포판을 사용할 수 있게 하는 원리
  - 레이어
    - 도커의 이미지는 여러 개의 읽기전용 레이어로 구성된다. 파일이 추가되거나 수정되면 새로운 레이어가 생성된다.
    - 예를 들어서 ubuntu 이미지를 기반으로 Dockerfile을 만들어서 빌드하면 ubuntu 이미지의 레이어 위에 새로운 레이어가 추가된다. 따라서 만약 만든 이미지에 변경이 생기면 새로운 이미지만 빌드해서 ubuntu 이미지 위에 올리면 되기 때문에 효율적인 레이어 관리를 할 수 있다.
    - 컨테이너가 실행중일 때 파일이 생성되거나 변경되는 것은 각 컨테이너의 읽기/쓰기 레이어에 저장된다.

## 도커 컨테이너에 호스트의 파일시스템이나 네트워크 포트를 연결하려면 어떻게 해야 할까요?

- Volume

  - 컨테이너 내부의 정보를 컨테이너가 삭제되더라도 유지시키기 위해서 사용되는 호스트와 컨테이너 간의 공유 저장 공간

  - Volume 종류

    - Host Volume

      - 호스트의 디렉토리 또는 파일을 Volume으로 사용하는 것

        ```
        docker run —name <container-name> -v <host-path>:<container-path> <image-name>
        ```

    - Container Volume

      - 호스트와 마운트되어 있는 컨테이너의 Volume을 이용하는 것

        ```
        docker run —name <container-name> —volumes-from <container-name> <image-name>
        ```

    - Docker Volume

      - 도커 엔진의 Volume 생성 기능을 사용해서 Volume을 미리 호스트와 마운트하여 Volume을 사용하는 것

        ```
        docker volume create --name <volume-name>
        docker run  —name <container-name> -v <volume-name>:<container-path> <image-name>
        ```

- Network

  - 도커 명령어를 통해서 컨테이너 내부 네트워크와 호스트의 네트워크를 포트포워딩할 수 있다.

  - 네트워크 드라이버 종류

    - Bridge

      - 컨테이너 생성 시에 네트워크와 관련된 설정을 하지 않으면 docker0이라는 Bridge에 기본 연결된다. 만약 docker0 Bridge를 사용하지 않고 격리된 다른 네트워크 환경을 사용하고 싶다면 Bridge를 새로 생성할 수 있다.

      - 같은 Bridge에 연결된 컨테이너끼리는 서로 통신할 수 있으며, 지정된 네트워크 대역 안에서 ip 주소가 순서대로 부여된다.

        ```
        docker run —name <container-name> —net <network-name> <image-name>
        ```

    - Host

      - 호스트(LinuxKit)의 네트워크 환경을 그대로 이용한다. 따라서 별도의 포트포워딩과 같은 작업이 필요없다.

        ```
        docker run —name <container-name> —net host <image-name>
        ```

    - None

      - 네트워크 통신을 하지 않겠다는 뜻이다. `ifconfig` 명령어를 수행해보면 Loopback 인터페이스만 존재한다.

        ```
        docker run —name <container-name> —net none <image-name>
        ```

    - Container

      - 지정한 컨테이너가 이용하는 네트워크 환경을 그대로 이용한다. 지정한 컨테이너의 IP, MAC 주소를 그대로 사용한다.

        ```
        docker run —name <container-name> —name container:<container-name> <image-name>
        ```

## 도커 컨테이너에서 런타임에 환경변수를 주입하려면 어떻게 해야 할까요?

- Dockerfile에 주입

  - Dockerfile에 `ENV <환경변수 이름> <환경변수 값>` 형태로 작성하면 된다. 기존 환경변수를 그대로 사용할 때는 $ 문자를 환경변수 앞에 붙이면 된다.

  ```dockerfile
  ENV JWT_SECRET $JWT_SECRET
  ENV PORT 8080
  ```

- docker run 수행 시 주입

  - docker run 명령어에 -e <환경변수 이름>=<환경변수 값> 형태로 주입한다.

  ```
  docker run -e PORT=8080 image
  ```

## 도커 컨테이너의 stdout 로그를 보려면 어떻게 해야 할까요?

`docker logs <컨테이너 이름>` 명령어를 사용한다.

## 실행중인 도커 컨테이너에 들어가 bash 등의 쉘을 실행하고 로그 등을 보려면 어떻게 해야 할까요?

`docker exec -it <컨테이너 ID> /bin/bash` 명령어를 사용한다.

- `exec` : 해당 컨테이너에 특정 명령을 실행하는 명령어
- `-it` : 컨테이너의 STDIN을 열고, 가상 TTY를 통해 접속하겠다는 플래그

# Advanced

## 도커 외의 컨테이너 기술의 대안은 어떤 것이 있을까요?

- podman : 도커와 동일한 기능을 하지만 구조적으로 podman은 podman daemon과 컨테이너가 서로 간섭하지 않는다. daemon을 재시작하거나 중지를 하더라도 컨테이너에 영향을 주지 않는다.
- OpenVZ : 도커와 같은 리눅스 기반 컨테이너 기술이지만 어플리케이션 배포 이상의 일을 할 수 있다.
- LXC : LXC는 하나의 목적을 가진 어플리케이션을 배포하는 것에 초점을 맞춘 도커와 다르게 여러 목적을 가진 OS 가상화에 초점을 맞춘 컨테이너 기술이다.

## 맥이나 윈도우에서도 컨테이너 기술을 사용할 수 있는 원리는 무엇일까요?

예전에는 Virtual box와 같은 VM을 설치해서 리눅스 가상 환경을 만들고, 컨테이너 기술을 사용했다.

최근에는 맥과 윈도우의 자체 가상화 기술을 사용해서 리눅스 가상 환경을 만든다. 특히 LinuxKit이라는 툴을 사용해서 컨테이너 기술을 사용하기 위해 필요한 최소한의 리눅스 커널을 탑재한다.