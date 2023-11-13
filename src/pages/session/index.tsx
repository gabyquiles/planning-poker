import React from 'react';
import Layout from '../../components/layout';
import { Grid, Paper, Theme } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import UserList from '../../Users/Components/UserList';
import CardOptions from '../../Cards/Components/CardOptions';
import VotesTally from '../../Cards/Components/VotesTally';
import SessionControls from '../../Cards/Components/SessionControls';

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

const IndexPage = () => {
  const classes = useStyles();

  return (
    <Layout>
      <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid item xs={9}>
            <Paper className={classes.paper}>
              <VotesTally />
              <SessionControls />
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

export default IndexPage;
