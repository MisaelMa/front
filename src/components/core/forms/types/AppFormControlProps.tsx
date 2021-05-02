import React from 'react';
import { FieldInputProps, FieldMetaProps} from 'formik';
import { FormControlProps } from '@material-ui/core/FormControl';
import { Omit} from '@material-ui/types';



export interface PropsOfFormControl<T> {
    field: FieldInputProps<T>;
    meta: FieldMetaProps<T>;
}

export interface AppFormControlCustomProps<T> {
    name: string;
    children(props: PropsOfFormControl<T>): React.ReactElement;
}

type FormControlExcludedProps = 'error';

export type AppFormControlProps<T = string> = Omit<FormControlProps, FormControlExcludedProps> & AppFormControlCustomProps<T>;
