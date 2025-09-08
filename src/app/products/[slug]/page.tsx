import ProductInfo from "@/components/product-details";
import { getSingleProduct } from "@/lib/data/prodcuts";
import React from "react";
interface ProductPageProps {
  params: { slug: string };
}

/* export async function generateStaticParams({}) {
  const products = await fetchAllProducts(1, 20);

  return products.data.map((product) => product.slug);
} */

/* export async function generateMetadata({
  params: { slug },
}): Promise<Metadata> {
  const product = await getSingleProduct(slug);
  if (!product) {
    return {};
  }

  return {
    title: product.data.product.name,
    description: product.data.product.sortDescription,
    // openGraph: {
    //   images: [
    //     {
    //       url: post.imageUrl
    //     }
    //   ]
    // }
  };
} */
const ProductDetails = async ({ params }: ProductPageProps) => {
  const product = await getSingleProduct(params.slug);

  return (
    <div>
      <ProductInfo />
    </div>
  );
};

export default ProductDetails;
