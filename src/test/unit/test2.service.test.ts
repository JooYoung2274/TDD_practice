// 실패하는 테스트 만들고
// 그걸 성공시키는 코드를 작성하면서 구현하고
// 마지막에 리팩토링하고 끝
// 이건 service 계층의 테스트 이기 때문에 service 계층 이외의 모든 계층은 전부 성공한다고 가정함

import { ITestRepository } from '../../calculator/test2.interface';
import { TestRepository } from '../../calculator/test2.repository';
import { TestService } from '../../calculator/test2.service';

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

// body값을 넣었을 때 결과값으로 나오는 값들이
// 1. shortfall
// 2. profit
// 3. fullRevenue

// 1. shortfall을 구하기 위해선
// -> producers의 production을 전부 더해서 totalProduction을 구하고
// -> demand - totalProduction을 해서 shortfall을 구하고
// -> shortfall을 db에 저장

// 2. 각 생산자 별 수익을 구하기 위해선
// -> producers의 cost * production을 해서 revenue를 구함

// 3. profit을 구하기 위해선
// -> revenue를 더해서 totalRevenue
// -> totalProduction * price를 구해서 totalPrice를 구하고
// -> totalPrice - totalRevenue로 profit을 구하고
// -> profit을 db에 저장하고
// -> profit을 리턴

const testRepository = new TestRepository();
const testService = new TestService(testRepository);

describe('test Service layer', () => {
    describe('getShortfallAndProfitAndRevenue()', () => {
        it('getShortfallAndProfitAndRevenue() is function?', () => {
            expect(typeof testService.getShortfallAndProfitAndRevenue).toBe('function');
        });

        describe('1. shortfall을 구하기 위해선', () => {
            it('calculateShortfall() is function?', () => {
                expect(typeof testService.calculateShortfall).toBe('function');
            });

            it('-> producers의 production을 전부 더해서 totalProduction을 구하고', async () => {
                const totalProduction = await testService.calculateTotalProduction(body);
                expect(totalProduction).toBe(25);
            });

            it('-> demand - totalProduction을 해서 shortfall을 구하고 리턴', async () => {
                const shortfall = await testService.calculateShortfall(body);
                expect(shortfall).toBe(5);
            });

            it('-> shortfall을 db에 저장하고', async () => {
                const returned = await testRepository.updateShortfall(5);
                expect(returned).toBe(true);
            });
        });

        describe('2. 각 생산자 별 수익을 구하기 위해선', () => {
            it('calculateRevenue() is function?', () => {
                expect(typeof testService.calculateRevenue).toBe('function');
            });

            it('-> producers의 cost * production을 해서 revenue를 구함', async () => {
                const revenue = await testService.calculateRevenue(body);
                expect(revenue).toStrictEqual([90, 120, 60]);
            });
        });

        describe('3. profit을 구하기 위해선', () => {
            it('getProfit() is f', () => {
                expect(typeof testService.getProfit).toBe('function');
            });
        });
    });
});
