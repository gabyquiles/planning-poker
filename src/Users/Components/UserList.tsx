import * as React from 'react';
import { useEffect } from 'react';
import { Button, List, ListItem, ListItemText, type Theme, Typography } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import { useGetUsersQuery } from '@src/Users/Infrastructure/http/UserApi';

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
  const {data: users, isLoading} = useGetUsersQuery();
  // const { logout } = useUser();

  if(isLoading) {
    return <h1>Loading</h1>
  }

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
      {/* <Button onClick={logout} variant={'contained'} color={'secondary'}>Sign Out</Button> */}
    </>
  );
}
