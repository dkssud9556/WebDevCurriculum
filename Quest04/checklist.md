# Check-List

## 객체지향 프로그래밍은 무엇일까요?

데이터를 추상화하고 상태와 행위를 가진 객체들간의 상호작용으로 로직을 구성하는 프로그래밍 방법론

### `#`로 시작하는 프라이빗 필드는 왜 필요한 것일까요? 정보를 은폐(encapsulation)하면 어떤 장점이 있을까요?

- 객체를 사용하는 입장에서 객체의 구체적인 것에 의존하지 않을 수 있기 때문에 객체간의 결합도를 줄일 수 있다. -> 객체의 상태에 대한 정보를 변경하더라도 다른 객체에 영향을 주지 않는다.
- 객체의 상태가 외부로부터 손상되는 것을 막을 수 있다.

### 다형성이란 무엇인가요? 다형성은 어떻게 코드 구조의 정리를 도와주나요?

하나의 객체가 여러가지 타입을 가질 수 있는 성질. 여러 형태를 받아들일 수 있고, 상황에 따라 의미를 다르게 부여할 수 있는 특성.

만약에 어떤 기준에 따라 점수를 계산해야 하는 상황이 생겼을 때 다형성을 이용하지 않는다면 다음과 같이 코드를 작성해야 할 것이다.

```javascript
let score;
if (standard === 'height') {
  // do something
  score = calculateHeightScore();
} else if (standard === 'weight') {
  // do something
  score = calculateWeightScore();
} else {
  // ...
}
```

아래와 같이 다형성을 이용하면 점수를 얻는 부분을 간결하게 할 수 있으며, 각 기준의 점수를 구하는 책임을 객체들에게 알맞게 부여할 수 있다. 또한 모든 객체들이 ScoreCalculator를 확장하고 있기 때문에 다른 객체로 바꿔서 사용할 수도 있다.

```javascript
class ScoreCalculator {
  calculate() {
    throw new Error('calculate method should be implemented');
  }
}

class HeightScoreCalculator extends ScoreCalculator {
  calculate() {
    // do something
    return score;
  }
}

class WeightScoreCalculator extends ScoreCalculator {
  calculate() {
    // do something
    return score;
  }
}

const scoreCalculator = new HeightScoreCalculator();
// const scoreCalculator = new WeightScoreCalculator();

let score = scoreCalculator.calculate();
```

### 상속이란 무엇인가요? 상속을 할 때의 장점과 단점은 무엇인가요?

상위 클래스의 속성과 메소드를 하위 클래스에게 물려주는 것.

- 장점
  - 상위 클래스의 속성과 메소드를 재활용할 수 있다. (일반적인 개념과 구체적인 관계에서만)
  - 다형성을 구현할 수 있다.
  - 유지보수를 편리하게 해준다.
- 단점
  - 상위 클래스에 이상이 생겼을 때 하위 클래스에도 영향을 줄 수 있다.
  - 상속 구조가 복잡해지면 상위 클래스의 영향에 대한 예측이 어려워진다.
  - 상위 클래스에서는 의미있었던 기능이 하위 클래스에게는 의미없는 기능이 될 수 있다.
  - 상위 클래스와 하위 클래스간의 결합이 발생할 수 있다.

### OOP의 합성(Composition)이란 무엇인가요? 합성이 상속에 비해 가지는 장점은 무엇일까요?

객체간의 has-a 관계를 가지며, 객체 내부에서 다른 객체의 공개 인터페이스를 참조하여 다른 객체의 기능을 이용하는 것.

- 장점
  - 상속은 상위 클래스의 내부 구현을 알아야 하기 때문에 캡슐화가 깨지기 쉽고 결합도가 높아지지만, 합성은 객체의 공개 인터페이스를 참조하는 것이기 때문에 캡슐화를 지킬 수 있으며 결합도도 낮출 수 있다.
  - 상속 관계는 클래스 사이의 정적인 관계이다. 코드 작성 시점에 결정한 상속 관계는 변경할 수 없다. 합성 관계는 객체 사이의 동적인 관계이다. 합성 관계는 실행 시점에 동적으로 변경할 수 있다. 때문에 합성 관계는 변경하기 쉽고, 유연한 설계를 가능하게 한다.

## 자바스크립트의 클래스는 어떻게 정의할까요?

- class 문법 사용

  - ES6에 추가된 문법이다. 클래스 기반 객체지향 언어들처럼 `class` 구문을 사용해서 클래스를 정의할 수 있지만, 이는 문법적 설탕으로써 내부 구현은 function 생성자로 되어 있다.

  ```javascript
  class Person {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }
    
    sayHello() {
      console.log(`Hello! I'm ${this.name}.`);
    }
  }
  
  const person = new Person('김대웅', 19);
  person.sayHello(); // "Hello! I'm 김대웅."
  ```

- function 생성자 사용

  - 자바스크립트는 function으로 클래스(생성자)를 만들어낸다.

  ```javascript
  function Person(name, age) {
    this.name = name;
    this.age = age;
  }
  
  Person.prototype.sayHello = function() {
    console.log(`Hello! I'm ${this.name}.`);
  }
  
  const person = new Person('김대웅', 19);
  person.sayHello(); // "Hello! I'm 김대웅."
  ```

### 프로토타입 기반의 객체지향 프로그래밍은 무엇일까요?

원형(프로토타입) 객체를 통해 공통된 속성이나 메소드를 참조하는 객체지향 프로그래밍 방식.

### 자바스크립트의 클래스는 이전의 프로토타입 기반의 객체지향 구현과 어떤 관계를 가지고 있나요?

자바스크립트의 class 구문은 클래스 기반 객체지향 프로그래밍에 익숙한 개발자들을 위해서 ES6에 추가된 문법적 설탕이다. 따라서 기존의 프로토타입 기반의 객체지향 구현과 내부적인 구현은 똑같지만 겉보기만 꾸며놓은 것이라고 할 수 있다.

# Advanced

## 객체지향의 역사는 어떻게 될까요?

> ### 객체지향의 역사
>
> 소프트웨어 위기론 - 1960년대에 소프트웨어의 개발 속도가 하드웨어의 개발 속도를 따라가지 못하면서 사용자들의 요구사항을 처리하지 못하는 문제들이 발생했다. 소프트웨어 위기를 어떻게 해결해야 할지 많은 논의가 있었다.
>
> 시뮬라67 - 기존의 절차형 프로그래밍의 한계를 해결하기 위한 최초의 객체지향 언어로 시뮬라67이 등장했다. 당시에 크게 주목받지는 못했지만 객체지향의 발전에 큰 영향을 주었다.
>
> 스몰토크, 에이다 - 시뮬라67 이후에 스몰토크, 에이다와 같은 새로운 객체지향 프로그래밍 언어들이 나오면서 객체지향에 대한 시도가 많아졌다.
>
> 자바 - 1995년에 자바라는 언어가 등장하였고, 자바가 크게 성공하면서 객체지향 언어의 대중화를 이루어냈다.

## Smalltalk, Java, Go, Kotlin 등의 언어들로 넘어오면서 객체지향 패러다임 측면에서 어떤 발전이 있었을까요?

- 객체지향 프로그래밍을 하면서 발생할 수 있는 비슷한 상황의 문제점을 해결하기 위한 디자인패턴이 고안됐다.
- 함수형 프로그래밍의 요소들(고차함수, 클로저 등)을 추가하였다.
