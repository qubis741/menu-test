import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import { RootState } from 'store'
// import { MenuItem } from 'domain/menuItems/types'
//
// export type MenuItemsState = MenuItem[]
// export const initialState: MenuItemsState = []
//
// export const menuItemsSlice = createSlice({
//     name: 'menuItems',
//     initialState,
//     reducers: {
//         addMenuItem: (state, action: PayloadAction<MenuItem>) => [
//             ...state,
//             action.payload
//         ],
//         updateMenuItem: (state, action: PayloadAction<MenuItem>) =>
//             state.map((menuItem) =>
//                 menuItem.id === action.payload.id ? action.payload : menuItem
//             ),
//         deleteMenuItem: (state, action: PayloadAction<number>) =>
//             state.filter((menuItem) => menuItem.id !== action.payload)
//     }
// })
//
// export const { addMenuItem, updateMenuItem, deleteMenuItem } =
//     menuItemsSlice.actions
//
// export const useMenuItems = (state: RootState) => state.menuItems
//
// export default menuItemsSlice.reducer
