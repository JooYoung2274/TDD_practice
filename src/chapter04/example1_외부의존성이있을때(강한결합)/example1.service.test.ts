import { Example1Service } from './example1.service';

const example1Service = new Example1Service();

describe('외부 의존성이 있을 때 나타나는 문제점 테스트코드', () => {
  it('더하기(1,1) return => ..?', async () => {
    const result = await example1Service.더하기(1, 1);
    // a = 1, b = 1, 데이터베이스에있는숫자 = 알수없음
    // expect(result).toBe(..?);
  });
});
