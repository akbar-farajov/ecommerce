import Filter from "@/components/Filter";
import ProductList from "@/components/ProductList";
import Image from "next/image";
import { wixClientServer } from "../../../lib/wixClientServer";
import { Suspense } from "react";

async function ListPage({ searchParams }: { searchParams: any }) {
  const wixClient = await wixClientServer();

  const category = await wixClient.collections.getCollectionBySlug(
    searchParams.cat || "all-products"
  );

  return (
    <div className="px-4 md:px-8 lg:px16 xl:px-32 2xl:px-64">
      {/* CAPMAIGN */}
      <div className="hidden sm:flex justify-between bg-pink-50 px-4 h-64">
        <div className="w-2/3 flex flex-col items-center justify-center gap-8">
          <h1 className="text-4xl font-semibold leading-[48px] text-gray-700">
            Grab up to 50% off on
            <br /> Selected Products
          </h1>
          <button className="w-max rounded-3xl bg-notif text-white px-5 py-3 text-sm">
            Buy Now
          </button>
        </div>
        <div className="relative w-1/3">
          <Image src="/woman.png" alt="" fill className="object-contain" />
        </div>
      </div>
      <Filter />

      {/* Products */}
      <h1 className="mt-16 text-xl font-semibold">
        {category.collection?.name} for you
      </h1>
      <Suspense fallback={"loading"}>
        <ProductList
          categoryId={
            category.collection?._id || "00000000-000000-000000-000000000001"
          }
          searchParams={searchParams}
        />
      </Suspense>
    </div>
  );
}

export default ListPage;
