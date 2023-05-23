import React, {useEffect} from 'react';
import Header from "./components/Header";
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import Content from "./components/Content";
import {login} from "./store/app/AppSlice";
import {authData} from "./api/api";
import {isTokenFresh} from "./helpers/checkToken";
import {Route, Routes} from "react-router-dom";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";
import Vacancy from "./pages/Vacancy";
import {setFavorites} from "./store/vacancies/VacanciesSlice";

const App = () => {

    const vacancies = useAppSelector(state => state.vacancies.vacanciesList)
    const catalogues = useAppSelector(state => state.vacancies.cataloguesList)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setFavorites((JSON.parse(localStorage.getItem('favorites')!)) || []))
        if (!isTokenFresh()) {
            dispatch(login(authData))
        }
    }, [])

    return (
        <>
            <Header/>
            <Routes>
                <Route path={'/*'} element={<NotFound/>}/>
                <Route path={'/'} element={
                    <Content/>
                }/>
                <Route path={'/vacancy/:id'} element={<Vacancy/>}/>
                <Route path={'/favorites'} element={<Favorites/>}/>
            </Routes>
        </>
    );
};

export default App;