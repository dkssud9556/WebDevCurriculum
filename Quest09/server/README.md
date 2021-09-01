# API

## GET `/files/name`

- 개요 : 모든 파일들의 이름 목록을 불러오는 API

- Response

  - 200

    - 예시

      ```json
      ["index.js","index.html","Main.java"]
      ```

## GET `/files/existence?fileName=???`

- 개요 : 요청하는 fileName을 가진 파일이 존재하는지 확인하는 API

- Request

  - query
    - fileName (string)

- Response

  - 200

    - 예시

      ```json
      true
      ```

## GET `/files/:fileName/content`

- 개요 : 요청하는 fileName을 가진 파일의 내용을 불러오는 API

- Request

  - path parameter
    - fileName (string)

- Response

  - 200

    - 예시

      ```json
      const helloWorld = 'Hello World!';
      console.log(helloWorld);
      
      ```

  - 404

    - 해당 fileName을 가진 파일은 존재하지 않는다.

## POST `/files`

- 개요 : 새로운 파일을 등록하는 API
- Request
  - body
    - fileName (string)
    - content (string)
- Response
  - 200
  - 409
    - 해당 fileName을 가진 파일이 이미 존재한다.

## PATCH `/files/:fileName/content`

- 개요 : 요청하는 fileName을 가진 파일의 내용을 업데이트하는 API
- Request
  - path parameter
    - fileName (string)
  - body
    - content (string)
- Response
  - 200
  - 404
    - 해당 fileName을 가진 파일은 존재하지 않는다.

## PATCH `/files/:fileName/fileName`

- 개요 : 요청하는 fileName을 가진 파일의 파일명을 업데이트하는 API
- Request
  - path parameter
    - fileName (string)
  - body
    - newFileName (string)
- Response
  - 200
  - 404
    - 해당 fileName을 가진 파일은 존재하지 않는다.
  - 409
    - 해당 newFileName을 가진 파일이 이미 존재한다.

## DELETE `/files?fileName=???`

- 개요 : 요청하는 fileName을 가진 파일을 삭제하는 API
- Request
  - query
    - fileName (string)
- Response
  - 200
  - 404
    - 해당 fileName을 가진 파일은 존재하지 않는다.