export type TSortFilter = {
  name: string;
  sort: 'rating' | 'price' | 'title' | '-rating' | '-price' | '-title';
}

export interface IFilterSliceStates {
  categoryId: number;
  pageCount: number;
  sort: TSortFilter
}