import React from 'react';
import { useField, useFormikContext } from 'formik';
import { Omit } from '@material-ui/types';
import { DatePicker, DatePickerProps } from '@material-ui/pickers';


export interface AppTextFieldCustomProps {
}

export type PropsExcludedTextField = 'error' | 'helperText' | 'onChange' | 'onBlur' | 'onFocus' | 'value' ;

export type AppTextFieldProps = Omit<DatePickerProps, PropsExcludedTextField> & AppTextFieldCustomProps;


const FormDateField: React.FC<AppTextFieldProps> = ({ ...props }) => {
    const [field, meta] = useField(props.name || '');
    const { setFieldValue } = useFormikContext<any>();
    return (
        <>
            <DatePicker
                {...field}
                {...props}
                onChange={date => setFieldValue(field.name, date?.toDate(), true)}
                error={meta.error !== undefined}
                helperText={meta.touched && meta.error ? meta.error : null}
            />
        </>
    );
};

export default FormDateField;
