import React from 'react';
import Banner from '@/components/Banner/page';
import CategoryPage from '@/components/Category/page';
import FeaturePage from '@/components/Feature/page';
import SocialBar from '@/components/SocialBar/page';

// ✅ Correctly import images
import slick from '../assets/slick.jpeg';
import slick1 from '../assets/slick1.jpeg';
import slick2 from '../assets/slick2.jpeg';
import slick3 from '../assets/slick3.jpeg';
import slick4 from '../assets/slick4.jpeg';
import slick5 from '../assets/slick5.jpeg';
import slick6 from '../assets/slick6.jpeg';
import slick7 from '../assets/slick7.jpeg';
import slick8 from '../assets/slick8.jpeg';
import slick9 from '../assets/slick9.jpeg';
import slick10 from '../assets/slick10.jpeg';

// ✅ Define type for product
type Product = {
  image: string; // imported image becomes string when bundled
};

// ✅ Product Arrays
const feature: Product[] = [
  { image: slick.src },
  { image: slick1.src },
  { image: slick2.src },
  { image: slick3.src },
  { image: slick4.src },
  { image: slick5.src },
];

const new_products: Product[] = [
  { image: slick.src },
  { image: slick6.src },
  { image: slick9.src },
  { image: slick3.src },
  { image: slick7.src },
  { image: slick10.src },
];

const best_products: Product[] = [
  { image: slick.src },
  { image: slick10.src },
  { image: slick2.src },
  { image: slick7.src },
  { image: slick8.src },
  { image: slick5.src },
];

// ✅ Page Component
const Page = () => {
  return (
    <div>
      <SocialBar />
      <Banner />
      <CategoryPage />
      <FeaturePage feature={feature} title="Feature Products" />
      <FeaturePage feature={new_products} title="New Arrival Products" />
      <FeaturePage feature={best_products} title="Best Selling Products" />
    </div>
  );
};

export default Page;
