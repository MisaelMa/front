import React from 'react';
import { Theme, useMediaQuery } from '@material-ui/core';
import createCommerciTheme ,{ OptionsCustomTheme } from './creatorTheme';

export interface OptionsCreatorTheme extends OptionsCustomTheme {
}

// CallBack
type ThemeCreatorFactory = (optionsCreatorTheme?: OptionsCreatorTheme)  => Theme;

// Hook
type UseCreatorTheme = () => [ ThemeCreatorFactory ];

/**
 * Aplicalo solo para crear un componente temado si nó utiliza CreatorThemeFactory
 */
const useCreatorTheme: UseCreatorTheme = () => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const creatorFactoryTheme = React.useCallback<ThemeCreatorFactory>((options) => {
        return createCommerciTheme({
            optionsTheme: {
                ...options?.optionsTheme,
                palette: {
                    type: prefersDarkMode ? 'dark' : 'light',
                },
            },
            ...options?.optionsResponsiveFonts
        });
    }, [prefersDarkMode,]);
    return [creatorFactoryTheme];
};

export default useCreatorTheme;
