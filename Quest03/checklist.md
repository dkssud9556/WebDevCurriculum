# Check-List

## 자바스크립트는 버전별로 어떻게 변화하고 발전해 왔을까요?

> ### 자바스크립트의 역사
>
> Mocha, LiveScript, JavaScript - 넷스케이프에서 웹 사이트를 좀더 동적으로 표현하기 위해서 하나의 스크립트 언어를 만들려고 했고, 브랜든 아이크가 10일 만에 Mocha라는 언어를 만들어냈다. 이름은 LiveScript를 거쳐서 JavaScript로 정착되었다. 
>
> JScript - 마이크로소프트에서 JavaScript의 파생 버전인 JScript를 출시했다.
>
> 크로스 브라우징 이슈 - JavaScript와 JScript는 표준화되지 못하고, 적당히 호환되었다. 그리고 두 회사가 브라우저 시장 점유율을 확보하기 위해서 자사 브라우저에서만 동작하는 기능을 추가하기 시작하면서 크로스 브라우징 이슈가 발생했다.
>
> ECMAScript - 넷스케이프는 JavaScript의 표준화를 위해서 ECMA 인터내셔널에 JavaScript의 표준화를 요청했다. 이를 통해 1997년에 ECMAScript 1의 사양이 완성되었다.
>
> | 버전 | 출시 연도 | 특징                                                         |
> | ---- | --------- | ------------------------------------------------------------ |
> | ES3  | 1999      | 정규표현식, try catch 구문 추가                              |
> | ES5  | 2009      | JSON, strict mode, 접근자 프로퍼티, 프로퍼티 어트리뷰트 제어, 향상된 배열 조작 기능 추가 |
> | ES6  | 2015      | let/const, 클래스, 화살표 함수, 템플릿 리터럴, 비구조화 할당, 스프레드 문법, rest 파라미터, 심볼, 프로미스, Map/Set, 이터러블, for of, 제너레이터, Proxy, 모듈 import/export 추가 |
> | ES7  | 2016      | 지수 연산자, Array.prototype.includes, String,.prototype.includes 추가 |
> | ES8  | 2017      | async/await, Object 정적 메서드 추가                         |
> | ES9  | 2018      | Object rest/spread 프로퍼티, Promise.prototype.finally, async generator, for await of 추가 |
> | ES10 | 2019      | Object.fromEntries, Array.prototype.flat, Array.prototype.flatMap, optional catch binding |
> | ES11 | 2020      | String.prototype.matchAll, BigInt, globalThis, Promise.allSettled, null 병합 연산자, 옵셔널 체이닝 연산자, for in enumeration order |

### 자바스크립트의 버전들을 가리키는 ES5, ES6, ES2016, ES2017 등은 무엇을 이야기할까요?

ECMA 인터내셔널에서 발표하는 JavaScript의 표준 버전들을 가리킨다. ES6(ES2015) 부터는 매년 JavaScript의 새로운 버전을 발표하고 있으며, 새로운 버전이 출시된 연도로 버전 네이밍을 하기도 한다.

### 자바스크립트의 표준은 어떻게 제정될까요?

넷스케이프와 마이크로소프트가 각자의 기능을 추가하면서 크로스 브라우징 이슈가 발생하자 자바스크립트 표준의 필요성을 느끼게 되었고, 넷스케이프가 ECMA 인터내셔널에 표준화를 요청하여 ECMA가 ECMAScript라는 자바스크립트의 표준을 제정하게 되었다. ES6부터는 매년마다 새로운 버전의 자바스크립트 표준을 제정하고 있다.

## 자바스크립트의 문법은 다른 언어들과 비교해 어떤 특징이 있을까요?

- 동적 타입 언어이다.
- 함수도 객체이다.
- 객체지향 언어이면서 함수형 프로그래밍을 지원하는 멀티 패러다임 언어이다.

### 자바스크립트에서 반복문을 돌리는 방법은 어떤 것들이 있을까요?

- for 문

  - 다른 언어들에도 많이 존재하는 기본적인 for 문이다.

  ```javascript
  for (var i = 0, i < 10; i++) {
    console.log(i); // 0 1 2 3 4 5 6 7 8 9
  }
  ```

