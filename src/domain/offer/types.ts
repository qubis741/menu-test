export type Menu = {
    id: number
    name: string
    menuItemsIds: number[]
}

export type MenuItem = {
    id: number
    name: string
    price: number
    menuId: number
}
