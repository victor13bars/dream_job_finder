import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {vacanciesAPI} from "../../api/api";
import {setError, setStatus} from "../app/AppSlice";
import {RootState} from "../store";

export type VacancyType = {
    id: number
    professionName: string
    companyName: string
    town: string
    typeWork: string
    paymentTo: number
    paymentFrom: number
    currency: string
    vacancyRichText?: string
}

export type PositionType = {
    title_rus: string
    url_rus: string
    title: string
    id_parent: number
    key: number
}

export type CatalogType = {
    title_rus: string
    url_rus: string
    title: string
    title_trimmed: string
    key: number
    positions: Array<PositionType>
}

export type PaginationType = {
    total: number
    page: number
    itemCount: number
}

export type FiltersType = {
    catalog: CatalogType | null,
    payment_from: number,
    payment_to: number,
    searchValue: string
}

export type initialStateType = {
    vacanciesList: Array<VacancyType>
    cataloguesList: Array<CatalogType>,
    pagination: PaginationType,
    filters: FiltersType,
    currentVacancy: VacancyType | null,
    favorites: Array<VacancyType> | [],
    paginationFavorites: PaginationType
}

export const initialState: initialStateType = {
    vacanciesList: [],
    cataloguesList: [],
    pagination: {
        total: 0,
        page: 1,
        itemCount: 4,
    },
    filters: {
        catalog: null,
        payment_from: 0,
        payment_to: 0,
        searchValue: ""
    },
    currentVacancy: null,
    favorites: [],
    paginationFavorites: {
        total: 0,
        page: 1,
        itemCount: 4,
    },
}

export const vacanciesSlice = createSlice({
    name: 'vacancies',
    initialState,
    reducers: {
        setVacancies(state: initialStateType, action: any) {
            state.vacanciesList = action.payload.map((vac: any) => ({
                id: vac.id,
                professionName: vac.profession,
                companyName: vac.firm_name,
                town: vac.town.title,
                typeWork: vac.type_of_work.title,
                paymentTo: vac.payment_to,
                paymentFrom: vac.payment_from,
                currency: vac.currency,
                vacancyRichText: vac.vacancyRichText
            }))
        },
        setCatalogues(state: initialStateType, action) {
            state.cataloguesList = action.payload
        },
        setPage(state: initialStateType, action: PayloadAction<number>) {
            state.pagination.page = action.payload
        },
        setTotal(state: initialStateType, action: PayloadAction<number>) {
            state.pagination.total = action.payload
        },
        setItemCount(state: initialStateType, action: PayloadAction<number>) {
            state.pagination.itemCount = action.payload
        },
        setSearchValue(state: initialStateType, action: PayloadAction<string>) {
            state.filters.searchValue = action.payload
        },
        setPaginationDefault(state: initialStateType, action: PayloadAction) {
            state.pagination.page = 1
        },
        setPaymentFrom(state: initialStateType, action: PayloadAction<number>) {
            state.filters.payment_from = action.payload
        },
        setPaymentTo(state: initialStateType, action: PayloadAction<number>) {
            state.filters.payment_to = action.payload
        },
        setCatalog(state: initialStateType, action: PayloadAction<CatalogType | null>) {
            state.filters.catalog = action.payload
        },
        setFiltersDefault(state: initialStateType, action: PayloadAction) {
            state.filters.catalog = null
            state.filters.payment_from = 0
            state.filters.payment_to = 0
            state.filters.searchValue = ''
        },
        setCurrentVacancy(state: initialStateType, action) {
            state.currentVacancy = {
                id: action.payload.id,
                professionName: action.payload.profession,
                companyName: action.payload.firm_name,
                town: action.payload.town.title,
                typeWork: action.payload.type_of_work.title,
                paymentTo: action.payload.payment_to,
                paymentFrom: action.payload.payment_from,
                currency: action.payload.currency,
                vacancyRichText: action.payload.vacancyRichText
            }
        },
        setFavorites(state: initialStateType, action: PayloadAction<Array<VacancyType> | []>) {
            state.favorites = action.payload
        },
        addFavorite(state: initialStateType, action: PayloadAction<VacancyType>) {
            state.favorites = [...state.favorites, action.payload]
        },
        deleteFavorite(state: initialStateType, action: PayloadAction<number>) {
            state.favorites = state.favorites.filter(el => el.id !== action.payload)
        },
        setFavoritesTotal(state: initialStateType, action: PayloadAction<number>) {
            state.paginationFavorites.total = action.payload
        },
        setFavoritesPage(state: initialStateType, action: PayloadAction<number>) {
            state.paginationFavorites.page = action.payload
        },
    }
})

export const fetchAllInfo = createAsyncThunk(
    'allInfo/fetch',
    async (_, {dispatch, getState}) => {
        const state = getState() as RootState
        const page = state.vacancies.pagination.page
        const itemCount = state.vacancies.pagination.itemCount

        dispatch(setStatus('loading'))
        try {
            const vacancies = await vacanciesAPI.getVacancies(page, itemCount)
            const catalogues = await vacanciesAPI.getCatalogues()
            dispatch(setVacancies(vacancies.data.objects))
            dispatch(setTotal(vacancies.data.total <= 500 ? vacancies.data.total : 500))
            dispatch(setCatalogues(catalogues.data))
            dispatch(setStatus('succeeded'))
        } catch (error: any) {
            dispatch(setError(error.message))
        }
    }
)

export const searchVacancies = createAsyncThunk(
    'vacancies/search',
    async (_, {dispatch, getState}) => {

        const state = getState() as RootState
        const page = state.vacancies.pagination.page
        const itemCount = state.vacancies.pagination.itemCount
        const word = state.vacancies.filters.searchValue
        const catalog = state.vacancies.filters.catalog ? state.vacancies.filters.catalog.key : null
        const payment_from = state.vacancies.filters.payment_from
        const payment_to = state.vacancies.filters.payment_to
        dispatch(setStatus('loading'))

        try {
            const response = await vacanciesAPI.searchVacancies(word, catalog, payment_from, payment_to, page, itemCount)
            dispatch(setVacancies(response.data.objects))
            dispatch(setTotal(response.data.total <= 500 ? response.data.total : 500))
            dispatch(setStatus('succeeded'))
        } catch (error: any) {
            dispatch(setError(error.message))
        }
    }
)

export const fetchVacancy = createAsyncThunk(
    'vacancy/fetch',
    async (id: number, {dispatch}) => {
        dispatch(setStatus('loading'))
        try {
            const response = await vacanciesAPI.getVacancy(id)
            dispatch(setCurrentVacancy(response.data))
            dispatch(setStatus('succeeded'))
        } catch (error: any) {
            dispatch(setError(error.message))
        }
    }
)

export const {
    setVacancies,
    setCatalogues,
    setPage,
    setTotal,
    setSearchValue,
    setItemCount,
    setPaginationDefault,
    setPaymentFrom,
    setPaymentTo,
    setCatalog,
    setFiltersDefault,
    setCurrentVacancy,
    setFavorites,
    addFavorite,
    deleteFavorite,
    setFavoritesTotal,
    setFavoritesPage
} = vacanciesSlice.actions

export default vacanciesSlice.reducer