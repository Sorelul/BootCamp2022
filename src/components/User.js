import React from "react";
import '../CSS/ViewUsers.css'
function User(props) {
    return (
        <div className="caseta2">

            <div className="caseta_name2">Name: {props.elem?.name}</div>
            <div className="caseta_email2">email: {props.elem?.email}</div>
            <div className="caseta_phone2">phone: {props.elem?.phone}</div>
            <div className="caseta_dob2">Date of Birth: {props.elem?.dob}</div>

            <div className="caseta_button2">
               <button className="btnas" onClick={()=>{
                   props.btnPressed({id:props.elem?.id,name:props.elem?.name})
               }}>Add+</button>
            </div>

        </div>

    );
}

export default User;
