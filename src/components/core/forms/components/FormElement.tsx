import React from 'react';
import Box, {BoxProps} from '@material-ui/core/Box';
import {FormikContextType, useFormikContext} from 'formik';


interface CustomProps {
    children: (<T>(formikContextType: FormikContextType<T>) => React.ReactNode) | React.ReactNode;
}

type FormElementProps = CustomProps & Omit<BoxProps, keyof CustomProps>;

const isFunction = (obj: any): obj is Function => {
    return typeof obj === 'function';
}

const FormElement: React.FC<FormElementProps> = (props) => {
    const {...boxMuiProps} = props;
    const formikContext = useFormikContext();
    return (
        <Box {...boxMuiProps}>
            {isFunction(props.children) ? props.children(formikContext) : props.children}
        </Box>
    );
};

export default FormElement;
