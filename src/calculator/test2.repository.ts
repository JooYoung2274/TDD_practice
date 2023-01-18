import { ITestRepository } from './test2.interface';

export class TestRepository implements ITestRepository {
    async updateShortfall(num: number): Promise<boolean> {
        return true;
    }
}
