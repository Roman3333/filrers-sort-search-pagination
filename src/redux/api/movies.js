import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = process.env.REACT_APP_API_URL;

export const apiSlice = createApi({
  reducerPath: 'api',
  tagTypes: ['Movies'],
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ page, sort, order, filterGenre, search, limit }) =>
        `/movies?page=${page}&sort=${sort},${order}&genre=${filterGenre.toString()}&search=${search}&limit=${limit}`,
      providesTags: () => [
        {
          type: 'Movies',
        },
      ],
    }),
  }),
});

export const { useGetProductsQuery } = apiSlice;
