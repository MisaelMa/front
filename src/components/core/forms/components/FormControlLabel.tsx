import React from 'react';
import { FieldInputProps, useField } from 'formik';
import MuiFormControlLabel, { FormControlLabelProps as MuiFormControlLabelProps } from '@material-ui/core/FormControlLabel';
import { Omit } from '@material-ui/types';

export interface FormControlLabelCustomProps {
    children(props: FieldInputProps<boolean>): React.ReactElement;
}

export type FormControlLabelProps = Omit<MuiFormControlLabelProps, 'control'> & FormControlLabelCustomProps;

const FormControlLabel: React.FC<FormControlLabelProps> = ({ children, ...props }) => {
    const [field] = useField<boolean>(props.name || '');
    return (
        <MuiFormControlLabel
            {...props}
            control={children(field)}
        />
    );
};
export default FormControlLabel;
