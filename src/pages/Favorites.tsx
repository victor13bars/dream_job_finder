import React, {useEffect} from 'react';
import VacanciesList from "./Vacancies/VacanciesList";
import EmptyState from "../components/EmptyState";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import s from '../index.module.css';
import Pagination from "../components/Pagination/Pagination";
import {setFavoritesPage, setFavoritesTotal} from "../store/vacancies/VacanciesSlice";
import {ChangePageType} from "../components/Content";
import Button from "../components/Button";
import {useNavigate} from "react-router-dom";

const Favorites: React.FC = () => {

    const page = useAppSelector(state => state.vacancies.paginationFavorites.page)
    const itemCount = useAppSelector(state => state.vacancies.paginationFavorites.itemCount)
    const total = useAppSelector(state => state.vacancies.paginationFavorites.total)
    const navigate = useNavigate()
    const favorites = useAppSelector(state => state.vacancies.favorites)
    const dispatch = useAppDispatch()
    const onChangeHandler: ChangePageType = ({selected}) => {
        dispatch(setFavoritesPage(selected + 1))
    }
    const onClickHandler = () => {
        navigate('/')
    }

    useEffect(() => {
        dispatch(setFavoritesTotal(favorites.length))
        dispatch(setFavoritesPage(1))
    }, [favorites])

    return (
        <main className={s.container}>
            {favorites.length > 0 ?
                <div className={s.vacanciesWrapper}>
                    <VacanciesList vacancies={favorites.slice((page - 1) * itemCount, page * itemCount)}/>
                    <Pagination
                        total={total}
                        page={page}
                        itemCount={itemCount}
                        changePage={onChangeHandler}
                    />
                </div>
                :

                <EmptyState>
                    <Button
                        className={s.returnBtn}
                        text={'Поиск Вакансий'}
                        oncClick={onClickHandler}
                    />
                </EmptyState>
            }
        </main>
    );
};

export default Favorites;