import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const categoryService = createApi({
  reducerPath: "category",
  tagTypes: "categories",
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
      create: builder.mutation({ // gửi data cập nhật tới server và áp dụng thay đổi với local cache
        query: (name) => { // tạo category
          return {
            url: "create-category",
            method: "POST",
            body: name,
          };
        },
        invalidatesTags: ["categories"],
      }),
      updateCategory: builder.mutation({ // gửi data cập nhật tới server và áp dụng thay đổi với local cache
        query: (data) => { // cập nhật category
          return {
            url: `update-category/${data.id}`,
            method: "PUT",
            body: { name: data.name },
          };
        },
        invalidatesTags: ["categories"],
      }),
      deleteCategory: builder.mutation({ // gửi data cập nhật tới server và áp dụng thay đổi với local cache
        query: (id) => { // xóa category
          return {
            url: `delete-category/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["categories"],
      }),
      get: builder.query({ // gửi data cập nhật tới server và áp dụng thay đổi với local cache
        query: (page) => { // lấy category
          return {
            url: `categories/${page}`,
            method: "GET",
          };
        },
        providesTags: ["categories"],
      }),
      fetchCategory: builder.query({ // gửi data cập nhật tới server và áp dụng thay đổi với local cache
        query: (id) => { // trả về category
          return {
            url: `fetch-category/${id}`,
            method: "GET",
          };
        },
        providesTags: ["categories"],
      }),
      allCategories: builder.query({ // gửi data cập nhật tới server và áp dụng thay đổi với local cache
        query: () => { // hiển thị tất cả category
          return {
            url: "allcategories",
            method: "GET",
          };
        },
      }),
      randomCategories: builder.query({ // gửi data cập nhật tới server và áp dụng thay đổi với local cache
        query: () => { // category ngẫu nhiên
          return {
            url: "random-categories",
            method: "GET",
          };
        },
      }),
    };
  },
});
export const {
  useCreateMutation,
  useGetQuery,
  useFetchCategoryQuery,
  useAllCategoriesQuery,
  useRandomCategoriesQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryService;
export default categoryService;
