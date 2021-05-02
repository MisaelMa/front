import React, { useEffect } from 'react';
import { Button, CircularProgress, createStyles, makeStyles, Theme } from '@material-ui/core';
import { ButtonProps } from '@material-ui/core/Button';

enum LoadingStatus {
    Stopped = 'stopped',
    Loading = 'loading',
    Finished = 'finished',
}

interface LoadingButtonProps {
    loading?: boolean;
    handleFinishLoading?: () => void;
}

type ButtonCustomProps = LoadingButtonProps & Omit<ButtonProps, keyof LoadingButtonProps>;

const useStyles = makeStyles<Theme, ButtonCustomProps>((theme) => {
    return createStyles({
        root: {
            alignItems: 'center',
        },
        wrapper: {
            margin: theme.spacing(1),
            position: 'relative',
        },
        buttonProgress: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -12,
            marginLeft: -12,
        },
        textInProgress: {
            color: 'transparent',
        },
    });
});
const LoadingButton: React.FC<LoadingButtonProps & Omit<ButtonProps, keyof LoadingButtonProps>> = (props) => {
    const classes = useStyles(props);
    const { loading, handleFinishLoading, ...otherProps } = props;
    const [isLoading, setIsLoading] = React.useState(LoadingStatus.Stopped);

    useEffect(() => {
        if (props.loading) {
            setIsLoading(LoadingStatus.Loading);
        }
        if (!props.loading && isLoading === LoadingStatus.Loading) {
            setIsLoading(LoadingStatus.Finished);
        }
    }, [props.loading]);

    useEffect(() => {
        if (isLoading === LoadingStatus.Finished) {
            handleFinishLoading && handleFinishLoading();
        }
    }, [isLoading]);
    return (
        <>
            <div className={classes.root}>
                <div className={classes.wrapper}>
                    <Button
                        {...otherProps}
                        disabled={props.disabled || loading}
                    >
                        <span className={loading ? classes.textInProgress : ''}>
                            {props.children}
                        </span>
                    </Button>
                    {loading && <CircularProgress size={24} className={classes.buttonProgress}/>}
                </div>
            </div>
        </>
    );
};

export default LoadingButton;
