import styled from '@emotion/styled'
import { Box } from '@mui/material'

export type BorderBoxProps = {
    vertical?: boolean
}

export const BorderBox = styled(Box)`
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 1rem;
    > *:not(:last-child) {
        ${(props: BorderBoxProps) =>
            props.vertical ? 'margin-bottom' : 'margin-right'}: 1rem;
    }
`
