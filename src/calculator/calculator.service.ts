import { CalculatorRepository } from './calculator.repository';
import { ICalculatorRepository } from './ICalculatorRepository';

export class CalculatorService {
    constructor(private calculatorRepository: ICalculatorRepository) {}
    // constructor(private calculatorRepository: CalculatorRepository) {}

    async updateDemand(body: { demand: number }): Promise<number> {
        const isProducer = await this.calculatorRepository.getAllProduction();
        const totalProduction = await this.addAllProduction(isProducer);
        const minusResult = await this.minusDemand(body.demand, totalProduction);
        await this.calculatorRepository.updateShortFall(minusResult);
        return minusResult;
    }

    async addAllProduction(
        allProduciton: {
            name: string;
            cost: number;
            produciton: number;
        }[],
    ): Promise<number> {
        let totalProduction = 0;
        for (let i = 0; i < allProduciton.length; i++) {
            totalProduction += allProduciton[i].produciton;
        }
        return totalProduction;
    }

    async minusDemand(demand: number, totalProduction: number) {
        return demand - totalProduction;
    }
}
