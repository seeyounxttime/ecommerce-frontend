import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const homeProducts = createApi({
  reducerPath: "homeProducts",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ecommerce-kxrg.onrender.com/api/",
  }),
  endpoints: (builder) => {
    return {
      catProducts: builder.query({ // định nghĩa endpoints
        query: (params) => {
          return { // lấy sản phẩm
            url: `cat-products/${params.name}/${params.page}`,
            method: "GET",
          };
        },
      }),
      searchProducts: builder.query({ // định nghĩa endpoints
        query: (params) => {
          return { // tìm sản phẩm
            url: `search-products/${params.keyword}/${params.page}`,
            method: "GET",
          };
        },
      }),
    };
  },
});
export const { useCatProductsQuery, useSearchProductsQuery } = homeProducts;
export default homeProducts;
