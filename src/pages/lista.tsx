import React, { useEffect, useState } from 'react';
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
} from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import { generateTokenUuid } from '@/service/token.service';
import { setToke } from '@/service/rem.service';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: `100%`,
    },
  }),
);

export default function lista() {
  const classes = useStyles();

  useEffect(() => {
    getList();
  }, []);
  const getList = async () => {
    const token = await generateTokenUuid({ uuid: `asdlanklsdnklasd` });
    setToke(token.token);
  };
  const { push } = useRouter();
  return (
    <>
      <div className={classes.root} />
    </>
  );
}
