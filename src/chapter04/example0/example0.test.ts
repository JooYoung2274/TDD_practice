import { aa, dateNumber } from './example0';

function fakeDateNumber(): number {
  return 16;
}

it('성공하면 1을 리턴해라', () => {
  const result = aa(fakeDateNumber);
  expect(result).toBe(1);
});
