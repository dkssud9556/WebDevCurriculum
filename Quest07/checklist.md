# Check-List

## node.js는 무엇인가요? node.js의 내부는 어떻게 구성되어 있을까요?

node.js는 크롬의 V8 자바스크립트 엔진으로 빌드되는 자바스크립트의 런타임이다.

- node.js의 내부
  - Node.js API : 자바스크립트로 작성되어 있으며, Node.js Bindings와 연결되어 fs, http와 같은 빌트인 기능들을 사용할 수 있게 해준다.
    - Node.js Bindings : 자바스크립트에서 C/C++로 작성된 라이브러리를 사용할 수 있도록 결합하는 요소이다. 즉, Node.js API와 C/C++ 라이브러리 간의 인터페이스 역할을 한다.
      - V8 : 구글에서 개발된 오픈소스 JIT 가상머신 형식의 자바스크립트 엔진이다. node.js는 이 엔진을 사용하여 개발자가 작성한 자바스크립트 코드를 실행시킨다.
      - LibUv : C로 작성된 멀티플랫폼 비동기 IO 라이브러리이다. 자바스크립트 실행 중에 비동기 IO 처리가 필요한 코드를 만나면 LibUv에 요청을 맡기는 식이다.
      - C-Ares : 동시에 복수의 DNS 질의 요청을 비동기적으로 처리하기 위한 C 라이브러리이다.
      - HTTP-Parser
    - C/C++ Addons
      - Open SSL
      - Zlib

## npm이 무엇인가요? `package.json` 파일은 어떤 필드들로 구성되어 있나요?

npm(Node Package Manager)은 Node.js로 작성된 라이브러리, 모듈 등을 인터넷을 통해 다운받아서 사용할 수 있게 해주고, 관리해주는 프로그램이다. npm을 통해서 자신이 만든 코드를 자유롭게 배포할 수 있으며, npm이 Node Package를 관리하기 위해 사용하는 파일이 `package.json`이다.

- `package.json` 파일의 필드 구성
  - name : 현재 프로젝트의 이름
  - version : 현재 프로젝트의 버전
  - description : 현재 프로젝트에 대한 설명
  - main : 현재 프로젝트의 메인 파일명, 엔트리 포인트
  - scripts : npm 명령어 지정
  - keywords : 현재 프로젝트의 키워드
  - author : 현재 프로젝트의 작성자
  - license : 현재 프로젝트의 라이센스 정보
  - dependencies : 현재 프로젝트에 사용되는 종속성들의 이름과 버전

## npx는 어떤 명령인가요? Npm 패키지를 `-g` 옵션을 통해 글로벌로 저장하는 것과 그렇지 않은 것은 어떻게 다른가요?

npx는 일회성으로 npm 레지스트리에 저장되어 있는 실행형 패키지(create-react-app, create-nuxt-app 등)를 실행시킬 수 있는 명령이다.

글로벌로 저장된 패키지는 모든 프로젝트에서 공동으로 사용할 수 있다. 로컬로 저장된 패키지는 해당 프로젝트에서만 사용할 수 있으며, 프로젝트의 루트에 존재하는 node_modules 폴더에 패키지가 저장된다.

## 자바스크립트 코드에서 다른 파일의 코드를 부르는 시도들은 지금까지 어떤 것이 있었을까요? CommonJS 대신 ES Modules가 등장한 이유는 무엇일까요?

