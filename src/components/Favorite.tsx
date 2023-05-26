import React, {useEffect, useState} from 'react';
import s from '../index.module.css';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {addFavorite, deleteFavorite, setFavorites, VacancyType} from "../store/vacancies/VacanciesSlice";

export type FavoritePropsType = {
    data: VacancyType
}

const Favorite: React.FC<FavoritePropsType> = ({data}) => {

    const dispatch = useAppDispatch()
    const favorites = useAppSelector(state => state.vacancies.favorites)
    const [activeFavorite, setActiveFavorite] = useState(Boolean(favorites.find(el => el.id === data.id)))

    const onClickHandler = () => {
        if (activeFavorite) {
            setActiveFavorite(!activeFavorite)
            dispatch(deleteFavorite(data.id))
        } else {
            setActiveFavorite(!activeFavorite)
            dispatch(addFavorite(data))
        }
    }


    useEffect(() => {
        if (favorites.length !== 0) {
            localStorage.setItem('favorites', JSON.stringify(favorites))
        }
    }, [favorites])

    return (
        activeFavorite
            ?
            <button
                data-elem={`vacancy-${data.id}-shortlist-button`}
                className={s.star + ' ' + s.starActive}
                onClick={onClickHandler}
            >
            </button>
            :
            <button
                data-elem={`vacancy-${data.id}-shortlist-button`}
                className={s.star}
                onClick={onClickHandler}
            >
            </button>
    );
};

export default Favorite;