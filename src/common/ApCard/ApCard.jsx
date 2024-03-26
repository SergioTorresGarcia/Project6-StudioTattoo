import "./ApCard.css"
import dayjs from "dayjs"

export const ApCard = ({ service, appointmentDate }) => {
    const day = dayjs(appointmentDate).format("dddd DD-MM-YYYY");
    const hour = dayjs(appointmentDate).format("HH:MM");

    return (
        <>
            <div className="cardApp">
                <span className="serviceName">{service}</span>
                <span className="serviceDay">{day}</span>
                <span className="serviceTime">at {hour} hours</span>
            </div>
            <div>
                <div className="btnApp">
                    <button className="cButtonDesign btnApp" onClick={() => updateAppointment()}>edit</button>
                    <button className="cButtonDesign btnApp" onClick={() => deleteAppointment()}>delete</button>
                </div>
            </div>
        </>
    )
}
