import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authService = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ecommerce-kxrg.onrender.com/api/",
  }),
  endpoints: (builder) => {
    return {
      authLogin: builder.mutation({ // gửi data cập nhật tới server và áp dụng thay đổi với local cache
        query: (loginData) => { // đăng nhập
          return {
            url: "login",
            method: "POST",
            body: loginData,
          };
        },
      }),
      userRegister: builder.mutation({ // gửi data cập nhật tới server và áp dụng thay đổi với local cache
        query: (data) => { // đăng ký
          return {
            url: "/register",
            method: "POST",
            body: data,
          };
        },
      }),
      userLogin: builder.mutation({ // gửi data cập nhật tới server và áp dụng thay đổi với local cache
        query: (loginData) => { // đăng nhập
          return {
            url: "/login",
            method: "POST",
            body: loginData,
          };
        },
      }),
    };
  },
});
export const {
  useAuthLoginMutation,
  useUserRegisterMutation,
  useUserLoginMutation,
} = authService;
export default authService;
