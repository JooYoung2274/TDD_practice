export interface IPracRepository {
  updateShortfall(shortfall: number): Promise<boolean>;
}
