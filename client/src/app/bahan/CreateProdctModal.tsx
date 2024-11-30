import React, { ChangeEvent, FormEvent, useState } from "react";
import { v4 } from "uuid";
import Header from "@/app/(components)/Header";

type BahanFormData = {
  name: string;
  stock: number;
  unit: string;
};

type CreateBahanModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (formData: BahanFormData) => void;
};

const CreateBahanModal = ({
  isOpen,
  onClose,
  onCreate,
}: CreateBahanModalProps) => {
  const [formData, setFormData] = useState({
    bahanId: v4(),
    name: "",
    stock: 0,
    unit: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "stock" ? parseInt(value, 10) : value, // Convert stock to number
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreate(formData);
    onClose();
  };

  if (!isOpen) return null;

  const labelCssStyles = "block text-sm font-medium text-gray-700";
  const inputCssStyles =
    "block w-full mb-2 p-2 border-gray-500 border-2 rounded-md";

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <Header name="Create New Bahan" />
        <form onSubmit={handleSubmit} className="mt-5">
          {/* BAHAN NAME */}
          <label htmlFor="name" className={labelCssStyles}>
            Bahan Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={formData.name}
            className={inputCssStyles}
            required
          />

          {/* STOCK */}
          <label htmlFor="stock" className={labelCssStyles}>
            Stock
          </label>
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            onChange={handleChange}
            value={formData.stock}
            className={inputCssStyles}
            required
          />

          {/* UNIT */}
          <label htmlFor="unit" className={labelCssStyles}>
            Unit
          </label>
          <input
            type="text"
            name="unit"
            placeholder="Unit"
            onChange={handleChange}
            value={formData.unit}
            className={inputCssStyles}
            required
          />

          {/* CREATE ACTIONS */}
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Create
          </button>
          <button
            onClick={onClose}
            type="button"
            className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBahanModal;
