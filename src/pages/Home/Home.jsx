
import { useEffect, useState } from "react";
import { CCard } from "../../common/CCard/CCard"
import { Header } from "../../common/Header/Header"
import { CreateService, GetServiceDetails, GetServices } from "../../services/apiCalls";
import "./Home.css"
import { useNavigate } from "react-router-dom";


export const Home = () => {
    const datosUser = JSON.parse(localStorage.getItem("passport"));
    const [tokenStorage, setTokenStorage] = useState(datosUser?.token);
    const navigate = useNavigate();
    const [roleStorage, setRoleStorage] = useState(datosUser?.decodificado.roleName);
    const [data, setData] = useState([]); //we get an array of services
    const [dataDetails, setDataDetails] = useState(null); //we get a single service
    const [newService, setNewService] = useState({
        serviceName: "",
        description: "",
    });
    const [popupVisible, setPopupVisible] = useState(false) // State to manage popup visibility

    useEffect(() => {
        fetchData(); // Function to fetch data
    }, []);

    useEffect(() => {
        seeDetails();
    }, [])

    //we get all services from backend
    const fetchData = async () => {
        try {
            const responseData = await GetServices(); //fetching function in apiCalls.js
            setData(responseData.data); //we update data with the fetched response

        } catch (error) {
            throw new Error('Cannot fetch services:' + error.message);
        }
    };

    const seeDetails = async (id) => {
        try {
            const responseDetails = await GetServiceDetails(id);

            setDataDetails(responseDetails.data)
            navigate(`/serviceDetails/${id}`)
        } catch (error) {
            throw new Error('Cannot see service details:' + error.message);
        }
    }

    useEffect(() => {
        if (roleStorage !== 'superadmin') {
            navigate("/")
        }
    }, [])

    useEffect(() => {
        if (!tokenStorage) {
            navigate("/");
        }
    }, [tokenStorage]);

    const createService = async (token) => {
        try {
            const responseData = await CreateService(tokenStorage, newService);

        } catch (error) {
            console.log(token);
            throw new Error('Failed to create service:' + error.message);
        }
    };

    return (<>
        <Header />
        <div className="homeDesign">
            <div>
                {roleStorage === "superadmin" &&
                    <div className="group">
                        <span><input
                            placeholder="service name"
                            className="btn1"
                            type="text"
                            name="serviceName"
                            value={newService.serviceName}
                            onChange={(e) => setNewService({ ...newService, serviceName: e.target.value })}
                        /></span>
                        <span><input
                            placeholder="description"
                            className="btn2"
                            type="text"
                            name="description"
                            value={newService.description}
                            onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                        /></span>
                        <span><button className="newServiceBtn" onClick={() => { createService(tokenStorage, newService) }}>
                            CREATE NEW SERVICE
                        </button></span>
                    </div>
                }
            </div>

            <div className="cardGroup">
                {data.map((item) => (
                    <CCard
                        id={item.id}
                        key={item.id}
                        title={item.serviceName}
                        description={item.description}
                        onClick={() => seeDetails(item.id)}
                        // there are only 4 pics that repeat periodically
                        imageUrl={`../img/s${item.id <= 4 ? item.id : item.id % 4}.png`}
                    />
                ))}
            </div>
            <img className="cover" src="../img/tattooCover.png" alt="Web cover picture. Heavily inked arm in blueish colors" />
        </div>
    </>
    )
}