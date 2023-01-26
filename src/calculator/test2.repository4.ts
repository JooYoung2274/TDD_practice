import { TotalData } from '../models/TotalData';
import { ITestRepository } from './test2.interface';

export class Test4Repository {
  async updateShortfall(num: number): Promise<boolean> {
    return true;
  }
  async findNumber() {
    // const result: number | null = await TotalData.findOne({ id: 1 });
    return 5;
  }
}
