import Link from "next/link";
import Limit from "../components/Limit";
import ProductCard from "../components/ProductCard";

async function getProducts({ limit, skip }) {
  const res = await fetch(
    `https://dummyjson.com/products?limit=${limit}&skip=${skip}`,
    {
      cache: "no-store",
    }
  );
  return res.json();
}

export default async function Home({ searchParams }) {
  const query = await searchParams;
  const limit = parseInt(query.limit || 20);
  const skip = parseInt(query?.skip ?? 0, 10) || 0;

  const product = await getProducts({ limit, skip });
  const total = product?.total ?? 0;

  const prevSkip = Math.max(0, skip - limit);
  const nextSkip = skip < total - limit ? skip + limit : skip;

  const q = (l, s) => `?limit=${l}&skip=${s}`;

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
      <div className="flex justify-center items-center gap-10 my-10">
        <Link
          href={q(limit, prevSkip)}
          scroll={false}
          className="text-white bg-green-600 hover:bg-brand/60 hover:text-black duration-200 px-4 py-2 rounded-md font-medium"
        >
          Prev
        </Link>
        <Link
          href={q(limit, nextSkip)}
          scroll={false}
          className="text-white bg-green-600 hover:bg-brand/60 hover:text-black duration-200 px-4 py-2 rounded-md font-medium"
        >
          Next
        </Link>
      </div>
    </>
  );
}
