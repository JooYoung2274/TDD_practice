const dateNumber = Number(new Date());

export function aa(input: number) {
  const result = (input + 15) % 10;
  return result;
}

aa(dateNumber);
// 1~9
