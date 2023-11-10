import React from 'react';
import Layout from '../components/layout';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import CreateSessionButton from '../Cards/Components/CreateSessionButton';

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
      <h1>Hello World</h1>
      <CreateSessionButton />
      {/* <AmplifyS3Album />
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
      </div> */}
    </Layout>
  );
};

export default IndexPage;
