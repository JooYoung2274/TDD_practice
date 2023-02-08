import { Producer } from '../../models/Producer';
import { IExample3Repository } from './example3.interface';

export class Example3Repository implements IExample3Repository {
  async updateShortfall(shortfall: number): Promise<boolean> {
    // DB에 접근해서 저장하는 로직
    return true;
  }
}
