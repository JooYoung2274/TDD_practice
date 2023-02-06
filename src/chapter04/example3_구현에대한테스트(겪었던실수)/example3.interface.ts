export interface IExample3Repository {
  updateShortfall(shortfall: number): Promise<boolean>;
}
