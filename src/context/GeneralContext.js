import React, { useState } from "react";
const GeneralContext = React.createContext();

const GeneralProvider = props => {
    const [token, setToken] = useState(null);
    const [users, setUsers] = useState([]);

    return (
        <GeneralContext.Provider
            value={{
                token,
                setToken,
                users,
                setUsers,
            }}
        >
            {props.children}
        </GeneralContext.Provider>
    );
};

export { GeneralContext, GeneralProvider };
