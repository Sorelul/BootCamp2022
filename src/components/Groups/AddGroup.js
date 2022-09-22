import React,{useState,useEffect} from 'react'
import {addGroup,updateGroup} from '../../api/groupsAxios.js';
import {TextField,Button} from '@mui/material';
import '../../CSS/Groups/AddGroup.css';
const AddGroup = (props) => {

    const [name,setName]=useState('');
    const [details,setDetails]=useState('');
    const token = sessionStorage.getItem('token');

    const apiAddGroup = async() =>{
        if(token) {
            const resp = await addGroup(token, name, details);
            console.log(resp);
        } 
        
    }

    const apiUpdateGroup = async ()=>{
        if(token) {
            const resp = await updateGroup(token, props.id , name, details);
            console.log(resp);
        } 
    }

    return (
        <div className="popup-box-add">
            <div className="box-add">
                <span className="close-icon" onClick={props.handleClose}>x</span>

                <div className="boxRow1">
                {props.titlu}
                </div>

                <div className="boxRow2Col1">
                <TextField id="outlined-basic" label="Name" variant="outlined" value={name} className="field" required onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="boxRow2Col2">
                <TextField id="outlined-basic" label="Details" variant="outlined" value={details} className="field" onChange={(e) => setDetails(e.target.value)} />
                </div>

                <div className="boxRow3">
                    <Button onClick={()=>{

                            if(props.titlu==="Create your Group!")
                            {
                                apiAddGroup(); 
                                props.handleClose();
                            }else if(props.titlu==="Update Your Group!")
                            {
                                apiUpdateGroup();
                                props.handleClose();
                            }else
                            {   
                                alert("Ceva nu a mers bine!..");
                                props.handleClose();
                            }

                        
                    }} className="buttonBox3" variant="outlined">Create</Button>
                    <Button onClick={props.handleClose} className="buttonBox3" variant="outlined">Cancel</Button>
                </div>

            </div>
        </div>
    )
}

export default AddGroup