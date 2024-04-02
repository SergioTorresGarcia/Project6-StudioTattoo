
import React from "react";
import "./ApDetailCard.css"
import dayjs from "dayjs"

export const ApDetailCard = ({ service, appointmentDate, onDelete, onClick }) => {
    const data = localStorage.getItem("infooo")
    const day = dayjs(appointmentDate).format("dddd DD-MM-YYYY");
    const hour = dayjs(appointmentDate).format("HH:mm");
    return (
        <div className="apCardDetail" onClick={onClick}>
            <div className="apCardContent">
                <div>Id: {data.id}</div>
                <div className="serviceDetail">Service: {service}</div>
                <div className="apCardBody">Day: {day}</div>
                <div className="apCardBody">Hour: {hour}</div>
            </div>
            <button className="deleteBtn" onClick={onDelete}>Delete</button>
        </div>
    );
};
