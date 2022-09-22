import axios from "axios";
const path_to_api = 'http://ec2-18-217-234-99.us-east-2.compute.amazonaws.com:8080/v1';

const generateURL = (path, queryVars) => {

    let fullEndpoint = `${path_to_api}/${path}`;

    if (queryVars) {
        queryVars.forEach((elem, index) => { fullEndpoint += `${index === 0 ? '?' : '&'}${elem.name}=${elem.value}` })
    }
    return fullEndpoint;
}

export const getList = async (token) => {
    try {
        const resp = await axios.get(generateURL('wishlists'), {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return resp.data;
    } catch (e) {
        return false;
    }
}

export const deleteList = async (token, id) => {
    try {
        const resp = await axios.delete(generateURL(`wishlists/${id}`), {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return resp.data;
    } catch (e) {
        return false;
    }
}

export const addWishList = async (token, wishlist, itemIds) => {
    try {
        const resp = await axios.post(generateURL('wishlists'), {
            wishlist,
            itemIds

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

export const updateWishList = async (token, wishlist, itemIds, id) => {
    console.log(token);
    try {
        const resp = await axios.put(generateURL(`wishlists/${id}`), {
            wishlist,
            itemIds
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