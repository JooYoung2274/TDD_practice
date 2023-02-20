import { IExample4Repository } from './example4.interface';
import { Example4Repository } from './example4.repository';

interface InputDto {
  name: string;
  producers: {
    name: string;
    cost: number;
    production: number;
  }[];
  demand: number;
  price: number;
}

interface OutputDto {
  shortfall: number;
  profit: number;
  revenueList: number[];
}

export class Example4Service {
  constructor(private _example4Repository: Example4Repository) {}

  // red
  async getEndDate(body: InputDto): Promise<OutputDto> {
    let shortfall = 0;
    let profit = 0;
    let revenueList = [0, 0];
    return { shortfall, profit, revenueList };
  }

  //// green
  // async getEndData(body: InputDto): Promise<OutputDto> {
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

  //   await this._example4Repository.saveShortfall(shortfall);
  //   await this._example4Repository.saveProfit(profit);

  //   return { shortfall, profit, revenueList };
  // }

  //// refactor
  // async getEndData(body: InputDto): Promise<OutputDto> {
  //   const shortfall: number = await this.calculateShortfall(body);
  //   const profit: number = await this.calculateProfit(body);
  //   const revenueList: number[] = await this.calculateRevenueList(body);

  //   await this._example4Repository.saveShortfall(shortfall);
  //   await this._example4Repository.saveProfit(profit);
  //   return { shortfall, profit, revenueList };
  // }

  // async calculateTotalProduction(body: InputDto): Promise<number> {
  //   const { producers } = body;
  //   let totalProduction: number = 0;
  //   for (const element of producers) {
  //     totalProduction += element.production;
  //   }
  //   return totalProduction;
  // }

  // async calculateShortfall(body: InputDto): Promise<number> {
  //   const totalProduction = await this.calculateTotalProduction(body);

  //   return body.demand - totalProduction;
  // }

  // async calculateProfit(body: InputDto): Promise<number> {
  //   const totalProduction = await this.calculateTotalProduction(body);
  //   const totalRevenue = await this.calculateTotalRevenue(body);
  //   return body.price * totalProduction - totalRevenue;
  // }

  // async calculateTotalRevenue(body: InputDto): Promise<number> {
  //   const { producers } = body;
  //   let totalRevenue: number = 0;
  //   for (const element of producers) {
  //     totalRevenue += element.cost * element.production;
  //   }
  //   return totalRevenue;
  // }

  // async calculateRevenueList(body: InputDto): Promise<number[]> {
  //   const { producers } = body;
  //   let revenueList: number[] = [];
  //   for (const element of producers) {
  //     revenueList.push(element.cost * element.production);
  //   }
  //   return revenueList;
  // }
}
