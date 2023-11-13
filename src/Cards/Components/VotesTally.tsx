import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { subscribeToVotes } from '../Infrastructure/datastore/votes';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function VotesTally() {
  const dispatch = useDispatch();
  useEffect(() => {
    subscribeToVotes(dispatch);
  }, []);

  const votes = useSelector(state => state.votes.data);
  const classes = useStyles();
  return (<>
    <Table className={classes.table} aria-label='simple table'>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell align='right'>Vote</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {votes.map(vote => (
          <TableRow key={vote.id}>
            <TableCell component='th' scope='row'>
              {vote.author}
            </TableCell>
            <TableCell align='right'>{vote.show ? vote.value : '-'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    {/*{votes.map(vote => <TalliedVote key={vote.id} vote={vote} />)}*/}
  </>);
}
