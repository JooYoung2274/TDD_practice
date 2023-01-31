// // 실패하는 테스트 만들고
// // 그걸 성공시키는 코드를 작성하면서 구현하고
// // 마지막에 리팩토링하고 끝
// // 이건 service 계층의 테스트 이기 때문에 service 계층 이외의 모든 계층은 전부 성공한다고 가정함

// const body = {
//   name: 'Asia',
//   producers: [
//     {
//       name: 'jooyoung',
//       cost: 10,
//       production: 9,
//     },
//     {
//       name: 'hyunsoo',
//       cost: 12,
//       production: 10,
//     },
//     {
//       name: 'joo',
//       cost: 10,
//       production: 6,
//     },
//   ],
//   demand: 30,
//   price: 20,
// };

// // 만들려고하는 기능 getEndData(body)를 실행하면
// // {shortfall, profit, revenue list} 해당 형태로 리턴되어야 함.

// // 1. shortfall을 구하기 위해선
// // -> producers의 production을 전부 더해서 totalProduction을 구하고
// // -> demand - totalProduction을 해서 shortfall을 구하고
// // -> shortfall을 db에 저장

// // 2. profit을 구하기 위해선
// // -> producers의 revenue를 전부 더해서 totalRevenue를 구하고
// // -> totalProduction * price를 구해서 totalPrice를 구하고
// // -> totalPrice - totalRevenue로 profit을 구하고
// // -> profit을 db에 저장하고 (Repository layer의 역할)

// // 3. revenue list를 구하기 위해선
// // -> producers의 cost * production을 해서 revenue를 구함

// const testRepository = new TestRepository();
// const testService = new TestService(testRepository);

// describe('test Service layer', () => {
//   describe('getEndData(body)', () => {
//     it('getEndData(body) is function?', () => {
//       expect(typeof testService.getShortfallAndProfitAndRevenue).toBe('function');
//     });

//     describe('1. shortfall을 구하기 위해선', () => {
//       it('calculateShortfall() is function?', () => {
//         expect(typeof testService.calculateShortfall).toBe('function');
//       });

//       it('-> producers의 production을 전부 더해서 totalProduction을 구하고', async () => {
//         const totalProduction = await testService.calculateTotalProduction(body);
//         expect(totalProduction).toBe(25);
//       });

//       it('-> demand - totalProduction을 해서 shortfall을 구하고 리턴', async () => {
//         const shortfall = await testService.calculateShortfall(body);
//         expect(shortfall).toBe(5);
//       });

//       it('-> shortfall을 db에 저장하고', async () => {
//         const returned = await testRepository.updateShortfall(5);
//         expect(returned).toBe(true);
//       });
//     });

//     describe('2. 각 생산자 별 수익을 구하기 위해선', () => {
//       it('calculateRevenue() is function?', () => {
//         expect(typeof testService.calculateRevenue).toBe('function');
//       });

//       it('-> producers의 cost * production을 해서 revenue를 구함', async () => {
//         const revenue = await testService.calculateRevenue(body);
//         expect(revenue).toStrictEqual([90, 120, 60]);
//       });
//     });

//     describe('3. profit을 구하기 위해선', () => {
//       it('getProfit() is function?', () => {
//         expect(typeof testService.calculateProfit).toBe('function');
//       });

//       it('-> revenue를 더하고 price * totalProduction - totalRevenue =  profit', async () => {
//         const result = await testService.calculateProfit(body);
//         expect(result).toBe(230);
//       });
//     });

//     it('getShortfallAndProfitAndRevenue() result', async () => {
//       const result = await testService.getShortfallAndProfitAndRevenue(body);
//       expect(result).toStrictEqual({ shortfall: 5, profit: 230, revenue: [90, 120, 60] });
//     });
//   });
// });
