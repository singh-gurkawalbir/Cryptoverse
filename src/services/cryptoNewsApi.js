import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const newsApiHeaders = {
  'x-api-key': 'pub_3596458b8c2629bdbb28ade73e61383ff701a',
};

const createRequest = (url) => ({ url, headers: newsApiHeaders });

export const cryptoNewsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://newsapi.org/v2' }), 
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({count }) => createRequest(`/top-headlines?country=in&category=business&apiKey=1bae68ff660a4d23801211c9eb01d72e&pageSize=${count}`),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;