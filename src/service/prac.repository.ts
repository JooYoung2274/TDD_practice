import { IPracRepository } from './prac.interface';

export class PracRepository implements IPracRepository {
  async updateShortfall(shortfall: number): Promise<boolean> {
    // DB에 접근해서 저장하는 로직
    return true;
  }
}
