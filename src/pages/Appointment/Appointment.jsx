// import { useEffect, useState } from "react";
// import { Header } from "../../common/Header/Header";
// import "./Appointment.css";
// import dayjs from "dayjs";
// import { GetAppointments } from "../../services/apiCalls";



// export const Appointment = () => {
//     const [loadedData, setLoadedData] = useState(false);
//     const [data, setData] = useState([]); //we get an array of appointments

//     const datosUser = JSON.parse(localStorage.getItem("passport"));

//     const [tokenStorage, setTokenStorage] = useState(datosUser?.token);

//     useEffect(() => {
//         if (!tokenStorage) {
//             navigate("/");
//         }
//     }, [tokenStorage]);

//     useEffect(() => {
//         const getUserAppointments = async () => {
//             try {
//                 const fetched = await GetAppointments(tokenStorage);
//                 setLoadedData(true);

//                 const parsedAppointments = fetched.data.map(appointment => ({
//                     ...appointment,
//                     serviceDate: dayjs(appointment.serviceDate).format("YYYY-MM-DD")
//                 }));
//                 setData(parsedAppointments);

//             } catch (error) {
//                 throw new Error('Get appointment failed: ' + error.message);
//             }
//         };

//         if (!loadedData) {
//             getUserAppointments();
//         }
//     }, [tokenStorage]);

//     //we get all appointments from backend
//     // const fetchData = async () => {

//     //     try {
//     //         const responseData = await GetAppointments(); //fetching function in apiCalls.js
//     //         setData(responseData.data); //we update data with the fetched response

//     //     } catch (error) {
//     //         throw new Error('Cannot fetch appointments:' + error.message);
//     //     }
//     // };

//     return (
//         <>
//             <Header />
//             <div className="appointmentDesign">
//                 {/* <div>loading....</div> */}
//                 {/* <div>{data}</div> */}
//                 {data.map((item) => (
//                     <CCard
//                         key={item.id}
//                         title={item.serviceId}
//                         description={item.appointmentDate}
//                     />
//                 ))}
//                 {/* {data.map((appointment, index) => (
//                     <div key={index}>
//                         <p>Service ID: {appointment.serviceId}</p>
//                         <p>Appointment Date: {appointment.appointmentDate}</p>
//                     </div>
//                 ))} */}

//             </div>
//         </>
//     )
// }

///////////////////////////////////////////////////

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
// import { Header } from "../../common/Header/Header";
// import "./Appointment.css";
// import dayjs from "dayjs";
// import { GetAppointments } from "../../services/apiCalls";

// export const Appointment = () => {
//     const datosUser = JSON.parse(localStorage.getItem("passport"));
//     const navigate = useNavigate();

//     const [tokenStorage, setTokenStorage] = useState(datosUser?.token);
//     const [loadedData, setLoadedData] = useState(false);

//     const [data, setData] = useState([]);
//     console.log(datosUser);
//     useEffect(() => console.log(user), [user])
//     useEffect(() => {
//         if (!tokenStorage) {
//             navigate("/"); // Redirect to login page if token is not available
//         } else {
//             const getUserAppointments = async () => {
//                 try {
//                     const fetched = await GetAppointments(tokenStorage);
//                     setLoadedData(true);

//                     const parsedAppointments = fetched.data.map(appointment => ({
//                         ...appointment,
//                         serviceDate: dayjs(appointment.serviceDate).format("YYYY-MM-DD")
//                     }));
//                     setData(parsedAppointments);
//                 } catch (error) {
//                     console.error('Get appointment failed:', error); // Log the error instead of throwing it
//                 }
//             };

//             if (!loadedData) {
//                 getUserAppointments();
//             }
//         }
//     }, [loadedData, navigate]);

//     return (
//         <>
//             <Header />
//             <div className="appointmentDesign">
//                 {data.map((item) => (
//                     <div key={item.id}>
//                         <p>Service ID: {item.serviceId}</p>
//                         <p>Appointment Date: {item.appointmentDate}</p>
//                     </div>
//                 ))}
//             </div>
//         </>
//     );
// };

///////////////////////////////////////////////////

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
