import React, {useState} from 'react'
import {IconChevronDown} from '@tabler/icons-react';
import {createStyles, Group, Menu, UnstyledButton} from "@mantine/core";
import {CatalogType} from "../store/vacancies/VacanciesSlice";
import s from '../index.module.css';

export type CatalogPickerPropsType = {
    catalogues: Array<CatalogType>
    selected: CatalogType | null
    setSelected: (item: CatalogType) => void
}
const useStyles = createStyles((theme, {opened}: { opened: boolean }) => ({
    control: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: `${theme.spacing.xs} ${theme.spacing.md}`,
        borderRadius: '8px',
        border: opened ? '1px solid #5E96FC' : '1px solid #D5D6DC',
        transition: 'background-color 150ms ease',
        backgroundColor:
            theme.colorScheme === 'dark'
                ? theme.colors.dark[opened ? 5 : 6]
                : opened
                    ? theme.colors.gray[0]
                    : theme.white,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
        },
    },
    label: {
        fontFamily: 'Inter',
        fontWeight: 400,
        lineHeight: '20px',
        color: '#ACADB9',
        fontSize: '14px',

    },
    icon: {
        transition: 'transform 150ms ease',
        transform: opened ? 'rotate(180deg)' : 'rotate(0deg)',
    },
}));

const CatalogPicker: React.FC<CatalogPickerPropsType> = ({catalogues, selected, setSelected}) => {

    const [opened, setOpened] = useState(false);
    const {classes} = useStyles({opened});

    const items = catalogues.map((item) => (
        <Menu.Item
            className={s.menuItem}
            onClick={() => setSelected(item)}
            key={item.key}
        >
            {item.title}
        </Menu.Item>
    ));

    return (
        <>
            <p className={s.filterTitle}>Отрасль</p>
            <Menu
                data-elem='industry-select'
                onOpen={() => setOpened(true)}
                onClose={() => setOpened(false)}
                radius="md"
                width="target"
                withinPortal
            >
                <Menu.Target>
                    <UnstyledButton className={classes.control}>
                        <Group spacing="xs">
                            <span className={classes.label}>
                                {selected ? selected.title : "Выберите отрасль"}
                            </span>
                        </Group>
                        <IconChevronDown size="1rem" className={classes.icon} stroke={1.5}/>
                    </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>{items}</Menu.Dropdown>
            </Menu>
        </>
    );
};

export default CatalogPicker;