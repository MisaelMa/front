import React, {FC, MouseEventHandler} from 'react';
import {AppBar, createStyles, IconButton, makeStyles, Theme, Toolbar, Typography} from '@material-ui/core';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import clsx from 'clsx';
import {useRouter} from 'next/router';
import {drawerWidth} from '../../../styles/theme';

//import { useLayout } from '@commerci/core/LayoutProvider';

export interface AppHeaderProps {
    readonly titleAppBar: string | React.ReactNode;
    readonly openDrawer: boolean;

    handleDrawer(): void;
}

const useStyles = makeStyles<Theme>((theme) => createStyles({
    title: {
        flexGrow: 1,
    },
    appBar: {
        background: theme.palette.primary.main,
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        background: theme.palette.primary.main,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 20,
    },
    menuButtonHidden: {},
}));

const PageHeader: FC<AppHeaderProps> = (props) => {
    const classes = useStyles(props);
    const router = useRouter();
    // const { settingsPage, isOpenDrawer, currentRoute, openDrawer, setCurrentRoute, navigationState } = useLayout();
    const handleRouterBack: MouseEventHandler = (event) => {
        // event.preventDefault();
        // console.log(navigationState.currentRoute?.goTo);
        // if (!navigationState.currentRoute?.goTo) { return router.back(); }
        // return router.push(navigationState.currentRoute.goTo.to,navigationState.currentRoute.goTo.url)
        //     .then(() => setCurrentRoute({ goTo: undefined }) );
    };
    const {openDrawer, handleDrawer} = props

    const isOpenDrawer = true;

    return (
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, openDrawer && classes.appBarShift)}
        >
            <Toolbar style={{minHeight: '52px'}}>

                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={() => handleDrawer()}
                    className={clsx(classes.menuButton, openDrawer && classes.menuButtonHidden)}
                >
                    <MenuRoundedIcon fontSize="small"/>
                </IconButton>
                <Typography
                    variant="h5"
                    color="inherit"
                    className={classes.title}
                >
                    {props.titleAppBar}
                </Typography>

            </Toolbar>
        </AppBar>
    );
};

export default PageHeader;
