export type Menu = {
    id: string
    name: string
    menuItemsIds: string[]
}

export type MenuItem = {
    id: string
    name: string
    price: number
    menuId: string
}
