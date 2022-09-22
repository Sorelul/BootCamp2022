import React, { useState, useEffect } from 'react';
import {deleteGroup} from '../../api/groupsAxios.js';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Group from './Group.js';

import './GroupsLocally.css';
const GroupContainer = (props) => {


  const [toggle, setToggle] = useState(false);
  const [obj, setObj] = useState({});
  const token = sessionStorage.getItem('token');

  const inchiderePopup = () => {
    setToggle(!toggle);
  }



  const afisareInformatii = (id) => {

    props.grupuri.map((elem) => {
      if (elem.id === id) {
        setObj(oldObj => ({
          ...oldObj,
          ...elem
        }));

      }
    })
    setToggle(!toggle);
  }

  const apiDeleteGroup = async(id) =>{
    if(token){
      if(id==='')
      alert("Nu poti sterge un grup care nu este al tau!");
      else{
        const resp = await deleteGroup(token, id);
        if (resp.message === 'Success message - Data deleted')
            {console.log("grupul cu id " + id + " a fost sters");
          props.aFostSters();}
      }

    }

  }


  return (

    <div>

      <TableContainer className="umpluturaTabel">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Details</TableCell>
              <TableCell align="right">Owner Id</TableCell>
              <TableCell align="right">Created At</TableCell>
              <TableCell align="right">Informations</TableCell>
              <TableCell align="right">Delete</TableCell>
              <TableCell align="right">Update</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.grupuri.map((grup) => (
              <TableRow
                key={props.id === '1' ? grup.name : grup.Group.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {props.id === '1' ? grup.id : grup.Group.id}
                </TableCell>
                <TableCell align="right">{props.id === '1' ? grup.name : grup.Group.name}</TableCell>
                <TableCell align="right">{props.id === '1' ? grup.details : grup.Group.details}</TableCell>
                <TableCell align="right">{props.id === '1' ? grup.ownerId : grup.Group.ownerId}</TableCell>
                <TableCell align="right">{props.id === '1' ? grup.createdAt : grup.Group.createdAt}</TableCell>
                <TableCell align="right"><button
                  onClick={() => {
                    // afisareInformatii(props.id==='1' ? grup.id : grup.Group.id);
                    afisareInformatii(grup.id);
                  }}
                >+</button></TableCell>
                <TableCell align="right"><button
                onClick={
                  ()=>{
                    apiDeleteGroup(props.id === '1' ? grup.id : '');
                  }
                }>Delete</button></TableCell>
                <TableCell align="right"><button
                onClick={
                  ()=>{
                    props.updateGroup(props.id === '1' ? grup.id :'');
                  }
                }>Edit</button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>


      
      {toggle ? <Group id={props.id} content={obj} handleClose={inchiderePopup} /> : null}
      



    </div>

  )
}

export default GroupContainer