- while 문

  - 기본적인 while 문이다.

  ```javascript
  var i = 0;
  while (i < 5) {
    console.log(i++); // 0 1 2 3 4
  }
  ```

- do while 문

  - 기본적인 do while 문이다.

  ```javascript
  var i = 0;
  do {
    console.log(i++); // 0 1 2 3 4
  } while (i < 5);
  ```

- for in 문

  - 객체의 key 값들을 순회할 때 사용하는 for 문이다. 배열에도 사용할 수 있지만 권장되지 않는다.

  ```javascript
  var person = { name: '김대웅', age: 19 };
  
  for (var elem in person) {
    console.log(elem, person[elem]); // 'name', '김대웅' 'age', 19
  }
  ```

- for of 문

  - 배열의 값들을 순회하기 위한 for 문이다.

  ```javascript
  var arr = [1, 2, 3, 4, 5];
  
  for (var num of arr) {
    console.log(num); // 1 2 3 4 5
  }
  ```

## 자바스크립트를 통해 DOM 객체에 CSS Class를 주거나 없애려면 어떻게 해야 하나요?

선택자를 통해서 DOM 객체를 얻은 후에 classList.add 또는 classList.remove 함수를 사용한다.

### IE9나 그 이전의 옛날 브라우저들에서는 어떻게 해야 하나요?

선택자를 통해서 DOM 객체를 얻은 후에 className += ' 클래스이름' 또는 className = className.replace(' 클래스이름', '')를 한다.

## 자바스크립트의 변수가 유효한 범위는 어떻게 결정되나요?

- `var` : 함수 범위 스코프로 결정된다.

  ```javascript
  function foo() {
    if (true) {
      var bar = 'function';
    }
    console.log(bar);
  }
  
  foo(); // 'function'
  console.log(bar); // 존재하지 않는 변수 bar
  ```

- `let`/`const` : 블록 범위 스코프로 결정된다.

  ```javascript
  function foo() {
    if (true) {
      let bar = 'block';
    }
    console.log(bar);
  }
  
  foo(); // 존재하지 않는 변수 bar
  ```

### `var`과 `let`으로 변수를 정의하는 방법들은 어떻게 다르게 동작하나요?

|                                     | var  | let  |
| ----------------------------------- | ---- | ---- |
| 재선언 가능 여부                    | O    | X    |
| 호이스팅 여부                       | O    | X    |
| 변수 선언 단계와 초기화 단계의 분리 | X    | O    |

## 자바스크립트의 익명 함수는 무엇인가요?

익명 함수는 말 그대로 함수의 이름을 명시하지 않은 함수를 뜻한다. 주로 함수의 인자로 콜백 함수를 넘길 때 사용하며, 즉시 실행 함수나 클로저 함수를 반환할 때도 사용한다.

### 자바스크립트의 Arrow function은 무엇일까요?

Arrow function은 ES6에서 추가된 문법이다. `function` 키워드 없이 함수를 선언할 수 있다. 하지만 Arrow function이 `function` 키워드로 생성한 함수와 똑같이 동작하지는 않는다. `function` 키워드로 생성된 함수의 this는 호출되는 위치에 따라 달라지지만 Arrow function으로 생성된 함수의 this는 상위 scope로 정적 바인딩된다.

# Advanced

## Quest 03-1의 코드를 더 구조화하고, 중복을 제거하고, 각각의 코드 블록이 한 가지 일을 전문적으로 잘하게 하려면 어떻게 해야 할까요?

중복되는 작업은 하나의 함수로 추출해서 사용하고, 한 가지 일을 전문적으로 잘하는 함수를 만들어서 해당 함수가 수행하는 일을 잘 나타내는 함수명을 붙여서 사용한다.

## Quest 03-2의 스켈레톤 코드에서 `let` 대신 `var`로 바뀐다면 어떤 식으로 구현할 수 있을까요?

for문의 본문 부분을 즉시실행 함수로 감싸고, 즉시실행 함수의 인자로 DOM Node를 받아서 함수 스코프에서 동작하도록 구현한다.
