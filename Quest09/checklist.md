# Check-List

## 비동기 프로그래밍이란 무엇인가요?

비동기란 호출한 함수는 호출된 함수의 작업 완료 여부에 관심을 가지지 않고, 호출된 함수가 자신의 작업이 끝나면 알아서 콜백함수를 호출하는 것이다.

### 콜백을 통해 비동기적 작업을 할 때의 불편한 점은 무엇인가요? 콜백지옥이란 무엇인가요?

1. 콜백함수 안에서 throw 구문을 사용해도 try catch 구문에 잡히지 않기 때문에 에러가 발생하면 콜백함수의 첫 번째 인자에 에러 객체를 넣어줘야 한다. 때문에 비동기 작업의 콜백함수마다 `if (err)`로 에러가 발생했는지 확인해야 한다.
2. 콜백지옥 : 비동기적 작업을 순차적으로 진행해야 할 때 콜백함수를 작성하다보면 점점 코드의 깊이가 깊어진다. 이로 인해 가독성이 나빠지고, 유지보수하기 어려워진다. 이를 콜백지옥이라고 한다.

### 자바스크립트의 Promise는 어떤 객체이고 어떤 일을 하나요?

Promise는 콜백을 통한 비동기적 작업의 문제점을 보완하기 위해 ES6에서 표준화된 객체이다.

Promise 객체는 세 가지 상태를 가진다.

1. pending : 비동기 처리가 아직 수행되지 않은 상태
2. fulfilled : 비동기 처리가 성공적으로 수행된 상태
3. rejected : 비동기 처리에서 에러가 발생한 상태

new Promise를 통해 생성됐을 때는 pending 상태가 되며, 비동기 작업에 성공하여 resolve 함수가 호출되면 fulfilled 상태가 되어 then 함수로 결과값을 받을 수 있다. 만약 비동기 작업이 실패하면 reject 함수가 호출되고, rejected 상태가 되어 catch 함수를 통해 실패 이유를 알 수 있다.

Promise는 체이닝이 가능하며, 콜백 함수의 문제점이었던 불편한 에러 처리를 해결할 수 있다.

```javascript
function asyncWork() {
  return new Promise((resolve, reject) => {
    asyncFunc((err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
}

asyncWork()
  .then(result => console.log(result))
  .catch(err => console.log(err));
```

### 자바스크립트의 `async`와 `await` 키워드는 어떤 역할을 하며 그 정체는 무엇일까요?

`async`, `await` 키워드는 Promise를 사용하는 비동기 작업 코드를 동기적인 코드처럼 작성할 수 있게 해주는 키워드이다.

함수 내에서 `await` 키워드를 사용하기 위해서는 함수 앞에 `async` 키워드를 붙여줘야 한다. `async` 키워드가 붙은 함수를 호출하면 기본적으로 Promise를 반환하게 된다. `await` 키워드를 Promise를 반환하는 함수 호출문 앞에 붙이면 원래는 then 함수를 통해 받아야할 결과값을 리턴 값으로 받을 수 있으며, catch 함수를 통해 받아야할 에러를 try catch 구문으로 잡을 수 있게 된다.

```javascript
async function asyncWork() {
  try {
    const result = await asyncFunc();
    const result2 = await asyncFunc2(result);
    return result2;
  } catch (err) {
    console.log(err);
  }
}
```

## 브라우저 내 스크립트에서 외부 리소스를 가져오려면 어떻게 해야 할까요?

### 브라우저의 `XMLHttpRequest` 객체는 무엇이고 어떻게 동작하나요?

`XMLHttpRequest` 객체는 페이지를 리프레시하지 않고도 서버와 데이터를 주고 받을 수 있게 해준다. 이러한 작업을 비동기적으로 수행하기 때문에 사용자의 웹 페이지 이용에 지장을 주지 않는다.

`XMLHttpRequest` 객체는 5가지 상태를 가진다.

- 0 (uninitialized) - request가 초기화되지 않음
- 1 (loading) - 서버와의 연결이 성사됨
- 2 (loaded) - 서버가 request를 받음
- 3 (interactive) - request를 처리하는 중
- 4 (complete) - request에 대한 처리가 끝났으며 응답할 준비가 완료됨

