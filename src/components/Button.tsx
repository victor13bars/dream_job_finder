import React from 'react';
import s from '../index.module.css';

type ButtonPropsType = {
    oncClick?: () => void
    text: string
    className?: string
}
const Button: React.FC<ButtonPropsType> = ({oncClick, text, className}) => {
    return (
        <button
            className={s.button + ' ' + className}
            onClick={oncClick}
        >
            {text}
        </button>
    );
};

export default Button;