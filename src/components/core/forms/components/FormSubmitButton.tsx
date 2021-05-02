import React from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { FormikContextType, useFormikContext } from 'formik';
import { CircularProgress, styled } from '@material-ui/core';


interface CustomProps {
    isLoadingText?: React.ReactNode;
    children: (<T>(formikContextType: FormikContextType<T>) => React.ReactNode) | React.ReactNode;
}

type FormSubmitButton = CustomProps & Omit<ButtonProps, keyof CustomProps>;

const StyledCircularProgress = styled(CircularProgress)(() => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
}));


const FormSubmitButton: React.FC<FormSubmitButton> = (props) => {
    const { isLoadingText, ...buttonMuiProps } = props;
    const formikContext = useFormikContext();
    const isDisabled = React.useMemo(() => {
        return formikContext.isSubmitting && formikContext.isValid;
    }, [formikContext.isSubmitting, formikContext.isValid]);
    return (
        <Box alignItems="center">
            <Box m={1} position="relative">
                <Button
                    {...buttonMuiProps}
                    disabled={isDisabled}
                >
                    <span>
                        {isDisabled ? props.isLoadingText ?? '' : props.children  }
                    </span>
                </Button>
                {formikContext.isSubmitting && <StyledCircularProgress size={24}/>}
            </Box>
        </Box>
    );
};

export default FormSubmitButton;
