
import "./CInput.css";

export const CInput = ({ className, type, disabled, placeholder, name, value, onChangeFunction, onBlurFunction }) => {

    return (
        <input
            className={className}
            type={type}
            placeholder={placeholder}
            name={name}
            disabled={disabled}
            value={value}
            onChange={onChangeFunction}
            onBlur={onBlurFunction}
        />
    )
}