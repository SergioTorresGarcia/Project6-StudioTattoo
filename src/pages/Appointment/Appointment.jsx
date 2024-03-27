
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Header } from "../../common/Header/Header";
import "./Appointment.css";
import { GetAppointments } from "../../services/apiCalls";
import { ApCard } from "../../common/ApCard/ApCard";

export const Appointment = () => {

    const datosUser = JSON.parse(localStorage.getItem("passport"));

    const [tokenStorage, setTokenStorage] = useState(datosUser?.token);
    const [loadedData, setLoadedData] = useState(false);
    const [appointments, setAppointments] = useState([]);
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

    return (
        <>
            <Header />
            <div className="appointmentDesign">

                {!loadedData ? (
                    <img className="loader" src="../../../src/img/loader.gif" alt="loader" />
                ) : (
                    <div>
                        {
                            appointments.map((item) => (
                                <ApCard
                                    key={item.id}
                                    service={item.service.serviceName}
                                    appointmentDate={item.appointmentDate}
                                />
                            ))
                        }
                        {appointments.map((item) => (
                            <ApCard
                                key={item.id}
                                service={item.service.serviceName}
                                appointmentDate={item.appointmentDate}
                            />
                        ))}
                        {appointments.map((item) => (
                            <ApCard
                                key={item.id}
                                service={item.service.serviceName}
                                appointmentDate={item.appointmentDate}
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};
