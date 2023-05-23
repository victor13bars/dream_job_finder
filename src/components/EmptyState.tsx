import React, {ReactChild, ReactChildren} from 'react';
import s from '../index.module.css';
import emptyState from '../img/emptyState.svg'

export type EmptyStatePropsType = {
    children?: React.ReactNode
}
const EmptyState:React.FC<EmptyStatePropsType> = ({children}) => {
    return (

        <main className={s.empty}>
            <div className={s.emptyImage}>
                <img src={emptyState} alt="empty state"/>
            </div>
            <p className={s.emptyDescription}>Упс, здесь ещё ничего нет</p>
            {children}
        </main>

    );
};

export default EmptyState;