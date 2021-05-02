import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#04949D',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});
