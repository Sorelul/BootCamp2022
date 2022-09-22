import React from "react";
import User from "./User";
import '../CSS/ViewUsers.css'
function UsersContainer(props) { 

    if(props.loading){
        return<h2>Loading...</h2>
    }

    return (
        <div className='ul'>
            {props?.data.map((elem,i) => {
                return <User key={i} btnPressed={props.btnPressed} elem={elem} />
            })}
        </div>
    );
}

export default UsersContainer;
