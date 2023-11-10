import { CastVote, CreateSession, ResetVotes, ShowVotes } from '../../Types/Actions';
import { API, graphqlOperation } from 'aws-amplify';
import { createVote, deleteVote, updateVote, createSession as createSessionGraphQL } from '../../../graphql/mutations';

export const castVote: CastVote = (value, voter) => {
  API.graphql(graphqlOperation(createVote, {
    input: {
      author: voter,
      show: false,
      value,
    },
  }));
};

export const showVotes: ShowVotes = (votes) => {
  votes.forEach(vote => API.graphql(graphqlOperation(updateVote, {
    input: {
      id: vote.id,
      show: true,
    },
  })));
};

export const resetVotes: ResetVotes = (votes) => {
  votes.forEach(vote => API.graphql(graphqlOperation(deleteVote, {
    input: {
      id: vote.id,
    },
  })));
};

export const createSession: CreateSession = async (user) =>  {
  const {data: {createSession: {id}}} = await API.graphql(graphqlOperation(createSessionGraphQL, {
    input: {
      owner: user
    }
  }))
  return id;
}
