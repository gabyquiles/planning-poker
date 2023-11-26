import React, { useState } from 'react';
import Layout from '../../components/layout';
import { Grid, Paper, type Theme } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import { useGetSessionQuery } from '@Session/Infrastructure/http/SessionApi';
import { useIdentity } from '@src/contexts/User/IdentityContext';
import CardOptions from '@src/Cards/Components/CardOptions';
import UserList from '@Users/Components/UserList';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

const SessionPage = ({ params: {id: sessionId} }: {params: {id: string}}) => {
  const [user, setUser] = useState();
  const getIdentity = useIdentity();
  const {data: session} = useGetSessionQuery({id: sessionId});
  
  getIdentity().then(setUser);
  
  const classes = useStyles();

  if(!user || !session) {
    return <h1>Loading</h1>
  }

  return (
    <Layout>
      <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid item xs={9}>
            <Paper className={classes.paper}>
              {user}
              {/* <VotesTally /> */}
              {/* <SessionControls /> */}
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}><UserList /></Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}><CardOptions /></Paper>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

export default SessionPage;
