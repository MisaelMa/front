import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/styles';
import { AppContext, AppInitialProps } from 'next/app';

const AppDocument = ({ ...initialProps }: Document & AppInitialProps) => (
  <html lang='en' dir='ltr'>
  <Head>
    <meta charSet='utf-8' />
    <meta
      name='viewport'
      content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no'
    />
    <meta property='og:type' content='website' />
    <link
      rel='stylesheet'
      href='https://fonts.googleapis.com/icon?family=Material+Icons'
    />
    <link
      rel='apple-touch-icon'
      sizes='180x180'
      href='/images/apple-touch-icon.png'
    />
    <link rel='apple-touch-icon' href='/images/icon.png' />
    <link rel='icon' type='image/png' href='/images/icon.png' />
    <link rel='shortcut icon' href='/favicon.ico' />
  </Head>
  <body>
  <Main />
  <NextScript />
  </body>
  </html>
);

AppDocument.getInitialProps = async (ctx: any) => {
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) => (props: any) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    styles: [
      <React.Fragment key={0}>
        {initialProps.styles}
        {sheets.getStyleElement()}
      </React.Fragment>,
    ],
  };
};
AppDocument.renderDocument = Document.renderDocument;

export default AppDocument;
