import axios from "axios";
const path_to_api = 'http://ec2-18-217-234-99.us-east-2.compute.amazonaws.com:8080/v1';

const generateURL = (path, queryVars) => {
    // let fullEndpoint = `${process.env.REACT_APP_API_ENDPOINT}/${path}`;

    let fullEndpoint = `${path_to_api}/${path}`;

    if (queryVars) {
        queryVars.forEach((elem, index) => { fullEndpoint += `${index === 0 ? '?' : '&'}${elem.name}=${elem.value}` })
    }
    return fullEndpoint;
}

export const getUsers = async () => {
    try {
        const resp = await axios.get(generateURL('users'));
        return resp.data;
    } catch(e) {
        return false;
    }
}


export const createUser = async (email,password,name,dob,phone) => {
    try {
        const resp = await axios.post(generateURL('register'), {
            email: email,
            password:password,
            name:name,
            dob:dob,
            phone:phone
        });
        return resp.data;
    } catch(e) {
        console.log("eroare la register");
        return false;
    }
}

export const loginAsUser = async (email,password) => {
    try {
        const resp = await axios.post(generateURL('login'), {email,password});
        return resp.data;
    } catch(e) {
        return false;
    }
}

export const getUserAccount = async (token) => {
    try {
        const resp = await axios.get(generateURL('me'), {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return resp.data;
    } catch(e) {
        return false;
    }
}

export const setUserAccount = async (token, email, name, dob, phone,address) => {
    console.log(token);
    try {
        const resp = await axios.put(generateURL('me'),{
            email,
            name,
            dob,
            phone,
            address
        },{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return resp.data;
    } catch(e) {
        return false;
    }
}

export const getNotifications = async (token) => {
    try {
        const resp = await axios.get(generateURL('me/notifications'), {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return resp.data;
    } catch(e) {
        return false;
    }
}