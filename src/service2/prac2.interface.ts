export interface IPrac2Repository {
  saveShortfall(shortfall: number): Promise<number>;
}