`XMLHttpRequest` 객체의 onreadystatechange 함수는 위 상태가 바뀔 때마다 호출되는 함수이며 이 함수를 통해 서버와의 통신 결과를 처리할 수 있다.

```javascript
const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  if (xhr.readyState === xhr.DONE) {
    // 결과값 처리
  }
}
xhr.open('GET', 'http://localhost:8000'); // 요청 초기화
xhr.send(); // 요청 보내기
```

### `fetch` API는 무엇이고 어떻게 동작하나요?

`XMLHttpRequest`보다 간편하게 비동기 HTTP 요청을 하게 해주는 API이다. Promise 기반으로 둉작한다.

```javascript
fetch('http://localhost:8000', 설정객체)
	.then(response => {
  	// 결과값 처리
	})
	.catch(err => {
  	// 에러 처리
	});
```

## REST는 무엇인가요?

Representational State Transfer의 약자로, 소프트웨어가 가지고 있는 리소스를 해당 리소스를 요청한 당시의 상태로 표현하여 주고 받는 것이다.

### REST API는 어떤 목적을 달성하기 위해 나왔고 어떤 장점을 가지고 있나요?

- REST API는 간단하고, 일관적이고, 사용성이 뛰어난 API를 위해 만들어졌다. + 웹 설계의 우수성, 웹의 장점을 제대로 활용하기 위해 만들어졌다.

- 장점
  - 기존 HTTP 프로토콜의 인프라를 그대로 사용하기 때문에 따로 REST를 위한 인프라를 구축할 필요가 없다.
  - API가 의도하는 바를 명확히 나타낼 수 있다.
  - HTTP 프로토콜을 따르는 모든 플랫폼에서 사용 가능하다.

### RESTful한 API 설계의 단점은 무엇인가요?

- 사용할 수 있는 메소드에 제한이 있다.
- 명확한 표준이 존재하지 않는다.
- RESTful하게 표현했을 때 오히려 API가 더 불명확해지는 경우가 있다.

## CORS란 무엇인가요? 이러한 기능이 왜 필요할까요? CORS는 어떻게 구현될까요?

- Same-Origin Policy : 프로토콜, 호스트, 포트가 모두 같은 도메인을 가진 서버와만 AJAX 요청을 주고 받을 수 있도록 하는 정책. XSS, CSRF와 같은 공격을 방지하기 위해 존재하는 정책이다.

Same-Origin Policy로 인해 도메인이 다른 서버와는 AJAX 요청을 주고 받을 수 없지만, 웹의 확장을 위해서 Cross-Origin 요청이 무조건 필요했기에 Same-Origin Policy의 예외 사항을 둔게 CORS (Cross Origin Resource Sharing)이다. 

서버에서는 CORS 요청이 오면 다음과 같은 헤더들을 응답으로 보낸다.

- `Access-Control-Allow-Origin` : 요청을 허용할 출처를 명시한다. `*`를 사용하면 모든 출처를 허용하는 것이다.
- `Access-Control-Allow-Methods` : 어떤 메소드를 허용할 것인지 명시한다.
- `Access-Control-Allow-Headers` : 어떤 헤더들을 허용할 것인지 명시한다.
- `Access-Control-Max-Age` : preflight 요청의 응답을 브라우저에서 얼마동안 캐싱하고 있을 것인지 명시한다.
- `Access-Control-Expose-Headers` : 브라우저가 스크립트에 노출시킬 헤더의 목록을 명시한다.

브라우저에서 CORS 응답을 받아서 자신의 출처가 허용되어 있지 않으면 CORS 에러를 띄운다.

# Advanced

## `fetch` API는 구현할 수 없지만 `XMLHttpRequest`로는 구현할 수 있는 기능이 있을까요?

요청의 각 상태에 따른 처리를 해줄 수 있다. (uninitialized, loading, loaded, interactive, complete)

## REST 이전에는 HTTP API에 어떤 패러다임들이 있었을까요? REST의 대안으로는 어떤 것들이 제시되고 있을까요?

- REST 이전
  - SOAP
- REST의 대안
  - GraphQL
  - gRPC