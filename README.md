## TDD_practice

- 간단한 CRUD TDD 연습

### 1. 기술 스택

- Typescript
- Express
- Mongoose
- typedi
- jest
- supertest

### 2. 로컬 실행 방법

```
git clone https://github.com/JooYoung2274/TDD_practice.git
cd TDD_practice
npm install

--> .env 파일 내의 DB_URL 변경. (본인 로컬 mongoDb url)

npm test
```

### 3. 이슈

- controller, service, repository로 layer를 나누고 typedi를 활용해 IoC와 Di를 구현함.
- controller, service layer 각각 테스트코드 작성. 최대한 mock 함수를 안쓰고 Di로 구현 하려 함.
- 하지만 controller layer에서 (req, res, next)와, next(err) 를 통한 에러처리 상황 구현에 mock 함수를 사용함.
- service layer 에서는 좀 더 복잡한 비지니스 로직을 테스트코드로 작성해 봐야 할 듯.

### 4. 타임라인

- 회사에서 TDD 관련 세미나 발표가 있어서 예제 코드 준비중 ( + TDD 연습)
- 테스트에 대한 개념적인 부분이나 테스트 하기 좋은 코드에 대한 공부중 (세미나 발표 후 블로그 포스팅 예정)
- 이런저런 방식으로 계속 테스트 코드 작성해보는 중
- 테스트 코드의 예제코드는 리팩토링 2판 챕터04 보고 하는 중
