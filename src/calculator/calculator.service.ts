import { Producer } from '../models/Producer';
import { CalculatorRepository } from './calculator.repository';
import { ICalculatorRepository } from './ICalculatorRepository';

interface Itest {
    name: string;
    producers: {
        name: string;
        cost: number;
        production: number;
    }[];
    demand: number;
    price: number;
}

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

    async addAllProduction(allProduciton: { name: string; cost: number; produciton: number }[]): Promise<number> {
        let totalProduction = 0;
        for (let i = 0; i < allProduciton.length; i++) {
            totalProduction += allProduciton[i].produciton;
        }
        return totalProduction;
    }

    async minusDemand(demand: number, totalProduction: number) {
        return demand - totalProduction;
    }

    ////////// 테스트코드 테스트 ///////////
    async testfunction(body: Itest) {
        const totalProduction = await this.calculateProduction(body);
        const totalRevenue = await this.calculateTotalRevenue(body);
        const revenue = await this.calculateRevenue(body);
        const shortfall = await this.calculateShortfall(body.demand, totalProduction);
        const profit = await this.calculateProfit(body.price, totalProduction, totalRevenue);

        return { shortfall, profit, revenue };
    }

    async calculateProduction(body: Itest) {
        const { producers } = body;
        let totalProduction: number = 0;

        for (let i = 0; i < producers.length; i++) {
            totalProduction += producers[i].production;
        }
        return totalProduction;
    }

    async calculateTotalRevenue(body: Itest) {
        const { producers } = body;
        let totalRevenue: number = 0;

        for (let i = 0; i < producers.length; i++) {
            totalRevenue += producers[i].cost * producers[i].production;
        }
        return totalRevenue;
    }

    async calculateRevenue(body: Itest) {
        const { producers } = body;
        let revenue: number[] = [];
        for (let i = 0; i < producers.length; i++) {
            revenue.push(producers[i].cost * producers[i].production);
        }
        return revenue;
    }

    async calculateShortfall(demand: number, totalRevenue: number) {
        return demand - totalRevenue;
    }
    async calculateProfit(price: number, totalProduction: number, totalRevenue: number) {
        return price * totalProduction - totalRevenue;
    }
}
