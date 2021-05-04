import Box from '@material-ui/core/Box';
import Head from 'next/head';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import Countdown from 'react-countdown';
import jwt_decode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    toolbar: {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbarTitle: {
      flex: 1,
      marginLeft: 5,
    },
    toolbarSecondary: {
      justifyContent: `space-between`,
      overflowX: `auto`,
    },
    toolbarLink: {
      padding: theme.spacing(1),
      flexShrink: 0,
    },
    large: {
      width: `200px`,
      height: `50px`,
    },
    background: {
      height: `100vh`,
      backgroundColor: `hsla(0,0%,94.1%,.8)!important`,
    },
  }),
);

const renderer = ({ hours, minutes, seconds, completed }: any) => {
  if (completed) {
    // Render a completed state
    return (
      <div>
        <div style={{ color: `black` }}>Tiempo Finalizado Reiniciando</div>
      </div>
    );
  }
  // Render a countdown
  return (
    <span style={{ color: `black` }}>
      {hours}:{minutes}:{seconds}
    </span>
  );
};

const PageOfficialLayout = ({ children }: any) => {
  const classes = useStyles();
  const [view, setView] = useState(false);
  const [caducado, setCaducado] = useState(false);
  const [expire, setExpire] = useState(0);
  const { query, pathname } = useRouter();
  const { push } = useRouter();
  useEffect(() => {
    if (pathname === `/rem`) {
      setView(true);
      console.log(pathname);
      const decote: any = jwt_decode(query.token as string);
      setExpire(decote.exp - Date.now() / 1000);
      if (decote.exp < Date.now() / 1000) {
        console.log(Date.now() / 1000);
        setCaducado(true);
        setOpen(true);
      }
    } else {
      setView(false);
    }
  }, [pathname]);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Head>
        <title>Test</title>
      </Head>
      <AppBar
        position='fixed'
        style={{ boxShadow: `none`, backgroundColor: `white` }}
      >
        <>
          <Toolbar className={classes.toolbar}>
            {view ? (
              <Countdown
                autoStart
                date={Date.now() + expire * 1000}
                renderer={renderer}
                onComplete={() => {
                  setOpen(true);
                }}
              />
            ) : null}
          </Toolbar>
        </>
      </AppBar>
      <Box display='flex' className={classes.background}>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>Proceso finalizdo</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              Redirigiendo
              <br />
              <span>
                <Countdown
                  autoStart
                  date={Date.now() + 3 * 1000}
                  onComplete={() => {
                    setOpen(false);
                    push(`/`);
                  }}
                  renderer={renderer}
                />
              </span>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleClose();
                push(`/`);
              }}
              color='primary'
              autoFocus
            >
              Reiniciar
            </Button>
          </DialogActions>
        </Dialog>
        <Box flexGrow={1} paddingY={9}>
          <Container>
            {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              children
            }
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default PageOfficialLayout;
