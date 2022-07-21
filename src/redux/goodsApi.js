import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const goodsApi = createApi({
  reducerPath: 'goodsApi',
  tagTypes: ['Products'], //для refetch для обновления
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  endpoints: (build) => ({
    getGoods: build.query({
      //getGoods запрос на получение данных
      query: (limit = '') => `/goods?${limit && `_limit=${limit}`}`, // или /goods, limit - переменная кол-ва выводов на стр
      providesTags: (result, error, arg) =>
        result //для refetch для обновления
          ? [
              ...result.map(({ id }) => ({ type: 'Products', id })),
              { type: 'Products', id: 'LIST' },
            ]
          : [{ type: 'Products', id: 'LIST' }],
    }),
    addProduct: build.mutation({
      query: (body) => ({
        url: 'goods',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }], //refetch для обновления
    }),

    deleteProduct: build.mutation({
      query: (id) => ({
        url: `goods/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }], //refetch для обновления
    }),
  }),
});

export const {
  useGetGoodsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
} = goodsApi;
//хук useGetGoodsQuery сгенерирован автоматом исходя из названия getGoods
//хук useAddProductMutation сгенерирован автоматом исходя из названия AddProduct
//хук useDeleteProductMutation сгенерирован автоматом исходя из названия deleteProduct
