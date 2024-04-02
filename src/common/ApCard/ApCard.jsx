
import "./ApCard.css"
import dayjs from "dayjs"

export const ApCard = ({ service, appointmentDate, onUpdate, onDelete, onClick }) => {
    {/*  onUpdate, */ }
    const day = dayjs(appointmentDate).format("dddd DD-MM-YYYY");
    const hour = dayjs(appointmentDate).format("HH:mm");

    return (
        <div className="" onClick={onClick}>
            <div className="cardApp">
                <span className="serviceName">{service}</span>
                <span>{day} <br /> at {hour} hours</span>
            </div>
            <div>
                <div className="btnApp">
                    <button className="btnGreen" onClick={onUpdate}>edit</button>
                    <button className="btnRed" onClick={onDelete}>delete</button>
                </div>
            </div>
        </div>
    )
}
