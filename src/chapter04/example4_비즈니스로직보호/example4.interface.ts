export interface IExample4Repository {
  saveShortfall(shortfall: number): Promise<void>;
  saveProfit(profit: number): Promise<void>;
}
