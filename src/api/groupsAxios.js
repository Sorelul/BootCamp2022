import axios from "axios";
const path_to_api = 'http://ec2-18-217-234-99.us-east-2.compute.amazonaws.com:8080/v1';

const generateURL = (path, queryVars) => {

    let fullEndpoint = `${path_to_api}/${path}`;

    if (queryVars) {
        queryVars.forEach((elem, index) => { fullEndpoint += `${index === 0 ? '?' : '&'}${elem.name}=${elem.value}` })
    }
    return fullEndpoint;
}

export const getGroups = async (token) => {
    try {
        const resp = await axios.get(generateURL('groups'), {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return resp.data;
    } catch (e) {
        return false;
    }
}

export const getSharedGroups = async (token) => {
    try {
        const resp = await axios.get(generateURL('groups/shared'), {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return resp.data;
    } catch (e) {
        return false;
    }
}

export const addGroup = async (token, name, details) => {
    try {
        const resp = await axios.post(generateURL('groups'), {
            name,
            details
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }

        });
        return resp.data;
    } catch (e) {
        console.error("Eroare la adaugare");
        return false;
    }
}

export const deleteGroup = async (token, id) => {
    try {
        const resp = await axios.delete(generateURL(`groups/${id}`), {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return resp.data;
    } catch (e) {
        return false;
    }
}

export const updateGroup = async (token, id, name, details) => {
    console.log(token);
    try {
        const resp = await axios.put(generateURL(`groups/${id}`), {
            name,
            details
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return resp.data;
    } catch (e) {
        return false;
    }
}

export const addUsersToGroup = async (token, id, userIds) => {
    try {
        const resp = await axios.post(generateURL(`groups/${id}/users`), {
            userIds
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }

        });
        return resp.data;
    } catch (e) {
        console.error("Eroare la adaugare");
        return false;
    }
}

export const updateInvite = async (token, status,id) => {
    console.log(token);
    try {
        const resp = await axios.put(generateURL(`groups/${id}/invite`), {
            status
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return resp.data;
    } catch (e) {
        return false;
    }
}

export const addListToGroup = async (token,wishlistIds,id) => {
    console.log(token);
    try {
        const resp = await axios.post(generateURL(`groups/${id}/wishlists`), {
            wishlistIds
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return resp.data;
    } catch (e) {
        return false;
    }
}