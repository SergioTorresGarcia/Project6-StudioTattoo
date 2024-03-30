
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import { Header } from "../../common/Header/Header";
import { GetUsers, DeleteUser, GetServices, DeleteService } from "../../services/apiCalls";
import dayjs from "dayjs";


export const Admin = () => {

    const datosUser = JSON.parse(localStorage.getItem("passport"));
    const [tokenStorage, setTokenStorage] = useState(datosUser?.token);
    const navigate = useNavigate();
    const [loadedData, setLoadedData] = useState(false);
    const [users, setUsers] = useState([]);
    const [services, setServices] = useState([]);
    const [rowNumbers1, setRowNumbers1] = useState([]);
    const [rowNumbers2, setRowNumbers2] = useState([]);
    const [roleStorage, setRoleStorage] = useState(datosUser?.roleName);


    useEffect(() => {
        if (roleStorage !== 'superadmin') {
            navigate("/admin")
        }
    }, [])

    // geting users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                if (!tokenStorage) {
                    throw new Error("Token is not available");
                }
                const usersData = await GetUsers(tokenStorage);
                setLoadedData(true)
                setUsers(usersData)

            } catch (error) {
                throw new Error('Get users failed ADMIN.jsx: ' + error.message);
            }
        };

        if (!loadedData) {
            fetchUsers();
        }
    }, []);

    useEffect(() => {
        // Generate an array of row numbers based on the number of users
        const numbers = users.map((_, index) => index + 1);
        setRowNumbers1(numbers);
    }, [users]);

    useEffect(() => {
        // Generate an array of row numbers based on the number of users
        const numbers = services.map((_, index) => index + 1);
        setRowNumbers2(numbers);
    }, [services]);

    useEffect(() => {
        fetchServices(); // Function to fetch data
    }, []);


    // geting services
    const fetchServices = async () => {
        try {
            const responseServices = await GetServices(); //fetching function in apiCalls.js
            setServices(responseServices.data); //we update data with the fetched response

        } catch (error) {
            throw new Error('Cannot fetch services:' + error.message);
        }
    };


    //button deletes each user by id
    const deleteUser = async (id) => {
        try {
            await DeleteUser(tokenStorage, id);
            setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
        } catch (error) {
            throw new Error('Failed to delete user: ', error.message);
        }
    };

    //button deletes each service by id
    const deleteService = async (id) => {
        try {
            await DeleteService(tokenStorage, id);
            setServices(prevServices => prevServices.filter(service => service.id !== id));
        } catch (error) {
            throw new Error('Failed to delete service: ', error.message);
        }
    };



    return (
        <>
            <Header />

            <div className="adminDesign">
                <div>
                    {/* USERS */}
                    <table className="table">
                        <thead className="thead">
                            <tr className="tr">
                                <th className="pos">#</th>
                                <th className="name">USERS: surname, name</th>
                                <th className="birth">Date of birth</th>
                                <th className="email">e-mail address</th>
                                <th className="role">Role</th>
                            </tr>
                        </thead>
                        <tbody className="tbody">
                            {users.map((user, index) => (
                                <div className={`div ${rowNumbers1[index] % 2 == 0 ? "grayBg" : ""}`} key={user.id}>
                                    <td className="pos">{rowNumbers1[index]}</td>
                                    <td className="name">{user.lastName}, {user.firstName}</td>
                                    <td className="birth">{dayjs(user.birthDate).format("YYYY-MM-DD")}</td>
                                    <td className="email">{user.email}</td>
                                    <td className="role">{user.role.name}</td>
                                    <td className="">
                                        <button className="del" onClick={() => deleteUser(user.id)}>delete</button>
                                    </td>

                                    <td className="">
                                        <button className="edit" onClick={() => editUser(user.id)}>edit</button>
                                    </td>
                                </div>
                            ))}
                        </tbody>
                    </table>

                    {/* SERVICES */}
                    <table className="table">
                        <thead className="thead">
                            <tr className="tr">
                                <th className="pos">#</th>
                                <th className="title">SERVICES:</th>
                                <th className="description">Description</th>
                                <th className="img">image</th>

                            </tr>
                        </thead>
                        <tbody className="tbody">
                            {services.map((service, index) => (
                                <div className={`div ${rowNumbers2[index] % 2 == 0 ? "grayBg" : ""}`} key={service.id}>
                                    <td className="pos">{rowNumbers2[index]}</td>
                                    <td className="title">{service.serviceName}</td>
                                    <td className="description">{service.description}</td>
                                    <td className="image"><img src={`./src/img/s${service.id}.png`} alt={service.id} /></td>

                                    <td className="">

                                        <button className="del" onClick={() => deleteService(service.id)}>delete</button>
                                    </td>
                                    <td className="">
                                        <button className="edit" onClick={() => editService(service.id)}>edit</button>
                                    </td>
                                </div>
                            ))}


                        </tbody>



                    </table>
                </div>
            </div>



        </>
    )
}
