import { instance, mock, when } from 'ts-mockito';
import { Test4Service, TestService } from '../../calculator/blog.service';
import { Test4Repository } from '../../calculator/test2.repository4';

// mocking 없는 테스트 코드 작성

class MockTest1Repository {
  // 기타 repository 코드들 1
}
class MockTest2Repository {
  // 기타 repository 코드들 2
}
class MockTest3Repository {
  // 기타 repository 코드들 3
}
class MockTest4Repository {
  async updateShortfall(num: number): Promise<boolean> {
    return true;
  }
  async findNumber() {
    return 2;
  }
}

describe('mocking 없이 가짜객체만 이용한 테스트 코드 작성', () => {
  it('더하기 함수 테스트코드', async () => {
    //given

    const mockTest1Repository = new MockTest1Repository();
    const mockTest2Repository = new MockTest2Repository();
    const mockTest3Repository = new MockTest3Repository();
    const mockTest4Repository = new MockTest4Repository();

    const testService = new TestService(mockTest1Repository, mockTest2Repository, mockTest3Repository, mockTest4Repository);

    // when
    const result = await testService.더하기(2, 3);

    // then
    expect(result).toBe(7);
  });
});

// mocking을 이용한 테스트 코드 작성.
// fakeRepo를 만들었을때보다 훨씬 간단하게 테스트 작성이 가능하지만
// 코드 디자인이 좋은지 나쁜지 판별할 수 없게 만드는 단점이 있음

describe('mocking을 이용한 테스트 코드 작성', () => {
  it('더하기 함수 테스트코드', async () => {
    // given

    //// stub => dummy 객체, mocking 객체

    const stubTest4Repository: Test4Repository = mock(Test4Repository);

    when(await stubTest4Repository.findNumber()).thenReturn(2);

    //// sut => system under test (테스트 대상)
    const sut = new TestService(
      instance(stubTest4Repository),
      instance(stubTest4Repository),
      instance(stubTest4Repository),
      instance(stubTest4Repository),
    );

    // when
    const result = await sut.더하기(2, 3);

    // then
    expect(result).toBe(7);
  });
});

// mocking없이 테스트 코드를 작성해보고
// 너무 많은 의존성들이 얽혀 있어서 문제가 있다는 것을 알고
// 디자인 변경 후 테스트 코드 재 작성

class MockTestRepository {
  async updateShortfall(num: number): Promise<boolean> {
    return true;
  }
  async findNumber() {
    return 2;
  }
}

describe('코드 디자인 바꾼거', () => {
  it('df', async () => {
    const mockTestRepository = new MockTestRepository();
    const test4Service = new Test4Service(mockTestRepository);

    const result = await test4Service.더하기(2, 3);

    expect(result).toBe(7);
  });
});
