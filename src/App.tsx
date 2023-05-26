import React, {useEffect} from 'react';
import Header from "./components/Header";
import {useAppDispatch} from "./hooks/redux";
import Content from "./components/Content";
import {login, setToken} from "./store/app/AppSlice";
import {authData} from "./api/api";
import {isTokenFresh} from "./helpers/checkToken";
import {Route, Routes} from "react-router-dom";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";
import Vacancy from "./pages/Vacancy";
import {setFavorites} from "./store/vacancies/VacanciesSlice";

const App = () => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setToken(localStorage.getItem('tokenInfo') ? (JSON.parse(localStorage.getItem('tokenInfo')!)).access_token : ''))
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