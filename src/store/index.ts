import { configureStore } from '@reduxjs/toolkit'
import { offerReducer } from 'domain/offer/slice'

export const store = configureStore({
    reducer: {
        offer: offerReducer
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
