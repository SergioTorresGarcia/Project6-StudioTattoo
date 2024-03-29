
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import { Header } from "../../common/Header/Header";
import { GetUsers, DeleteUser } from "../../services/apiCalls";
import dayjs from "dayjs";

export const Admin = () => {
    const datosUser = JSON.parse(localStorage.getItem("passport"));
    const [tokenStorage, setTokenStorage] = useState(datosUser?.token);
    const navigate = useNavigate();
    const [loadedData, setLoadedData] = useState(false);
    const [users, setUsers] = useState([]);
    const [rowNumbers, setRowNumbers] = useState([]);
    const [roleStorage, setRoleStorage] = useState(datosUser?.roleName);

    useEffect(() => {
        if (roleStorage !== 'superadmin') {
            navigate("/admin")
        }
    }, [])

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
    console.log("users", users);

    useEffect(() => {
        // Generate an array of row numbers based on the number of users
        const numbers = users.map((_, index) => index + 1);
        setRowNumbers(numbers);
    }, [users]);


    //button deletes each user by id
    const deleteUser = async (id) => {
        try {
            await DeleteUser(tokenStorage, id);
            setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
        } catch (error) {
            throw new Error('Failed to delete user: ', error.message);
        }
    };



    return (
        <>
            <Header />
            <div className="adminDesign">
                <table className="table">
                    <thead className="thead">
                        <tr className="tr">
                            <th className="pos">#</th>
                            <th className="name">Surname, Name</th>
                            <th className="birth">Date of birth</th>
                            <th className="email">e-mail address</th>
                            <th className="role">Role</th>
                            <th className="del">actions</th>
                        </tr>
                    </thead>
                    <tbody className="tbody">

                        {users.map((user, index) => (
                            <div className={`div ${rowNumbers[index] % 2 == 0 ? "grayBg" : ""}`} key={user.id}>
                                <td className="pos">{rowNumbers[index]}</td>
                                <td className=" name">{user.lastName}, {user.firstName}</td>
                                <td className=" birth">{dayjs(user.birthDate).format("YYYY-MM-DD")}</td>
                                <td className=" email">{user.email}</td>
                                <td className=" role">{user.role.name}</td>
                                <div className="btn buttons del">
                                    {/* <button className="upd" onClick={() => updateUser(user.id)}>update</button> */}
                                    <button className="del" onClick={() => deleteUser(user.id)}>delete</button>
                                </div>

                            </div>
                        ))}

                    </tbody>
                </table>
            </div>

            <div className="">
                {/* profileDesign */}
                <div className="">
                    {/* appointmentDesign */}


                    {/* {users.map((item) => (
                        <UserCard
                            key={item.id}
                            firstName={item.firstName}
                            lastName={item.lastName}
                            birthDate={item.birthDate}
                            email={item.email}
                            role={item.role}
                        // onDelete={() => deleteAppointment(item.id)}
                        />
                    ))} */}
                </div>
                {/* - all users (+ CRUD) <br />
                - all appointments (+CRUD) <br />
                - admin roles */}
            </div>
        </>
    )
}