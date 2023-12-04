import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productService = createApi({
  reducerPath: "products",
  tagTypes: "products",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ecommerce-kxrg.onrender.com/api/",
    prepareHeaders: (headers, { getState }) => {
      const reducers = getState();
      const token = reducers?.authReducer?.adminToken;
      console.log(token);
      headers.set("authorization", token ? `Bearer ${token}` : "");
      return headers;
    },
  }),
  endpoints: (builder) => {
    return {
      cProduct: builder.mutation({ // gửi data cập nhật tới server và áp dụng thay đổi với local cache
        query: (data) => { // tạo sản phẩm
          return {
            url: "/create-product",
            method: "POST",
            body: data,
          };
        },
        invalidatesTags: ["products"],
      }),
      updateProduct: builder.mutation({ // gửi data cập nhật tới server và áp dụng thay đổi với local cache
        query: (data) => { // cập nhật sản phẩm
          return {
            url: "/product",
            method: "PUT",
            body: data,
          };
        },
        invalidatesTags: ["products"],
      }),
      deleteProduct: builder.mutation({ // gửi data cập nhật tới server và áp dụng thay đổi với local cache
        query: (id) => { // xóa sản phẩm
          return {
            url: `/delete/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["products"],
      }),
      getProducts: builder.query({ // gửi data cập nhật tới server và áp dụng thay đổi với local cache
        query: (page) => { // lấy nhiều sản phẩm
          return {
            url: `/products/${page}`,
            method: "GET",
          };
        },
        providesTags: ["products"],
      }),
      getProduct: builder.query({ // gửi data cập nhật tới server và áp dụng thay đổi với local cache
        query: (id) => { // lấy 1 sản phẩm
          return {
            url: `/product/${id}`,
            method: "GET",
          };
        },
        providesTags: ["products"],
      }),
    };
  },
});
export const {
  useCProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useGetProductsQuery,
  useGetProductQuery,
} = productService;
export default productService;
