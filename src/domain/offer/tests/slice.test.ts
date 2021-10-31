import {
    addMenu,
    addMenuItem,
    deleteMenu,
    deleteMenuItem,
    initialOfferState,
    offerReducer,
    updateMenu,
    updateMenuItem
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

const testState = {
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
        ).toEqual({
            ...initialOfferState,
            menus: [{ id: menuUuid1, name: menuName1, menuItemsIds: [] }]
        })
    })
    test('adding menu to non-empty menus works', () => {
        const menuUuid3 = 'menu-uuid-3'
        const menuName3 = 'menu-name-3'
        mockUuidGen(menuUuid3)
        expect(offerReducer(testState, addMenu({ name: menuName3 }))).toEqual({
            ...testState,
            menus: [
                ...testState.menus,
                {
                    id: menuUuid3,
                    name: menuName3,
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
                testState,
                updateMenu({ id: menuUuid1, name: otherName, menuItemsIds: [] })
            )
        ).toEqual({
            ...testState,
            menus: [
                { ...testState.menus[0], name: otherName },
                testState.menus[1]
            ]
        })
    })

    test('deleting menu works', () => {
        expect(offerReducer(testState, deleteMenu(menuUuid1))).toEqual({
            ...initialOfferState,
            menus: [testState.menus[1]]
        })
    })

    test('adding menu item to menu works', () => {
        mockUuidGen(menuItemUuid2)
        expect(
            offerReducer(
                testState,
                addMenuItem({
                    name: menuItemName2,
                    price: 9,
                    menuId: menuUuid1
                })
            )
        ).toEqual({
            ...testState,
            menus: [
                {
                    ...testState.menus[0],
                    menuItemsIds: [
                        ...testState.menus[0].menuItemsIds,
                        menuItemUuid2
                    ]
                },
                testState.menus[1]
            ],
            menuItems: [
                ...testState.menuItems,
                {
                    id: menuItemUuid2,
                    name: menuItemName2,
                    price: 9,
                    menuId: menuUuid1
                }
            ]
        })
    })

    test('updating menu item works', () => {
        const otherName = 'other-name'
        expect(
            offerReducer(
                testState,
                updateMenuItem({
                    id: menuItemUuid1,
                    name: otherName,
                    price: 69,
                    menuId: menuUuid1
                })
            )
        ).toEqual({
            ...testState,
            menuItems: [
                {
                    id: menuItemUuid1,
                    name: otherName,
                    price: 69,
                    menuId: menuUuid1
                }
            ]
        })
    })

    test('deleting menu item works', () => {
        expect(offerReducer(testState, deleteMenuItem(menuItemUuid1))).toEqual({
            ...testState,
            menus: [
                { ...testState.menus[0], menuItemsIds: [] },
                testState.menus[1]
            ],
            menuItems: []
        })
    })
})
