import { Producer } from '../../models/Producer';
import { IExample2Repository } from './example2.interface';

export class Example2Repository implements IExample2Repository {
  async findNumber(): Promise<number> {
    const 데이터베이스에있는숫자 = await Producer.findOne({});

    return Number(데이터베이스에있는숫자);
  }
}
