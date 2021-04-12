import { CastVote, ResetVotes, ShowVotes } from '../../Types/Actions';
import { API, graphqlOperation } from 'aws-amplify';
import { createVote, deleteVote, updateVote } from '../../../graphql/mutations';

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
