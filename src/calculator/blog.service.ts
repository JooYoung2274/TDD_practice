import { Test1Repository } from './test2.repository';
import { Test2Repository } from './test2.repository2';
import { Test3Repository } from './test2.repository3';
import { Test4Repository } from './test2.repository4';

export class TestService {
  constructor(
    private _test1Repository: Test1Repository,
    private _test2Repository: Test2Repository,
    private _test3Repository: Test3Repository,
    private _test4Repository: Test4Repository,
  ) {}
  async 더하기(a: number, b: number): Promise<number> {
    const 데이터베이스에있는숫자 = await this._test4Repository.findNumber();

    if (!데이터베이스에있는숫자) {
      return 0;
    }

    return a + b + 데이터베이스에있는숫자;
  }
}
