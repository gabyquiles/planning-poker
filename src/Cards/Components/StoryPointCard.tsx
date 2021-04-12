import * as React from 'react';
import { Card, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      display: 'inline-block',
      width: '6.6em',
      height: '9.2em',
      margin: '1em',
    },
    cardValue: {},
  }),
);

interface ICardProps {
  value?: string;
  onClick?: () => void;
}

export default function StoryPointCard({ value, onClick }: ICardProps) {
  const classes = useStyles();
  return (
    <>
      <Card className={classes.card} onClick={onClick}>
        <Typography className={classes.cardValue}>
          {value}
        </Typography>
      </Card>
    </>
  );
}
