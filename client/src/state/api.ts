import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Interface untuk Product
export interface Product {
  productId: string;
  name: string;
  stock: number;
  image: string;
}

// Interface untuk Inventory (Inventory)
export interface Inventory {
  id: string;
  name: string;
  stock: number;
  unit: string;
}

// Interface untuk data baru Inventory (Inventory)
export interface NewInventory {
  name: string;
  stock: number;
  unit: string;
}

// Interface untuk data baru Product
export interface NewProduct {
  name: string;
  stock: number;
}

// Interface untuk Dashboard Metrics
export interface DashboardMetrics {
  popularProducts: Product[];
}

// Interface untuk User
export interface User {
  userId: string;
  name: string;
  password: string;
}

// API Slice
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  reducerPath: "api",
  tagTypes: ["Products", "DashboardMetrics", "Users", "Inventory"],
  endpoints: (build) => ({
    // Endpoint terkait produk
    getProducts: build.query<Product[], string | void>({
      query: (search) => ({
        url: "/products",
        params: search ? { search } : {},
      }),
      providesTags: ["Products"],
    }),
    createProduct: build.mutation<Product, NewProduct>({
      query: (newProduct) => ({
        url: "/products",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: build.mutation<
      Product,
      { id: string; updatedProduct: NewProduct }
    >({
      query: ({ id, updatedProduct }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: updatedProduct,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: build.mutation<void, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),

    // Endpoint untuk dashboard metrics
    getDashboardMetrics: build.query<DashboardMetrics, void>({
      query: () => "/dashboard",
      providesTags: ["DashboardMetrics"],
    }),

    // Endpoint untuk pengguna
    getUsers: build.query<User[], void>({
      query: () => "/users",
      providesTags: ["Users"],
    }),

    // Endpoint terkait Inventory (Inventory)
    getInventory: build.query<Inventory[], void>({
      query: () => "/inventory",
      providesTags: ["Inventory"],
    }),
    createInventory: build.mutation<Inventory, NewInventory>({
      query: (newInventory) => ({
        url: "/inventory",
        method: "POST",
        body: newInventory,
      }),
      invalidatesTags: ["Inventory"],
    }),
    updateInventory: build.mutation<
      Inventory,
      { id: string; updatedInventory: NewInventory }
    >({
      query: ({ id, updatedInventory }) => ({
        url: `/inventory/${id}`,
        method: "PUT",
        body: updatedInventory,
      }),
      invalidatesTags: ["Inventory"],
    }),
    deleteInventory: build.mutation<void, string>({
      query: (id) => ({
        url: `/inventory/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Inventory"],
    }),
  }),
});

// Ekspor hooks untuk digunakan di komponen
export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetDashboardMetricsQuery,
  useGetUsersQuery,
  useGetInventoryQuery,
  useCreateInventoryMutation,
  useUpdateInventoryMutation,
  useDeleteInventoryMutation,
} = api;
