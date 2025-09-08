import ProductInfo from "@/components/product-details";
import config from "@/config";
import { fetchAllProducts, getSingleProduct } from "@/lib/data/prodcuts";
import type { Metadata } from "next";
import React from "react";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
export async function generateStaticParams() {
  const products = await fetchAllProducts(1, 20);

  return products.data.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const product = await getSingleProduct(slug);
  if (!product) {
    return {};
  }

  return {
    title: product.data.product.name,
    description: product.data.product.sortDescription,
    openGraph: {
      images: [
        {
          url: `${config.API_URL}/images/products/${product.data.product.thumbnail}`,
        },
      ],
    },
  };
}

// ✅ page function must match Next.js Page signature
const ProductDetails = async ({ params }: Props) => {
  const slug = (await params).slug;
  const product = await getSingleProduct(slug);
  return (
    <div>
      <ProductInfo />
    </div>
  );
};

export default ProductDetails;
