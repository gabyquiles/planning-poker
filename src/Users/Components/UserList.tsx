import * as React from 'react';
import { useEffect } from 'react';
import { Button, createStyles, List, ListItem, ListItemText, makeStyles, Theme, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, subscribeForUsers } from '../Infrastructure/datastore/usersReducer';
import { useUser } from './UserContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      maxWidth: 752,
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
  }),
);

export default function UserList() {
  const classes = useStyles();
  const { logout } = useUser();
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.data);
  useEffect(() => {
    dispatch(getUsers());
    subscribeForUsers(dispatch);
  }, []);
  return (
    <>
      <Typography variant='h6' className={classes.title}>
        Participants
      </Typography>
      <List>
        {users.map(user => (
          <ListItem button key={user.id}>
            <ListItemText primary={user.email} />
          </ListItem>
        ))}
      </List>
      <Button onClick={logout} variant={'contained'} color={'secondary'}>Sign Out</Button>
    </>
  );
}
