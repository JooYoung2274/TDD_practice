export interface ICalculatorRepository {
  getAllProduction(): Promise<
    {
      name: string;
      cost: number;
      produciton: number;
    }[]
  >;

  updateShortFall(minusResult: number): Promise<boolean>;
}
