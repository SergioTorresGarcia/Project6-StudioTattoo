import "./ApCard.css"
import dayjs from "dayjs"

export const ApCard = ({ service, appointmentDate }) => {
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
                    <button className=" btnGreen" onClick={() => updateAppointment()}>edit</button>
                    <button className=" btnRed" onClick={() => deleteAppointment()}>delete</button>
                </div>
            </div>
        </div>
    )
}
