import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (userInfo) => ({
        url: "/user",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["user"],
    }),
    getAllUser: builder.query({
      query: (params) => ({
        url: "/user",
        method: "GET",
        params,
      }),
      providesTags: ["user"],
    }),
    getAllDonor: builder.query({
      query: (params) => ({
        url: "/user/all-donors",
        method: "GET",
        params,
      }),
      providesTags: ["user"],
    }),
    getMe: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    updateUser: builder.mutation({
      query: ({
        id,
        updatedUserData,
      }: {
        id: string;
        updatedUserData: Partial<any>;
      }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        body: updatedUserData,
      }),
      invalidatesTags: ["user"],
    }),
    updateUserRole: builder.mutation({
      query: ({
        id,
        updatedUserRoleData,
      }: {
        id: string;
        updatedUserRoleData: { role: string };
      }) => ({
        url: `/user/${id}/role`,
        method: "PATCH",
        body: updatedUserRoleData,
      }),
      invalidatesTags: ["user"],
    }),
    updateUserStatus: builder.mutation({
      query: ({
        id,
        updatedUserStatusData,
      }: {
        id: string;
        updatedUserStatusData: { isBanned: boolean };
      }) => ({
        url: `/user/${id}/status`,
        method: "PATCH",
        body: updatedUserStatusData,
      }),
      invalidatesTags: ["user"],
    }),
    deleteUser: builder.mutation({
      query: ({ id }: { id: string }) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useGetAllUserQuery,
  useGetAllDonorQuery,
  useGetMeQuery,
  useUpdateUserMutation,
  useUpdateUserRoleMutation,
  useUpdateUserStatusMutation,
  useDeleteUserMutation,
} = userApi;
