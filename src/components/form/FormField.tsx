import { Field } from 'react-final-form'
import React, { ComponentType } from 'react'
import { FormControl, Input, InputLabel } from '@mui/material'
import { Option, Select } from 'components/form/inputs/Select'

type FormFieldProps = {
    label: string
    name: string
    type?: 'text' | 'number' | 'select'
    options?: Option[]
}

export const FormField: ComponentType<FormFieldProps> = ({
    label,
    name,
    type = 'text',
    options
}) => {
    return (
        <Field name={name}>
            {({ input }) => (
                <FormControl>
                    <InputLabel htmlFor={name}>{label}</InputLabel>
                    {options ? (
                        <Select
                            aria-describedby={name}
                            options={options}
                            {...input}
                        />
                    ) : (
                        <Input
                            id={name}
                            aria-describedby={name}
                            type={type}
                            {...input}
                        />
                    )}
                </FormControl>
            )}
        </Field>
    )
}