- 자바스크립트 코드에서 다른 파일의 코드를 부르는 시도
  - `<script src="">` 으로 불러오기
    - 다른 파일의 코드를 불러올 수 있지만 변수의 스코프 문제가 발생한다.
    - 위 문제를 해결하기 위해 즉시 실행 함수를 사용하는 등 모듈화를 위한 노력이 있었다.
  - CommonJS (require, module.export)
    - 자바스크립트의 모듈화 명세를 만든 CommonJS의 명세. node.js의 표준으로 사용되는 명세이기도 하다.
    - 하지만 CommonJS의 모듈 명세는 모든 파일이 로컬 디스크에 있어 필요할 때 바로 불러올 수 있는 환경, 즉 서버사이드 자바스크립트 환경을 전제로 한다.
  - AMD (Asychronous Module Definition)
    - AMD는 필요한 모듈을 네트워크를 통해 내려받을 수 있도록 하는 것에 중점을 두었다. 즉, 자바스크립트를 브라우저에서 탈출시키는 것이 목표였던 CommonJS와는 다르게 AMD는 브라우저 내에서의 실행에 중점을 두었다.
    - 브라우저 환경에서는 AMD가 CommonJS보다 더 유연한 방법을 제공한다.
  - UMD (Universal Module Definition)
    - CommonJS와 AMD의 호환성 문제를 해결하기 위해 고안된 코드 작성 패턴.
  - ES Modules (import, export)
    - ES6부터 자바스크립트 자체에서 지원하기 시작한 모듈화 명세이다.
- CommonJS 대신 ES Modules가 등장한 이유

  CommonJS는 모든 모듈을 동기적으로 인스턴스 화 및 평가를 진행한다. 즉, 모든 모듈 파일을 평가하는 동안 주 스레드가 다른 작업을 하지 못하게 된다. 이를 브라우저에 적용시키게 되면 모듈을 모두 불러올 때까지 다른 작업을 못하기 때문에 적합하지 않다. 특히 브라우저는 모든 파일이 로컬 디스크에 저장되어 있는 서버 환경과 달리 네트워크를 통해 파일들을 불러와야 하기 때문에 더욱 속도가 느려진다.

## ES Modules는 기존의 `require()`와 동작상에 어떤 차이가 있을까요? CommonJS는 할 수 있으나 ES Modules가 할 수 없는 일에는 어떤 것이 있을까요?

ES Modules는 구성, 인스턴스 화, 평가 세 가지의 단계로 동작한다.

1. 모듈 파일들을 구문 분석하여 import하는 파일들을 불러와서 모듈 레코드로 만든다.
2. 모듈 레코드들을 의존성에 맞게 연결한다.
3. 코드를 실행하여 값을 평가한다.

ES Modules는 값을 마지막에 평가하기 때문에 import 구문의 module specifier에 변수를 사용할 수 없다. CommonJS는 값을 평가하면서 파일들을 로드하기 때문에 변수를 사용할 수 있다.

```javascript
import module from `module/${lang}` // 불가
```

```javascript
const module = require(`module/${lang}`) // 가능
```

## node.js에서 ES Modules를 사용하려면 어떻게 해야 할까요? ES Modules 기반의 코드에서 CommonJS 기반의 패키지를 불러오려면 어떻게 해야 할까요? 그 반대는 어떻게 될까요?

- node.js에서 ES Modules 사용하는 방법
  - package.json 파일이 없을 때 : ES Modules를 사용하는 파일의 확장자를 mjs로 한다.
  - package.json 파일이 있을 때 : package.json 파일에 "type": "module" 프로퍼티를 추가한다.
- ES Modules 기반의 코드에서 CommonJS 기반의 패키지를 불러오는 법
  - 원래대로 `import from` 구문을 사용하여 불러올 수 있다.
- CommonJS 기반의 코드에서 ES Modules 기반의 패키지를 불러오는 법
  - ES Modules은 `require()` 구문을 통해 불러올 수 없고, CommonJS 기반의 코드에서는 `import from` 구문을 사용할 수 없기 때문에 `import()` 함수를 통해 ES Modules를 동적으로 불러와야 한다.

# Advanced

## node.js 외의 자바스크립트 런타임에는 어떤 것이 있을까요?

- 브라우저
- Deno : node.js를 만들었던 라이언 달이 node.js의 문제점을 보완하여 만든 런타임
- RingoJS : JVM 위에서 돌아가는 자바스크립트 런타임
