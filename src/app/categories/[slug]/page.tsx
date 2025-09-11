import CategoryFilter from "@/components/Category/filter";
import { fetchProductsByCategory } from "@/lib/data/prodcuts";
import ProductCard from "@/components/card";
import { FilterContent } from "@/components/Category/content";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
export const metadata = {
  title: "Shop Category",
  description: "Browse our collection of products.",
};
export default async function ShopPage({ params, searchParams }: Props) {
  const { slug } = await params;

  // Await the searchParams prop to resolve the Promise
  const resolvedSearchParams = await searchParams;

  // Now you can safely access the properties
  const page = Number(resolvedSearchParams?.page) || 1;
  const limit = Number(resolvedSearchParams?.limit) || 10;

  const products = await fetchProductsByCategory(slug, page, limit);
  return (
    <div className="bg-gray-50">
      <div className="container mx-auto  py-2 md:py-8 text-gray-800">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* FILTER SIDEBAR (desktop) */}
          <aside className="hidden lg:block bg-white shadow-md rounded-xl p-5 h-fit">
            <FilterContent />
          </aside>

          <CategoryFilter />
          {/* PRODUCT GRID */}
          <main className="lg:col-span-3">
            {/* Sort Bar */}
            <div className="hidden lg:flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Gold Hand Ring</h2>
              <label>
                <span className="font-medium mr-5">sort by:</span>
                <select className="border rounded-lg px-1 py-1 text-sm">
                  <option value="default">Default</option>
                  <option value="latest">Latest</option>
                  <option value="low-high">Price: Low to High</option>
                  <option value="high-low">Price: High to Low</option>
                </select>
              </label>
            </div>

            {/* Grid */}
            <div className="grid gap-y-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {products?.data?.map((product, idx) => (
                <ProductCard key={idx} item={product} />
              ))}
            </div>
            {/* <Pagination
              total={products?.meta?.total as number}
              limit={limitNum as number}
            /> */}
          </main>
        </div>
      </div>
    </div>
  );
}
