
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import { useEffect } from "react";

export const Admin = () => {

    const navigate = useNavigate()

    useEffect(() => {
        if (user.role !== 'admin') {
            navigate("/")
        }
    }, [])

    return (
        <>

        </>
    )
}