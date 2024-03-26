
import { useEffect, useState } from "react";
import { CCard } from "../../common/CCard/CCard"
import { Header } from "../../common/Header/Header"
import { GetServices } from "../../services/apiCalls";
import "./Home.css"


export const Home = () => {
    const [data, setData] = useState([]); //we get an array of services

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
    return (
        <>
            <Header />
            <div className="homeDesign">

                {data.map((item) => (
                    <CCard
                        key={item.id}
                        title={item.serviceName}
                        description={item.description}
                        imageUrl={`./src/img/s${item.id}.png`} // resolve what happens when there is no image
                    />
                ))}
            </div>
        </>
    )
}