import React from 'react';
import { useField } from 'formik';
import { FormControl } from '@material-ui/core';
import { AppFormControlProps } from '../types/AppFormControlProps';

const FormControlSwitches: React.FC<AppFormControlProps<boolean>> = ({ children, ...props }) => {
    const [field, meta] = useField<boolean>(props.name || '');
    return (
        <FormControl
            {...props}
            error={meta.error !== undefined}
        >
            {children({ field, meta })}
        </FormControl>
    );
};
export default FormControlSwitches;
