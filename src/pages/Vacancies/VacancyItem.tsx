import React from 'react';
import s from '../../index.module.css';
import separator from '../../img/separator.svg'
import place from '../../img/place.svg'
import Favorite from "../../components/Favorite";
import {NavLink} from "react-router-dom";
import {useAppDispatch} from "../../hooks/redux";
import {setCurrentVacancy, VacancyType} from "../../store/vacancies/VacanciesSlice";
import {checkSalary} from "../../helpers/checkSalary";


const VacancyItem: React.FC<VacancyType> = ({
                                                id,
                                                professionName,
                                                companyName,
                                                paymentFrom,
                                                paymentTo,
                                                currency,
                                                typeWork,
                                                town
                                            }) => {

    const dispatch = useAppDispatch()

    return (
        <div
            data-elem={`vacancy-${id}`}
            className={s.vacancy}
        >
            <div>
                <NavLink
                    to={`/vacancy/${id}`}
                    className={s.vacancyName}
                >
                    {professionName}
                </NavLink>
                <div className={s.vacancyInfo}>
                    <p className={s.vacancySalary}>{checkSalary(paymentFrom, paymentTo, currency)}</p>
                    <img className={s.vacancySeparator} src={separator} alt=""/>
                    <p className={s.vacancyType}>{typeWork}</p>
                </div>
                <div className={s.vacancyLocation}>
                    <img src={place} alt=""/>
                    <p className={s.vacancyTown}>{town}</p>
                </div>
            </div>
            <Favorite
                data={{
                    id,
                    professionName,
                    companyName,
                    paymentFrom,
                    paymentTo,
                    currency,
                    typeWork,
                    town,
                }}
            />
        </div>
    );
};

export default VacancyItem;

