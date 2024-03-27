
import "./CustomLink.css"

export const CustomLink = ({ serviceId, appointmentDate }) => {


    return (
        <div className="linkDesign" onClick={() => createAppointment(serviceId, appointmentDate)}>
            <div>NEW APPOINTMENT</div>
        </div>
    )

}