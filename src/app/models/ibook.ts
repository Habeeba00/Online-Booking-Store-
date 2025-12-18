export interface IBookResponse {
  data: IBook[];
}
export interface IBook {
  _id: string;
  name: string;
  description: string;
  author: string;
  price: number;
  image: string;
  category: string;
  status: string;
  updatedAt: string;
  createdAt: string;
  __v: number;
}


