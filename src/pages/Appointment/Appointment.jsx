
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Header } from "../../common/Header/Header";
import "./Appointment.css";
import { GetAppointments, DeleteAppointment } from "../../services/apiCalls";
import { ApCard } from "../../common/ApCard/ApCard";
import { CustomLink } from "../../common/CustomLink/CustomLink";
import { CInput } from "../../common/CInput/CInput";

export const Appointment = () => {
    const datosUser = JSON.parse(localStorage.getItem("passport"));

    const [tokenStorage, setTokenStorage] = useState(datosUser?.token);
    const [loadedData, setLoadedData] = useState(false);
    const [appointments, setAppointments] = useState([]);
    const [appointment, setAppointment] = useState({
        appointmentDate: "",
        service: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                if (!tokenStorage) {
                    throw new Error("Token is not available");
                }
                const appointmentsData = await GetAppointments(tokenStorage); // Pass the token to GetAppointments
                const responseData = appointmentsData.data

                setAppointments(responseData)
                setTimeout(() => { setLoadedData(true) }, 250)

            } catch (error) {
                console.error('Failed to fetch appointments:', error.message);
            }
        };
        if (!loadedData) {
            fetchAppointments();
        }
    }, [loadedData]);


    const deleteAppointment = async (id) => {
        try {
            await DeleteAppointment(tokenStorage, id);
            setAppointments(prevAppointments => prevAppointments.filter(appointment => appointment.id !== id));
        } catch (error) {
            throw new Error('Failed to delete appointment: ' + error.message);
        }
    };


    // const updateAppointment = async (id) => {
    //     try {
    //         await UpdateAppointment(tokenStorage, id);
    //         // setAppointments(prevAppointments => prevAppointments.filter(appointment => appointment.id !== id));
    //         setAppointments(data)

    //         // setUser(userData);
    //         setWrite("disabled");
    //     } catch (error) {
    //         throw new Error('Updating data failed: ' + error.message);
    //     }
    // };

    // const updateAppointment = async () => {
    //     try {
    //         const appointmentData = {
    //             appointmentDate: appointment.appointmentDate,
    //             service: appointment.service
    //         };

    //         setAppointment(appointmentData);
    //         // setWrite("disabled");
    //     } catch (error) {
    //         throw new Error('Updating data failed: ' + error.message);
    //     }
    // };

    return (
        <>
            <Header />
            <div className="">
                {!loadedData ? (
                    <img className="loader" src="../../../src/img/loader.gif" alt="loader" />
                ) : (
                    appointments.length == 0
                        ? <>
                            <div> NEW APPOINTMENT</div>
                            <div className="appointmentDesign">NO APPOINTMENTS BOOKED</div>
                        </>
                        : <>


                            <div className="appointmentDesign">
                                {appointments.map((item) => (
                                    <ApCard
                                        key={item.id}
                                        service={item.service.serviceName}
                                        appointmentDate={item.appointmentDate}
                                        // onUpdate={() => updateAppointment(item.id)}
                                        onDelete={() => deleteAppointment(item.id)}
                                    />
                                ))}
                            </div>
                        </>
                )
                }
            </div>
        </>
    );
};



