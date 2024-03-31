import React from "react";
import { GetServiceDetails } from "../../services/apiCalls"
import "./CCard.css"


export const CCard = ({ id, title, description, imageUrl, onClick }) => {
    return (
        <button className="card" onClick={() => onClick(id)}>
            <img src={imageUrl} alt={title} className="card-img" />
            <div className="card-content">
                <h4 className="card-title">{title}</h4>
                <h5 className="card-description">{description}</h5>
            </div>
        </button>
    )
}
