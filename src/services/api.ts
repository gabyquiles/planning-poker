import { createApi } from '@reduxjs/toolkit/query/react'
import { API, graphqlOperation } from 'aws-amplify';

type BaseQueryParams = Parameters<typeof graphqlOperation>
export type GraphQLResultType<T> = {data: T}

export const api = createApi({
    reducerPath: 'splitApi',
    baseQuery: async ({fn, args, authToken}: {fn: BaseQueryParams[0], args?: BaseQueryParams[1], authToken?: BaseQueryParams[2]}) => {
        
        const result = await API.graphql(graphqlOperation(fn, args, authToken)) as GraphQLResultType<unknown>;
        if(result.data === undefined) {
            result.data = {};
        }
        return result as GraphQLResultType<unknown> & {data: unknown}
    },
    endpoints: () => ({})
})