import React,{useState,useEffect} from 'react'
import '../CSS/Groups/Groups.css';
import {getNotifications} from '../api/index.js';
import {updateInvite} from '../api/groupsAxios.js';
const Notifications = () => {

 const [notif,setNotif]=useState([]);
 const token = sessionStorage.getItem('token');

    const getNotif = async()=>{
        if(token){
            const resp = await getNotifications(token);
            setNotif(resp.notifications);
          }
    }

    useEffect(() => {
        getNotif();
    
    })

    const acceptInvite = async() =>{
        // if(token){
        //     const resp = await updateInvite(token);
        //     console.log(resp);
        //     setNotif(resp.notifications);
        //   }
    }   
    const denyInvite = async() =>{
        // if(token){
        //     const resp = await updateInvite(token);
        //     console.log(resp);
        //     setNotif(resp.notifications);
        //   }
    } 

  return (
    <div className={'notifContainer'}>
        
        <div className="notifContMic">
   
        {
            notif.map(
                (notificare)=>{
                    
                    return(
                        <div className="notifCard">
                            <br/>
                            Category: {notificare.category}<br/><br/>
                            Details: {notificare.details}<br/><br/>
                            Received at: {notificare.createdAt}<br/><br/>
                            <button onClick={
                                ()=>{
                                    acceptInvite();
                                }
                            }>Accept</button>
                            <button onClick={
                                ()=>{
                                    denyInvite();
                                }
                            }>Deny</button>
                        </div>
                    );
                }
            )
        }
                 
         </div>
    </div>
  )
}

export default Notifications