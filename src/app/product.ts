import { Department } from './department';

export interface Product {
  name: string;
  departments: Department[] | string[]; // O '|' diz que o array pode ser tanto de strings qnt de Department.
  stock: number;
  price: number;
  _id ?: string;
}
