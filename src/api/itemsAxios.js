import axios from "axios";
const path_to_api = 'http://ec2-18-217-234-99.us-east-2.compute.amazonaws.com:8080/v1';

const generateURL = (path, queryVars) => {

    let fullEndpoint = `${path_to_api}/${path}`;

    if (queryVars) {
        queryVars.forEach((elem, index) => { fullEndpoint += `${index === 0 ? '?' : '&'}${elem.name}=${elem.value}` })
    }
    return fullEndpoint;
}

export const getItems = async (token) => {
    try {
        const resp = await axios.get(generateURL('items'), {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return resp.data;
    } catch(e) {
        return false;
    }
}


export const addItems = async (token,name,details,size,maker,model,link) => {
    try {
        const resp = await axios.post(generateURL('items'),{
            name,
            details,
            size,
            maker,
            model,
            link
        },{
            headers: {
                Authorization: `Bearer ${token}`,
            }
                
        });
        return resp.data;
    } catch(e) {
        console.error("Eroare la adaugare");
        return false;
    }
}

export const updateItem = async (token, name, details, size,maker,model,link,id) => {
    console.log(token);
    try {
        const resp = await axios.put(generateURL(`items/${id}`),{
            name,
            details,
            size,
            maker,
            model,
            link
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

export const deleteItem = async (token,id) => {
    try {
        const resp = await axios.delete(generateURL(`items/${id}`), {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return resp.data;
    } catch(e) {
        return false;
    }
}