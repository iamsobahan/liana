export interface ICartItem {
  productId: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
  regularPrice: number;
  productAttribute?: any;
}
