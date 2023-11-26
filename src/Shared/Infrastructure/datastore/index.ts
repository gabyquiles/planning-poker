import { combineReducers, configureStore, type PreloadedState } from "@reduxjs/toolkit";
import { api } from "@src/services/api";

const rootReducer = combineReducers({
    [api.reducerPath]: api.reducer,
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) => (configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(api.middleware),
    preloadedState
}))
export default setupStore;

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
