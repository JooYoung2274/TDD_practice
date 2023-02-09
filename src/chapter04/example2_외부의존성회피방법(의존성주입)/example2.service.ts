import { Example2Repository } from './example2.repository';

export class Example2Service {
  constructor(private _example2Repository: Example2Repository) {}

  async 더하기(a: number, b: number): Promise<number> {
    const 데이터베이스에있는숫자 = await this._example2Repository.findNumber();
    const result = a + b + 데이터베이스에있는숫자;
    return result;
  }
}
