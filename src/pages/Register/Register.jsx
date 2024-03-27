
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import "./Register.css";
import { validate } from "../../utils/functions";

import { CInput } from "../../common/CInput/CInput";
import { CButton } from "../../common/CButton/CButton";

import { RegisterUser } from "../../services/apiCalls";
import { Header } from "../../common/Header/Header";

export const Register = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        birth_date: "",
        email: "",
        password: "",
    });

    const [userError, setUserError] = useState({
        nameError: "",
        dateError: "",
        emailError: "",
        passwordError: "",
    });

    const [msgError, setMsgError] = useState("");

    const inputHandler = (e) => {
        // binding
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const checkError = (e) => {
        const error = validate(e.target.name, e.target.value);

        setUserError((prevState) => ({
            ...prevState,
            [e.target.name + "Error"]: error,
        }));
    };

    const registerMe = async () => {
        try {
            for (let elemento in user) {
                if (user[elemento] === "") {
                    throw new Error("All fields are required");
                }
            }

            const fetched = await RegisterUser(user);

            console.log(fetched);
            setMsgError(fetched.message);

            setTimeout(() => {
                navigate("/login");
            }, 1200);
        } catch (error) {
            setMsgError(error.message);
        }
    };

    return (
        <>
            <Header />
            <div className="registerDesign">
                {/* <pre>{JSON.stringify(user, null, 2)}</pre> HELP DURING DEV - preview of the body */}
                <CInput
                    className={`inputDesign ${userError.nameError !== "" ? "inputDesignError" : ""
                        }`}
                    type={"text"}
                    placeholder={"first name"}
                    name={"first_name"}
                    value={user.first_name || ""}
                    onChangeFunction={(e) => inputHandler(e)}
                    onBlurFunction={(e) => checkError(e)}
                />
                <div className="error">{userError.nameError}</div>
                <CInput
                    className={`inputDesign ${userError.nameError !== "" ? "inputDesignError" : ""
                        }`}
                    type={"text"}
                    placeholder={"last name"}
                    name={"last_name"}
                    value={user.last_name || ""}
                    onChangeFunction={(e) => inputHandler(e)}
                    onBlurFunction={(e) => checkError(e)}
                />
                <div className="error">{userError.nameError}</div>
                <CInput
                    className={`inputDesign ${userError.dateError !== "" ? "inputDesignError" : ""
                        }`}
                    type={"text"}
                    placeholder={"birth date"}
                    name={"birth_date"}
                    value={user.birth_date || ""}
                    onChangeFunction={(e) => inputHandler(e)}
                    onBlurFunction={(e) => checkError(e)}
                />
                <div className="error">{userError.dateError}</div>
                <CInput
                    className={`inputDesign ${userError.emailError !== "" ? "inputDesignError" : ""
                        }`}
                    type={"email"}
                    placeholder={"email"}
                    name={"email"}
                    value={user.email || ""}
                    onChangeFunction={(e) => inputHandler(e)}
                    onBlurFunction={(e) => checkError(e)}
                />
                <div className="error">{userError.emailError}</div>
                <CInput
                    className={`inputDesign ${userError.passwordError !== "" ? "inputDesignError" : ""
                        }`}
                    type={"password"}
                    placeholder={"password"}
                    name={"password"}
                    value={user.password || ""}
                    onChangeFunction={(e) => inputHandler(e)}
                    onBlurFunction={(e) => checkError(e)}
                />
                <div className="error">{userError.passwordError}</div>
                <CButton
                    className={"cButtonDesign"}
                    title={"Register"}
                    functionEmit={registerMe}
                />
                <div className="error">{msgError}</div>
            </div>
        </>
    );
};
