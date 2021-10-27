export type Menu = {
    id: number
    name: string
    menuItemsIds: number[]
}

export type MenuList = Record<string, Menu>

export type MenuItem = {
    id: number
    name: string
    price: number
    menuId: number
}

export type MenuItemList = Record<string, MenuItem>
