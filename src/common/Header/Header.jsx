
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { Navigator } from "../Navigator/Navigator";
import { useState } from "react";

export const Header = () => {
    const navigate = useNavigate();
    const passport = JSON.parse(localStorage.getItem("passport"));

    const logOut = () => {
        localStorage.removeItem("passport");
        navigate("/login");
    }
    const datosUser = JSON.parse(localStorage.getItem("passport"));

    const [role, setRole] = useState(datosUser?.decodificado.roleName);

    return (
        <div className="headerDesign">
            <div className="btn">
                <Navigator title={"HOME"} destination={"/"} />
            </div>
            <div className="btn">
                {
                    role === "superadmin"
                        ? <Navigator title={"Admin zone"} destination={"/admin"} />
                        : null
                }
            </div>

            {passport?.token ? (
                <div className="authMenu">
                    <div className="btn">
                        <Navigator title={`Hey, ${passport?.decodificado?.userName}!`} destination={"/profile"} />
                    </div>

                    <div className="btn">
                        <Navigator title={"Mis citas"} destination={"/appointments/profile"} />
                    </div>

                    <div className="btn" onClick={logOut}>
                        <Navigator title={"Log out"} destination={"/"} />
                    </div>
                </div>
            ) : (
                <div className="authMenu">
                    <div className="btn">
                        <Navigator title={"Register"} destination={"/register"} />
                    </div>
                    <div className="btn">
                        <Navigator title={"Login"} destination={"/login"} />
                    </div>
                </div>
            )}
        </div>
    )
}