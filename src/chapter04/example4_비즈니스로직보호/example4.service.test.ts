import { IExample4Repository } from './example4.interface';
import { Example4Service } from './example4.service';

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

class FakeExample4Repository implements IExample4Repository {
  async saveShortfall(shortfall: number): Promise<void> {}
  async saveProfit(profit: number): Promise<void> {}
}

const fakeExample4Repository = new FakeExample4Repository();
const example4Service = new Example4Service(fakeExample4Repository);

describe('getEndData()', () => {
  it('getEndData(body) 성공했을 때 리턴 값', async () => {
    const returned = await example4Service.getEndData(body);
    expect(returned).toStrictEqual({
      shortfall: 5,
      profit: 230,
      revenueList: [90, 120, 60],
    });
  });
});
