
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Header } from "../../common/Header/Header";
import "./Appointment.css";
import dayjs from "dayjs";
import { GetAppointments, DeleteAppointment, CreateAppointment, GetServices, UpdateAppointment, GetAppointmentDetails } from "../../services/apiCalls";
import { ApCard } from "../../common/ApCard/ApCard";
import { AppointmentForm } from "../../common/AppointmentForm/AppointmentForm";


export const Appointment = () => {
    const datosUser = JSON.parse(localStorage.getItem("passport"));
    const [tokenStorage, setTokenStorage] = useState(datosUser?.token);
    const [userId, setUserId] = useState(datosUser?.decodificado?.userId);
    const [loadedData, setLoadedData] = useState(false);
    const [appointments, setAppointments] = useState([]);
    const [services, setServices] = useState([]);
    const [selectedServiceId, setSelectedServiceId] = useState('');
    const [appointment, setAppointment] = useState([]);
    const [dataDetails, setDataDetails] = useState(null); //we get a single appointment

    useEffect(() => {
        if (!tokenStorage) {
            navigate("/");
        }
    }, [tokenStorage]);

    const navigate = useNavigate();

    useEffect(() => {
        fetchAppointments(); // Function to fetch appointments data
    }, [loadedData]);

    useEffect(() => {
        fetchServices();
        // seeDetailsA();
    }, []);

    // GETTING ALL APPOINTMENTS (needs token)
    const fetchAppointments = async () => {
        try {
            if (!tokenStorage) {
                throw new Error("Token is not available");
            }
            const appointmentsData = await GetAppointments(tokenStorage);
            setAppointments(appointmentsData.data)
            setLoadedData(true)
        } catch (error) {
            throw new Error('Cannot fetch appointments:', error.message);
        }
    };
    // const seeDetailsA = async (id) => {
    //     try {
    //         const responseDetails = await GetAppointmentDetails(tokenStorage, id);

    //         const infoDetail = JSON.parse(localStorage.getItem("dataToPrint"))
    //         console.log("infoDetail", infoDetail);
    //         navigate(`/appointmentDetails/${id}`)
    //     } catch (error) {
    //         throw new Error('Cannot see appointment details:' + error.message);
    //     }
    // }

    // GETTING ALL SERVICES for the dropdown menu (no token needed)
    const fetchServices = async () => {
        try {
            const servicesData = await GetServices(); //fetching function in apiCalls.js
            setServices(servicesData.data); //we update data with the fetched response
        } catch (error) {
            console.error('Cannot fetch services:', error.message);
        }
    };

    // GRABS serviceId from the dropdown menu
    const handleChange = (event) => {
        setSelectedServiceId(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newAppointment = {
            serviceId: selectedServiceId,
            appointmentDate: dayjs(localStorage.getItem("dateTime")).format("YYYY-MM-DD HH:mm"),
        };
        try {
            setAppointment([...appointment, newAppointment]);
            await CreateAppointment(tokenStorage, newAppointment);
            setAppointments([...appointments, newAppointment]);
            setLoadedData(false);
        } catch (error) {
            console.error('Failed to create appointment:', error.message);
        }
    };

    //button deletes each appointment by id
    const deleteAppointment = async (id) => {
        try {
            await DeleteAppointment(tokenStorage, id);
            setAppointments(prevAppointments => prevAppointments.filter(appointment => appointment.id !== id));
        } catch (error) {
            throw new Error('Failed to delete appointment: ', error.message);
        }
    };

    //button updates each appointment by id
    const updateAppointment = async (id, updatedData) => {
        try {
            const updatedAppointment = await UpdateAppointment(tokenStorage, id, updatedData);
            setAppointments(prevAppointments =>
                prevAppointments.map(appointment =>
                    appointment.id === id ? updatedAppointment : appointment
                )
            );
        } catch (error) {
            throw new Error('Failed to update appointment: ' + error.message);
        }
    };

    return (<>
        <Header />
        <div className="">
            {!loadedData ? (
                <img className="loader" src="../../../src/img/loader.gif" alt="loader" />
            ) : (
                <div className="appPage">
                    <div className="formAppointment">
                        <form onSubmit={handleSubmit}>
                            {/* DROPDOWN MENU (mapping all services) */}
                            <div className="form-group">
                                <select
                                    className="dropdownDesign"
                                    id="serviceId"
                                    name="serviceId"
                                    value={selectedServiceId}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select a service</option>
                                    {services.map(service => (
                                        <option key={service.id} value={service.id}>
                                            {service.serviceName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <AppointmentForm />

                            <button className="appBtn" type="submit">Create new appointment</button>
                        </form>
                    </div>
                    <div className="appointmentDesign">
                        {appointments.map((item) => (
                            <ApCard
                                key={item.id}
                                service={item.service.serviceName}
                                appointmentDate={item.appointmentDate}
                                // onUpdate={() => updateAppointment(item.id)}
                                onDelete={() => deleteAppointment(item.id)}
                                onClick={() => navigate(`/appointmentDetails/${item.id}`)} //seeDetailsA(item.id)
                            />
                        ))}
                    </div>
                </div>
            )}
        </div >
    </>);
};
