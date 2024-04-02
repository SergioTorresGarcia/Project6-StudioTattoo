// AppointmentDetails.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AppointmentDetail.css";
import { Header } from "../../common/Header/Header";
import { GetAppointmentDetails, GetServices, GetUsers } from "../../services/apiCalls";
import dayjs from "dayjs";

export const AppointmentDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [info, setInfo] = useState(null);
    const [serviceName, setServiceName] = useState(null);
    const [userFirstName, setUserFirstName] = useState(null);
    const [userLastName, setUserLastName] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const appointmentDetails = await GetAppointmentDetails(id);
                setInfo(appointmentDetails);

                // Fetch serviceName using serviceId
                const services = await GetServices();
                const service = services.find(service => service.id === appointmentDetails.serviceId);
                if (service) {
                    setServiceName(service.serviceName);
                }

                // Fetch user details using userId
                const userDetails = await GetUsers(appointmentDetails.userId);
                if (userDetails) {
                    setUserFirstName(userDetails.firstName);
                    setUserLastName(userDetails.lastName);
                }
            } catch (error) {
                console.error('Error fetching appointment details:', error.message);
            }
        };

        fetchData();
    }, [id]);

    return (
        <>
            <Header />
            <div className="appointmentDetailDesign">
                <div className="details" onClick={() => navigate("/appointments/profile")}>
                    {info && (<>
                        <span>Service:</span>
                        <div className="allDetail">
                            <img className="imageDetail" src={`../img/s${info.id <= 4 ? info.id : info.id % 4}.png`} />
                            <div className="textDetail">
                                <span>Service:</span>
                                <span className="colorGrey">{serviceName}</span>
                                <br /><br />
                                <span>Description:</span>
                                <span className="colorGrey">{info.description}</span>
                                <br /><br />
                                <span>User:</span>
                                <span className="colorGrey">{`${userFirstName} ${userLastName}`}</span>
                                <br /><br />
                                <p>Appointment Date: {dayjs(info.appointmentDate).format("ddd YYYY-MM-DD")}</p>
                                <p>Appointment Hour: {dayjs(info.appointmentDate).format("HH:mm")}</p>
                            </div>
                        </div>
                    </>)}
                </div>
            </div>
        </>
    );
};
