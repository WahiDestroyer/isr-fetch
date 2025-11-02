import Limit from "./components/Limit";
import ProductCard from "./components/ProductCard";

async function getProducts({ limit = 20 }) {
  const res = await fetch(`https://dummyjson.com/products?limit=${limit}`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function Home({ searchParams }) {
  const query = await searchParams;
  const limit = query.limit;
  const product = await getProducts({ limit });

  return (
    <>
      <div className="flex items-center justify-between">
        <h2>All Product</h2>
        <Limit />
      </div>
      <div className="grid grid-cols-5 gap-4">
        {product?.products?.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </>
  );
}
