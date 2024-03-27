
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import { useEffect, useState } from "react";
import { Header } from "../../common/Header/Header";

export const Admin = () => {
    const datosUser = JSON.parse(localStorage.getItem("passport"));
    const navigate = useNavigate();


    const [roleStorage, setRoleStorage] = useState(datosUser?.roleName);


    useEffect(() => {
        if (roleStorage !== 'superadmin') {
            navigate("/admin")
        }
    }, [])

    return (
        <>
            <Header />
            <div className="adminDesign">
                - all users (+ CRUS) <br />
                - all appointments (+CRUD) <br />
                - admin roles
            </div>
        </>
    )
}