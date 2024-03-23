
import { CustomLink } from "../CustomLink/CustomLink";
import "./Header.css";

export const Header = () => {

    return (
        <div className="headerDesign">
            <CustomLink title={"Home"} destination={"/"} />

            <CustomLink title={"Login"} destination={"/login"} />
        </div>
    )
}