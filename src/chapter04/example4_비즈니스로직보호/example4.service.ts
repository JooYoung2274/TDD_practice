import { Example4Repository } from './example4.repository';

interface inputDto {
  name: string;
  producers: {
    name: string;
    cost: number;
    production: number;
  }[];
  demand: number;
  price: number;
}

interface outputDto {
  shortfall: number;
  profit: number;
  revenueList: number[];
}

export class Example4Service {
  constructor(private example4Repository: Example4Repository) {}

  async getEndData(body: inputDto): Promise<outputDto> {
    const { producers } = body;
    let totalProduction: number = 0;
    let totalRevenue: number = 0;
    let revenueList: number[] = [];
    for (let i = 0; i < producers.length; i++) {
      totalProduction += producers[i].production;
      totalRevenue += producers[i].cost * producers[i].production;
      revenueList.push(producers[i].cost * producers[i].production);
    }
    const shortfall = body.demand - totalProduction;
    const profit = body.price * totalProduction - totalRevenue;

    await this.example4Repository.saveShortfall(shortfall);
    await this.example4Repository.saveProfit(profit);

    return { shortfall, profit, revenueList };
  }
}
