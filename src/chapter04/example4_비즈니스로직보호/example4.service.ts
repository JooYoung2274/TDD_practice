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

  // async getEndData(body: inputDto): Promise<outputDto> {
  //   const { producers } = body;
  //   let totalProduction: number = 0;
  //   let totalRevenue: number = 0;
  //   let revenueList: number[] = [];
  //   for (let i = 0; i < producers.length; i++) {
  //     totalProduction += producers[i].production;
  //     totalRevenue += producers[i].cost * producers[i].production;
  //     revenueList.push(producers[i].cost * producers[i].production);
  //   }
  //   const shortfall = body.demand - totalProduction;
  //   const profit = body.price * totalProduction - totalRevenue;

  //   await this.example4Repository.saveShortfall(shortfall);
  //   await this.example4Repository.saveProfit(profit);

  //   return { shortfall, profit, revenueList };
  // }

  async getEndData(body: inputDto): Promise<outputDto> {
    const shortfall: number = await this.calculateShortfall(body);
    const profit: number = await this.calculateProfit(body);
    const revenueList: number[] = await this.calculateRevenueList(body);

    await this.example4Repository.saveShortfall(shortfall);
    await this.example4Repository.saveProfit(profit);
    return { shortfall, profit, revenueList };
  }

  async calculateTotalProduction(body: inputDto): Promise<number> {
    const { producers } = body;
    let totalProduction: number = 0;
    for (let i = 0; i < producers.length; i++) {
      totalProduction += producers[i].production;
    }
    return totalProduction;
  }

  async calculateShortfall(body: inputDto): Promise<number> {
    const totalProduction = await this.calculateTotalProduction(body);

    return body.demand - totalProduction;
  }

  async calculateProfit(body: inputDto): Promise<number> {
    const totalProduction = await this.calculateTotalProduction(body);
    const totalRevenue = await this.calculateTotalRevenue(body);
    return body.price * totalProduction - totalRevenue;
  }

  async calculateTotalRevenue(body: inputDto): Promise<number> {
    const { producers } = body;
    let totalRevenue: number = 0;
    for (let i = 0; i < producers.length; i++) {
      totalRevenue += producers[i].cost * producers[i].production;
    }
    return totalRevenue;
  }

  async calculateRevenueList(body: inputDto): Promise<number[]> {
    const { producers } = body;
    let revenueList: number[] = [];
    for (let i = 0; i < producers.length; i++) {
      revenueList.push(producers[i].cost * producers[i].production);
    }
    return revenueList;
  }
}
