export interface ICartItem {
  productId: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
  regularPrice: number;
  size?: string | null;
  sizeId?: string | null;
  box?: string | null;
}
