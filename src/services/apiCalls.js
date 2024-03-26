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
        console.log(response);
        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        throw new Error('Get services failed: ' + error.message);
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


export const UpdateProfile = async (token, data) => {
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
    };
    console.log("data", data);
    try {
        const response = await fetch(`${root}users/self`, options);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        console.log(response);
        const data = await response.json();
        if (!data.success) {
            throw new Error(data.message);
        }
        console.log(data);
        return data;
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

// export const GetAppointments = async (token) => {
//     try {
//         // Adjust the URL as per your backend API endpoint
//         const response = await fetch(`${root}appointments/profile`, {
//             method: 'GET',
//             headers: {
//                 'Authorization': `Bearer ${token}`, // Assuming token is required for authentication
//                 'Content-Type': 'application/json'
//             }
//         });

//         if (!response.ok) {
//             throw new Error('Failed to fetch appointments');
//         }

//         const data = await response.json();
//         return data; // Assuming the response data contains appointments array
//     } catch (error) {
//         throw new Error('Failed to fetch appointments: ' + error.message);
//     }
// };
