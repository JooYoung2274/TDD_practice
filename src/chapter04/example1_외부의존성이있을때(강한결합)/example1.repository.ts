import { Producer } from '../../models/Producer';
import { IExample1Repository } from './example1.interface';

export class Example1Repository implements IExample1Repository {
  async findNumber(): Promise<number> {
    const 데이터베이스에있는숫자 = await Producer.findOne({});

    return Number(데이터베이스에있는숫자);
  }
}
