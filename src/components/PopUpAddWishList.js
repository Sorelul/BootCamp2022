import React from 'react';
import '../CSS/PopUpAddWishList.css';
import Item from './AfisareIteme.js';
import { useState, useEffect } from 'react';
import {addWishList,updateWishList} from '../api/wishListAxios.js';

const PopUpItemAddWishList = (props) => {

    const token = sessionStorage.getItem('token');

    const array = [];
    const [name, setName] = useState(props.dateUpdate ? props.dateUpdate.name:'');
    const [details, setDetails] = useState(props.dateUpdate ? props.dateUpdate.details:'');
    const [lista,setLista]=useState([]);

    const verificaExistenta =(obj, list) =>{
        for (let i = 0; i < list.length; i++) {
            if (list[i] === obj) {
                console.log(obj+" era de sters");
                return i;
            }
        }
    
        return false;
    }

    
    const getChecked = (checked,id) =>{
        const obj = id;
        const poz =verificaExistenta(obj,array);

        if(checked)
        {   
            if(poz === false)
            array.push(obj);
        }
        if(!checked){
            if(poz!==false){
                array.splice(poz,1);
                // console.log('de pe pozitia '+ poz +' trebuia sa sterg')
            }
        }
    }

    const curatareCampuri = () => {
        setName('');
        setDetails('');
    }

    const apiPostWishList = async()=>{
        if (token) {
            if(array.length && name){
            const resp = await addWishList(token,{name:name,details:details},array);
            }else {
                if(array.lengt === 0)
                alert('Pentru a-ti adauga un WishList trebuie sa selectezi minim un item.');
                if(name ===''){
                    alert('Lista dumneavoastra are nevoie de un nume !')
                }
            }

        }
    }

    const apiPutWishList = async()=>{
        if (token) {
            if(array.length && name){
            const resp = await updateWishList(token,{name:name,details:details},array,props.dateUpdate.id);
            console.log(resp);
            }else {
                if(array.lengt === 0)
                alert('Pentru a modifica un WishList trebuie sa selectezi minim un item.');
                if(name ===''){
                    alert('Lista dumneavoastra are nevoie de un nume !')
                }
            }

        }
    }

    return (
        <div className="ContainerPopUpWish">

            <div className="InteriorWish">

                <div className="InteriorTitluWish">
                    <h3>{props.scop} your WishList!</h3>
                </div>
                {/* Nume WsihList*/}
                <div className="InteriorNumeWish">
                    <label htmlFor="id">
                        Name:
                    </label>
                    <input type="text" value={name} id="name" className="form_input" onChange={(e) => setName(e.target.value)} />
                </div>
                {/* Detalii WsihList*/}
                <div className="InteriorDetaliiWish">
                    <label htmlFor="details">
                        Details:
                    </label>
                    <input type="text" value={details} id="details" className="form_input" onChange={(e) => setDetails(e.target.value)} />
                </div>

                <div className="InteriorContinutWish">

                {props?.itemeExistente.map((elem, i) => {
                    return <Item key={i} id={i} elem={elem} setChecked={props?.dateUpdate?.items} getChecked={getChecked}/>
                }
                )
                }

                </div>

                <div className="InteriorButoaneWish">
                    <button className="buttonPopUp" onClick={() => {
                        if(props.actiune==='Save'){
                            apiPostWishList();curatareCampuri(); props.preluareToggle();
                        }
                        else{
                            apiPutWishList();curatareCampuri(); props.preluareToggle2();
                        }

                    }}>{props.actiune}</button><br /><br />
                    <button onClick={() => { 
                        if(props.actiune==='Save'){
                            props.preluareToggle();
                        }else{
                            props.preluareToggle2(); 
                        }
                        curatareCampuri(); }} className="buttonPopUp">Cancel</button>
                </div>

            </div>
        </div>
    )
}

export default PopUpItemAddWishList