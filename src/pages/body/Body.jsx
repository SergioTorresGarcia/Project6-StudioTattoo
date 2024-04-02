
import { Navigate, Route, Routes } from "react-router-dom";

import { Home } from "../Home/Home";
import { Register } from "../Register/Register";
import { Login } from "../Login/Login";
import { Profile } from "../Profile/Profile";
import { Appointment } from "../Appointment/Appointment";
import { Admin } from "../Admin/Admin";
import { ServiceDetail } from "../ServiceDetail/ServiceDetail";
import { AppointmentDetails } from "../AppointmentDetail/AppointmentDetail";


export const Body = () => {

    return (
        <Routes>
            <Route path="*" element={<Navigate to={"/"} replace />} />
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/appointments/profile" element={<Appointment />} />
            <Route path="/serviceDetails/:id" element={<ServiceDetail />} />
            <Route path="/appointmentDetails/:id" element={<AppointmentDetails />} />

            <Route path="/admin" element={<Admin />} />
        </Routes>
    )
}
