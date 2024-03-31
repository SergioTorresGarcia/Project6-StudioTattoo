import "./Navigator.css"

import { useNavigate } from "react-router-dom"

export const Navigator = ({ className, title, destination }) => {
    const navigate = useNavigate()

    return (
        <div className={className} onClick={() => navigate(destination)}>
            {title}
        </div>
    )
}