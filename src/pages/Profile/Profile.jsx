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


    // const updateData = async () => {
    //     try {
    //         await UpdateProfile(tokenStorage, user);
    //         const updatedProfile = await GetProfile();
    //         // Update the state with the updated profile data
    //         // setUser(updatedProfile);
    //         // setUser({
    //         //     firstName: updatedProfile.data.firstName,
    //         //     lastName: updatedProfile.data.lastName,
    //         //     birthDate: updatedProfile.data.birthDate,
    //         //     email: updatedProfile.data.email
    //         // });

    //         setWrite("disabled");
    //     } catch (error) {
    //         console.error('Error updating profile:', error);
    //     }
    // };


    // const updateData = async () => {
    //     try {
    //         const fetched = await UpdateProfile(tokenStorage, user)
    //         console.log("fetched", fetched);
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

    // const updateData = async () => {
    //     try {
    //         const updatedData = await UpdateProfile(tokenStorage, user);

    //         setUser(updatedData);
    //         setWrite("disabled");
    //     } catch (error) {
    //         console.error('Error updating profile:', error);
    //     }
    // };
    const updateData = async () => {
        try {
            const fetched = await UpdateProfile(tokenStorage, user);

            setUser(fetched);

            setWrite("disabled");
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <Header />
            <div className="profileDesign">
                {!loadedData ? (
                    <img className="loader" src="./src/img/loader.gif" alt="loader" />
                ) : (
                    <div>
                        <CInput
                            className={`inputDesign ${userError.firstNameError !== "" ? "inputDesignError" : ""}`}
                            type={"text"}
                            placeholder={""}
                            name={"firstName"}
                            disabled={write}
                            value={user.firstName || ""}
                            onChangeFunction={(e) => inputHandler(e)}
                            onBlurFunction={(e) => checkError(e)}
                        />
                        <CInput
                            className={`inputDesign ${userError.lastNameError !== "" ? "inputDesignError" : ""}`}
                            type={"text"}
                            placeholder={""}
                            name={"lastName"}
                            disabled={write}
                            value={user.lastName || ""}
                            onChangeFunction={(e) => inputHandler(e)}
                            onBlurFunction={(e) => checkError(e)}
                        />
                        <CInput
                            className={`inputDesign ${userError.birthDateError !== "" ? "inputDesignError" : ""}`}
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
