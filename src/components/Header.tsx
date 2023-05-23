import React from 'react';
import s from '../index.module.css';
import logo from '../img/logo2.svg'
import {NavLink} from "react-router-dom";

const Header = () => {
    console.log()
    return (
        <header className={s.header}>
            <img className={s.logo} src={logo} alt="logo"/>
            <nav>
                <ul className={s.nav__links}>
                    <li>
                        <NavLink style={(params) => {
                                return {
                                    color: params.isActive ? '#5E96FC' : '#232134',
                                    fontWeight: params.isActive ? '500' : '400'
                                }
                            }}
                            to={'/'}
                        >
                            Поиск вакансий
                        </NavLink>
                    </li>
                    <li>
                        <NavLink style={(params) => {
                                return {
                                    color: params.isActive ? '#5E96FC' : '#232134',
                                    fontWeight: params.isActive ? '500' : '400'
                                }
                            }}
                            to={'/favorites'}
                        >
                            Избранное
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;