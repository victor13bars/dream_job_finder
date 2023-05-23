import React, {useEffect} from 'react';
import s from "../index.module.css";
import separator from "../img/separator.svg";
import place from "../img/place.svg";
import Favorite from "../components/Favorite";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {fetchVacancy} from "../store/vacancies/VacanciesSlice";
import {useParams} from "react-router-dom";
import Loader from "../components/Loader";

const Vacancy = () => {

    const params = useParams()
    const status = useAppSelector(state => state.app.status)
    const dispatch = useAppDispatch()
    const currentVacancy = useAppSelector(state => state.vacancies.currentVacancy)
    const professionName = useAppSelector(state => state.vacancies.currentVacancy?.professionName)
    const companyName  = useAppSelector(state => state.vacancies.currentVacancy?.companyName)
    const paymentFrom = useAppSelector(state => state.vacancies.currentVacancy?.paymentFrom)
    const paymentTo = useAppSelector(state => state.vacancies.currentVacancy?.paymentTo)
    const currency = useAppSelector(state => state.vacancies.currentVacancy?.currency)
    const typeWork = useAppSelector(state => state.vacancies.currentVacancy?.typeWork)
    const town = useAppSelector(state => state.vacancies.currentVacancy?.town)
    const vacancyRichText = useAppSelector(state => state.vacancies.currentVacancy?.vacancyRichText)
    console.log(params.id)

    useEffect(() => {
        dispatch(fetchVacancy(Number(params.id)))
    }, [])

    if (status === 'loading') {
        return <Loader/>
    }

    return (
        <main className={s.currentVacancy}>
            <div className={s.vacancy}>
                <div>
                    <p className={s.vacancyName + ' ' + s.currentName}>{professionName}</p>
                    <div className={s.vacancyInfo + ' ' + s.currentInfo}>
                        <p className={s.vacancySalary + '' + s.currentSalary}>з/п от {paymentFrom} {currency}</p>
                        <img className={s.vacancySeparator} src={separator} alt=""/>
                        <p className={s.vacancyType + ' ' + s.currentType}>{typeWork}</p>
                    </div>
                    <div className={s.vacancyLocation + ' ' + s.currentLocation}>
                        <img src={place} alt=""/>
                        <p className={s.vacancyTown}>{town}</p>
                    </div>
                </div>

                <Favorite
                    data={{
                        id:Number(params.id),
                        professionName:professionName!,
                        companyName:companyName!,
                        paymentFrom:paymentFrom!,
                        paymentTo:paymentTo!,
                        currency:currency!,
                        typeWork:typeWork!,
                        town:town!,
                    }}
                />
            </div>
            <div
                className={s.vacancyDetails}
                dangerouslySetInnerHTML={{__html: vacancyRichText!}}
            />
        </main>

    );
};

export default Vacancy;