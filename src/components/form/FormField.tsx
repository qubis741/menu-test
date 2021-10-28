import { Field } from 'react-final-form'
import React, { ComponentType } from 'react'
import { Alert, FormControl, TextField } from '@mui/material'

type FormFieldProps = {
    label: string
    name: string
    type?: 'text' | 'number' | 'select'
}

export const FormField: ComponentType<FormFieldProps> = ({
    label,
    name,
    type = 'text'
}) => {
    return (
        <Field name={name}>
            {({ input, meta }) => (
                <FormControl>
                    <TextField
                        id={name}
                        aria-describedby={name}
                        type={type}
                        label={label}
                        variant="standard"
                        {...input}
                    />
                    {meta.touched && meta.error && (
                        <Alert severity="error">{meta.error}</Alert>
                    )}
                </FormControl>
            )}
        </Field>
    )
}
