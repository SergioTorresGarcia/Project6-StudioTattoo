
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { Navigator } from "../Navigator/Navigator";

export const Header = () => {
    const navigate = useNavigate();
    const passport = JSON.parse(localStorage.getItem("passport"));

    const logOut = () => {
        localStorage.removeItem("passport");
        navigate("/login");
    }

    return (
        <div className="headerDesign">
            <div className="btn">
                <Navigator title={"HOME"} destination={"/"} />
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