# Check-List

## 관심사의 분리 원칙이란 무엇인가요? 웹에서는 이러한 원칙이 어떻게 적용되나요?

각 부분이 각자의 관심사를 갖도록 컴퓨터 프로그램을 여러 부분으로 나누는 설계 원칙

- 백엔드
  - MVC (Model, View, Controller)
  - AOP (DB 연결, 로깅 등)
- 프론트엔드
  - HTML, CSS, JavaScript 파일 분리

## 객체지향의 SOLID 원칙이란 무엇인가요? 이 원칙을 구체적인 예를 들어 설명할 수 있나요?

1. SRP (Single Responsibility Principle, 단일 책임 원칙)

   - 하나의 객체에는 오직 하나의 책임이 있어야 한다. 객체가 변경되는 이유는 하나여야 한다.

   ```javascript
   class Developer {
     develop() {}
     buildInfrastructure() {}
     manageProject() {}
   }
   ```

   위 Developer 클래스는 개발을 하는 책임뿐만 아니라 인프라 구축, 프로젝트 관리라는 책임까지 떠안고 있다. 이런 클래스에 변경사항이 발생하면 클래스가 너무 크기 때문에 변경할 부분을 찾기도 힘들고, 변경할 부분도 많아진다. 또한 당연하게도 서로 연관없는 기능들이 붙어있으니 객체의 응집도는 떨어지게 될 것이다.

   ```javascript
   class Developer {
     develop() {}
   }
   
   class DevOps {
     buildInfrastructure() {}
   }
   
   class ProjectManager {
     manageProject() {}
   }
   ```

   위 예제에서는 Developer 클래스에 모두 뭉쳐있던 세 개의 책임을 세 개의 클래스에 각각 부여함으로써 어떤 부분에 변경사항이 생기면 어디를 변경해야할지 쉽게 찾을 수 있고, 응집도도 향상시켰다.

2. OCP (Open-Closed Principle, 개방 폐쇄 원칙)

   - 소프트웨어 엔티티는 확장에는 열려있고, 수정에는 닫혀있어야 한다.

   ```javascript
   function say(animal) {
     if (animal.type === 'dog') {
       console.log('woof');
     } else if (animal.type === 'cat') {
       console.log('meow');
     }
   }
   ```

   위 예제에서 say함수는 animal 객체를 받아서 해당 animal의 type이 dog이면 woof를 출력하고 cat이면 meow를 출력하게 하였다. 이를 if 구문으로 구분하여 구현하였는데 이렇게 되면 만약 새로운 type의 동물이 생길 때마다 say 함수를 수정해줘야 한다. say 함수는 수정에 너무나 열려있기 때문에 OCP를 위반한다.

   ```javascript
   class Animal {
     say() { }
   }
   
   class Dog extends Animal {
     say() {
       console.log('woof');
     }
   }
   
   class Cat extends Animal {
     say() {
       console.log('meow');
     }
   }
   
   function say(animal) {
     animal.say();
   }
   ```

   위 예제에서는 say 함수가 `animal.say()` 구문 하나로 축약되었다. say라는 메소드를 구현하는 animal 객체를 받아서 그대로 호출하면 되기 때문에 새로운 type의 동물이 생기더라도 say 함수를 수정할 필요가 없게 된다.

3. LSP (Liskov Substitution Principle, 리스코프 치환 원칙)

   - 하위 클래스는 반드시 상위 클래스와 대체 가능해야 한다. 상위 클래스 타입의 변수에 하위 클래스 객체를 대입하더라도 의미적으로 통해야 한다.

   ```javascript
   class Rectangle {
     constructor(width, height) {
       this.width = width;
       this.height = height;
     }
     
     get width() { return this.width; }
     set width(value) { this.width = value; }
     
     get height() { return this.height; }
     set height(value) { this.height = value; }
     
     get area() { return this.width * this.height; }
   }
   
   class Square extends Rectangle {
     constructor(size) {
       this.width = this.height = size;
     }
     
     set width(value) {
       this.width = value;
       this.heigth = value;
     }
     
     set height(value) {
       this.width = value;
       this.height = value;
     }
   }
   
   const rectangle1 = new Rectangle(2, 3);
   const rectangle2 = new Square(3);
   
   rectangle1.width = 2;
   rectangle1.height = 3;
   
   rectangle2.width = 2;
   rectangle2.height = 3;
   
   rectangle1.area; // 6
   rectangle2.area; // 9
   ```

   직사각형(Rectangle) 클래스와 정사각형(Square) 클래스가 있다. 정사각형은 직사각형에 속하기 때문에 정사각형 클래스는 직사각형 클래스를 상속받았다. 때문에 개발자는 width와 height를 똑같은 값으로 설정해주었을 때 두 객체의 area 값이 같은 값으로 나오길 기대할 것이다. 하지만 직사각형 클래스를 상속받은 정사각형 클래스가 기존의 직사각형 클래스가 하던 동작과 다른 동작을 하기 때문에 결과가 다르게 나온다. 즉, 자식 클래스인 정사각형 클래스가 부모 클래스인 직사각형 클래스의 area 기능을 제대로 수행하지 않기 때문에 LSP를 위반하고 있다.

   ```javascript
   class Shape {
     area() {}
   }
   
   class Rectangle extends Shape {
     // 생략
     area() {
       return this.width * this.height;
     }
   }
   
   class Square extends Shape {
     // 생략
     area() {
       return this.size ** 2;
     }
   }
   ```

   위 예제에서는 Rectangle-Square 상속 관계를 없애고 Shape라는 공통 부모를 만들었다. 그리고 공통 메소드인 area를 구현했다. 이를 통해 Shape 타입 변수에 Rectangle 또는 Square 타입 변수를 대입하여 사용해도 의미적으로 통하게 된다.

