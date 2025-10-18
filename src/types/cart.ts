export interface ICartItem {
  productId: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
  regularPrice: number;
  productAttribute?: string;
  size?: string | null;
  box?: string | null;
}
