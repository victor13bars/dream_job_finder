import React from 'react';
import styles from '../../index.module.css';
import {VacancyType} from "../../store/vacancies/VacanciesSlice";
import VacancyItem from "./VacancyItem";

export type VacanciesListPropsType = {
    vacancies: Array<VacancyType> | []
}
const VacanciesList: React.FC<VacanciesListPropsType> = ({vacancies}) => {

    return (
        <div className={styles.vacancies}>
            {vacancies && vacancies.map(vacancy =>
                <VacancyItem
                    key={vacancy.id}
                    id={vacancy.id}
                    professionName={vacancy.professionName}
                    companyName={vacancy.companyName}
                    paymentFrom={vacancy.paymentFrom}
                    paymentTo={vacancy.paymentTo}
                    currency={vacancy.currency}
                    typeWork={vacancy.typeWork}
                    town={vacancy.town}
                />
            )}
        </div>
    );
};

export default VacanciesList;

