import {combineReducers, configureStore} from "@reduxjs/toolkit";
import vacanciesReducer from './vacancies/VacanciesSlice'
import appReducer from './app/AppSlice'

const rootReducer = combineReducers({
    app:appReducer,
    vacancies: vacanciesReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
