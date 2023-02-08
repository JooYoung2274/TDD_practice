import { Example1Repository } from './example1.repository';

export class Example1Service {
  example1Repository = new Example1Repository();

  async 더하기(a: number, b: number): Promise<number> {
    const 데이터베이스에있는숫자 = await this.example1Repository.findNumber();
    const result = a + b + 데이터베이스에있는숫자;
    return result;
  }
}
