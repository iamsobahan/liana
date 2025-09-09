export interface ICartItem {
  product_id: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
  regular_price: number;
  product_attribute?: any;
}
