import { IPrac2Repository } from './prac2.interface';

export class Prac2Repository implements IPrac2Repository {
  async saveShortfall(shortfall: number): Promise<number> {
    // const shortfall2 = DB에 있는 이전 shortfall + 받아온 shortfall
    return shortfall;
  }
}
