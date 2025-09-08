import dynamic from "next/dynamic";
import React from "react";
// import Banner from "@/components/Banner";
const Banner = dynamic(() => import("@/components/Banner"), {
  ssr: true,
});
const CategoryPage = dynamic(() => import("@/components/Category/page"), {
  ssr: true, // set to true if you want server-side rendering
});

const FeaturePage = dynamic(() => import("@/components/Feature"), {
  ssr: true,
});

const SocialBar = dynamic(() => import("@/components/SocialBar/page"), {
  ssr: true,
});


import Cart from "@/components/Cart/page";
import { fetchHomeProducts } from "@/lib/data/prodcuts";
import { fetchSliders } from "@/lib/data/slider";
import { getFeaturedCategories } from "@/lib/data/category";


const Page = async () => {
  const [products, sliders, categories] = await Promise.all([
    fetchHomeProducts(),
    fetchSliders(),
    getFeaturedCategories(),
  ]);
  console.log(categories)
  return (
    <div>
      <SocialBar />
      <Cart />
      <Banner slides={sliders.data} />
      <CategoryPage/>
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
    </div>
  );
};

export default Page;
