## TDD_practice

- 간단한 CRUD TDD 연습

### 1. 세팅 환경

- express 환경에서 typescript 사용해 테스트 코드 작성
- 실제 calculator / service / service2 / test 폴더에서 동일 로직에 대한 테스트 코드 작성 반복적으로 연습
- chapter04 폴더는 리팩터링2판 챕터04관련 세미나 발표 준비 코드
- 실제 리팩터링2판의 chapter04는 테스트에 대해서 자세히 알려주지 않아 그냥 내 마음대로 발표자료 준비중
- 그 외 dto, models, products, router 폴더의 경우 예전에 사용했던 폴더들이라서 무시해도 됨.

### 2. 로컬 실행 방법

```
git clone https://github.com/JooYoung2274/TDD_practice.git
cd TDD_practice
npm install

--> .env 파일 내의 DB_URL 변경. (본인 로컬 mongoDb url)
// DB_URL="mongodb://localhost/dbname"
// PORT= 포트번호

--> 테스트에 대한 확인만 하려면 vscode extension "Jest Runner" 설치 후 각각 테스트마다 개별진행 가능

--> jest 명령어로 테스트 진행하려면
npm test
```

### 2023-02-10

- 리팩터링2판 챕터04 세미나 발표 자료 준비용
- 아직까지도 어느정도까지 테스트를 진행해야하는지 잘 모르지만 일단 테스트 코드를 반복적으로 작성해보면서 겪었던 시행착오들에 대한 설명과 왜 의존성을 관리해야 하는지 + 비즈니스 로직은 왜 보호해야 하는지 + 어떻게 보호하는지 에 대해서 chapter04 폴더에 예제코드 작성 중

### 2023-03-03

- 사내 세미나 발표 끝
- 발표자료에 대한 내용은 아래 링크에 있음
- [발표자료 링크](https://simba.molmz.xyz/19)
