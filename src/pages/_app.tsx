import React from 'react';
import '@/styles/global.css';
import App, { AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline, Grid } from '@material-ui/core';
import { RequestQueryBuilder } from '@nestjsx/crud-request';
import { SnackbarProvider } from 'notistack';
import PageOfficialLayout from '@/components/Layout/pageOfficial';
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { theme } from '../lib/theme';
import AppLayout from '../components/Layout';

interface AppPropsCustom extends AppProps, AppContext {
  host: string;
  csrfToken: string;
  Component: any;
}

const MyApp = ({ Component, pageProps, host }: AppPropsCustom) => {
  const Layout = Component.Layout || PageOfficialLayout;
  return (
    <>
      <Head>
        <title>Test</title>
      </Head>
      <ThemeProvider theme={theme}>
        <div>
          <CssBaseline />
          <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{
              horizontal: `right`,
              vertical: `top`,
            }}
          >
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <AppLayout type={1}>
                <Component {...pageProps} />
              </AppLayout>
            </MuiPickersUtilsProvider>
          </SnackbarProvider>
        </div>
      </ThemeProvider>
    </>
  );
};

MyApp.getInitialProps = async ({ Component, ctx }: AppContext) => {
  const pageProps = Component.getInitialProps
    ? await Component.getInitialProps(ctx)
    : {};
  return {
    pageProps,
  };
};

export default MyApp;
