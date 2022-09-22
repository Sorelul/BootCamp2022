import React, { useState,useEffect } from 'react'
import '../../CSS/Groups/AddWishListToGroup.css';
import { getList } from '../../api/wishListAxios.js';
import { addListToGroup } from '../../api/groupsAxios.js';

const AddWishListToGroup = (props) => {

    const token = sessionStorage.getItem('token');

    const [data, setData] = useState([]);
    const [isChecked, setChecked] = useState('');


    const apiGetWishList = async () => {
        const resp = await getList(token);
        if (resp) {
            setData(resp.wishlists);
        }
    }

    const apiAddWishToGroup = async () => {
        if (token) {

            if (isChecked !== '') {
                console.log([isChecked]);
                console.log(props.idWish);
                const resp = await addListToGroup(token, [isChecked],props.idWish);

                console.log(resp);
            }

        }
    }

    useEffect(() => {
        apiGetWishList();
    })


    return (

        <div className="popup-box-addWish">
            <div className="box-addWish">
                <span className="close-icon" onClick={props.handleClose}>x</span>

                <div className="box-addWish1">
                    Select a WishList
                </div>
                <div className="box-addWish2">
                    {data.map((elem, i) => {

                        return (
                            <div >
                                <br /><br />
                                <label htmlFor="name">{elem.name}
                                    <input onChange={() => setChecked(elem.id)} name="grup" id="name" type="radio" />
                                </label>

                            </div>
                        );
                    })}
                </div>
                <div className="box-addWish3">
                    <button
                        onClick={()=>{
                            apiAddWishToGroup(); props.handleClose();
                        }}
                    >Save</button>
                    <button onClick={()=>{
                         props.handleClose();
                        }}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default AddWishListToGroup