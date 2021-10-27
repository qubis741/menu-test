import React, { ComponentType } from 'react'
import { List, ListItem, Typography } from '@mui/material'
import { useOffer } from 'domain/offer/slice'

export const PreviewPage: ComponentType = () => {
    const { menus } = useOffer()
    console.log(menus)
    return (
        <div>
            <Typography variant="h3" gutterBottom>
                Preview
            </Typography>
            <List>
                {Object.values(menus).map((m) => (
                    <ListItem key={m.id} disablePadding>
                        {m.name}
                    </ListItem>
                ))}
            </List>
        </div>
    )
}
