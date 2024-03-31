import { Dropdown } from "react-day-picker";
import "./CDropdown.css"

export const CDropdown = ({ className, placeholder, name, value, onChangeFunction, onBlurFunction }) => {

    return (
        <select
            className={className}
            name={name}
            value={value}
            onChange={onChangeFunction}
            onBlur={onBlurFunction}
        >
            <option value="" disabled>{placeholder}</option>
            {services.map((service, index) => (
                <option key={index} value={service}>{service}</option>
            ))}
        </select>
    )
}
