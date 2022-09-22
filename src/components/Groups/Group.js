import React,{useState} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AddWish from './AddWishListToGroup.js';
import './Group.css';
import GroupsWishList from './GroupsWishList.js';

const Group = (props) => {
    console.log("id= "+props.id);
    console.log(props.content.users);
    const [anotherToggle, setAnotherToggle] = useState(false);
    
    const schimbaAnotherToggle = () => { 
        setAnotherToggle(!anotherToggle);
      }
    
    return (
        <div className="popup-box">
            <div className="box">
                <span className="close-icon" onClick={props.handleClose}>x</span>

                <div className="boxName">
                    <div className="boxName1">
                    Group Name:  <div className="cDif">{props.id==='1' ? props?.content?.name : props?.content?.name}</div><br />
                    </div>
                    <div className="boxName2">
                    Group Details:  <div className="cDif">{props.id==='1' ? props?.content?.details : props?.content?.details}</div>
                    </div>
                    <div className="boxName3">
                    <button onClick={()=>{
                        schimbaAnotherToggle();
                    }} className='btnAddGr'>Add One Of Your WishLists</button>
                    </div>

                </div>

                <div className="boxSubTitluUsers">
                    Users in this group:
                </div>

                <div className="boxUsers">
                    {
                        <TableContainer>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="right">Email</TableCell>
                                    <TableCell align="right">Phone Nr.</TableCell>
                                    <TableCell align="right">Date Of Birth</TableCell>
                                    <TableCell align="right">Address</TableCell>
                                    <TableCell align="right">Country</TableCell>
                                    <TableCell align="right">City</TableCell>
                                    <TableCell align="right">Street</TableCell>
                                    <TableCell align="right">Zip Code</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.content.users.map((person) => (
                                    <TableRow
                                        key={person.id}
                                        sx={{'&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {person.name}
                                        </TableCell>
                                        <TableCell align="right">{person.email}</TableCell>
                                        <TableCell align="right">{person.phone}</TableCell>
                                        <TableCell align="right">{person.dob}</TableCell>
                                        <TableCell align="right">-`{'>'}`</TableCell>
                                        <TableCell align="right">{person.address.country}</TableCell>
                                        <TableCell align="right">{person.address.city}</TableCell>
                                        <TableCell align="right">{person.address.street}</TableCell>
                                        <TableCell align="right">{person.address.zip}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    }
                </div>

                <div className="boxSubTitluWishLists">
                    Shared WishLists
                </div>    
                <div className="boxWishLists">
                    {
                        props.content.wishlists.map((elem,i) => {
                            return <GroupsWishList key={i} elem={elem}/>
                        })
                    }
                </div>


            </div>
            {anotherToggle ? <AddWish idWish={props.content.id} handleClose={schimbaAnotherToggle} /> : null}
        </div>
    )
}

export default Group