import { useGetBahanQuery } from "@/state/api";
import React from "react";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";

const CardBahan = () => {
  const { data: bahan, isLoading } = useGetBahanQuery();

  return (
    <div className="row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl pb-16">
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <>
          <h3 className="text-lg font-semibold px-7 pt-5 pb-2">
            Bahan Inventory
          </h3>
          <hr />
          <div className="overflow-auto h-full">
            {bahan?.map((item) => (
              <div
                key={item.bahanId}
                className="flex items-center justify-between gap-3 px-5 py-7 border-b"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={`https://s3-inventorymanagement.s3.us-east-2.amazonaws.com/bahan${
                      Math.floor(Math.random() * 3) + 1
                    }.png`}
                    alt={item.name}
                    width={48}
                    height={48}
                    className="rounded-lg w-14 h-14"
                  />
                  <div className="flex flex-col justify-between gap-1">
                    <div className="font-bold text-gray-700">{item.name}</div>
                    <div className="text-sm text-gray-500">
                      {item.unit} - {item.stock} available
                    </div>
                  </div>
                </div>

                <div className="text-xs flex items-center">
                  <button className="p-2 rounded-full bg-blue-100 text-blue-600 mr-2">
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                  {Math.round(item.stock / 1000)}k Sold
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CardBahan;
