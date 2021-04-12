import * as React from 'react';
import { Button, createStyles, makeStyles, Theme } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { resetVotes, showVotes } from '../Infrastructure/http/VotesApi';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
  }),
);

export default function SessionControls() {
  const classes = useStyles();
  const votes = useSelector(state => state.votes.data);
  return (<div>
    <Button
      className={classes.button}
      variant={'contained'}
      color={'primary'}
      onClick={() => showVotes(votes)}
    >
      Show Votes
    </Button>
    <Button
      className={classes.button}
      variant={'contained'}
      onClick={() => resetVotes(votes)}
    >
      Reset
    </Button>
  </div>);
}
