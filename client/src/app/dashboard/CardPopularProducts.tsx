import { useGetDashboardMetricsQuery } from "@/state/api";
import { ShoppingBag } from "lucide-react";
import React from "react";
import Image from "next/image";

const CardPopularProducts = () => {
  const { data: dashboardMetrics, isLoading } = useGetDashboardMetricsQuery();

  // Fungsi untuk menentukan gambar yang sesuai dengan nama produk
  const getImageUrl = (name: string) => {
    const imageMap: { [key: string]: string } = {
      "Dodol A":
        "https://s3-inventorymanagement.s3.us-east-2.amazonaws.com/dodol-a.png",
      "Dodol B":
        "https://s3-inventorymanagement.s3.us-east-2.amazonaws.com/dodol-b.png",
      "Dodol C":
        "https://s3-inventorymanagement.s3.us-east-2.amazonaws.com/dodol-c.png",
      // Tambahkan entri tambahan sesuai kebutuhan
    };

    // Kembalikan URL gambar sesuai dengan nama produk, atau gambar default jika tidak ditemukan
    return (
      imageMap[name] ||
      "https://s3-inventorymanagement.s3.us-east-2.amazonaws.com/default.png"
    );
  };

  return (
    <div className="row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl pb-16">
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <>
          <h3 className="text-lg font-semibold px-7 pt-5 pb-2">
            Popular Products
          </h3>
          <hr />
          <div className="overflow-auto h-full">
            {dashboardMetrics?.popularProducts.map((product) => (
              <div
                key={product.productId}
                className="flex items-center justify-between gap-3 px-5 py-7 border-b"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={getImageUrl(product.name)}
                    alt={product.name}
                    width={48}
                    height={48}
                    className="rounded-lg w-14 h-14"
                  />
                  <div className="flex flex-col justify-between gap-1">
                    <div className="font-bold text-gray-700">
                      {product.name}
                    </div>
                    <div className="flex text-sm items-center"></div>
                  </div>
                </div>

                <div className="text-xs flex items-center">
                  <button className="p-2 rounded-full bg-blue-100 text-blue-600 mr-2">
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                  {Math.round(product.stock / 1000)}k Sold
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CardPopularProducts;
