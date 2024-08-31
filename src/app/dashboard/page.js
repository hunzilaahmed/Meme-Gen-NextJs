import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = async () => {
  const res = await fetch("https://api.imgflip.com/get_memes");
  const products = await res.json();
  const obj = products.data.memes;

  return (
    <div>
      <h1 className="text-center text-2xl font-bold my-4">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {obj.map((item) => (
          <div key={item.id} className="border rounded-lg p-4 shadow-lg">
            <Image
              src={item.url}
              alt={item.title}
              className="w-full h-48 object-contain mb-4"
              width={30}
              height={30}
            />
            <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
            <Link
              href={"detail/" + item.id}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            >
              Add to Cart
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
