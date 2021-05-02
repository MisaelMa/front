import React, {ReactNode} from 'react';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import clsx from 'clsx';
import {createStyles, makeStyles, Theme, useTheme} from '@material-ui/core/styles';
import {drawerWidth} from '../../../../styles/theme';

const useStyles = makeStyles<Theme>((theme) => createStyles({
    drawer: {
        width: drawerWidth,
        whiteSpace: 'nowrap',
    },
    drawerPaper: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    appBarSpacer: {
        ...theme.mixins.toolbar
    },
    toolbar: {
        ...theme.mixins.toolbar
    },

}));

interface AppDrawerBaseProps {
    open: boolean;

    onChangeDrawer(): void;
}

interface DefaultMode extends AppDrawerBaseProps {
    mode?: 'default';
    children: ReactNode;
}

interface CustomMode extends AppDrawerBaseProps {
    mode: 'custom';

    children(props: any): ReactNode;
}

interface ResponsiveMode extends AppDrawerBaseProps {
    mode: 'responsive';
    children: ReactNode;
}

export type AppDrawerProps = CustomMode | DefaultMode | ResponsiveMode;

const AppDrawer: React.FC<AppDrawerProps> = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const {onChangeDrawer, open} = props;

    switch (props.mode) {
        case 'custom':
            return (
                <>
                    {props.children({open, onChangeDrawer})}
                </>
            );
        case 'default':
            return (
                <>

                    <Hidden mdUp implementation="js">
                        <nav>
                            <Drawer
                                variant="temporary"
                                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                                open={open}
                                onClose={onChangeDrawer}
                                className={
                                    clsx(classes.drawer, {
                                        [classes.drawerPaper]: open,
                                        [classes.drawerPaperClose]: !open,
                                    })
                                }
                                classes={{
                                    paper: clsx({
                                        [classes.drawerPaper]: open,
                                        [classes.drawerPaperClose]: !open
                                    }),
                                }}
                                ModalProps={{
                                    keepMounted: true, // Better open performance on mobile.
                                }}
                            >
                                {props.children}
                            </Drawer>
                        </nav>
                    </Hidden>
                    <Hidden smDown implementation="js">
                        <Drawer
                            className={
                                clsx(classes.drawer, {
                                    [classes.drawerPaper]: open,
                                    [classes.drawerPaperClose]: !open,
                                })
                            }
                            classes={{
                                paper: clsx({
                                    [classes.drawerPaper]: open,
                                    [classes.drawerPaperClose]: !open
                                }),
                            }}
                            variant="permanent"
                            open={open}
                        >
                            {props.children}

                        </Drawer>
                    </Hidden>

                </>
            );
        case 'responsive':
            return (
                <>
                    <nav>
                        <Drawer
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={open}
                            onClose={onChangeDrawer}
                            className={
                                clsx(classes.drawer, {
                                    [classes.drawerPaper]: open,
                                    [classes.drawerPaperClose]: !open,
                                })
                            }
                            classes={{
                                paper: clsx({
                                    [classes.drawerPaper]: open,
                                    [classes.drawerPaperClose]: !open
                                }),
                            }}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            {props.children}
                        </Drawer>
                    </nav>
                </>
            );
        default:
            return (
                <>
                    <Hidden mdUp implementation="js">
                        <nav>
                            <Drawer
                                variant="persistent"
                                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                                open={open}
                                onClose={onChangeDrawer}
                                className={
                                    clsx(classes.drawer, {
                                        [classes.drawerPaper]: open,
                                        [classes.drawerPaperClose]: !open,
                                    })
                                }
                                classes={{
                                    paper: clsx({
                                        [classes.drawerPaper]: open,
                                        [classes.drawerPaperClose]: !open
                                    }),
                                }}
                                ModalProps={{
                                    keepMounted: true, // Better open performance on mobile.
                                }}
                            >

                                {
                                    // @ts-ignore
                                    props.children
                                }
                            </Drawer>
                        </nav>
                    </Hidden>
                    <Hidden smDown implementation="js">
                        <Drawer
                            className={
                                clsx(classes.drawer, {
                                    [classes.drawerPaper]: open,
                                    [classes.drawerPaperClose]: !open,
                                })
                            }
                            classes={{
                                paper: clsx({
                                    [classes.drawerPaper]: open,
                                    [classes.drawerPaperClose]: !open
                                }),
                            }}
                            variant="permanent"
                            open={open}
                        >
                            {
                                // @ts-ignore
                                props.children
                            }
                        </Drawer>
                    </Hidden>
                </>
            );
    }
};

export default AppDrawer;
