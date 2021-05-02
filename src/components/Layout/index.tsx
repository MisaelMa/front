import React, { useEffect } from 'react';
import { Omit } from '@material-ui/types';
import {
  Box,
  BoxProps,
  CircularProgress,
  Container,
  Grid,
} from '@material-ui/core';

import { useRouter } from 'next/router';
import PageOfficialLayout from './pageOfficial';

export interface AppLayoutProps {
  type?: number;
  BoxAppProps?: BoxProps;
}

const AppLayout: React.FC<Omit<AppLayoutProps, 'header' | 'drawer'>> = (
  props,
) => {
  const router = useRouter();
  const [role, setRole] = React.useState(1);
  // const handleUser = () => {
  //   console.log(data)
  //   const type = data.session.token.length > 0 ? 2 : 1;
  //   setRole(type);
  // };
  //
  // React.useEffect(() => {
  //   handleUser();
  // }, [router.pathname]);
  //
  // eslint-disable-next-line default-case
  switch (role) {
    case 1: {
      return (
        <>
          <PageOfficialLayout>{props.children}</PageOfficialLayout>
        </>
      );
    }
    default: {
      return (
        <>
          <Container maxWidth="xs">
            <Box height="45vh" />
            <Box my={5}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <CircularProgress color="secondary" />
              </Grid>
            </Box>
          </Container>
        </>
      );
    }
  }
};

export default AppLayout;
