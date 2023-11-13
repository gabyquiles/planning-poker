import * as React from 'react';
import { Button, Theme } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import { useSelector } from 'react-redux';
import { resetVotes, showVotes } from '../Infrastructure/http/VotesApi';

export default function SessionControls() {
  const votes = useSelector(state => state.votes.data);
  return (<div>
    <Button
      variant={'contained'}
      color={'primary'}
      onClick={() => showVotes(votes)}
    >
      Show Votes
    </Button>
    <Button
      variant={'contained'}
      onClick={() => resetVotes(votes)}
    >
      Reset
    </Button>
  </div>);
}
