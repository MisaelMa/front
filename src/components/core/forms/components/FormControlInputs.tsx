import React from 'react';
import { useField } from 'formik';
import { FormControl } from '@material-ui/core';
import { AppFormControlProps } from '../types/AppFormControlProps';

const FormControlInputs: React.FC<AppFormControlProps<string>> = ({ children, ...props }) => {
  const [field, meta] = useField<string>(props.name || '');
  return (
    <FormControl
      {...props}
      error={meta.error !== undefined}
    >
      {children({ field, meta })}
    </FormControl>
  );
};
export default FormControlInputs;
