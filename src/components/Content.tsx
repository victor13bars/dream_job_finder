import React, {useEffect} from 'react';
import s from '../index.module.css';
import Sidebar from "./Sidebar";
import VacanciesList from "../pages/Vacancies/VacanciesList";
import InputWithButton from "./InputWithButton";
import Pagination from "./Pagination/Pagination";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import Loader from "./Loader";
import {fetchAllInfo, searchVacancies, setPage} from "../store/vacancies/VacanciesSlice";
import EmptyState from "./EmptyState";

export type ChangePageType = (selectedItem: { selected: number }) => void
const Content = () => {

    const vacancies = useAppSelector(state => state.vacancies.vacanciesList)
    const status = useAppSelector(state => state.app.status)
    const page = useAppSelector(state => state.vacancies.pagination.page)
    const itemCount = useAppSelector(state => state.vacancies.pagination.itemCount)
    const total = useAppSelector(state => state.vacancies.pagination.total)
    const dispatch = useAppDispatch()

    const onChangeHandler: ChangePageType = ({selected}) => {
        dispatch(setPage(selected + 1))
        dispatch(searchVacancies())
    }

    useEffect(() => {
        dispatch(fetchAllInfo())
    }, [])

    if (status === 'loading') {
        return <Loader/>
    }

    return (
        <main className={s.container}>
            <Sidebar/>
            <div className={s.vacanciesWrapper}>
                <InputWithButton/>
                {vacancies.length > 0 ?
                    <>
                        <VacanciesList
                            vacancies={vacancies}
                        />
                        <Pagination
                            total={total}
                            page={page}
                            itemCount={itemCount}
                            changePage={onChangeHandler}
                        />
                    </>
                    :
                    <EmptyState/>
                }
            </div>
        </main>
    );
};

export default Content;