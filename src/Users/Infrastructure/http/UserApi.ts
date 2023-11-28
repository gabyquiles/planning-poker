import { api } from "@src/services/api";
import { createUser as createUserGraphQL } from '../../../graphql/mutations';
import { listUsers as listUsersGraphQL } from '../../../graphql/queries';
import type { CreateUserInput, CreateUserMutation, ListUsersQuery, OnCreateUserSubscription, OnDeleteUserSubscription } from "@src/API";
import { API, graphqlOperation } from "aws-amplify";
import { onCreateUser, onDeleteUser } from "@src/graphql/subscriptions";
import type User from "@Users/Types/User";

type SubscriptionNextType<T> = {
    value: {
        data: T
    }
}

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
                    next: (resp: SubscriptionNextType<OnCreateUserSubscription>) => updateCachedData(draft => {
                        console.log("OnCreate",resp)
                        resp.value.data?.onCreateUser && draft.push(resp.value.data.onCreateUser)
                    })
                  });
                
                API.graphql(
                    graphqlOperation(onDeleteUser),
                ).subscribe({
                    next: (resp: SubscriptionNextType<OnDeleteUserSubscription>) =>  updateCachedData(draft => {
                        console.log("OnDelete",resp)
                        const idx = draft.findIndex((user: User) => user.id !== resp.value.data?.onDeleteUser?.id)
                        if(idx !== -1) draft.splice(idx, 1);
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