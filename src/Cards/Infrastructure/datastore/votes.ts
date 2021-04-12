import { createGenericSlice, GenericState } from '../../../Shared/Infrastructure/datastore/GenericSlice';
import User from '../../../Users/Types/User';
import { Dispatch } from 'redux';
import { API, graphqlOperation } from 'aws-amplify';
import { onCreateVote, onDeleteVote, onUpdateVote } from '../../../graphql/subscriptions';

// export const castVote = createAsyncThunk('votes/castVote', (p) => {
//   console.log(p);
//   // return API.graphql(graphqlOperation(createVote, {})).then(({ data: { listUsers: { items } } }) => (items));
// });

export const subscribeToVotes = (dispatch: Dispatch) => {
  API.graphql(
    graphqlOperation(onCreateVote),
  ).subscribe({
    next: (resp) => dispatch(votesSlice.actions.receiveVote(resp.value.data.onCreateVote)),
  });
  API.graphql(
    graphqlOperation(onUpdateVote),
  ).subscribe({
    next: (resp) => dispatch(votesSlice.actions.updateVote(resp.value.data.onUpdateVote)),
  });
  API.graphql(
    graphqlOperation(onDeleteVote),
  ).subscribe({
    next: (resp) => dispatch(votesSlice.actions.deleteVote(resp.value.data.onDeleteVote)),
  });
};

// export const subscribeForUsers = (dispatch: Dispatch) => {
//   API.graphql(
//     graphqlOperation(onCreateUser),
//   ).subscribe({
//     next: (resp) => dispatch(usersSlice.actions.add(resp.value.data.onCreateUser)),
//   });
//   API.graphql(
//     graphqlOperation(onDeleteUser),
//   ).subscribe({
//     next: (resp) => dispatch(usersSlice.actions.remove(resp.value.data.onDeleteUser)),
//   });
// };

export const votesSlice = createGenericSlice({
  name: 'votes',
  initialState: {
    status: 'idle',
    data: [],
  } as GenericState<User[]>,
  reducers: {
    receiveVote: (state, action) => ({
      ...state,
      data: [...state.data, action.payload],
    }),
    updateVote: (state, action) => ({
      ...state,
      data: state.data.map(d => d.id === action.payload.id ? action.payload : d),
    }),
    deleteVote: (state, action) => ({
      ...state,
      data: state.data.filter(d => d.id !== action.payload.id),
    }),
  },
  extraReducers: (builder => {
  }),
});

export default votesSlice.reducer;
