
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import "./Login.css"
import { validate } from "../../utils/functions"
import { CInput } from "../../common/CInput/CInput";
import { CButton } from "../../common/CButton/CButton";

import { LoginUser } from "../../services/apiCalls";
import { decodeToken } from "react-jwt";
import { Header } from "../../common/Header/Header";

export const Login = () => {
    const datosUser = JSON.parse(localStorage.getItem("passport"));
    const navigate = useNavigate();

    const [tokenStorage, setTokenStorage] = useState(datosUser?.token);

    const [credenciales, setCredenciales] = useState({
        email: "",
        password: "",
    });

    const [credencialesError, setCredencialesError] = useState({
        emailError: "",
        passwordError: "",
    });

    const [msgError, setMsgError] = useState("");

    useEffect(() => {
        if (tokenStorage) {
            navigate("/");
        }
    }, [tokenStorage]);


    //checks every change on the input
    const inputHandler = (e) => {
        setCredenciales((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    //checks input once we click outside
    const checkError = (e) => {
        const error = validate(e.target.name, e.target.value);

        setCredencialesError((prevState) => ({
            ...prevState,
            [e.target.name + "Error"]: error,
        }));
    };

    // main function
    const loginMe = async () => {
        try {
            for (let elemento in credenciales) {
                if (credenciales[elemento] === "") {
                    throw new Error("All fields are required");
                }
            }
            const fetched = await LoginUser(credenciales);
            const decodificado = decodeToken(fetched.token);

            const passport = {
                token: fetched.token,
                decodificado: decodificado,
            };

            localStorage.setItem("passport", JSON.stringify(passport));

            setMsgError(
                `Hi ${decodificado.userName}, welcome to our site`
            );

            setTimeout(() => {
                navigate("/");
            }, 2000);
        } catch (error) {
            setMsgError(error.message);
        }
    };

    return (
        <>
            <Header />
            <div className="loginDesign">
                <label className="tealColor">Your e-mail:</label>
                <CInput
                    className={`inputDesign ${credencialesError.emailError !== "" ? "inputDesignError" : ""}`}
                    type={"email"}
                    placeholder={"example@domain.com"}
                    name={"email"}
                    disabled={""}
                    value={credenciales.email || ""}
                    onChangeFunction={(e) => inputHandler(e)}
                    onBlurFunction={(e) => checkError(e)}
                />
                <div className="error">{credencialesError.emailError}</div>
                <label className="tealColor">Your password:</label>
                <CInput
                    className={`inputDesign ${credencialesError.passwordError !== "" ? "inputDesignError" : ""
                        }`}
                    type={"password"}
                    placeholder={"8-14 characters (incl.: small, big letters and numbers)"}
                    name={"password"}
                    disabled={""}
                    value={credenciales.password || ""}
                    onChangeFunction={(e) => inputHandler(e)}
                    onBlurFunction={(e) => checkError(e)}
                />
                <div className="error">{credencialesError.passwordError}</div>

                <CButton
                    className={"cButtonDesign"}
                    title={"Login"}
                    functionEmit={loginMe}
                />
                <div className="error">{msgError}</div>
            </div>
        </>
    );
}