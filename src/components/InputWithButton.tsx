import React, {ChangeEvent, useState} from 'react';
import s from '../index.module.css';

import {MantineProvider, TextInput, TextInputProps, useMantineTheme} from '@mantine/core';
import {IconSearch} from '@tabler/icons-react';
import Button from "./Button";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {searchVacancies, setPaginationDefault, setSearchValue} from "../store/vacancies/VacanciesSlice";

export const InputWithButton = (props: TextInputProps) => {
    const text = useAppSelector(state => state.vacancies.filters.searchValue)
    const setText = (value: string) => {
        dispatch(setSearchValue(value))
    }
    const dispatch = useAppDispatch()
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }

    const onClickHandler = () => {
        dispatch(setPaginationDefault())
        dispatch(searchVacancies())
    }


    return (
        <MantineProvider
            theme={{
                components: {
                    Input: {
                        styles: s.input
                    },
                }
            }}
        >
            <TextInput
                data-elem='search-input'
                value={text}
                onChange={onChangeHandler}
                icon={<IconSearch size="1.1rem" stroke={1.5}/>}
                radius="8px"
                size="md"
                rightSection={
                    <Button
                        data-elem='search-button'
                        text='Поиск'
                        oncClick={onClickHandler}
                    />
                }
                placeholder="Введите название вакансии"
                rightSectionWidth='107px'
                {...props}
            />
        </MantineProvider>
    );
}

export default InputWithButton;