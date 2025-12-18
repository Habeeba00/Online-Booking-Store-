import { IBook } from "./ibook";

export interface ICategory {
  _id: string;
  title: string;
  status: 'active' | 'inactive';
  books: IBook[];
}
export type ICategoryResponse = ICategory[];

