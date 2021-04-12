import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../../../Users/Infrastructure/datastore/usersReducer';
import votesReducer from '../../../Cards/Infrastructure/datastore/votes';

export default () => {
  return configureStore({
    reducer: {
      users: usersReducer,
      votes: votesReducer,
    },
  });
};
