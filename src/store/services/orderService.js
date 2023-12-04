import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const orderService = createApi({
  reducerPath: "orders",
  tagTypes: "orders",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ecommerce-kxrg.onrender.com/api/",
    prepareHeaders: (headers, { getState }) => {
      const reducers = getState();
      const token = reducers?.authReducer?.adminToken;
      headers.set("authorization", token ? `Bearer ${token}` : "");
      return headers;
    },
  }),
  endpoints: (builder) => {
    return {
      getOrders: builder.query({ // định nghĩa endpoints
        query: (page) => { // lấy thông tin order
          return {
            url: `/orders?page=${page}`,
            method: "GET",
          };
        },
        providesTags: ["orders"],
      }),
      details: builder.query({ // định nghĩa endpoints
        query: (id) => { // lấy chi tiết order
          return {
            url: `/order-details/${id}`,
            method: "GET",
          };
        },
        providesTags: ["orders"],
      }),
      deliverOrder: builder.mutation({ // định nghĩa endpoints
        query: (id) => { // tình trạng order
          return {
            url: `/order-update?id=${id}&status=delivered`,
            method: "PUT",
          };
        },
        invalidatesTags: ["orders"],
      }),
    };
  },
});
export const { useGetOrdersQuery, useDetailsQuery, useDeliverOrderMutation } =
  orderService;
export default orderService;
