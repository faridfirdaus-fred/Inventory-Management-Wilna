"use client";

import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
} from "@/state/api";
import { PlusCircleIcon, SearchIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Header from "@/app/(components)/Header";
import PopupMessage from "@/app/(components)/PopUpMessage";
import CreateProductModal from "./CreateProductModal";

type Product = {
  productId: string;
  name: string;
  stock: number;
  image?: string;
};

type ProductFormData = {
  productId?: string;
  name: string;
  stock: number;
  image?: string;
};

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductFormData>();
  const [popupMessage, setPopupMessage] = useState<string | null>(null); // State for the popup message
  const [popupType, setPopupType] = useState<"success" | "error">("success"); // State for the type of message

  const {
    data: products,
    isLoading,
    isError,
  } = useGetProductsQuery(searchTerm);
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const handleEdit = (product: ProductFormData) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id)
        .unwrap()
        .then(() => {
          setPopupMessage("Product deleted successfully");
          setPopupType("success");
        })
        .catch(() => {
          setPopupMessage("Failed to delete product");
          setPopupType("error");
        });
    }
  };

  const handleUpdate = async (data: ProductFormData) => {
    if (selectedProduct?.productId) {
      try {
        await updateProduct({
          id: selectedProduct.productId,
          updatedProduct: data,
        }).unwrap();
        setPopupMessage("Product updated successfully.");
        setPopupType("success");
      } catch {
        setPopupMessage("Failed to update product.");
        setPopupType("error");
      } finally {
        setSelectedProduct(undefined);
        setIsModalOpen(false);
      }
    }
  };

  const closePopup = () => {
    setPopupMessage(null);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError || !products) return <div>Failed to load products.</div>;

  return (
    <div className="w-full pb-5 mx-auto">
      {/* SEARCH BAR */}
      <div className="mb-6">
        <div className="flex items-center border-2 border-gray-200 rounded">
          <SearchIcon className="w-5 h-5 m-2 text-gray-500" />
          <input
            className="w-full px-4 py-2 bg-white rounded"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* HEADER BAR */}
      <div className="flex items-center justify-between mb-6">
        <Header name="Products" />
        <button
          className="flex items-center px-4 py-2 font-bold text-gray-200 bg-blue-500 rounded hover:bg-blue-700"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircleIcon className="w-5 h-5 mr-2 !text-gray-200" /> Create
          Product
        </button>
      </div>

      {/* BODY PRODUCTS LIST */}
      <div className="grid justify-between grid-cols-1 gap-10 sm:grid-cols-2 lg-grid-cols-3">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          products?.map((product) => (
            <div
              key={product.productId}
              className="w-full max-w-full p-4 mx-auto border rounded-md shadow"
            >
              <div className="flex flex-col items-center">
                <Image
                  src={product.image || "default_image_url.png"}
                  alt={product.name}
                  width={150}
                  height={150}
                  className="mb-3 rounded-2xl w-36 h-36"
                />

                <h3 className="text-lg font-semibold text-gray-900">
                  {product.name}
                </h3>
                <div className="mt-1 text-sm text-gray-600">
                  Stock: {product.stock}
                </div>
              </div>
              <div className="flex mt-4">
                <button
                  onClick={() => handleEdit(product)}
                  className="px-4 py-2 mr-2 text-white bg-blue-500 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.productId)}
                  className="px-4 py-2 text-white bg-red-500 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <CreateProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={createProduct}
        onUpdate={handleUpdate}
        initialData={selectedProduct}
      />

      {/* Popup Message */}
      {popupMessage && (
        <PopupMessage
          message={popupMessage}
          type={popupType}
          onClose={closePopup}
        />
      )}
    </div>
  );
};

export default Products;
