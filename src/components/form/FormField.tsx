import { Field } from 'react-final-form'
import React, { ComponentType } from 'react'
import { FormControl, TextField } from '@mui/material'

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
    const isNumberInput = type === 'number'
    return (
        <Field name={name}>
            {({ input, meta }) => {
                const error = meta.touched && meta.error
                return (
                    <FormControl>
                        <TextField
                            id={name}
                            aria-describedby={name}
                            type={type}
                            label={label}
                            variant="standard"
                            {...input}
                            inputProps={{ step: '0.01' }}
                            onChange={({ target: { value } }) => {
                                input.onChange(
                                    isNumberInput ? Number(value) : value
                                )
                            }}
                            helperText={
                                isNumberInput
                                    ? 'Use "," for decimals'
                                    : undefined
                            }
                            error={!!error}
                        />
                    </FormControl>
                )
            }}
        </Field>
    )
}
