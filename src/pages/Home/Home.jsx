
import { useEffect, useState } from "react";
import { CCard } from "../../common/CCard/CCard"
import { Header } from "../../common/Header/Header"
import { CreateService, GetServices } from "../../services/apiCalls";
import "./Home.css"
import { useNavigate } from "react-router-dom";






export const Home = () => {
    const datosUser = JSON.parse(localStorage.getItem("passport"));
    const navigate = useNavigate();
    const [tokenStorage, setTokenStorage] = useState(datosUser?.token);
    const [roleStorage, setRoleStorage] = useState(datosUser?.decodificado.roleName);
    const [data, setData] = useState([]); //we get an array of services
    const [serviceData, setServiceData] = useState([])

    useEffect(() => {
        fetchData(); // Function to fetch data
    }, []);

    //we get all services from backend
    const fetchData = async () => {
        try {
            const responseData = await GetServices(); //fetching function in apiCalls.js
            setData(responseData.data); //we update data with the fetched response

        } catch (error) {
            throw new Error('Cannot fetch services:' + error.message);
        }
    };

    ////////////////////////////////////////////////////////////// trying under this
    const [service, setService] = useState({
        serviceName: "",
        description: "",
    });

    const inputHandler = (e) => {
        setService((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

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


    const createService = async () => {
        try {
            const responseData = await CreateService();
            setServiceData(responseData.data);

        } catch (error) {
            throw new Error('Cannot fetch services:' + error.message);
        }
    };
    return (
        <>
            <Header />
            <div className="homeDesign">
                <div>
                    {
                        roleStorage === "superadmin"
                            ? (
                                <div className="group">
                                    <span><input placeholder="service name" className="btn1" type="text" name="serviceName" /></span>
                                    <span><input placeholder="description" className="btn2" type="text" name="description" /></span>
                                    <span><button className="newServiceBtn" onClick={() => { console.log("hola Bonito"); }}>
                                        CREATE NEW SERVICE
                                    </button></span>
                                </div>
                            )
                            : null
                    }
                </div>
                <div className="cardGroup">
                    {data.map((item) => (

                        <CCard
                            key={item.id}
                            title={item.serviceName}
                            description={item.description}
                            imageUrl={`./src/img/s${item.id}.png`} // resolve what happens when there is no image
                        />

                    ))}
                </div>
                {/* createService(token, serviceData) */}
            </div>
        </>
    )
}