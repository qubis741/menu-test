import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Menu, MenuItem } from 'domain/offer/types'
import { v4 as uuidv4 } from 'uuid'
import { useAppDispatch, useAppSelector } from 'store/hooks'

export type OfferState = {
    menus: Menu[]
    menuItems: MenuItem[]
}
export const initialOfferState: OfferState = {
    menus: [],
    menuItems: []
}

type NewMenu = Omit<Menu, 'id' | 'menuItemsIds'>
type NewMenuItem = Omit<MenuItem, 'id'>

export const offerSlice = createSlice({
    name: 'offer',
    initialState: initialOfferState,
    reducers: {
        addMenu: (state, action: PayloadAction<NewMenu>) => {
            const newMenuId = uuidv4()
            const newMenu = {
                ...action.payload,
                menuItemsIds: [],
                id: newMenuId
            }
            return {
                ...state,
                menus: [...state.menus, newMenu]
            }
        },
        updateMenu: (state, action: PayloadAction<Menu>) => {
            const updatedMenus = state.menus.map((m) =>
                m.id === action.payload.id
                    ? { ...m, name: action.payload.name }
                    : m
            )
            return {
                ...state,
                menus: updatedMenus
            }
        },
        deleteMenu: (state, action: PayloadAction<string>) => {
            const updatedMenus = state.menus.filter(
                (m) => m.id !== action.payload
            )
            const updatedMenuItems = state.menuItems.filter(
                (mi) => mi.menuId !== action.payload
            )
            return {
                ...state,
                menus: updatedMenus,
                menuItems: updatedMenuItems
            }
        },
        addMenuItem: (state, action: PayloadAction<NewMenuItem>) => {
            const newMenuItemId = uuidv4()
            const newMenuItem = { ...action.payload, id: newMenuItemId }
            const updatedMenus = state.menus.map((m) =>
                m.id === action.payload.menuId
                    ? { ...m, menuItemsIds: [...m.menuItemsIds, newMenuItemId] }
                    : m
            )
            return {
                ...state,
                menus: updatedMenus,
                menuItems: [...state.menuItems, newMenuItem]
            }
        },
        updateMenuItem: (state, action: PayloadAction<MenuItem>) => {
            const updatedMenuItems = state.menuItems.map((mi) =>
                mi.id === action.payload.id
                    ? {
                          ...mi,
                          name: action.payload.name,
                          price: action.payload.price
                      }
                    : mi
            )
            return {
                ...state,
                menuItems: updatedMenuItems
            }
        },
        deleteMenuItem: (state, action: PayloadAction<string>) => {
            const updatedMenus = state.menus.map((m) => ({
                ...m,
                menuItemsIds: m.menuItemsIds.filter(
                    (miId) => miId !== action.payload
                )
            }))
            const updatedMenuItems = state.menuItems.filter(
                (mi) => mi.id !== action.payload
            )
            return {
                ...state,
                menus: updatedMenus,
                menuItems: updatedMenuItems
            }
        }
    }
})

export const {
    addMenu,
    updateMenu,
    deleteMenu,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem
} = offerSlice.actions

type UseOffer = {
    menus: Menu[]
    menuItems: MenuItem[]
    actions: {
        addMenu: (menu: NewMenu) => void
        updateMenu: (menu: Menu) => void
        deleteMenu: (menuId: string) => void
        addMenuItem: (menuItem: NewMenuItem) => void
        updateMenuItem: (menuItem: MenuItem) => void
        deleteMenuItem: (menuItemId: string) => void
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
            deleteMenu: (menuId) => dispatch(deleteMenu(menuId)),
            addMenuItem: (menuItem) => dispatch(addMenuItem(menuItem)),
            updateMenuItem: (menuItem) => dispatch(updateMenuItem(menuItem)),
            deleteMenuItem: (menuItemId) => dispatch(deleteMenuItem(menuItemId))
        }
    }
}

export const offerReducer = offerSlice.reducer
