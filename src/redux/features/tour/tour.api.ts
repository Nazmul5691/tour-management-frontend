
import { baseApi } from "@/redux/baseApi";
import type { IResponse, ITourPackage } from "@/types";


export const tourApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        addTour: builder.mutation({
            query: (tourData) => ({
                url: "/tour/create",
                method: "POST",
                data: tourData,
            }),
            invalidatesTags: ["TOUR"],
        }),


        addTourType: builder.mutation({
            query: (tourTypeName) => ({
                url: "/tour/create-tour-type",
                method: "POST",
                // body: userInfo
                data: tourTypeName      //if we use axios we should use data
            }),
            invalidatesTags: ["TOUR"]
        }),


        removeTourType: builder.mutation({
            query: (tourTypeId) => ({
                url: `/tour/tour-types/${tourTypeId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["TOUR"]
        }),


        getTourTypes: builder.query({
            query: (params) => ({
                url: "/tour/tour-types",
                method: "GET",
                params: params,
            }),
            providesTags: ["TOUR"],
            // transformResponse: (response) => response.data       //j part tuku dorker sudhu sei tuku nibo 
            transformResponse: (response) => ({
                data: response.data,
                meta: response.meta,
            })
        }),


        getAllTours: builder.query<ITourPackage[], unknown>({
            query: (params) => ({
                url: "/tour",
                method: "GET",
                params: params,
            }),
            providesTags: ["TOUR"],
            transformResponse: (response: IResponse<ITourPackage[]>) => response.data,
        }),

    })
})


export const { useAddTourMutation, useAddTourTypeMutation, useGetTourTypesQuery, useRemoveTourTypeMutation, useGetAllToursQuery} = tourApi;