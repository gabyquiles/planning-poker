import { createGenericSlice, GenericState } from '../../../Shared/Infrastructure/datastore/GenericSlice';
import User from '../../Types/User';
import { API, graphqlOperation } from 'aws-amplify';
import { onCreateUser, onDeleteUser } from '../../../graphql/subscriptions';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { listUsers } from '../../../graphql/queries';
import { Dispatch } from 'redux';

export const subscribeForUsers = (dispatch: Dispatch) => {
  API.graphql(
    graphqlOperation(onCreateUser),
  ).subscribe({
    next: (resp) => dispatch(usersSlice.actions.add(resp.value.data.onCreateUser)),
  });
  API.graphql(
    graphqlOperation(onDeleteUser),
  ).subscribe({
    next: (resp) => dispatch(usersSlice.actions.remove(resp.value.data.onDeleteUser)),
  });
};

export const getUsers = createAsyncThunk('users/getUsers', () => {
  return API.graphql(graphqlOperation(listUsers, {})).then(({ data: { listUsers: { items } } }) => (items));
});

export const usersSlice = createGenericSlice({
  name: 'users',
  initialState: {
    status: 'idle',
    data: [],
  } as GenericState<User[]>,
  reducers: {
    add: (state, action) => ({
      ...state,
      data: [...state.data, action.payload],
    }),
    remove: (state, action) => ({
      ...state,
      data: state.data.filter((user: User) => user.id !== action.payload.id),
    }),
  },
  extraReducers: (builder => {
    builder.addCase(getUsers.fulfilled, (state, { payload }) => {
      console.log(state.data);
      console.log(payload.data);
      state.status = 'finished';
      state.data = [...state.data, ...payload];

      // return ({
      //   ...state,
      //   status: 'finished',
      //   data: [...state.data, ...payload.data],
      // });
    });
  }),
});

export default usersSlice.reducer;
