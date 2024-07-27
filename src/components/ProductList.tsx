import Image from "next/image";
import Link from "next/link";
import React from "react";
import { wixClientServer } from "../../lib/wixClientServer";
import { products } from "@wix/stores";
import DOMPurify from "isomorphic-dompurify";

const PRODUCT_PER_PAGE = 20;

async function ProductList({
  categoryId,
  limit,
  searchParams,
}: {
  categoryId: string;
  limit?: number;
  searchParams?: any;
}) {
  const wixClient = await wixClientServer();

  const res = await wixClient.products
    .queryProducts()
    .startsWith("name", searchParams?.name || "")
    .eq("collectionIds", categoryId)
    .hasSome("productType", [searchParams?.type || "physical", "digital"])
    .gt("priceData.price", searchParams?.min || 0)
    .lt("priceData.price", searchParams?.max || 999999)
    .limit(limit || PRODUCT_PER_PAGE)
    .find();

  return (
    <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
      {res.items.map((product: products.Product) => (
        <Link
          key={product._id}
          href={`/${product.slug}`}
          className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
        >
          <div className="relative w-full h-80">
            <Image
              src={product.media?.mainMedia?.image?.url || `/product.png`}
              alt=""
              fill
              sizes="25vw"
              className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity ease-in duration-500"
            />
            {product.media?.items && (
              <Image
                src={product.media?.items[1]?.image?.url || `/product.png`}
                alt=""
                fill
                sizes="25vw"
                className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity ease-in duration-500"
              />
            )}
          </div>
          <div className="flex justify-between">
            <span className="font-medium">{product.name}</span>
            <span className="font-semibold">${product.price?.price}</span>
          </div>
          {product.additionalInfoSections && (
            <div
              className="text-sm text-gray-500"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  product.additionalInfoSections.find(
                    (section: any) => section.title === "shortDesc"
                  )?.description || "Hello"
                ),
              }}
            ></div>
          )}
          <button className="w-max rounded-2xl ring-1 ring-notif text-notif py-2 px-4 text-xs hover:bg-notif hover:text-white">
            Add to cart
          </button>
        </Link>
      ))}
    </div>
  );
}

export default ProductList;
