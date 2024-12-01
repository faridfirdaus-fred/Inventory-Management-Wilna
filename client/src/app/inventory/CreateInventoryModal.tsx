import React, { ChangeEvent, FormEvent, useState } from "react";

type InventoryFormData = {
  name: string;
  stock: number;
  unit: string;
};

type CreateInventoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (formData: InventoryFormData) => Promise<void>;
};

const CreateInventoryModal = ({
  isOpen,
  onClose,
  onCreate,
}: CreateInventoryModalProps) => {
  const [formData, setFormData] = useState<InventoryFormData>({
    name: "",
    stock: 1,
    unit: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "stock" ? parseInt(value, 10) || 0 : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onCreate(formData); // Call parent onCreate
    setFormData({ name: "", stock: 0, unit: "" }); // Reset form
    onClose();
  };

  if (!isOpen) return null; // Do not render if modal is not open

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h2 className="text-xl font-bold mb-4">Create Inventory</h2>
        <form onSubmit={handleSubmit}>
            {/* Input for Name */}
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded p-2 mb-4"
            required
          />
          {/* Input for Stock */}
          <label className="block text-sm font-medium mb-1">Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full border rounded p-2 mb-4"
            required
          />
          {/* Input for Unit */}
          <label className="block text-sm font-medium mb-1">Unit</label>
          <input
            type="text"
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            className="w-full border rounded p-2 mb-4"
            required
          />
          {/* Action Buttons */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            >
              Create
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateInventoryModal;
