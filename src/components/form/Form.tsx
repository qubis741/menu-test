import React, { ComponentType, useState } from 'react'
import { Form as FFForm } from 'react-final-form'
import { ValidationErrors } from 'final-form'
import { Alert, Button, Snackbar } from '@mui/material'
import styled from '@emotion/styled'

const FormWrapper = styled('form')`
    display: flex;
    align-items: baseline;
    > *:not(:last-child) {
        margin-right: 1em;
    }
`

type FormProps = {
    onSubmit: (data: any) => void
    validate?: (data: any) => ValidationErrors | undefined
    clearOnSubmit?: boolean
    initialValues?: any
    successText?: string
}

export const Form: ComponentType<FormProps> = ({
    onSubmit,
    validate,
    initialValues,
    clearOnSubmit = true,
    successText,
    children
}) => {
    const [isSuccess, setIsSuccess] = useState(false)
    return (
        <FFForm
            onSubmit={onSubmit}
            validate={validate}
            initialValues={initialValues}
            render={({ handleSubmit, form, valid }) => (
                <FormWrapper
                    onSubmit={(data) => {
                        handleSubmit(data)
                        if (clearOnSubmit) {
                            form.reset()
                            form.restart()
                        }

                        setIsSuccess(true)
                    }}
                >
                    {children}
                    <Button variant="contained" type="submit" disabled={!valid}>
                        Submit
                    </Button>
                    <Snackbar
                        open={!!successText && isSuccess}
                        autoHideDuration={4000}
                        onClose={() => setIsSuccess(false)}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left'
                        }}
                    >
                        <Alert severity="success" sx={{ width: '100%' }}>
                            {successText}
                        </Alert>
                    </Snackbar>
                </FormWrapper>
            )}
        />
    )
}
