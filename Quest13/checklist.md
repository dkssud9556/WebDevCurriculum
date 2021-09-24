# Check-List

## GraphQL API는 무엇인가요? REST의 어떤 단점을 보완해 주나요?

페이스북에서 만든 쿼리 언어. SQL과 같은 쿼리 언어지만 GraphQL은 웹 클라이언트가 서버로부터 데이터를 효율적으로 가져오는 것을 목적으로 만들어졌다.

GraphQL은 REST의 Overfetching, Underfetching 단점을 보완해준다.

- Overfetching : 필요하지 않은 데이터들을 서버로부터 받는 문제
- Underfetching : 필요한 데이터를 요청하기 위해 서버에 서브데이터를 추가적으로 요청하는 문제

## GraphQL 스키마는 어떤 역할을 하며 어떤 식으로 정의되나요?

스키마는 API 문서같은 역할을 한다. 어떤 객체의 어떤 필드를 반환할지, 하위 객체에서 사용할 수 있는 필드는 무엇인지와 같은 것을 정의하는 것이다. 즉, 서버에서 처리할 수 있는 Query, Mutation의 구조를 정의한다.

`.graphql` 확장자의 파일에 GraphQL SDL을 사용하여 정의한다.

## GraphQL 리졸버는 어떤 역할을 하며 어떤 식으로 정의되나요?

GraphQL에서 데이터를 가져오는 구체적인 과정을 리졸버에 구현한다. 직접 구현해야 하기 때문에 껄끄럽긴 하지만 데이터베이스, 네트워크 등 여러가지 방법으로 데이터를 가져올 수 있다.

GraphQL 쿼리에 필드의 타입이 스칼라 타입이 아니면 해당 타입의 리졸버가 연쇄 호출된다.

소스 코드에서 리졸버 함수를 구현하여 정의한다.

### GraphQL 리졸버의 성능 향상을 위한 DataLoader는 무엇이고 어떻게 쓰나요?

user가 post를 여러 개 가지고 있는 1:N 관계가 있다. 만약 모든 post를 가지고 오는데 필드로 user를 불러오면 다음과 같은 형태가 된다.

```
query {
	posts {
		id
		title
		user {
			username
			nickname
		}
	}
}
```

이때 성능 최적화를 해주지 않으면 posts를 가지고 오는 쿼리 1개, 그리고 각 post마다 user를 가지고 오는 쿼리 N개가 필요하게 된다. 이것이 GraphQL의 N+1문제다.

DataLoader는 특정 데이터를 여러 개 가져오기 위한 요청을 batch 처리 할 수 있도록 도와주는 라이브러리다. 이벤트 루프의 한 tick에서 실행된 데이터 요청을 하나로 모아서 처리해준다. GraphQL에 종속된 라이브러리는 아니다.

상황에 맞는 batchFunction을 만들고, batchFunction을 DataLoader의 생성자의 인자로 넘기면 된다. 그리고 load 함수를 호출해서 인자로 각각의 키 값을 넘겨주면 batch 처리를 해준다.

## 클라이언트 상에서 GraphQL 요청을 보내려면 어떻게 해야 할까요?

서버에서 정해진 하나의 엔드포인트(URL)에 POST 요청을 보낸다. (body에 query 또는 mutation 구문을 형식에 맞게 담아서)

### Apollo 프레임워크(서버/클라이언트)의 장점은 무엇일까요?

- 서버와 클라이언트 모두 지원한다.
- 러닝커브가 낮다.
- 여러 프론트엔드 프레임워크를 지원한다.
- Query를 통해 전송받은 데이터를 캐싱한다.

### Apollo Client를 쓰지 않고 Vanilla JavaScript로 GraphQL 요청을 보내려면 어떻게 해야 할까요?

```javascript
const getUsersQuery = () => {
  return `
		{
			users {
				username
				nickname
			}
		}
	`;
};

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    query: getUsersQuery()
  })
};

fetch(URL, options).then(result => {
  // do something
})
```

## GraphQL 기반의 API를 만들 때 에러처리와 HTTP 상태코드 등은 어떻게 하는게 좋을까요?

union을 사용해서 에러도 하나의 결과로 취급한다.

# Advanced

## GraphQL이 아직 제대로 수행하지 못하거나 불가능한 요구사항에는 어떤 것이 있을까요?

아직 파일 업로드에 대한 명확한 명세가 없다. 파일 업로드를 구현할 수는 있지만 과정이 까다롭다.

## GraphQL의 경쟁자에는 어떤 것이 있을까요?

- gRPC