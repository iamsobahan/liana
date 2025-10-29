import ProductCard from "@/components/card";
import Cart from "@/components/Cart";
import { FilterContent } from "@/components/Category/content";
import CategoryFilter from "@/components/Category/filter";
import Pagination from "@/components/pagination";
import Sort from "@/components/sorting/sort";
import { fetchAllProducts } from "@/lib/data/prodcuts";
// Correct Props type
type Props = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{
    page?: string;
    limit?: string;
    sortBy?: string;
    sortOrder?: string;
  }>;
};

export default async function SearchPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const pageNum = parseInt(((await searchParams)?.page as string) || "1", 10);
  const sortyBy = ((await searchParams)?.sortBy as string) || "createdAt";
  const sortOrder =
    ((await searchParams)?.sortOrder as "asc" | "desc") || "desc";
  const limitNum = parseInt(
    ((await searchParams)?.limit as string) || "50",
    10
  );
  const products = await fetchAllProducts({
    page: pageNum,
    limit: limitNum,
    searchTerm: slug,
    sortBy: sortyBy,
    sortOrder: sortOrder,
  });

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto py-2 md:py-8 text-gray-800">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* FILTER SIDEBAR (desktop) */}
          <aside className="hidden lg:block bg-white shadow-md rounded-xl p-5 h-fit">
            <FilterContent />
          </aside>
          <Cart />
          <CategoryFilter />

          {/* PRODUCT GRID */}
          <main className="lg:col-span-3">
            {/* Sort Bar */}
            <Sort />

            {/* Grid */}
            {!!products.data.length ? (
              <div className="grid gap-y-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {products?.data?.map((product, idx) => (
                  <ProductCard key={idx} item={product} />
                ))}
              </div>
            ) : (
              <div className="container mx-auto px-3 sm:px-6 py-6 sm:py-10">
                <h2 className="text-xl font-semibold">No products found</h2>
              </div>
            )}
            <Pagination total={products?.meta?.total || 0} limit={50} />
          </main>
        </div>
      </div>
    </div>
  );
}
