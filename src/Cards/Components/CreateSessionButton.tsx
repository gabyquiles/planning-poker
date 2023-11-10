import * as React from 'react'
import { Button, Theme, createStyles, makeStyles } from '@material-ui/core'
import { createSession } from '../Infrastructure/http/VotesApi'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
  }),
);

export default function CreateSessionButton() {
    const classes = useStyles();

    const newSession = async () => {
        const sessionId = await createSession('hello')
        console.log(sessionId)
    }

    return (
    <Button 
    className={classes.button}
    variant={'contained'}
    color={'primary'}
    onClick={newSession}
    >
        Create New Session
    </Button>
    );
}