import React from 'react';
import { Button, Card, Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    center: {
      minWidth: `100%`,
      minHeight: `100%`,
      height: `100vh`,
      display: `flex`,
      flexDirection: `column`,
      justifyContent: `center`,
    },
    card: {
      maxWidth: `40%`,
      minHeight: `20vh`,
      display: `flex`,
      alignItems: `center`,
    },
  }),
);
const Rem = () => {
  const classes = useStyles();
  return (
    <>
      <Grid
        container
        className={classes.center}
        spacing={0}
        alignItems="center"
        justify="center"
      >
        <Button  variant="contained" color="primary">
          Iniciar
        </Button>
      </Grid>
    </>
  );
};
export default Rem;
