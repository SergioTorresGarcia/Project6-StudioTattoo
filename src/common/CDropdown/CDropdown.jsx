import { Dropdown } from "react-day-picker";
import "./CDropdown.css"

export const CDropdown = ({ className, type, placeholder, name, value, onChangeFunction, onBlurFunction }) => {

    const services = [
        "CHOOSE A SERVICE",
        "Service 1",
        "Service 2",
        "Service 3",
        "Service 4",
        "Service 5"
    ];

    return (
        <select
            className={className}
            type={Dropdown}
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
