import Image from "next/image";
import { Star } from "lucide-react";
import Link from "next/link";

const ProductCard = ({ product }) => {
  return (
    <Link href={`/product/${product?.id}`}>
      <div className="bg-white shadow-md rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 max-w-100">
        <div className="relative w-full h-56">
          <Image
            src={product?.thumbnail}
            alt={product?.title}
            fill
            sizes="100%"
            className="object-cover"
          />
        </div>

        <div className="p-4 space-y-2">
          <h3 className="text-lg font-semibold text-gray-800">
            {product?.name}
          </h3>

          <div className="flex items-center text-yellow-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={16}
                className={
                  i < product?.rating ? "fill-yellow-500" : "text-gray-300"
                }
              />
            ))}
          </div>

          <p className="text-gray-600 text-sm line-clamp-2">
            {product?.description}
          </p>

          <div className="flex justify-between items-center pt-2">
            <span className="text-xl font-bold text-indigo-600">
              ${product?.price}
            </span>
            <button className="bg-indigo-600 text-white text-sm px-4 py-2 rounded-xl hover:bg-indigo-700 transition">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
