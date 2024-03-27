
import "./ApCard.css"
import dayjs from "dayjs"

export const ApCard = ({ service, appointmentDate, onDelete }) => {
    {/*  onUpdate, */ }
    const day = dayjs(appointmentDate).format("dddd DD-MM-YYYY");
    const hour = dayjs(appointmentDate).format("HH:MM");

    return (
        <div className="">
            <div className="cardApp">
                <span className="serviceName">{service}</span>
                <span>{day} <br /> at {hour} hours</span>
            </div>
            <div>
                <div className="btnApp">
                    <button className="btnGreen" >edit</button> {/*onClick={onUpdate}*/}
                    <button className="btnRed" onClick={onDelete}>delete</button>
                </div>
            </div>
        </div>
    )
}
