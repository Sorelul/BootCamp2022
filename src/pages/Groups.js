import React, { useEffect, useState } from 'react';
import GroupCard from '../components/Groups/GroupContainer.js';
import AddGroup from '../components/Groups/AddGroup.js';
import {Button} from '@mui/material';
import {getGroups,getSharedGroups} from '../api/groupsAxios.js';
import '../CSS/Groups/Groups.css';
const Groups = () => {

  const token = sessionStorage.getItem('token');
  const [nrGrupuri,setNrGrupuri]=useState(0);
  const [nrGrupuriShared,setNrGrupuriShared]=useState(0);
  const [grupuri,setGrupuri]=useState([]);
  const [grupuriShared,setGrupuriShared]=useState([]);
  const [toggle, setToggle] = useState(false);
  const [sters,setSters] =useState(false);
  const [titlu,setTitlu]=useState("Create your Group!");
  const [id,setId]=useState('');

  const changeToggleStatus = () =>{
    setToggle(!toggle);
  }

  const apiGetGroups = async() =>{
    if(token){
      const resp = await getGroups(token);
      setNrGrupuri(resp.totalCount);
      setGrupuri(resp.groups);
    }
  }

  const apiGetSharedGroups = async() =>{
    if(token){
      const resp = await getSharedGroups(token);
      setNrGrupuriShared(resp.totalCount);
      setGrupuriShared(resp.groups);
    }
  }

  const updateGroup = (id)=>{
    if(id==='')
    {
      alert("You can't edit this group!");
      return;
    }
    setTitlu("Update Your Group!");
    setId(id);
    setToggle(!toggle);
  }

  useEffect(()=>{
    apiGetGroups();
    apiGetSharedGroups();
  },[])

  useEffect(()=>{
    apiGetGroups();
    apiGetSharedGroups();
  },[toggle,sters,id])

  const aFostSters = ()=>{
    setSters(!sters);
  }

  return (


    <div className={'ContainerGenerale'}>

      <div className={'container_titlu'}>
        <div className={'titlu'}>
          Groups : {nrGrupuri + nrGrupuriShared}
        </div>
      </div>

      <div className={'container_body'}>
        <div className={'grupuri'}>

            <div className="grupuriSubTitlu">
              <Button onClick={()=>{changeToggleStatus();setTitlu("Create your Group!")}} variant="outlined">Create a group</Button>
            </div>

            {toggle ? <AddGroup id={id} titlu={titlu} handleClose={changeToggleStatus}/>:null}
            
            <div className="grupuriTitluMyGroups">
            My Groups
            </div>

            <div className="grupuriMyGroups">
                <GroupCard aFostSters={aFostSters} id='1' grupuri={grupuri} updateGroup={updateGroup}/>
            </div>

            <div className="grupuriTitluOtherGroups">
                Other Groups
            </div>

            <div className="grupuriOtherGroups">
              <GroupCard id='2' grupuri={grupuriShared} updateGroup={updateGroup}/>
            </div>
        </div>
      </div>

    </div>
  )

}

export default Groups