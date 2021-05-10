import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import { generateTokenUuid } from '@/service/token.service';
import { getRems, setToke } from '@/service/rem.service';

import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Grid } from '@material-ui/core';
import { Image } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: `50%`,
    },
    media: {
      height: 0,
      paddingTop: `56.25%`, // 16:9
    },
    card: {
      width: `50%`,
    },
    center: {
      minWidth: `100%`,
      minHeight: `100%`,
      height: `100vh`,
      display: `flex`,
      flexDirection: `column`,
      justifyContent: `center`,
    },
    avatar: {
      backgroundColor: red[500],
    },
  }),
);

export default function lista() {
  const classes = useStyles();
  const [rem, setRem] = useState<any[]>([]);
  useEffect(() => {
    getList();
  }, []);
  const getList = async () => {
    const token = await generateTokenUuid({ uuid: `asdlanklsdnklasd` });
    setToke(token.token);
    const data = await getRems();
    setRem(data);
    console.log(data);
  };
  const { push } = useRouter();
  return (
    <>
      <Grid
        container
        spacing={0}
        direction='column'
        alignItems='center'
        justify='center'
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={3}>
          <br />
          <br />
          <br />
          {rem.map((re, i) => (
            <div key={i}>
              <Card>
                <CardHeader
                  avatar={
                    <Avatar aria-label='recipe' className={classes.avatar}>
                      R
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label='settings'>
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={re.fullName}
                  subheader={re.birthDate + ' ' + re.birthPlace}

                />
                <span style={{ marginLeft: 10 }}>
                  Firma
                </span>
                <img
                  src={'https://rem.signati.app/api/file/'+re.signing}
                  height={200}
                  width={'100%'}
                />
                <span
                  style={{ marginLeft: 10 }}>
                Video
                </span>
                <video height={200} width={'100%'} autoPlay src={'https://rem.signati.app/api/file/'+re.video}></video>
                <CardContent>
                  <Typography variant='body2' color='textSecondary' component='p'>
                    {re.email}
                  </Typography>
                  <Typography variant='body2' color='textSecondary' component='p'>
                    {re.phone}
                  </Typography>
                </CardContent>
              </Card>
              <br />
            </div>
          ))}
        </Grid>
      </Grid>
    </>
  );
}
