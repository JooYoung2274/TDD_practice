import { Producer } from '../models/Producer';
import { TotalData } from '../models/TotalData';

import { ICalculatorRepository } from './ICalculatorRepository';

export class CalculatorRepository implements ICalculatorRepository {
    async getAllProduction(): Promise<
        {
            name: string;
            cost: number;
            produciton: number;
        }[]
    > {
        return await Producer.find({});
    }

    async updateShortFall(minusResult: number): Promise<boolean> {
        await TotalData.updateOne({ where: 'totalDataId' }, { shortFall: minusResult }).exec();
        return true;
    }
}
