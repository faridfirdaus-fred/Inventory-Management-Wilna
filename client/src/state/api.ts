import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Product {
  productId: string;
  name: string;
  stock: number;
}

export interface Inventory {
  bahanId: string;
  name: string;
  stock: number;
  unit: string;
}

export interface NewBahan {
  name: string;
  stock: number;
  unit: string;
}

export interface NewProduct {
  name: string;
  stock: number;
}

export interface DashboardMetrics {
  popularProducts: Product[];
}

export interface User {
  userId: string;
  name: string;
  password: string;
}

// API Slice
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  reducerPath: "api",
  tagTypes: ["Products", "DashboardMetrics", "Users", "Bahan"],
  endpoints: (build) => ({
    // Product endpoints
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

    // Dashboard metrics endpoint
    getDashboardMetrics: build.query<DashboardMetrics, void>({
      query: () => "/dashboard",
      providesTags: ["DashboardMetrics"],
    }),

    // User endpoints
    getUsers: build.query<User[], void>({
      query: () => "/users",
      providesTags: ["Users"],
    }),

    // Inventory (Bahan) endpoints
    getBahan: build.query<Inventory[], void>({
      query: () => "/inventory",
      providesTags: ["Bahan"],
    }),
    createBahan: build.mutation<Inventory, NewBahan>({
      query: (newBahan) => ({
        url: "/inventory",
        method: "POST",
        body: newBahan,
      }),
      invalidatesTags: ["Bahan"],
    }),
    updateBahan: build.mutation<
      Inventory,
      { id: string; updatedBahan: NewBahan }
    >({
      query: ({ id, updatedBahan }) => ({
        url: `/bahan/${id}`,
        method: "PUT",
        body: updatedBahan,
      }),
      invalidatesTags: ["Bahan"],
    }),
    deleteBahan: build.mutation<void, string>({
      query: (id) => ({
        url: `/bahan/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Bahan"],
    }),
  }),
});

// Export hooks for use in components
export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetDashboardMetricsQuery,
  useGetUsersQuery,
  useGetBahanQuery,
  useCreateBahanMutation,
  useUpdateBahanMutation,
  useDeleteBahanMutation,
} = api;
