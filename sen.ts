import { Producer } from './src/models/Producer';

async function DB에있는숫자더하기(a: number) {
  const b = await Producer.findOne({ name: 1 });
  return a + Number(b);
}

function DB에서숫자찾아오는함수() {
  const result = Producer.findOne({ name: 1 });
  return Number(result);
}

async function DB에있는숫자더하기2(a: number) {
  const b = await DB에서숫자찾아오는함수();
  return a + b;
}

function DB에있는숫자더하기3(a: number, DB관련의존성: Function) {
  const b = DB관련의존성();
  return a + b;
}

DB에있는숫자더하기(1);
DB에있는숫자더하기2(2);
console.log(DB에있는숫자더하기3(3, DB에서숫자찾아오는함수));
