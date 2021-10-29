import React, { ComponentType, useCallback } from 'react'
import { Grid, Link as UiLink, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'
import { BorderBox } from 'components/ui/BorderBox'
import { useOffer } from 'domain/offer/slice'
import { MenuItem } from 'domain/offer/types'

const PreviewPageContainer = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    > *:not(:last-child) {
        margin-bottom: 1rem;
    }
`

const MenuItemList: ComponentType<{ items: MenuItem[] }> = ({ items }) => {
    const hasItems = !!items.length
    return (
        <>
            {!hasItems && (
                <p>
                    No menu items yet. Please add them in{' '}
                    <Link to="/editor">
                        <UiLink>editor</UiLink>
                    </Link>
                </p>
            )}

            {hasItems && (
                <>
                    <Typography variant="h6">Items:</Typography>
                    <Grid container spacing={2}>
                        {items.map((mi) => (
                            <Grid item key={mi.id}>
                                <BorderBox>
                                    <b>{mi.name}</b> {mi.price} €
                                </BorderBox>
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}
        </>
    )
}

const MenuList: ComponentType = () => {
    const { menus, menuItems } = useOffer()
    const getMenuRelatedItems = useCallback(
        (menuId: string) => menuItems.filter((mi) => mi.menuId === menuId),
        [menuItems]
    )
    const hasMenus = !!menus.length
    return (
        <>
            {!hasMenus && (
                <p>
                    No menus yet. Please add them in{' '}
                    <Link to="/editor">
                        <UiLink>editor</UiLink>
                    </Link>
                </p>
            )}
            {hasMenus && (
                <Grid container spacing={2}>
                    {menus.map((m) => {
                        const relatedItems = getMenuRelatedItems(m.id)
                        return (
                            <Grid item key={m.id} lg={6}>
                                <BorderBox vertical>
                                    <Typography variant="h5">
                                        Menu {m.name}
                                    </Typography>
                                    <MenuItemList items={relatedItems} />
                                </BorderBox>
                            </Grid>
                        )
                    })}
                </Grid>
            )}
        </>
    )
}

export const PreviewPage: ComponentType = () => {
    return (
        <PreviewPageContainer>
            <Typography variant="h4" gutterBottom>
                Preview
            </Typography>
            <MenuList />
        </PreviewPageContainer>
    )
}
