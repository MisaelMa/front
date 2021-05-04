import React from 'react';
import { Theme, ThemeProvider } from '@material-ui/core/styles';
import useCreatorTheme ,{ OptionsCreatorTheme } from './useCreatorTheme';


interface CreatorThemeProps {
    theme?: OptionsCreatorTheme;
}

/**
 * Usa solo si quieres aplicar estilos a un nivel anidado
 */
const CreatorThemeFactory: React.FC<CreatorThemeProps> = (props) => {
    const [creatorTheme] = useCreatorTheme();

    const handleParentTheme = React.useCallback((theme: Theme) => {
        return creatorTheme({ optionsTheme: {...theme,...props.theme?.optionsTheme}});
    }, [props]);
    return (
        <ThemeProvider theme={(theme) => { return handleParentTheme(theme as Theme); }}>
            {props.children}
        </ThemeProvider>
    );
};
export default CreatorThemeFactory;
