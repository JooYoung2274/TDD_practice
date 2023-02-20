// 첫 번째 예시
export function aa2() {
  const result = (Number(new Date()) + 15) % 10;
  return result;
}

// 두 번째 예시
export function dateNumber(): number {
  return Number(new Date());
}

export function aa(inputFn: Function) {
  const result = (inputFn() + 15) % 10;
  return result;
}

console.log(aa(dateNumber));
