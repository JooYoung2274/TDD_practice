import { inputDto } from '../service/dto/inputDto';
import { outputDto } from '../service/dto/outputDto';
import { IPrac2Repository } from './prac2.interface';
// import { Prac2Repository } from './prac2.repository';

export class Prac2Service {
  constructor(private _prac2Repository: IPrac2Repository) {}

  async getEndData(body: inputDto): Promise<outputDto> {
    const totalProduction = await this.calculateTotalProduction(body);
    const shortfall: number = await this.calculateShortfall(body);
    const profit: number = await this.calculateProfit(body);
    const revenueList: number[] = await this.calculateRevenueList(body);

    await this._prac2Repository.saveShortfall(shortfall);
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

  // async getEndData(body: inputDto) {
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

  //   return { shortfall, profit, revenueList };
  // }
}
