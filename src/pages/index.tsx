import React from 'react';
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
} from '@material-ui/core/styles';
// eslint-disable-next-line import/no-extraneous-dependencies
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import { StepIconProps } from '@material-ui/core/StepIcon';
import { Box, Card, CardMedia, Grid, TextField } from '@material-ui/core';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import VideoRecorder from 'react-video-recorder';
import SigInPad from '@/components/SigInPad';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { KeyboardDatePicker } from '@material-ui/pickers';
import moment from 'moment';
import { CAMERA_STATUS, useRecordWebcam } from 'react-record-webcam';
import Camera from '@/components/Camera';

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage: `linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)`,
    },
  },
  completed: {
    '& $line': {
      backgroundImage: `linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)`,
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: `#eaeaf0`,
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: `#ccc`,
    zIndex: 1,
    color: `#fff`,
    width: 50,
    height: 50,
    display: `flex`,
    borderRadius: `50%`,
    justifyContent: `center`,
    alignItems: `center`,
  },
  active: {
    backgroundImage: `linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)`,
    boxShadow: `0 4px 10px 0 rgba(0,0,0,.25)`,
  },
  completed: {
    backgroundImage: `linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)`,
  },
});

function ColorlibStepIcon(props: StepIconProps) {
  const classes = useColorlibStepIconStyles();
  const { active, completed, icon } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(icon)]}
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: `100%`,
    },
    center: {
      minWidth: `100%`,
      minHeight: `400`,
      display: `flex`,
      flexDirection: `column`,
      justifyContent: `center`,
    },
    button: {
      marginRight: theme.spacing(1),
      float: `right`,
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }),
);

function getSteps() {
  return [`Datos`, `Video`, `Firma`];
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

export default function CustomizedSteppers() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(2);
  const steps = getSteps();

  const handleNext = () => {
    formik.handleSubmit();
    // setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  function formatDate(date: string | Date) {
    return moment(date, `YYYY/MM/DD`).isBefore(moment());
  }

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const ValidateSchema = Yup.object().shape({
    fullName: Yup.string().required(`Required`),
    birthDate: Yup.date()
      .max(new Date(), ({ min }) => `Date needs to be before !!`)
      .required(`Required`),
    birthPlace: Yup.string()
      .min(2, `Too Short!`)
      .max(50, `Too Long!`)
      .required(`Required`),
    email: Yup.string().email(`Invalid email`).required(`Required`),
    phone: Yup.string()
      .required(`This field is required`)
      .matches(phoneRegExp, `Phone number is not valid`),
  });

  const formik = useFormik({
    initialValues: {
      fullName: ``,
      birthDate: new Date(),
      birthPlace: ``,
      email: ``,
      phone: ``,
    },
    validationSchema: ValidateSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      setActiveStep(1);
    },
  });
  const handleReset = () => {
    setActiveStep(0);
  };

  const saveFile = async (recorder: Blob) => {
    console.log(recorder);
    setActiveStep(2);
  };

  return (
    <div className={classes.root}>
      <Stepper
        style={{ padding: 10, borderRadius: 6 }}
        activeStep={activeStep}
        connector={<ColorlibConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <br />
      <div>
        <TabPanel value={activeStep} index={0}>
          <Card style={{ padding: 30, borderRadius: 6 }}>
            <form style={{ width: `100%` }} noValidate autoComplete='off'>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                  <TextField
                    error={!!formik.errors.fullName}
                    helperText={formik.errors.fullName}
                    onChange={formik.handleChange(`fullName`)}
                    style={{ width: `100%` }}
                    name='fullName'
                    label='Nombre Completo'
                    size='medium'
                    variant='outlined'
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                  <KeyboardDatePicker
                    error={!!formik.errors.birthDate}
                    helperText={formik.errors.birthDate}
                    format='MM/dd/yyyy'
                    onChange={(val) => {
                      console.log(moment(val).format(`MM/DD/yyyy`));
                      formik.setFieldValue(
                        `birthDate`,
                        moment(val).format(`MM/DD/yyyy`),
                      );
                    }}
                    value={formik.values.birthDate}
                    disableToolbar
                    style={{ width: `100%` }}
                    name='birthDate'
                    label='Fecha de Nacimiento'
                    size='medium'
                    inputVariant='outlined'
                    KeyboardButtonProps={{
                      'aria-label': `change date`,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                  <TextField
                    error={!!formik.errors.birthPlace}
                    helperText={formik.errors.birthPlace}
                    onChange={formik.handleChange(`birthPlace`)}
                    style={{ width: `100%` }}
                    name='birthPlace'
                    label='Lugar de Nacimiento'
                    size='medium'
                    variant='outlined'
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                  <TextField
                    error={!!formik.errors.email}
                    helperText={formik.errors.email}
                    onChange={formik.handleChange(`email`)}
                    name='email'
                    style={{ width: `100%` }}
                    label='Correo'
                    size='medium'
                    variant='outlined'
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                  <TextField
                    error={!!formik.errors.phone}
                    helperText={formik.errors.phone}
                    onChange={formik.handleChange(`phone`)}
                    name='phone'
                    style={{ width: `100%` }}
                    label='Telefono'
                    size='medium'
                    variant='outlined'
                  />
                </Grid>
              </Grid>
            </form>
            <Button
              variant='contained'
              color='primary'
              onClick={() => {
                // handleNext()
                setActiveStep((prevState) => {
                  if (prevState === 2) {
                    return 0;
                  }
                  return prevState + 1;
                });
              }}
              className={classes.button}
            >
              {activeStep === steps.length - 1 ? `Finish` : `Next`}
            </Button>
          </Card>
        </TabPanel>
        <TabPanel value={activeStep} index={1}>
          <Grid
            container
            className={classes.center}
            spacing={0}
            alignItems='center'
            justify='center'
          >
            <Card style={{ width: `500px` }}>
              <Camera onFinish={saveFile} />
            </Card>
          </Grid>
          <Button
            variant='contained'
            color='primary'
            onClick={() => {
              // handleNext()
              setActiveStep((prevState) => {
                if (prevState === 2) {
                  return 0;
                }
                return prevState + 1;
              });
            }}
            className={classes.button}
          >
            {activeStep === steps.length - 1 ? `Finish` : `Next`}
          </Button>
        </TabPanel>
        <TabPanel value={activeStep} index={2}>
          <Grid
            container
            className={classes.center}
            spacing={0}
            alignItems='center'
            justify='center'
          >
            <SigInPad />
          </Grid>
          <Button
            variant='contained'
            color='primary'
            onClick={() => {
              // handleNext()
              setActiveStep((prevState) => {
                if (prevState === 2) {
                  return 0;
                }
                return prevState + 1;
              });
            }}
            className={classes.button}
          >
            {activeStep === steps.length - 1 ? `Finish` : `Next`}
          </Button>
        </TabPanel>
      </div>
      <div>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          className={classes.button}
        >
          Back
        </Button>
      </div>
    </div>
  );
}
