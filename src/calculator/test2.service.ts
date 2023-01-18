import { TestRepository } from './test2.repository';

interface testDto {
    name: string;
    producers: {
        name: string;
        cost: number;
        production: number;
    }[];
    demand: number;
    price: number;
}

export class TestService {
    constructor(private _testRepository: TestRepository) {}

    async getShortfallAndProfitAndRevenue(body: testDto) {
        const shortfall = await this.calculateShortfall(body);
        const profit = await this.calculateProfit(body);
        const revenue = await this.calculateRevenue(body);
        return { shortfall, profit, revenue };
    }

    async calculateShortfall(body: testDto) {
        const totalProduction = await this.calculateTotalProduction(body);
        const shortfall = body.demand - totalProduction;
        await this._testRepository.updateShortfall(shortfall);
        return shortfall;
    }

    async calculateTotalProduction(body: testDto): Promise<number> {
        const { producers } = body;
        let totalProduction: number = 0;
        for (let i = 0; i < producers.length; i++) {
            totalProduction += producers[i].production;
        }
        return totalProduction;
    }

    async calculateRevenue(body: testDto): Promise<number[]> {
        const { producers } = body;
        let revenue: number[] = [];
        for (let i = 0; i < producers.length; i++) {
            revenue.push(producers[i].cost * producers[i].production);
        }
        return revenue;
    }

    async calculateProfit(body: testDto) {
        const { price } = body;
        const totalProduction = await this.calculateTotalProduction(body);
        const revenue = await this.calculateRevenue(body);
        let totalRevenue: number = 0;
        for (let i = 0; i < revenue.length; i++) {
            totalRevenue += revenue[i];
        }
        const result = price * totalProduction - totalRevenue;
        return result;
    }
}
