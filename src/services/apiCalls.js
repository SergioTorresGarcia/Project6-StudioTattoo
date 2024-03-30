const root = "http://localhost:4002/api/";

export const RegisterUser = async (user) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    };

    try {
        const response = await fetch(`${root}auth/register`, options);
        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        throw new Error('Register failed: ' + error.message);
    }
};

export const LoginUser = async (credenciales) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credenciales),
    };

    try {
        const response = await fetch(`${root}auth/login`, options);

        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        throw new Error('Login failed: ' + error.message);
    }
};

export const GetServices = async () => {
    try {
        const response = await fetch(`${root}services`);
        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        throw new Error('Get services failed: ' + error.message);
    }
};

export const CreateService = async () => {
    try {
        const response = await fetch(`${root}services`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(serviceData)
        });
        if (!response.ok) {
            throw new Error('Failed to create service');
        }
        console.log("service created");
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Create service failed: ' + error.message);
    }
};

export const GetProfile = async (token) => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    };

    try {
        const response = await fetch(`${root}users/self`, options);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        throw new Error('Get profile failed: ' + error.message);
    }
};

export const UpdateProfile = async (token, user) => {
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(user)
    };
    try {
        const response = await fetch(`${root}users/self`, options);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const responseData = await response.json();
        if (!responseData.success) {
            throw new Error(responseData.message);
        }
        return responseData;
    } catch (error) {
        throw new Error('Update profile failed: ' + error.message);
    }
};

export const GetAppointments = async (token) => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    };

    try {
        const response = await fetch(`${root}appointments/profile`, options);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        throw new Error('Get appointments failed: ' + error.message);
    }
};

export const DeleteAppointment = async (token, id) => {
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    }
    try {
        const response = await fetch(`${root}appointments/${id}`, options)
        if (!response.ok) {
            throw new Error('Failed to delete appointment: ' + response.statusText);
        }

        const data = await response.json();
        if (!data.success) {
            throw new Error('Failed to delete appointment: ' + data.message);
        }
        return data;

    } catch (error) {
        throw new Error('Delete appointment failed: ' + error.message);
    }
}

export const UpdateAppointment = async (token, id, body) => {
    const options = {
        method: "UPDATE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(body)
    }
    try {
        const response = await fetch(`${root}appointments/${id}`, options)
        if (!response.ok) {
            throw new Error('Failed to update appointment: ' + response.statusText);
        }

        const data = await response.json();
        if (!data.success) {
            throw new Error('Failed to delete appointment: ' + data.message);
        }
        return data;

    } catch (error) {
        throw new Error('Delete appointment failed: ' + error.message);
    }
}

export const CreateAppointment = async (token, appointmentData) => {
    try {
        const response = await fetch(`${root}appointments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(appointmentData)
        });
        if (!response.ok) {
            throw new Error('Failed to create appointment');
        }
        console.log("appointment created");
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Failed creating appointment', error.message);
    }
};

export const GetUsers = async (token) => {
    try {
        const response = await fetch(`${root}users`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const fetched = await response.json();
        const data = fetched.data
        return data;
    } catch (error) {
        throw new Error('Get users failed APICALLS.JS: ' + error.message);
    }
};

export const DeleteUser = async (token, id) => {
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }
    try {
        const response = await fetch(`${root}users/${id}`, options)
        if (!response.ok) {
            throw new Error('Failed to delete user: ' + response.statusText);
        }

        const data = await response.json();
        if (!data.success) {
            throw new Error('Failed to delete user: ' + data.message);
        }
        return data;

    } catch (error) {
        throw new Error('Delete user failed: ' + error.message);
    }
}

export const DeleteService = async (token, id) => {
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }
    try {
        const response = await fetch(`${root}services/${id}`, options)
        if (!response.ok) {
            throw new Error('Failed to delete service: ' + response.statusText);
        }

        const data = await response.json();
        if (!data.success) {
            throw new Error('Failed to delete service: ' + data.message);
        }
        return data;

    } catch (error) {
        throw new Error('Delete service failed: ' + error.message);
    }
}
