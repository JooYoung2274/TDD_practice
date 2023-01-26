import { inputDto } from './dto/inputDto';
import { outputDto } from './dto/outputDto';

import { PracRepository } from './prac.repository';

export class PracService {
  constructor(private _pracRepository: PracRepository) {}

  async getEndDate(body: inputDto): Promise<outputDto> {
    const totalProduction = await this.calculateTotalProduction(body);
    const shortfall: number = await this.calculateShortfall(body);
    const profit: number = await this.calculateProfit(body);
    const revenueList: number[] = await this.calculateRevenueList(body);
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
