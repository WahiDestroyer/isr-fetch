import Image from "next/image";
import React from "react";

async function getProducts(id) {
  const res = await fetch(`https://dummyjson.com/products/${id}`, {
    next: { revalidate: 30 },
  });
  return res.json();
}

const page = async ({ params }) => {
  const param = await params;
  const id = await param.id;

  const product = await getProducts(id);

  return (
    <section className="max-w-5xl mx-auto p-6">
      {/* Header Section */}
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      <p className="text-gray-500 mb-6 capitalize">{product.category}</p>

      {/* Content Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={500}
            height={400}
            className="rounded-xl object-cover mb-4"
          />
          <div className="flex gap-3">
            {product.images.map((img, index) => (
              <Image
                key={index}
                src={img}
                alt={`${product.title} image ${index + 1}`}
                width={100}
                height={100}
                className="rounded-lg object-cover border"
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-4">
          <p className="text-lg text-gray-700">{product.description}</p>

          <div className="text-xl font-semibold">
            💰 ${product.price}
            <span className="text-sm text-gray-500 ml-2">
              (-{product.discountPercentage}%)
            </span>
          </div>

          <p className="text-gray-600">
            <strong>Availability:</strong> {product.availabilityStatus}
          </p>
          <p className="text-gray-600">
            <strong>Brand:</strong> {product.brand}
          </p>
          <p className="text-gray-600">
            <strong>SKU:</strong> {product.sku}
          </p>
          <p className="text-gray-600">
            <strong>Warranty:</strong> {product.warrantyInformation}
          </p>
          <p className="text-gray-600">
            <strong>Return Policy:</strong> {product.returnPolicy}
          </p>
          <p className="text-gray-600">
            <strong>Shipping:</strong> {product.shippingInformation}
          </p>

          {/* Dimensions */}
          {/* <p className="text-gray-600">
            <strong>Dimensions:</strong> W {product.dimensions.width}" × H{" "}
            {product.dimensions.height}" × D {product.dimensions.depth}"
          </p> */}

          {/* Rating */}
          <p className="text-yellow-500">⭐ {product.rating.toFixed(1)} / 5</p>

          {/* Tags */}
          <div className="flex gap-2 flex-wrap">
            {product.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm bg-gray-100 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800">
              Add to Cart
            </button>
            <button className="px-6 py-3 border rounded-lg hover:bg-gray-100">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
