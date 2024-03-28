
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Header } from "../../common/Header/Header";
import "./Appointment.css";
import { GetAppointments, DeleteAppointment, CreateAppointment, GetServices } from "../../services/apiCalls";
import { ApCard } from "../../common/ApCard/ApCard";
import { DayPickerComponent } from "../../common/Daypicker/Daypicker";



export const Appointment = () => {
    const datosUser = JSON.parse(localStorage.getItem("passport"));

    const [tokenStorage, setTokenStorage] = useState(datosUser?.token);
    const [loadedData, setLoadedData] = useState(false);
    const [appointments, setAppointments] = useState([]);
    const [services, setServices] = useState([]);

    const [appointment, setAppointment] = useState({
        service: "",
        appointmentDate: new Date(), // Default appointment date to today
    });
    const [write, setWrite] = useState("disabled");
    const navigate = useNavigate();


    // GETTING ALL APPOINTMENTS (needs token)
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


    // GETTING ALL SERVICES for the dropdown menu (no token needed)
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const servicesData = await GetServices(); //fetching function in apiCalls.js
                setServices(servicesData.data); //we update data with the fetched response
            } catch (error) {
                throw new Error('Cannot fetch services:' + error.message);
            }
        };
        if (!loadedData) {
            fetchServices();
        }
    }, [loadedData]);




    // GRABS serviceId from the dropdown menu
    const handleChange = (event) => {
        const { name, value } = event.target;
        setAppointment({ ...appointment, [name]: value });
        console.log(1, name, value);
    };



    const handleSubmit = async (e) => {
        // e.preventDefault();
        try {
            // Call the API function to create the appointment
            await CreateAppointment(tokenStorage, appointment);
            console.log(3, tokenStorage);
            console.log(4, appointment);
            // Redirect to the appointments page after successful creation
            navigate("/appointments");
        } catch (error) {
            console.error("Failed to create appointment:", error.message);
            // Handle error (e.g., show error message to user)
        }
    };

    const deleteAppointment = async (id) => {
        try {
            await DeleteAppointment(tokenStorage, id);
            setAppointments(prevAppointments => prevAppointments.filter(appointment => appointment.id !== id));
        } catch (error) {
            throw new Error('Failed to delete appointment: ' + error.message);
        }
    };


    //////////////////////////////////////////////////////////////////////


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


    //////////////////////////////////////////////////////////////////////

    // const createAppointment = async () => {
    //     try {
    //         await CreateAppointment(tokenStorage, appointment);
    //         // should show new appointment in the user appointments list
    //         // not sure if setLoadedData() false or true... (or maybe with useState?)
    //         setLoadedData(false);
    //     } catch (error) {
    //         console.error('Failed to create appointment:', error.message);
    //     }
    // };

    //////////////////////////////////////////////////////////////////////



    return (
        <>
            <Header />
            <div className="">
                {!loadedData ? (
                    <img className="loader" src="../../../src/img/loader.gif" alt="loader" />
                ) : (
                    appointments.length == 0
                        ? <>
                            <div> NEW APPOINTMENTfghjkl</div>
                            <div className="appointmentDesign">NO APPOINTMENTS BOOKED</div>
                        </>
                        : <div className="appPage">

                            <div className="formAppointment">
                                <form onSubmit={() => handleSubmit}>
                                    <div>
                                        <select
                                            className="dropdownDesign"
                                            id="serviceId"
                                            name="serviceId"
                                            value={appointment.service.serviceId}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select a service</option>
                                            {/* Mapping services to create options for the dropdown menu */}
                                            {services.map(service => (
                                                <option key={service.id} value={service.id}>
                                                    {service.serviceName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <DayPickerComponent
                                            selected={appointment.appointmentDate}
                                            onChange={(date) => setAppointment({ ...appointment, appointmentDate: date })}
                                        />
                                    </div>
                                    <button className="appBtn" type="submit">Create Appointment</button>

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
                                    />
                                ))}
                            </div>
                        </div>
                )
                }
            </div>
        </>
    );
};



