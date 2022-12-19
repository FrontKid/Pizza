//types
import { TSortFilter } from "../filter/types";

export type TFetchPizza = {
  pageCount: number;
  categoryId: number;
  sort: TSortFilter;
  searchValue: string;
  sortProperty: string;
}

export type TPizzasSlice = {
  id: string;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}



export interface IPizzaSliceStates {
  pizzas: TPizzasSlice[];
  status: Status;
}