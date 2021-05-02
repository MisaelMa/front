import Box from '@material-ui/core/Box';
import Head from 'next/head';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Container } from '@material-ui/core';

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
const PageOfficialLayout: React.FC = (props) => {
  const classes = useStyles();
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
            <img
              alt='Remy Sharp'
              className={classes.large}
              src='../vercel.svg'
            />
          </Toolbar>
        </>
      </AppBar>
      <Box display='flex' className={classes.background}>

        <Box flexGrow={1} paddingY={9}>
          {/* eslint-disable-next-line react/destructuring-assignment */}
          <Container>
            {props.children}
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default PageOfficialLayout;
