import { aa } from './example0';

function cc() {
  return 1;
}

it('성공하면 1을 리턴해라', () => {
  const result = aa(cc);
  expect(result).toBe(1);
});