4. ISP (Interface Segregation Principle, 인터페이스 분리 원칙)

   - 클라이언트가 자신이 이용하지 않는 메소드에 의존하지 않아야 한다. 인터페이스를 구체적이고 작은 단위로 분리하여 클라이언트들이 꼭 필요한 메소드만 사용할 수 있도록 해야 한다.

   ```typescript
   interface UniversalMachine {
     print();
     fax();
     copy();
   }
   
   class Printer implements UniversalMachine {
     print() {
       // do something
     }
     
     fax() {
       throw new Error("Printer class doesn't have fax function");
     }
     
     copy() {
       throw new Error("Printer class doesn't have copy function");
     }
   }
   ```

   위 예제에서 Printer 클래스는 UniversalMachine 인터페이스를 구현하고 있다. Printer 클래스는 print 기능말고는 할 수 있는 것이 없지만 큰 인터페이스로 인해 필요없는 메소드를 구현하고 있다. 또한 다른 기능에 변경사항이 생기면 Printer 클래스도 변경을 해야 한다.

   ```typescript
   interface Printer {
     print();
   }
   
   interface Fax {
     send();
   }
   
   interface CopyMachine {
     copy();
   }
   
   class NormalPrinter implements Printer {
     print() {
       // do something
     }
   }
   ```

   위 예제에서는 한 인터페이스에 있던 세 개의 기능을 세 개의 인터페이스로 분리함으로써 클라이언트 입장에서 필요없는 메소드를 신경쓸 필요가 없어졌다.

5. DIP (Dependency Inversion Principle, 의존성 역전 원칙)

   - 고수준의 모듈이 저수준의 모듈에 의존하면 안 된다. 구체적인 것이 추상적인 것에 의존해야 한다.

   ```javascript
   class GoodMonitor {
     // 생략
   }
   
   class Computer {
     constructor() {
       // 생략
       this.monitor = new GoodMonitor();
     }
     // 생략
   }
   ```

   위 예제에서 Computer 클래스는 GoodMonitor라는 구체적인 클래스를 참조하고 있다. 이렇게 되면 고수준인 Computer 클래스는 모니터를 다른 모니터로 바꿀 때 내부 구현을 바꿔야할 수도 있다.

   ```typescript
   interface Monitor {
     showScreen();
   }
   
   class GoodMonitor implements Monitor {
     showScreen() {
       // do something
     }
   }
   
   class Computer {
     private monitor: Monitor;
     
     constructor(monitor: Monitor) {
       this.monitor = monitor;
     }
   }
   ```

   위 예제에서는 Monitor라는 인터페이스를 만들어서 Computer 클래스(고수준) 입장에서 필요한 모니터의 기능을 명시하고 구체적인 GoodMonitor 클래스(저수준)이 인터페이스를 구현하고 있다. 이렇게 하면 Computer 클래스는 쉽게 monitor를 변경할 수 있고, monitor가 변경되더라도 Monitor 인터페이스를 구현하고 있기 때문에 코드를 변경할 필요가 없어진다.

## 로컬 스토리지란 무엇인가요? 로컬 스토리지의 내용을 개발자 도구를 이용해 확인하려면 어떻게 해야 할까요?

HTML5에 추가된 저장소. 키-밸류 형식으로 데이터를 저장할 수 있으며, 로컬 스토리지에 저장된 데이터는 사용자가 지우지 않는 이상 계속 브라우저에 남게 된다. 프로토콜, 호스트, 포트 중에 하나라도 달라지면 로컬 스토리지가 구분된다.

로컬 스토리지의 내용을 확인하려면 개발자 도구에서 Application에 들어간 뒤 Storage 부분에 있는 Local Storage를 확인하면 된다.

# Advanced

## 웹 프론트엔드 개발에서 이러한 방식의 패턴을 더 일반화해서 정리할 수 있을까요? 이 퀘스트에서 각각의 클래스들이 공통적으로 수행하게 되는 일들에는 무엇이 있을까요?

