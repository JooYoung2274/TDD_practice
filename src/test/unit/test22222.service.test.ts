import { instance, mock, when } from 'ts-mockito';
import { TestService } from '../../calculator/blog.service';
import { Test1Repository } from '../../calculator/test2.repository';
import { Test2Repository } from '../../calculator/test2.repository2';
import { Test3Repository } from '../../calculator/test2.repository3';
import { Test4Repository } from '../../calculator/test2.repository4';

// mocking을 이용한 테스트 코드 작성

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

describe('mocking을 이용한 테스트 코드 작성', () => {
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
