import React, { ComponentType } from 'react'
import { Box, IconButton, Typography } from '@mui/material'
import { useOffer } from 'domain/offer/slice'
import { Form } from 'components/form/Form'
import { FormField } from 'components/form/FormField'
import { Menu, MenuItem } from 'domain/offer/types'
import styled from '@emotion/styled'
import DeleteIcon from '@mui/icons-material/Delete'

const Container = styled(Box)`
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 1rem;
    max-width: 600px;
    &:not(:last-child) {
        margin-bottom: 1rem;
    }
    > *:not(:last-child) {
        margin-bottom: 1rem;
    }
`

const MenuItemForm: ComponentType<{ menu: Menu; menuItem?: MenuItem }> = ({
    menu,
    menuItem
}) => {
    const {
        actions: { addMenuItem, updateMenuItem, deleteMenuItem }
    } = useOffer()

    return (
        <Container>
            <Typography variant="h5" gutterBottom>
                {menuItem ? `MenuItem (id: ${menuItem.id})` : 'New MenuItem'}
                {menuItem && (
                    <IconButton
                        aria-label="delete"
                        onClick={() => deleteMenuItem(menuItem.id)}
                    >
                        <DeleteIcon />
                    </IconButton>
                )}
            </Typography>
            <Form
                onSubmit={(d) =>
                    menuItem
                        ? updateMenuItem({ ...d, menuId: menu.id })
                        : addMenuItem({ ...d, menuId: menu.id })
                }
                successText="Menu Item has been successfully added!"
                initialValues={menuItem}
                validate={(d) => {
                    if (!d.name) return { name: 'Required' }
                    if (!d.price) return { price: 'Required' }
                }}
            >
                <FormField name="name" label="Name" />
                <FormField name="price" label="Price" />
            </Form>
        </Container>
    )
}

const MenuForm: ComponentType<{ menu?: Menu }> = ({ menu }) => {
    const {
        menuItems,
        actions: { addMenu, updateMenu, deleteMenu }
    } = useOffer()
    const relatedMenuItems = menu
        ? menuItems.filter((mi) => mi.menuId === menu.id)
        : []
    return (
        <Container>
            <Typography variant="h5" gutterBottom>
                {menu ? `Menu (id: ${menu.id})` : 'New Menu'}
                {menu && (
                    <IconButton
                        aria-label="delete"
                        onClick={() => deleteMenu(menu.id)}
                    >
                        <DeleteIcon />
                    </IconButton>
                )}
            </Typography>
            <Form
                onSubmit={(d) => (menu ? updateMenu(d) : addMenu(d))}
                initialValues={menu}
                successText="Menu has been successfully added!"
                validate={(d) => {
                    if (!d.name) return { name: 'Required' }
                }}
            >
                <FormField name="name" label="Name" />
            </Form>

            {menu && (
                <>
                    <MenuItemForm menu={menu} />
                    {relatedMenuItems.map((mi) => (
                        <MenuItemForm key={mi.id} menu={menu} menuItem={mi} />
                    ))}
                </>
            )}
        </Container>
    )
}

export const EditorPage: ComponentType = () => {
    const { menus } = useOffer()

    return (
        <div>
            <Typography variant="h5" gutterBottom>
                Editor
            </Typography>
            {/*<Typography variant="h4" gutterBottom>
                Menus
            </Typography>*/}
            <MenuForm />
            {menus.map((m) => (
                <MenuForm key={m.id} menu={m} />
            ))}
        </div>
    )
}
