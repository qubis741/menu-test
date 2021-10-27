import React, { ComponentType } from 'react'
import { Box, Typography } from '@mui/material'
import { useOffer } from 'domain/offer/slice'
import { Form } from 'components/form/Form'
import { FormField } from 'components/form/FormField'

export const EditorPage: ComponentType = () => {
    const {
        menus,
        actions: { addMenu, updateMenu }
    } = useOffer()

    return (
        <div>
            <Typography variant="h3" gutterBottom>
                Editor
            </Typography>
            <Typography variant="h4" gutterBottom>
                Menus
            </Typography>
            <Box>
                <Typography variant="h5" gutterBottom>
                    New Menu
                </Typography>
                <Form
                    onSubmit={(d) => addMenu(d)}
                    successText="Menu has been successfully added!"
                >
                    <FormField name="name" label="Name" />
                    <FormField
                        name="menuItems"
                        label="Menu Items"
                        options={[{ label: 'test', value: 1 }]}
                    />
                </Form>
            </Box>
            {Object.values(menus).map((m) => (
                <Box key={m.id}>
                    <Typography variant="h5" gutterBottom>
                        Update Menu (id: {m.id})
                    </Typography>
                    <Form
                        onSubmit={(d) => updateMenu(d)}
                        initialValues={m}
                        clearOnSubmit={false}
                        successText="Menu has been successfully updated!"
                    >
                        <FormField name="name" label="Name" />
                        <FormField name="menuItems" label="Menu Items" />
                    </Form>
                </Box>
            ))}
        </div>
    )
}
