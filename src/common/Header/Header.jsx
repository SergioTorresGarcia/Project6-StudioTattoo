
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { Navigator } from "../Navigator/Navigator";
import { useState } from "react";

export const Header = () => {
    const navigate = useNavigate();
    const passport = JSON.parse(localStorage.getItem("passport"));

    const [selectedButton, setSelectedButton] = useState(""); // State to track the selected button

    // Function to handle button selection
    const handleButtonClick = (title) => {
        setSelectedButton(title); // Update selected button state
    };

    const logOut = () => {
        localStorage.removeItem("passport");
        navigate("/login");
    }
    const datosUser = JSON.parse(localStorage.getItem("passport"));
    const [role, setRole] = useState(datosUser?.decodificado.roleName);

    return (
        <div className="headerDesign">

            <div className="navigatorDesign">
                <Navigator title={"HOME"} destination={"/"} />
            </div>
            <div className="navigatorDesign btn">
                {
                    role === "superadmin"
                        ? <Navigator title={"Admin zone"} destination={"/admin"} />
                        : null
                }
            </div>
            {/* //` */}
            {passport?.token ? (
                <div className="authMenu">
                    <div className="navigatorDesign btn">
                        <Navigator title={`Hey, ${passport?.decodificado?.userName}!`} destination={"/profile"} />
                    </div>

                    <div className="navigatorDesign btn">
                        <Navigator title={"My appointments"} destination={"/appointments/profile"} />
                    </div>

                    <div className="navigatorDesign btn" onClick={logOut}>
                        <Navigator title={"Log out"} destination={"/"} />
                    </div>
                </div>
            ) : (
                <div className="authMenu">
                    <div className="navigatorDesign btn">
                        <Navigator title={"Register"} destination={"/register"} />
                    </div>
                    <div className="navigatorDesign btn">
                        <Navigator title={"Login"} destination={"/login"} />
                    </div>
                </div>
            )}
        </div>
    )
}