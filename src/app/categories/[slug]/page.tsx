import CategoryFilter from "@/components/Category/filter";
import { fetchProductsByCategory } from "@/lib/data/prodcuts";
import ProductCard from "@/components/card";
import Pagination from "@/components/pagination";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
export default async function ShopPage({ params, searchParams }: Props) {
  const { slug } = params;
  const { page, limit } = searchParams;

  const normalize = (val: string | string[] | undefined) =>
    Array.isArray(val) ? val[0] : val;

  const toNumber = (v: string | undefined) => {
    if (!v) return undefined;
    const n = parseInt(v, 10);
    return Number.isNaN(n) ? undefined : n;
  };

  const pageNum = toNumber(normalize(page));
  const limitNum = toNumber(normalize(limit));

  const products = await fetchProductsByCategory(slug, pageNum, limitNum);
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
            <Pagination total={products?.meta?.total} limit={limitNum} />
          </main>
        </div>
      </div>
    </div>
  );
}

/* Sidebar Filter Extracted into Component */
function FilterContent() {
  return (
    <>
      {/* Color */}
      <div className="mb-6 container mx-auto">
        <h3 className="font-medium mb-2">Color</h3>
        <div className="space-y-2 text-sm">
          {[
            "Lavender",
            "Slate Blue",
            "Bottle Green",
            "Yellow",
            "Burnt Orange",
            "Peanut",
            "Red",
            "Coffee",
          ].map((color) => (
            <label key={color} className="flex items-center gap-2">
              <input type="checkbox" className="accent-yellow-600" />
              {color}
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Price</h3>
        <div className="space-y-2 text-sm">
          {[
            "100 to 300",
            "301 to 500",
            "501 to 1000",
            "1001 to 2500",
            "2501 to 5000",
            "5001 to 10000",
          ].map((price) => (
            <label key={price} className="flex items-center gap-2">
              <input type="checkbox" className="accent-yellow-600" />
              {price}
            </label>
          ))}
        </div>
      </div>

      {/* Size */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Size</h3>
        <div className="space-y-2 text-sm">
          {["Free Size", "90x30 Inch", "80x30 Inch"].map((size) => (
            <label key={size} className="flex items-center gap-2">
              <input type="checkbox" className="accent-yellow-600" />
              {size}
            </label>
          ))}
        </div>
      </div>

      {/* Category */}
      <div>
        <h3 className="font-medium mb-2">Category</h3>
        <div className="space-y-2 text-sm">
          {[
            "Abaya & Gown",
            "Hijab & Niqab",
            "Khimar & Jilbab",
            "Cape & Cover Up",
            "Undergarments",
            "Accessories & Others",
          ].map((cat) => (
            <label key={cat} className="flex items-center gap-2">
              <input type="checkbox" className="accent-yellow-600" />
              {cat}
            </label>
          ))}
        </div>
      </div>
    </>
  );
}
