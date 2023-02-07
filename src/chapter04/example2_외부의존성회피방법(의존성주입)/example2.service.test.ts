import { IExample2Repository } from './example2.interface';
import { Example2Repository } from './example2.repository';
import { Example2Service } from './example2.service';

// const example2Repository = new Example2Repository();
// const example2Service = new Example2Service(example2Repository);

class FakeExample2Repository implements IExample2Repository {
  async findNumber(): Promise<number> {
    return 1;
  }
}

const fakeExample2Repository = new FakeExample2Repository();
const example2Service = new Example2Service(fakeExample2Repository);

describe('외존성 주입이 어떻게 외부 의존성을 회피하는지_ 테스트코드', () => {
  it('더하기(1,1) return => 3!', async () => {
    const result = await example2Service.더하기(1, 1);
    // a = 1, b = 1, 데이터베이스에있는숫자 = 1
    expect(result).toBe(3);
  });
});
