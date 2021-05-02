import React from 'react';
import {StandardTextFieldProps, TextFieldProps} from '@material-ui/core/TextField' ;
import {useField} from 'formik';
import {TextField} from '@material-ui/core';
import {Omit} from '@material-ui/types';

// @ts-ignore
export interface AppTextFieldCustomProps extends StandardTextFieldProps {
    variant?: 'outlined' | 'standard' | 'filled'
}

export type PropsExcludedTextField = 'error' | 'helperText' | 'onChange' | 'onBlur' | 'onFocus';

export type AppTextFieldProps = Omit<TextFieldProps, PropsExcludedTextField> & AppTextFieldCustomProps;

const FormTextField: React.FC<AppTextFieldProps> = ({...props}) => {
    const [field, meta] = useField(props.name || '');
    return (
        <>
            <TextField
                {...props}
                {...field}
                error={meta.error !== undefined}
                helperText={meta.touched && meta.error ? meta.error : null}
            />
        </>
    );
};

export default FormTextField;
