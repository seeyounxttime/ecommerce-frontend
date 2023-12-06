import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userOrdersService = createApi({
  reducerPath: "user-orders",
  tagTypes: "orders",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ecommerce-kxrg.onrender.com/api/",
    prepareHeaders: (headers, { getState }) => {
      const reducers = getState();
      const token = reducers?.authReducer?.userToken;
      headers.set("authorization", token ? `Bearer ${token}` : "");
      return headers;
    },
  }),
  endpoints: (builder) => {
    return {
      getOrders: builder.query({
        // định nghĩa endpoints
        query: (data) => {
          // lấy thông tin order
          return {
            url: `/orders?page=${data.page}&userId=${data.userId}`,
            method: "GET",
          };
        },
        providesTags: ["orders"],
      }),
      details: builder.query({
        // định nghĩa endpoints
        query: (id) => {
          // lấy chi tiết order
          return {
            url: `/order-details/${id}`,
            method: "GET",
          };
        },
        providesTags: ["orders"],
      }),
      receivedOrder: builder.mutation({
        // gửi data cập nhật tới server và áp dụng thay đổi với local cache
        query: (id) => {
          // xác nhận tình trạng order
          return {
            url: `/order-update?id=${id}&status=received`,
            method: "PUT",
          };
        },
        invalidatesTags: ["orders"],
      }),
      postReview: builder.mutation({
        // gửi data cập nhật tới server và áp dụng thay đổi với local cache
        query: (body) => {
          // đăng đánh giá
          return {
            url: `/add-review`,
            method: "POST",
            body,
          };
        },
        invalidatesTags: ["orders"],
      }),
    };
  },
});
export const {
  useGetOrdersQuery,
  useDetailsQuery,
  useReceivedOrderMutation,
  usePostReviewMutation,
} = userOrdersService;
export default userOrdersService;
