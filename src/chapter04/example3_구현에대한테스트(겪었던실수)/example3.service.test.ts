import { IExample3Repository } from './example3.interface';
import { Example3Service } from './example3.service';

const body = {
  name: 'Asia',
  producers: [
    {
      name: 'jooyoung',
      cost: 10,
      production: 9,
    },
    {
      name: 'hyunsoo',
      cost: 12,
      production: 10,
    },
    {
      name: 'joo',
      cost: 10,
      production: 6,
    },
  ],
  demand: 30,
  price: 20,
};

// 만들려고하는 기능 getEndData(body)를 실행하면
// {shortfall, profit, revenue list} 해당 형태로 리턴되어야 함.

// 1. shortfall을 구하기 위해선
// -> producers의 production을 전부 더해서 totalProduction을 구하고
// -> demand - totalProduction을 해서 shortfall을 구하고
// -> shortfall을 db에 저장 (Repository layer의 역할)

// 2. profit을 구하기 위해선
// -> producers의 revenue를 전부 더해서 totalRevenue를 구하고
// -> totalProduction * price를 구해서 totalPrice를 구하고
// -> totalPrice - totalRevenue로 profit을 구하고
// -> profit을 db에 저장하고 (Repository layer의 역할)

// 3. revenue list를 구하기 위해선
// -> producers의 cost * production을 해서 revenue를 구함

class FakeExample3Repository implements IExample3Repository {
  async updateShortfall(shortfall: number): Promise<boolean> {
    return true;
  }
}

const fakeExample3Repository = new FakeExample3Repository();
const example3Service = new Example3Service(fakeExample3Repository);

describe('getEndDate(body) 테스트 코드 작성', () => {
  it('getEndDate(body) is function ?????????', () => {
    expect(typeof example3Service.getEndData).toBe('function');
  });

  it('getEndDate(body) return ?', async () => {
    const result = await example3Service.getEndData(body);
    expect(result).toStrictEqual({ shortfall: 5, profit: 230, revenueList: [90, 120, 60] });
  });

  describe('1. shortfall을 구하기 위해서...', () => {
    it('-> demand - totalProduction을 해서 shortfall을 구하고', async () => {
      const returned = await example3Service.calculateShortfall(body);
      expect(returned).toBe(5);
    });

    it('-> producers의 production을 전부 더해서 totalProduction을 구하고', async () => {
      const returned = await example3Service.calculateTotalProduction(body);
      expect(returned).toBe(25);
    });

    it('-> shortfall을 db에 저장 (Repository layer의 역할)', async () => {
      const shortfall = await example3Service.calculateShortfall(body);
      const returned = await fakeExample3Repository.updateShortfall(shortfall);
      expect(returned).toBe(true);
    });
  });

  describe('2. profit을 구하기 위해선...', () => {
    it('-> totalPrice - totalRevenue로 profit을 구하고', async () => {
      const returned = await example3Service.calculateProfit(body);
      expect(returned).toBe(230);
    });

    it('-> producers의 revenue를 전부 더해서 totalRevenue를 구하고', async () => {
      const returned = await example3Service.calculateTotalRevenue(body);
      expect(returned).toBe(270);
    });
  });

  describe('3. revenue list를 구하기 위해선', () => {
    it('-> producers의 cost * production을 해서 revenue를 구함', async () => {
      const returned = await example3Service.calculateRevenueList(body);
      expect(returned).toStrictEqual([90, 120, 60]);
    });
  });
});
