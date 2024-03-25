import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "./Profile.css";
import { GetProfile } from "../../services/apiCalls";
import { CInput } from "../../common/CInput/CInput";
import dayjs from "dayjs";
import { Header } from "../../common/Header/Header";
import { CButton } from "../../common/CButton/CButton";

export const Profile = () => {
    const datosUser = JSON.parse(localStorage.getItem("passport"));
    const navigate = useNavigate();

    console.log("datosUser ", datosUser);
    const [write, setWrite] = useState("disabled");
    const [tokenStorage, setTokenStorage] = useState(datosUser?.token);
    const [loadedData, setLoadedData] = useState(false);
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        birthDate: "",
        email: "",
    });
    console.log("empty user ", user);

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

    console.log("tokenStorage ", tokenStorage);

    useEffect(() => {
        const getUserProfile = async () => {
            console.log("user b4 fetching ", user);
            try {
                const fetched = await GetProfile(tokenStorage);
                console.log("fetched ", fetched);
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
    }, [user]); //[]

    // const updateData = async () => {

    //     try {
    //         const fetched = await UpdateProfile(tokenStorage, user)

    //         setUser({
    //             firstName: fetched.data.firstName,
    //             lastName: fetched.data.lastName,
    //             birthDate: fetched.data.birthDate,
    //             email: fetched.data.email
    //         })

    //         setWrite("disabled")
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    return (
        <>
            <Header />
            <div className="profileDesign">
                {!loadedData ? (
                    <div>CARGANDO</div>
                ) : (
                    <div>
                        <CInput
                            className={`inputDesign ${userError.firstNameError !== "" ? "inputDesignError" : ""
                                }`}
                            type={"text"}
                            placeholder={""}
                            name={"firstName"}
                            disabled={write}
                            value={user.firstName || ""}
                            onChangeFunction={(e) => inputHandler(e)}
                            onBlurFunction={(e) => checkError(e)}
                        />
                        <CInput
                            className={`inputDesign ${userError.lastNameError !== "" ? "inputDesignError" : ""
                                }`}
                            type={"text"}
                            placeholder={""}
                            name={"lastName"}
                            disabled={write}
                            value={user.lastName || ""}
                            onChangeFunction={(e) => inputHandler(e)}
                            onBlurFunction={(e) => checkError(e)}
                        />
                        <CInput
                            className={`inputDesign ${userError.birthDateError !== "" ? "inputDesignError" : ""
                                }`}
                            type={"text"}
                            placeholder={""}
                            name={"birthDate"}
                            disabled={write}
                            value={user.birthDate || ""}
                            onChangeFunction={(e) => inputHandler(e)}
                            onBlurFunction={(e) => checkError(e)}
                        />
                        <CInput
                            className={`inputDesign ${userError.emailError !== "" ? "inputDesignError" : ""
                                }`}
                            type={"email"}
                            placeholder={""}
                            name={"email"}
                            disabled={"disabled"}
                            value={user.email || ""}
                            onChangeFunction={(e) => inputHandler(e)}
                            onBlurFunction={(e) => checkError(e)}
                        />
                        <CButton
                            className={write === "" ? "cButtonGreen cButtonDesign" : "cButtonDesign"}
                            title={write === "" ? "Confirm" : "Edit"}
                            functionEmit={write === "" ? updateData : () => setWrite("")}
                        />
                    </div>
                )}
            </div>
        </>
    );
};
