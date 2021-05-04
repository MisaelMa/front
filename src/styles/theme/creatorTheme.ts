import { indigo, pink, red } from '@material-ui/core/colors';
import createMuiTheme ,{ ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import responsiveFontSizes ,{ ResponsiveFontSizesOptions } from '@material-ui/core/styles/responsiveFontSizes';


/*export const creatorTheme = responsiveFontSizes(createMuiTheme({
    palette: {
        primary: indigo,
        secondary: pink,
        error: {
            main: red.A400,
        },
        type: 'dark',
    },
    typography: {
        fontFamily: [
            'Quicksand',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
}));*/

export interface OptionsCustomTheme { optionsTheme?: ThemeOptions; optionsResponsiveFonts?: ResponsiveFontSizesOptions; }

const createCommerciTheme = (optionsCustomTheme?: OptionsCustomTheme) => {
    const myCustomTheme = createMuiTheme({
        ...optionsCustomTheme?.optionsTheme,
        palette: {
            primary: indigo,
            secondary: pink,
            error: {
                main: red.A400,
            },
            type: 'light',
            ...optionsCustomTheme?.optionsTheme?.palette
        },
        typography: {
            fontFamily: [
                'Quicksand',
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
            ...optionsCustomTheme?.optionsTheme?.typography
        },
    });
    return responsiveFontSizes(myCustomTheme, {...optionsCustomTheme?.optionsResponsiveFonts});
};

export default createCommerciTheme;
