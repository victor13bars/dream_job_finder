import React from 'react';
import s from '../index.module.css';
import reset from '../img/reset.svg'
import CatalogPicker from "./CatalogPicker";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import Button from "./Button";
import {
    CatalogType,
    fetchAllInfo,
    searchVacancies,
    setCatalog,
    setFiltersDefault,
    setPaginationDefault,
    setPaymentFrom,
    setPaymentTo
} from "../store/vacancies/VacanciesSlice";
import CustomInput from "./CustomInput";

const Sidebar = () => {

    const catalog = useAppSelector(state => state.vacancies.filters.catalog)
    const payment_from = useAppSelector(state => state.vacancies.filters.payment_from)
    const payment_to = useAppSelector(state => state.vacancies.filters.payment_to)
    const catalogues = useAppSelector(state => state.vacancies.cataloguesList)
    // const [salaryFrom, setSalaryFrom] = useState(payment_from)
    // const [salaryTo, setSalaryTo] = useState(payment_to)
    const setSalaryFrom = (value: number) => {
        dispatch(setPaymentFrom(value))
    }
    const setSalaryTo = (value: number) => {
        dispatch(setPaymentTo(value))
    }
    const setSelected = (value: CatalogType | null) => {
        dispatch(setCatalog(value))
    }

    const resetAll = () => {
        dispatch(setFiltersDefault())
        dispatch(setPaginationDefault())
        dispatch(fetchAllInfo())
    }

    const dispatch = useAppDispatch()
    const onClickHandler = () => {
        dispatch(setPaginationDefault())
        dispatch(searchVacancies())
    }

    return (
        <div className={s.sidebar}>
            <div className={s.sidebarDescription}>
                <div className={s.sidebarTitle}>Фильтры</div>
                <div className={s.resetBtn}>
                    <p
                        onClick={resetAll}
                        className={s.resetTitle}
                    >Сбросить всё</p>
                    <img src={reset} alt="reset"/>
                </div>
            </div>
            <div className={s.filters}>
                {catalogues.length > 0 && <CatalogPicker

                    catalogues={catalogues}
                    selected={catalog}
                    setSelected={setSelected}
                />}
                <div className={s.filterSalary}>
                    <p className={s.filterTitle}>Оклад</p>
                    <CustomInput
                        dataAttributes={"salary-from-input"}
                        className={s.customInput}
                        value={payment_from > 0 ? payment_from : ''}
                        placeholder={'От'}
                        onChangeText={setSalaryFrom}
                    />
                    <CustomInput
                        dataAttributes={"salary-to-input"}
                        className={s.customInput}
                        value={payment_to > 0 ? payment_to : ''}
                        placeholder={'До'}
                        onChangeText={setSalaryTo}
                    />
                </div>
                <Button
                    data-elem='search-button'
                    oncClick={onClickHandler}
                    text='Применить'
                />
            </div>
        </div>
    );
};

export default Sidebar;

