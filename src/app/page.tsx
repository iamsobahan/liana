import Banner from '@/components/Banner/page';

import CategoryPage from '@/components/Category/page';
import FeaturePage from '@/components/Feature/page';

import SocialBar from '@/components/SocialBar/page';

import slick from '../assets/slick.jpeg';
import slick3 from '../assets/slick3.jpeg';
import slick4 from '../assets/slick4.jpeg';
import slick5 from '../assets/slick5.jpeg';
import slick1 from '../assets/slick1.jpeg';
import slick2 from '../assets/slick2.jpeg';
import slick0 from '../assets/slick0.jpeg';
import slick8 from '../assets/slick8.jpeg';
import slick7 from '../assets/slick3.jpeg';
import slick6 from '../assets/slick10.jpeg';
import slick9 from '../assets/slick9.jpeg';
import slick10 from '../assets/slick10.jpeg';

const feature = [
  { image: slick },
  { image: slick1 },
  { image: slick2 },
  { image: slick3 },
  { image: slick4 },
  { image: slick5 },
];

const new_products = [
  { image: slick },
  { image: slick6 },
  { image: slick9 },
  { image: slick3 },
  { image: slick7 },
  { image: slick10 },
];

const Best_products = [
  { image: slick0 },
  { image: slick10 },
  { image: slick2 },
  { image: slick7 },
  { image: slick8 },
  { image: slick5 },
];

const page = () => {
  return (
    <div>
      <SocialBar />
      <Banner />
      <CategoryPage />
      <FeaturePage feature={feature} title="Feature Products" />
      <FeaturePage feature={new_products} title="New Arrival Products" />
      <FeaturePage feature={Best_products} title="Best Selling Products" />
    </div>
  );
};

export default page;
