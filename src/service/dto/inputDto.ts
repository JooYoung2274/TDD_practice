export interface inputDto {
  name: string;
  producers: {
    name: string;
    cost: number;
    production: number;
  }[];

  demand: number;
  price: number;
}
