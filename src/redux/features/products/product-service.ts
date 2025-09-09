import { IProductResponse } from '@/types/product';
import axios from 'axios';

// get all products
const getAllProducts = async (filter: {
  [key: string]: string | number;
}): Promise<IProductResponse> => {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/frontend/products`;
  if (filter && Object.keys(filter).length > 0) {
    const queryString = Object.entries(filter)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join('&');

    // Add query string to the URL
    url += `?${queryString}`;
  }
  const { data } = await axios.get(url);

  return data;
};

const productService = {
  getAllProducts,
};

export default productService;
