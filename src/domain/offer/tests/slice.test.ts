import {
    addMenu,
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
describe('Offer store', () => {
    const menuUuid1 = 'menu-uuid-1'
    const menuUuid2 = 'menu-uuid-2'
    const menuName1 = 'menu-name-1'
    const menuName2 = 'menu-name-2'
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
})
