import * as React from 'react';
import StoryPointCard from './StoryPointCard';
import { useUser } from '../../Users/Components/UserContext';
import { castVote } from '../Infrastructure/http/VotesApi';
import { Stack as MUStack } from '@mui/material';
import { styled } from '@mui/styles';

const Stack = styled(MUStack)(({theme}) => ({
  justifyContent: 'space-around'
}))

export default function CardOptions({sessionId, userId}: {sessionId: string, userId: string}) {
  const values = ['0', '1', '2', '3', '5', '8', '13', '21', '34', '55', '?'];
  // const { user } = useUser();

  return (
    <Stack direction={'row'}  useFlexGap flexWrap="wrap">
      {values.map(cardValue => (<StoryPointCard
        key={cardValue}
        value={cardValue}
        onClick={() => castVote(cardValue, userId)} />),
      )}
    </Stack>
  );
}
