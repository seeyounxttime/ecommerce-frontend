import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const paymentService = createApi({
  reducerPath: "payment",
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
      sendPayment: builder.mutation({
        // gửi data cập nhật tới server và áp dụng thay đổi với local cache
        query: (cart) => {
          // tạo trang thanh toán
          return {
            url: "/create-checkout-session",
            method: "POST",
            body: cart,
          };
        },
      }),
      verifyPayment: builder.query({
        // định nghĩa endpoints
        query: (id) => {
          // lấy thông tin thanh toán
          return {
            url: `verify-payment/${id}`,
            method: "GET",
          };
        },
      }),
    };
  },
});
export const { useSendPaymentMutation, useVerifyPaymentQuery } = paymentService;
export default paymentService;
