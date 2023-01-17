import { CalculatorRepository } from '../../calculator/calculator.repository';
import { CalculatorService } from '../../calculator/calculator.service';
import { ICalculatorRepository } from '../../calculator/ICalculatorRepository';

// 실패하는 테스트 만들고
// 그걸 성공시키는 코드를 작성하면서 구현하고
// 마지막에 리팩토링하고 끝
// 이건 service 계층의 테스트 이기 때문에 service 계층 이외의 모든 계층은 전부 성공한다고 가정함

// calculator 에서 필요한 기능 리스트
// 1. updateDemand() 수요 입력하기
// 2. updatePrice() 가격 입력하기
// 3. updateCost() 특정 생산자 비용 입력하기
// 4. updateProduction() 특정 생산자 생산량 입력하기

// 1. updateDemand() 수요 입력하기
// 1-1. 생산자 별 생산량 불러오고 (전체데이터)
// 1-2. (1-1)에서 불러온 생산자 별 생산량 전부 더하고
// 1-3. demand - (1-2) 계산하고
// 1-4. 부족분을 (1-4) 결과로 업데이트 해줌
// 1-5. 마지막 리턴값은 (1-3) 결과값

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
// CalculatorService는 CalculatorRepository가 잘못됐을때 사이드 이펙트가 있으면 안됨.
// 만약 CalculatorRepository에 ICalculatorRepository와 다른게 있어서 에러가 있을 때도
// CalculatorService의 테스트에는 문제가 없어야함 -> 이유는 MockCalculatorRepository를 만들었기 때문에
// 하지만 CalculatorService가 CalculatorRepository를 의존하기 있기 때문에 테스트에도 에러가 발생함.
// CalculatorService가 ICalculatorRepsoitory를 의존하게 변경하면 됨 ==> 의존성 역전 원칙 (클린아키텍처에서 제일 중요한 부분)

describe('calculator service layer', () => {
    describe('1. updateDemand() 수요 입력하기', () => {
        const body = { demand: 30 };
        let returned: number;
        let minusResult: number;

        // beforeEach(async () => {
        //     await calculatorService.updateDemand(body);
        // });

        // // 의존성이 있으면 나타나는 오류
        // it('1-1. 생산자 별 생산량 불러오고 (생산자 수 만큼)', async () => {
        //     const returned = await calculatorRepository.getAllProduction();
        //     expect(returned).toBe(getAllProductionReturned);
        // });

        it('1-1. 생산자 별 생산량 불러오고 (생산자 수 만큼)', async () => {
            const returned = await mockCalculatorRepository.getAllProduction();
            expect(returned).toBe(getAllProductionReturned);
        });

        it('1-2. (1-1)에서 불러온 생산자 별 생산량 전부 더하고 -> demand - (1-3) 계산하고', async () => {
            returned = await calculatorService.addAllProduction(getAllProductionReturned);
            expect(returned).toBe(25);
        });

        it('1-3. demand - (1-2) 계산하고', async () => {
            minusResult = await calculatorService.minusDemand(body.demand, returned);
            expect(minusResult).toBe(5);
        });

        it('1-4. 부족분을 (1-4) 결과로 업데이트 해줌', async () => {
            const updateResult = await mockCalculatorRepository.updateShortFall(minusResult);
            expect(updateResult).toBe(true);
        });

        it('updateDemand(body)', async () => {
            const result = await calculatorService.updateDemand(body);
            expect(result).toBe(minusResult);
        });
    });
});
