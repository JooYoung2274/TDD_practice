export interface ITestRepository {
    updateShortfall(num: number): Promise<boolean>;
}
