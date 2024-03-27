import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "./Profile.css";

import { CInput } from "../../common/CInput/CInput";
import dayjs from "dayjs";
import { Header } from "../../common/Header/Header";
import { CButton } from "../../common/CButton/CButton";
import { GetProfile, UpdateProfile } from "../../services/apiCalls";

export const Profile = () => {
    const datosUser = JSON.parse(localStorage.getItem("passport"));
    const navigate = useNavigate();

    const [write, setWrite] = useState("disabled");
    const [tokenStorage, setTokenStorage] = useState(datosUser?.token);
    const [loadedData, setLoadedData] = useState(false);
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        birthDate: "",
        email: "",
    });


    const [userError, setUserError] = useState({
        firstNameError: "",
        lastNameError: "",
        birthDateError: "",
        emailError: "",

    });

    const inputHandler = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const checkError = (e) => {
        //not sure if something needs to be checked
    };

    useEffect(() => {
        if (!tokenStorage) {
            navigate("/");
        }
    }, [tokenStorage]);

    useEffect(() => {
        const getUserProfile = async () => {
            try {
                const fetched = await GetProfile(tokenStorage);
                setLoadedData(true);

                const parsedBirth = dayjs(fetched.data.birthDate).format("YYYY-MM-DD");
                setUser({
                    firstName: fetched.data.firstName,
                    lastName: fetched.data.lastName,
                    birthDate: parsedBirth,
                    email: fetched.data.email,
                });

            } catch (error) {
                throw new Error('Get profile failed: ' + error.message);
            }
        };

        if (!loadedData) {
            getUserProfile();
        }
    }, [user]);


    const updateData = async () => {
        try {
            //data needs to be prepared to be updated (if not we pass an object from the body)
            const userData = {
                firstName: user.firstName,
                lastName: user.lastName,
                birthDate: user.birthDate,
                email: user.email
            };

            setUser(userData);
            setWrite("disabled");
        } catch (error) {
            throw new Error('Updating data failed: ' + error.message);
        }
    };

    return (
        <>
            <Header />
            <div className="profileDesign">
                {!loadedData ? (
                    <img className="loader" src="./src/img/loader.gif" alt="loader" />
                ) : (
                    <div>
                        <CInput
                            className={`inputDesign ${userError.firstNameError !== "" ? "inputDesignError" : ""} ${write === "" ? "borderEdit" : ""}`}
                            type={"text"}
                            placeholder={""}
                            name={"firstName"}
                            disabled={write}
                            value={user.firstName || ""}
                            onChangeFunction={(e) => inputHandler(e)}
                            onBlurFunction={(e) => checkError(e)}
                        />
                        <CInput
                            className={`inputDesign ${userError.lastNameError !== "" ? "inputDesignError" : ""} ${write === "" ? "borderEdit" : ""}`}
                            type={"text"}
                            placeholder={""}
                            name={"lastName"}
                            disabled={write}
                            value={user.lastName || ""}
                            onChangeFunction={(e) => inputHandler(e)}
                            onBlurFunction={(e) => checkError(e)}
                        />
                        <CInput
                            className={`inputDesign ${userError.birthDateError !== "" ? "inputDesignError" : ""} ${write === "" ? "borderEdit" : ""}`}
                            type={"text"}
                            placeholder={""}
                            name={"birthDate"}
                            disabled={write}
                            value={user.birthDate || ""}
                            onChangeFunction={(e) => inputHandler(e)}
                            onBlurFunction={(e) => checkError(e)}
                        />
                        <CInput
                            className={`inputDesign ${userError.emailError !== "" ? "inputDesignError" : ""}`}
                            type={"email"}
                            placeholder={""}
                            name={"email"}
                            disabled={"disabled"}
                            value={user.email || ""}
                            onChangeFunction={(e) => inputHandler(e)}
                            onBlurFunction={(e) => checkError(e)}
                        />
                        <CButton
                            className={write === "" ? "cButtonDesign cButtonGreen" : "cButtonDesign"}
                            title={write === "" ? "Confirm" : "Edit"}
                            functionEmit={write === "" ? updateData : () => setWrite("")}
                        />
                    </div>
                )}
            </div>
        </>
    );
};

