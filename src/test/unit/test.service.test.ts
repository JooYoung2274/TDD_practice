// 실패하는 테스트 만들고
// 그걸 성공시키는 코드를 작성하면서 구현하고
// 마지막에 리팩토링하고 끝
// 이건 service 계층의 테스트 이기 때문에 service 계층 이외의 모든 계층은 전부 성공한다고 가정함

import { CalculatorRepository } from '../../calculator/calculator.repository';
import { CalculatorService } from '../../calculator/calculator.service';
import { ICalculatorRepository } from '../../calculator/ICalculatorRepository';

// body값을 넣었을 때 결과값으로 나오는 값들이
// 1. shortfall
// 2. profit
// 3. fullRevenue

const body = {
  name: 'Asia',
  producers: [
    {
      name: 'KIM',
      cost: 10,
      production: 9,
    },
    {
      name: 'JOO',
      cost: 12,
      production: 10,
    },
    {
      name: 'YOUNG',
      cost: 10,
      production: 6,
    },
  ],
  demand: 30,
  price: 20,
};
const getAllProductionReturned = [
  {
    name: 'a',
    cost: 10,
    produciton: 9,
  },
  {
    name: 'b',
    cost: 10,
    produciton: 10,
  },
  {
    name: 'c',
    cost: 10,
    produciton: 6,
  },
];
class MockCalculatorRepository implements ICalculatorRepository {
  async getAllProduction(): Promise<
    {
      name: string;
      cost: number;
      produciton: number;
    }[]
  > {
    return getAllProductionReturned;
  }

  async updateShortFall(minusResult: number): Promise<boolean> {
    return true;
  }
}

// // 의존성이 있으면 나타나는 문제
// const calculatorRepository = new CalculatorRepository();
const mockCalculatorRepository: ICalculatorRepository = new MockCalculatorRepository();
const calculatorService = new CalculatorService(mockCalculatorRepository);

// 1. for문 돌면서 totalProduction, totalRevenue, revenue 계산
// 2. demand - totalProduction으로 shortfall 계산
// 3. price * totalProduction - totalRevenue로 profit 계산
// 4. shortfall, profit, revenue 리턴

describe('test service layer', () => {
  it('1-1. for문 돌면서 totalProduction  계산', async () => {
    const returned = await calculatorService.calculateProduction(body);
    expect(returned).toBe(25);
  });

  it('1-2. for문 돌면서 totalRevenue 계산', async () => {
    const returned = await calculatorService.calculateTotalRevenue(body);
    expect(returned).toBe(270);
  });

  it('1-3. for문 돌면서 revenue 계산', async () => {
    const returned = await calculatorService.calculateRevenue(body);
    expect(returned).toStrictEqual([90, 120, 60]);
  });

  it('2. demand - totalProduction으로 shortfall 계산', async () => {
    const returned = await calculatorService.calculateProduction(body);
    const result = await calculatorService.calculateShortfall(body.demand, returned);
    expect(result).toBe(5);
  });

  it('3. price * totalProduction - totalRevenue로 profit 계산', async () => {
    const totalProduction = await calculatorService.calculateProduction(body);
    const totalRevenue = await calculatorService.calculateTotalRevenue(body);
    const result = await calculatorService.calculateProfit(body.price, totalProduction, totalRevenue);
    expect(result).toBe(230);
  });

  it('4. shortfall, profit, revenue 리턴', async () => {
    const result = await calculatorService.testfunction(body);
    expect(result).toStrictEqual({
      shortfall: 5,
      profit: 230,
      revenue: [90, 120, 60],
    });
  });
});
