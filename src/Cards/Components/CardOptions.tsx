import * as React from 'react';
import StoryPointCard from './StoryPointCard';
import { useUser } from '../../Users/Components/UserContext';
import { castVote } from '../Infrastructure/http/VotesApi';

export default function CardOptions() {
  const values = ['1', '2', '3', '5', '8', '13', '21', '?'];
  const { user } = useUser();

  return (
    <>
      {user && values.map(cardValue => (<StoryPointCard
        key={cardValue}
        value={cardValue}
        onClick={() => castVote(cardValue, user.email)} />),
      )}
    </>
  );
}
