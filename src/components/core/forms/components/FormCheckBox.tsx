import React from 'react';
import CheckBox, {CheckboxProps} from '@material-ui/core/Checkbox';
import {useField} from 'formik';

export interface AppCheckBoxCustomProps {
}

export type AppCheckBoxProps = CheckboxProps & AppCheckBoxCustomProps;

const FormCheckBox: React.FC<AppCheckBoxProps> = ({...props}): JSX.Element | any => {
    const [field] = useField<boolean>(props.name || '');

    return (
        <CheckBox {...props} {...field} checked={field.value}/>
    );
};
export default FormCheckBox;
