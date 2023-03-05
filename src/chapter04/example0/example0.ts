function bb() {
  return Number(new Date());
}

export function aa(input: Function) {
  const result = input() % 10;
  return result;
}
