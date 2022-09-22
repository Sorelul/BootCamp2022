import axios from "axios";
const path_to_api = 'http://ec2-18-217-234-99.us-east-2.compute.amazonaws.com:8080/v1';

const generateURL = (path, queryVars) => {

    let fullEndpoint = `${path_to_api}/${path}`;

    if (queryVars) {
        queryVars.forEach((elem, index) => { fullEndpoint += `${index === 0 ? '?' : '&'}${elem.name}=${elem.value}` })
    }
    return fullEndpoint;
}

export const getUsers = async (token) => {
    try {
        const resp = await axios.get(generateURL('users'), {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return resp.data;
    } catch(e) {
        return false;
    }
}
