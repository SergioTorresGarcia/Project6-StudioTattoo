import { Header } from "../../common/Header/Header"
import "./ServiceDetail.css"
import { useNavigate } from "react-router-dom";
import { GetServiceDetails } from "../../services/apiCalls";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export const ServiceDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [info, setInfo] = useState(null);

    const seeDetails = async () => {
        try {
            const data = await GetServiceDetails(id);

            setInfo(data);
        } catch (error) {
            throw new Error('Cannot see service details:' + error.message);
        }
    }

    useEffect(() => {
        seeDetails(id);
    }, [id]);

    return (
        <>
            <Header />
            <div className="serviceDetailDesign">
                <div className="details" onClick={() => navigate("/")}>
                    {info && (

                        <div className="allDetail">
                            <img className="imageDetail" src={`../img/s${info.id <= 4 ? info.id : info.id % 4}.png`} />
                            <div className="textDetail">
                                <span>Service:</span>
                                <span className="colorGrey">{info.serviceName}</span>

                                <br /><br />
                                <span>Description:</span>
                                <span className="colorGrey">{info.description}</span>

                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
