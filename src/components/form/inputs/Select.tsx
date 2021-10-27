import React, { ComponentType } from 'react'
import { Autocomplete, TextField } from '@mui/material'

export type Option = { label: string; value: string | number }

type SelectProps = {
    options: Option[]
    multi?: boolean
}

export const Select: ComponentType<SelectProps> = ({
    options,
    multi = false
}) => {
    return (
        <Autocomplete
            multiple={multi}
            id="tags-standard"
            options={options}
            getOptionLabel={(option) => option.label}
            // defaultValue={[top100Films[13]]}
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="standard"
                    label="Multiple values"
                    placeholder="Favorites"
                />
            )}
        />
    )
}
