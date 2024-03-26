
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

                    <div className="btn" onClick={logOut}>
                        <Navigator title={"log out"} destination={"/"} />
                    </div>
                </div>
            ) : (
                <div className="authMenu">
                    <div className="btn">
                        <Navigator title={"register"} destination={"/register"} />
                    </div>
                    <div className="btn">
                        <Navigator title={"login"} destination={"/login"} />
                    </div>
                </div>
            )}
        </div>
    )
}