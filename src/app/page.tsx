import Banner from "@/components/Banner/page";
import BestProductPage from "@/components/BestProducts/page";
import CategoryPage from "@/components/Category/page";
import FeaturePage from "@/components/Feature/page";
import FooterPage from "@/components/Footer/page";
import Header from "@/components/header/page";
import NewProductPage from "@/components/NewProducts/page";


const page = () => {
  return (
    <div>
      <Header/>
      <Banner/>
      <CategoryPage/>
      <FeaturePage/>
      <NewProductPage/>
      <BestProductPage/>
      <FooterPage/>
    </div>
  );
};

export default page;