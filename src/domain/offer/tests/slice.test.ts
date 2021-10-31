import {
    addMenu,
    deleteMenu,
    initialOfferState,
    offerReducer,
    updateMenu
} from 'domain/offer/slice'
import uuid from 'uuid'

jest.mock('uuid', () => ({
    v4: jest.fn()
}))

const mockUuidGen = (val: string) => {
    // @ts-ignore
    uuid.v4.mockImplementation(() => val)
}

const menuUuid1 = 'menu-uuid-1'
const menuUuid2 = 'menu-uuid-2'
const menuName1 = 'menu-name-1'
const menuName2 = 'menu-name-2'
const menuItemUuid1 = 'menu-item-uuid-1'
const menuItemUuid2 = 'menu-item-uuid-2'
const menuItemName1 = 'menu-item-name-1'
const menuItemName2 = 'menu-item-name-2'
const nonEmptyMenuOfferState = {
    ...initialOfferState,
    menus: [
        {
            id: menuUuid1,
            name: menuName1,
            menuItemsIds: []
        }
    ]
}
const nonEmptyMenuOfferStateWithMenuItems = {
    ...initialOfferState,
    menus: [
        {
            id: menuUuid1,
            name: menuName1,
            menuItemsIds: [menuItemUuid1]
        },
        {
            id: menuUuid2,
            name: menuName2,
            menuItemsIds: []
        }
    ],
    menuItems: [
        {
            id: menuItemUuid1,
            name: menuItemName1,
            price: 69,
            menuId: menuUuid1
        }
    ]
}
describe('Offer store', () => {
    test('adding menu to empty menus works', () => {
        mockUuidGen(menuUuid1)
        expect(
            offerReducer(initialOfferState, addMenu({ name: menuName1 }))
        ).toEqual(nonEmptyMenuOfferState)
    })
    test('adding menu to non-empty menus works', () => {
        mockUuidGen(menuUuid2)
        expect(
            offerReducer(nonEmptyMenuOfferState, addMenu({ name: menuName2 }))
        ).toEqual({
            ...initialOfferState,
            menus: [
                ...nonEmptyMenuOfferState.menus,
                {
                    id: menuUuid2,
                    name: menuName2,
                    menuItemsIds: []
                }
            ]
        })
    })

    test('updating menu works', () => {
        mockUuidGen(menuUuid1)
        const otherName = 'other-name'
        expect(
            offerReducer(
                nonEmptyMenuOfferState,
                updateMenu({ id: menuUuid1, name: otherName, menuItemsIds: [] })
            )
        ).toEqual({
            ...initialOfferState,
            menus: [{ ...nonEmptyMenuOfferState.menus[0], name: otherName }]
        })
    })

    test('deleting menu works', () => {
        expect(
            offerReducer(
                nonEmptyMenuOfferStateWithMenuItems,
                deleteMenu(menuUuid1)
            )
        ).toEqual({
            ...initialOfferState,
            menus: [nonEmptyMenuOfferStateWithMenuItems.menus[1]]
        })
    })
})
