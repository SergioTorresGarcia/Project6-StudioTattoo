
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import { Header } from "../../common/Header/Header";
import { GetUsers, DeleteUser, GetServices, DeleteService } from "../../services/apiCalls";
import dayjs from "dayjs";
import { Pagination } from "../../common/Pagination/Pagination";
import ReactPaginate from 'react-paginate';

const numUserDisplay = 5;
const numServiceDisplay = 2;

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
    const [currentPageU, setCurrentPageU] = useState(1);
    const [currentPageS, setCurrentPageS] = useState(1);
    const [usersPerPage] = useState(numUserDisplay); // Number of users per page
    const [servicesPerPage] = useState(numServiceDisplay); // Number of services per page

    // control admin access only
    useEffect(() => {
        if (roleStorage !== 'superadmin') {
            navigate("/admin")
        }
    }, [])

    // fetching info
    useEffect(() => {
        fetchUsers();
        fetchServices();
    }, []);

    // geting users
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

    // geting services
    const fetchServices = async () => {
        try {
            const responseServices = await GetServices(); //fetching function in apiCalls.js
            setServices(responseServices.data); //we update data with the fetched response

        } catch (error) {
            throw new Error('Cannot fetch services:' + error.message);
        }
    };

    // Users indexes ordered (as ids might be not continuous when some are deleted
    useEffect(() => {
        const numbers1 = users.map((_, index) => index + 1);
        setRowNumbers1(numbers1);
    }, [users]);

    // Services indexes ordered (as ids might be not continuous when some are deleted
    useEffect(() => {
        const numbers2 = services.map((_, index) => index + 1);
        setRowNumbers2(numbers2);
    }, [services]);


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

    const pageCountUsers = Math.ceil(users.length / numUserDisplay); // Calculate total number of pages for users
    const pageCountServices = Math.ceil(services.length / numServiceDisplay); // Calculate total number of pages for services

    const handlePageClickUsers = ({ selected }) => {
        setCurrentPageU(selected); // Update current page for users
    };

    const handlePageClickServices = ({ selected }) => {
        setCurrentPageS(selected); // Update current page for services
    };

    // Pagination logic
    const indexOfLastUser = currentPageU * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    // Pagination logic
    const indexOfLastService = currentPageS * servicesPerPage;
    const indexOfFirstService = indexOfLastService - servicesPerPage;
    const currentServices = services.slice(indexOfFirstService, indexOfLastService);

    const paginateU = (pageNumber1) => setCurrentPageU(pageNumber1);
    const paginateS = (pageNumber2) => setCurrentPageS(pageNumber2);

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
                            {currentUsers.map((user, index) => (
                                <div className={`div ${rowNumbers1[index] % 2 == 0 ? "grayBg" : ""}`} key={user.id}>
                                    <td className="pos">{rowNumbers1[index]}</td>
                                    <td className="name">{user.lastName}, {user.firstName}</td>
                                    <td className="birth">{dayjs(user.birthDate).format("YYYY-MM-DD")}</td>
                                    <td className="email">{user.email}</td>
                                    <td className="role">{user.role.name}</td>
                                    <td className="buttons">
                                        <button className="del" onClick={() => deleteUser(user.id)}>delete</button>
                                    </td>
                                    {/* <td className="">
                                        <button className="edit" onClick={() => editUser(user.id)}>edit</button>
                                    </td> */}
                                </div>
                            ))}
                        </tbody>
                        {/* Pagination */}
                        <Pagination
                            className="tbody"
                            currentPage={currentPageU}
                            totalPages={Math.ceil(users.length / usersPerPage)}
                            onPageChange={paginateU}
                        />
                    </table>

                    {/* SERVICES */}
                    <table className="table">
                        <thead className="thead">
                            <tr className="tr">
                                <th className="pos">#</th>
                                <th className="title">SERVICES:</th>
                                <th className="description">Description</th>
                                <th className="image">image</th>
                                <th className="pos">action</th>
                            </tr>
                        </thead>
                        <tbody className="tbody">
                            {currentServices.map((service, index) => (
                                <div className={`div ${rowNumbers2[index] % 2 == 0 ? "grayBg" : ""}`} key={service.id}>
                                    <td className="pos">{rowNumbers2[index]}</td>
                                    <td className="title">{service.serviceName}</td>
                                    <td className="description">{service.description}</td>
                                    <td className="image"><img src={`./src/img/s${service.id <= 4 ? service.id : service.id % 4}.png`} alt={service.id} /></td>
                                    <td className="buttons">
                                        <button className="del" onClick={() => deleteService(service.id)}>delete</button>
                                    </td>
                                    {/* <td className="">
                                        <button className="edit" onClick={() => editService(service.id)}>edit</button>
                                    </td> */}
                                </div>
                            ))}
                        </tbody>
                        {/* Pagination */}
                        <Pagination
                            currentPage={currentPageS}
                            totalPages={Math.ceil(services.length / servicesPerPage)}
                            onPageChange={paginateS}
                        />
                    </table>
                </div>
            </div>
        </>
    )
}
