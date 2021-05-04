import React from 'react';
import { Button, Card, Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { generateTokenUuid } from '@/service/token.service';
import { addRem, setToke } from '@/service/rem.service';
import { useRouter } from 'next/router';

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
  const { push } = useRouter();
  const start = async () => {
    const token = await generateTokenUuid({ uuid: `asdlanklsdnklasd` });
    setToke(token.token);
    const rem = await addRem({
      email: ``,
      birthPlace: ``,
      fullName: ``,
    } as Rem);
    console.log(rem);
    push(`rem?uuid=${rem.id}&token=${token.token}&step=0`);

  };

  return (
    <>
      <Grid
        container
        className={classes.center}
        spacing={0}
        alignItems='center'
        justify='center'
      >
        <Button
          variant='contained'
          onClick={() => {
            start();
          }}
          color='primary'
        >
          Iniciar
        </Button>
      </Grid>
    </>
  );
};
export default Rem;
