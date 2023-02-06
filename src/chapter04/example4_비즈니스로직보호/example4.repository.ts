import { Producer } from '../../models/Producer';
import { IExample4Repository } from './example4.interface';

export class Example4Repository implements IExample4Repository {
  async saveShortfall(shortfall: number): Promise<void> {
    await Producer.create();
  }
  async saveProfit(profit: number): Promise<void> {
    await Producer.create();
  }
}
