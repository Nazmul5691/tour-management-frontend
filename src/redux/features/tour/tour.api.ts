
import { baseApi } from "@/redux/baseApi";


export const tourApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        addTourType: builder.mutation({
            query: (tourTypeName) => ({
                url: "tour/create-tour-type",
                method: "POST",
                // body: userInfo
                data: tourTypeName      //if we use axios we should use data
            }),
            invalidatesTags: ["TOUR"]
        }),


        removeTourType: builder.mutation({
            query: (tourTypeId) => ({
                url: `tour/tour-types/${tourTypeId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["TOUR"]
        }),


        getTourTypes: builder.query({
            query: () => ({
                url: "/tour/tour-types",
                method: "GET",
            }),
            providesTags: ["TOUR"],
            // transformResponse: (response) => response.data       //j part tuku dorker sudhu sei tuku nibo 
            transformResponse: (response) => ({
                data: response.data,
                meta: response.meta,
            })
        })

    })
})


export const { useAddTourTypeMutation, useGetTourTypesQuery, useRemoveTourTypeMutation } = tourApi;