import { baseApi } from "@/redux/baseApi";


export const divisionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        addDivision: builder.mutation({
            query: (divisionData) => ({
                url: "/division/create",
                method: "POST",
                data: divisionData
            }),
            invalidatesTags: ["TOUR"]
        }),


        getTourTypes: builder.query({
            query: () => ({
                url: "/tour/tour-types",
                method: "GET",
            }),
            providesTags: ["TOUR"],
            transformResponse: (response) => ({
                data: response.data,
                meta: response.meta,
            })
        })

    })
})


export const { useAddDivisionMutation } = divisionApi;