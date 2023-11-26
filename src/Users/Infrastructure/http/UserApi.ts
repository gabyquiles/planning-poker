import { api } from "@src/services/api";
import { createUser as createUserGraphQL } from '../../../graphql/mutations';
import { listUsers as listUsersGraphQL } from '../../../graphql/queries';
import type { CreateUserInput, CreateUserMutation, ListUsersQuery } from "@src/API";
import { API, graphqlOperation } from "aws-amplify";
import { onCreateUser } from "@src/graphql/subscriptions";

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createUser: builder.mutation<string, CreateUserInput>({
            query: (user: CreateUserInput) => ({
                fn: createUserGraphQL, 
                args: {
                    input: {
                      ...user,
                    }
                  }
            }),
            transformResponse: (result: CreateUserMutation) => (result.createUser?.id || ''),
        }),
        getUsers: builder.query<{id: string, email: string}[], void>({
            query: () => ({
                fn: listUsersGraphQL
            }),
            transformResponse: (result: ListUsersQuery) => (result?.listUsers?.items || []),
            async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
                await cacheDataLoaded;
                API.graphql(
                    graphqlOperation(onCreateUser),
                  ).subscribe({
                    next: (resp) => updateCachedData(draft => {
                        draft.push(resp.value.data.onCreateUser)
                    })
                  });
            },
        }) 
    })
})

export const {
    useCreateUserMutation,
    useGetUsersQuery
} = userApi;