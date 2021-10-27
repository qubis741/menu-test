import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useAppDispatch, useAppSelector } from 'store'
import { Menu, MenuItemList, MenuList } from 'domain/offer/types'

export type OfferState = {
    menus: MenuList
    menuItems: MenuItemList
}
export const initialState: OfferState = {
    menus: {},
    menuItems: {}
}

type NewMenu = Omit<Menu, 'id'>

const getHighestObjKey = (obj: MenuList | MenuItemList): number => {
    const highestId = Object.keys(obj).reduce((prev, curr) => {
        const numCurr = parseInt(curr)
        return prev < numCurr ? numCurr : prev
    }, 0)
    return highestId || 0
}

export const offerSlice = createSlice({
    name: 'offer',
    initialState,
    reducers: {
        addMenu: (state, action: PayloadAction<NewMenu>) => {
            const newMenuId = getHighestObjKey(state.menus) + 1
            const newMenu = { ...action.payload, id: newMenuId }
            return {
                ...state,
                menus: {
                    ...state.menus,
                    [newMenuId]: newMenu
                }
            }
        },
        updateMenu: (state, action: PayloadAction<Menu>) => ({
            ...state,
            menus: {
                ...state.menus,
                [action.payload.id]: {
                    ...action.payload
                }
            }
        }),
        deleteMenu: (state, action: PayloadAction<number>) => {
            const { [action.payload]: removed, ...otherMenus } = state.menus
            const updatedMenuItems = Object.entries(state.menuItems).filter(
                ([_key, mi]) => mi.id !== action.payload
            )
            return {
                ...state,
                menus: otherMenus,
                menuItems: Object.fromEntries(updatedMenuItems)
            }
        }
    }
})

export const { addMenu, updateMenu, deleteMenu } = offerSlice.actions

type UseOffer = {
    menus: MenuList
    menuItems: MenuItemList
    actions: {
        addMenu: (menu: NewMenu) => void
        updateMenu: (menu: Menu) => void
        deleteMenu: (menuId: number) => void
    }
}

export const useOffer = (): UseOffer => {
    const dispatch = useAppDispatch()
    const { menus, menuItems } = useAppSelector((state) => state.offer)
    return {
        menus: menus,
        menuItems: menuItems,
        actions: {
            addMenu: (menu) => dispatch(addMenu(menu)),
            updateMenu: (menu) => dispatch(updateMenu(menu)),
            deleteMenu: (menuId) => dispatch(deleteMenu(menuId))
        }
    }
}

export default offerSlice.reducer
