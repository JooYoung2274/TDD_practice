import { instance, mock, when } from 'ts-mockito';
import { TestService } from '../../calculator/blog.service';
import { Test1Repository } from '../../calculator/test2.repository';
import { Test2Repository } from '../../calculator/test2.repository2';
import { Test3Repository } from '../../calculator/test2.repository3';
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
    const mockTest1Repository = new MockTest1Repository();
    const mockTest2Repository = new MockTest2Repository();
    const mockTest3Repository = new MockTest3Repository();
    const mockTest4Repository = new MockTest4Repository();

    const testService = new TestService(mockTest1Repository, mockTest2Repository, mockTest3Repository, mockTest4Repository);

    const result = await testService.더하기(2, 3);
    expect(result).toBe(7);
  });
});

describe('mocking을 이용한 테스트 코드 작성', () => {
  it('더하기 함수 테스트코드', async () => {
    // given

    const stubTestRepository: Test1Repository = mock(Test1Repository);
    const stubTest2Repository: Test2Repository = mock(Test2Repository);
    const stubTest3Repository: Test3Repository = mock(Test3Repository);
    const stubTest4Repository: Test4Repository = mock(Test4Repository);

    when(await stubTest4Repository.findNumber()).thenReturn(2);

    const sut = new TestService(
      instance(stubTestRepository),
      instance(stubTest2Repository),
      instance(stubTest3Repository),
      instance(stubTest4Repository),
    );

    // when
    const result = await sut.더하기(2, 3);

    // then
    expect(result).toBe(7);
  });
});

describe('mocking + 가짜객체 둘다 활용한 테스트 코드 작성', () => {
  it('더하기 함수 테스트코드', async () => {
    // given
    const mockTest4Repository = new MockTest4Repository();
    const 데이터베이스에있는숫자 = await mockTest4Repository.findNumber();
    const testService = mock(TestService);
    when(await testService.더하기(2, 3)).thenReturn(2 + 3 + 데이터베이스에있는숫자);

    // when
    const service = instance(testService);

    // then
    const result = await service.더하기(2, 3);
    expect(result).toBe(7);
  });
});
