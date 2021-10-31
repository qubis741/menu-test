import React, { ComponentType } from 'react'
import { Grid, IconButton, Typography } from '@mui/material'
import { useOffer } from 'domain/offer/slice'
import { Form } from 'components/form/Form'
import { FormField } from 'components/form/FormField'
import { Menu, MenuItem } from 'domain/offer/types'
import styled from '@emotion/styled'
import DeleteIcon from '@mui/icons-material/Delete'
import { BorderBox } from 'components/ui/BorderBox'

const EditorPageContainer = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
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
        <BorderBox vertical>
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
                successText={`Menu Item has been successfully ${
                    menuItem ? 'updated' : 'added'
                }!`}
                initialValues={menuItem}
                validate={(d) => {
                    if (!d.name) return { name: 'Required' }
                    if (!d.price) return { price: 'Required' }
                }}
            >
                <FormField name="name" label="Name" />
                <FormField name="price" label="Price" type="number" />
            </Form>
        </BorderBox>
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
        <BorderBox vertical>
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
                successText={`Menu has been successfully ${
                    menu ? 'updated' : 'added'
                }!`}
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
        </BorderBox>
    )
}

export const EditorPage: ComponentType = () => {
    const { menus } = useOffer()

    return (
        <EditorPageContainer>
            <Typography variant="h4" gutterBottom>
                Editor
            </Typography>
            <MenuForm />

            <Grid container spacing={2}>
                {menus.map((m) => (
                    <Grid key={m.id} item lg={6}>
                        <MenuForm menu={m} />
                    </Grid>
                ))}
            </Grid>
        </EditorPageContainer>
    )
}
