import dynamic from "next/dynamic";
import React, { Suspense } from "react";
const Banner = dynamic(() => import("@/components/Banner"), {
  ssr: true,
});
const CategoryPage = dynamic(() => import("@/components/Category"), {
  ssr: true, // set to true if you want server-side rendering
});

const FeaturePage = dynamic(() => import("@/components/Feature"), {
  ssr: true,
});

// const SocialBar = dynamic(() => import("@/components/SocialBar/page"), {
//   ssr: true,
// });

import Cart from "@/components/Cart";
import { fetchHomeProducts } from "@/lib/data/prodcuts";
import { fetchSliders } from "@/lib/data/slider";
import { getFeaturedCategories } from "@/lib/data/category";

const Page = async () => {
  const [products, sliders, categories] = await Promise.all([
    fetchHomeProducts(),
    fetchSliders(),
    getFeaturedCategories(),
  ]);
  return (
    <>
      {/* <SocialBar /> */}
      <Suspense fallback={<div className="h-64 w-full bg-gray-100" />}>
        <Cart />
      </Suspense>
      <Suspense fallback={<div className="h-64 w-full bg-gray-100" />}>
        <Banner slides={sliders.data} />
      </Suspense>
      <CategoryPage categories={categories.data} />
      <FeaturePage
        feature={products?.data?.featuredProducts}
        title="Feature Products"
      />
      <FeaturePage
        feature={products?.data?.newProducts}
        title="New Arrival Products"
      />
      <FeaturePage
        feature={products?.data?.bestSellingProducts}
        title="Best Selling Products"
      />
    </>
  );
};

export default Page;
