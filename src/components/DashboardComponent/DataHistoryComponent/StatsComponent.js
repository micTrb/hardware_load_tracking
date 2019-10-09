

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
    fontWeight: "bold"
  },
  pos: {
    marginBottom: 12,
  },
});

export default function TablePaginationActionsComponent(props) {
  const classes = useStyles();

  return (
    <CardContent>
      <Typography className={classes.title} color="textSecondary" gutterBottom>
        {props.title}
      </Typography>
      <Typography className={classes.pos} color="textSecondary">
        {props.content}
      </Typography>
    </CardContent>
  );
}

