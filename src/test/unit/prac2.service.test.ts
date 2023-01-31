import { IPrac2Repository } from '../../service2/prac2.interface';
import { Prac2Repository } from '../../service2/prac2.repository';
import { Prac2Service } from '../../service2/prac2.service';

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

class FakePrac2Repository implements IPrac2Repository {
  async saveShortfall(shortfall: number): Promise<number> {
    return shortfall;
  }
}

// const prac2Repository = new Prac2Repository();
const fakePrac2Repository = new FakePrac2Repository();
const prac2Service = new Prac2Service(fakePrac2Repository);

describe('getEndData()', () => {
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

  it('getEndData(body) 성공했을 때 리턴 값', async () => {
    const returned = await prac2Service.getEndData(body);
    expect(returned).toStrictEqual({
      shortfall: 5,
      profit: 230,
      revenueList: [90, 120, 60],
    });
  });
});
