import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from 'react';
import s from '../index.module.css';

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

type CustomInputPropsType = DefaultInputPropsType & {
    onChangeText?: (value: number) => void
    onEnter?: () => void
    dataAttributes?: string
};
const CustomInput: React.FC<CustomInputPropsType> = (
    {
        type,
        onChange, onChangeText,
        onKeyPress, onEnter,
        className,
        dataAttributes,
        step,
        readOnly,
        ...restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange
        && onChange(e);

        onChangeText && onChangeText(+e.currentTarget.value);
    }
    return (
        <div className={s.inputSalary}>
            <input
                data-elem={dataAttributes}
                type={"number"}
                onChange={onChangeCallback}
                className={className}
                step={step}
                readOnly={readOnly}
                {...restProps}
            />
        </div>
    );
};

export default CustomInput;