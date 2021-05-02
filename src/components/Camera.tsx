import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import VideocamIcon from '@material-ui/icons/Videocam';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import React, { useEffect, useState } from 'react';
import { CAMERA_STATUS, useRecordWebcam } from 'react-record-webcam';
import { Button, Fab, Grid } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/styles';
import clsx from 'clsx';
import ReplayIcon from '@material-ui/icons/Replay';

const useStyles = makeStyles((theme) => ({
  animatedItem: {
    animation: `$recording 2s infinite ${theme.transitions.easing.easeInOut}`,
    position: `relative`,
    '&::before': {
      animation: `$recording_before 2s infinite ${theme.transitions.easing.easeInOut}`,
    },
  },
  permisos: {
    height: 200,
    width: `100%`,
  },
  animatedItemExiting: {
    animation: `$myEffectExit 3000ms ${theme.transitions.easing.easeInOut}`,
    opacity: 0,
    transform: `translateY(-200%)`,
  },
  '@keyframes recording': {
    from: {
      transform: `scale( 1.1 )`,
    },
    '50%': {
      transform: `none`,
    },
    to: {
      transform: `scale( 1.1 )`,
    },
  },
  '@keyframes recording_before': {
    '80%': {
      width: `200px`,
      height: `200px`,
      margin: `-100px`,
      opacity: 0,
    },
    to: {
      opacity: 0,
    },
  },
}));

  const StyledButton = withStyles({
    root: {
      background: `linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)`,
      borderRadius: 3,
      border: 0,
      color: `white`,
      height: 48,
      padding: `0 30px`,
      boxShadow: `0 3px 5px 2px rgba(255, 105, 135, .3)`,
    },
    label: {
      textTransform: `capitalize`,
    },
  })(Fab);

interface CameraProps {
  onFinish: (blob: Blob) => void;
}

const Camera = (props: CameraProps) => {
  const { onFinish } = props;
  const recordWebcam = useRecordWebcam({
    recordingLength: 11,
  });

  const [counter, setCounter] = useState(10);
  useEffect(() => {
    if (counter === 0) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      recordWebcam.stop();
      recordWebcam.stopStream();
      saveFile();
      setCounter(10);
    }
    if (recordWebcam.status === CAMERA_STATUS.RECORDING) {
      const timer =
        counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [counter, recordWebcam.status]);
  const saveFile = async () => {
    setTimeout(async () => {
      const blob = await recordWebcam.getRecording();
      onFinish(blob)
      console.log(blob);
    }, 1000);
  };
  const [player, setPlayer] = useState({
    currentTime: 0,
    duration: 0,
    progress: 0,
    paused: true,
    muted: false,
  });

  const setDuration = () => {
    setPlayer({
      ...player,
      duration: recordWebcam.previewRef.current!.duration,
    });
  };

  const updateTime = () => {
    setPlayer({
      ...player,
      currentTime: recordWebcam.previewRef!.current!.currentTime,
      progress: (100 * player.currentTime) / player.duration,
    });
  };

  const playPause = () => {
    recordWebcam.previewRef!.current!.paused
      ? recordWebcam.previewRef!.current!.play()
      : recordWebcam.previewRef!.current!.pause();
    setPlayer({
      ...player,
      paused: recordWebcam.previewRef!.current!.paused,
      duration: recordWebcam.previewRef.current!.duration,
    });
  };

  const muteUnmute = () => {
    recordWebcam.previewRef!.current!.muted = !recordWebcam.previewRef!.current!
      .muted;
    setPlayer({ ...player, muted: recordWebcam.previewRef!.current!.muted });
  };
  const classes = useStyles();
  const startRecorder = () => {
    recordWebcam.start();
  };
  return (
    <Card id='vp-card'>
      <div>
        {recordWebcam.status !== CAMERA_STATUS.CLOSED ? (
          <Grid
            container
            spacing={2}
            style={{ position: `absolute`, zIndex: 10, width: 550 }}
          >
            <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
              <div style={{ display: `flex`, padding: 10 }}>
                <Avatar
                  className={clsx(
                    recordWebcam.status === CAMERA_STATUS.RECORDING
                      ? classes.animatedItem
                      : ``,
                  )}
                >
                  <StyledButton
                    disabled={recordWebcam.status !== CAMERA_STATUS.OPEN}
                    onClick={startRecorder}
                  >
                    <VideocamIcon />
                  </StyledButton>
                </Avatar>
                {recordWebcam.status === CAMERA_STATUS.PREVIEW ? (
                  <Avatar style={{ marginLeft: 10 }}>
                    <StyledButton onClick={recordWebcam.retake}>
                      <ReplayIcon />
                    </StyledButton>
                  </Avatar>
                ) : null}
              </div>
            </Grid>
            <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
              <Fab
                size='small'
                color='secondary'
                aria-label='add'
                style={{ marginTop: 8, marginLeft: -6 }}
              >
                {counter}
              </Fab>
            </Grid>
          </Grid>
        ) : null}
      </div>
      <div>
        {recordWebcam.status === CAMERA_STATUS.CLOSED ? (
          <Grid
            container
            spacing={5}
            direction='column'
            alignItems='center'
            justify='center'
            style={{ height: `450px` }}
          >
            <Grid item xs={12}>
              <Card>
                <Button
                  onClick={() => {
                    recordWebcam.open();
                  }}
                >
                  Activar Camara
                </Button>
              </Card>
            </Grid>
          </Grid>
        ) : null}
        <video
          id='vp-media'
          width='100%'
          style={{
            display:
              recordWebcam.status !== CAMERA_STATUS.PREVIEW
                ? recordWebcam.status !== CAMERA_STATUS.CLOSED
                ? ``
                : `none`
                : `none`,
            position: `relative`,
          }}
          ref={recordWebcam.webcamRef}
          autoPlay
          muted
        />
        <video
          id='preview'
          width='100%'
          onLoadedMetadata={setDuration}
          onTimeUpdate={updateTime}
          style={{
            display:
              recordWebcam.status === CAMERA_STATUS.PREVIEW ? `flex` : `none`,
            position: `relative`,
          }}
          ref={recordWebcam.previewRef}
        />
      </div>
      {recordWebcam.status === CAMERA_STATUS.PREVIEW ? (
        <CardActions>
          <IconButton aria-label='Play/Pause' onClick={playPause}>
            {player.paused ? <PlayArrowIcon /> : <PauseIcon />}
          </IconButton>
          <LinearProgress
            id='vp-progress'
            variant='determinate'
            color='primary'
            size={10}
            style={{ width: 400 }}
            value={player.progress}
          />
          <span>
            {Math.floor(player.currentTime)}/
            {Math.floor(player.duration) === Infinity
              ? 10
              : Math.floor(player.duration)}
          </span>
          <IconButton aria-label='Play/Pause' onClick={muteUnmute}>
            {player.muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
          </IconButton>
        </CardActions>
      ) : null}
    </Card>
  );
};

export default Camera;
