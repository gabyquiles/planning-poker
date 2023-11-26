import { api } from "@src/services/api";
import { createSession as createSessionGraphQL } from '../../../graphql/mutations';
import { getSession as getSessionGraphQL } from '../../../graphql/queries';
import type { CreateSessionMutation, GetSessionQuery, GetSessionQueryVariables } from "@src/API";


export const sessionApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createSession: builder.mutation<string, string>({
            query: (owner: string) => ({
                fn: createSessionGraphQL, 
                args: {
                    input: {
                      owner,
                    }
                  }
            }),
            transformResponse: (result: CreateSessionMutation) => (result.createSession?.id || ''),
            // invalidatesTags: ({createSession}: CreateSessionMutation) => [{type: 'SESSION', id: createSession?.id}]
        }),
        getSession: builder.query({
            query: ({ id }: GetSessionQueryVariables) => ({
                fn: getSessionGraphQL,
                args: {
                    id
                }
            }),
            transformResponse: (result: GetSessionQuery) => (result.getSession)
        })
    })
})

export const {
    useCreateSessionMutation,
    useGetSessionQuery
} = sessionApi;