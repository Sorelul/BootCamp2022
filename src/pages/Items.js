import React from 'react'
import { useState, useEffect } from 'react';
import '../CSS/Items.css';
import { getItems, addItems, deleteItem,updateItem } from '../api/itemsAxios.js'
import { useNavigate } from 'react-router-dom';
import Container from '../helpers/Item_Container';
import PopUp from '../helpers/PopUpItem.js';
import PopUpAddItem from '../helpers/PopUpAddItem.js';
const Items = () => {

    const [toggle, setToggle] = useState(false);
    const [toggleUp, setToggleUp] = useState(false);
    const [data,setData] =useState({});
    const [id,setId] = useState('');

    const [items, setItems] = useState({});
    const [components, setComponents] = useState([]);
    const token = sessionStorage.getItem('token');

    const preluareDate = (date, verif) => {

        console.log(date);

        if (date !== 0) {
            addItemsInfo(date.name, date.details, date.size, date.maker, date.model, date.link);
        }
        setToggle(verif);

    }

    const getUpdateInfo = (idGot, data) => {

        setToggleUp(!toggleUp);
        setData(data);
        setId(idGot);

    }

    const preluareDateModificate = (obj)=>{
        setToggleUp(!toggleUp)
        if(obj!==0)
        {
            const resp = updateItem(token,obj.name,obj.details,obj.size,obj.maker,obj.model,obj.link,id);
            console.log(resp);
        }
    }

    const deleteById = async (id) => {
        console.log(id);
        const resp = await deleteItem(token, id);
        if (resp.message === 'Success message - Data deleted')
            console.log("itemul cu id " + id + " a fost sters");
    }

    const getItemsInfo = async () => {
        if (token) {
            const resp = await getItems(token);
            // console.log(resp);
            setItems(resp.items);
        }
    }

    const addItemsInfo = async (name, details, size, maker, model, link) => {
        if (token) {
            const resp = await addItems(token, name, details, size, maker, model, link);
            console.log(resp);
        }
    }

    const afisareIteme = () => {
        if (components.length == 0 || components.length < items.length) {
            var j = 0;
            if (components.length < items.length)
                j = components.length
            else
                j = 0;

            for (let i = j; i < items.length; i += 1) {
                setComponents((components) => [
                    ...components,
                    items[i]]);

            }

        }
    }

    useEffect(() => {
        setToggle(false);
    }, [])

    useEffect(() => {
        getItemsInfo();
        afisareIteme();
    })

    const adaugaItem = () => {
        setToggle(!toggle);
    }



    return (
        <div className={'Container_principal'}>

            <div className='blank'>

            </div>

            <div className='Container_buton_Adaugare'>
                <div className='Container_buton_Adaugare_fr'>
                    <button className="button" onClick={adaugaItem}>Adaugare Item</button>
                </div>
            </div>

            <div className='content' id='content'>

                <div className="popup-fit">
                    {toggle ? <PopUp preluareDate={preluareDate} /> : null}
                </div>

                <div className='content-fit'>

                    {components.map((item,i) => (<Container key={i} getUpdateInfo={getUpdateInfo} deleteById={deleteById} id={item.id} name={item.name} details={item.details} size={item.size} maker={item.maker} model={item.model} link={item.link} />))}

                </div>

                <div className='popup-addfit'>
                    {toggleUp ? <PopUpAddItem preluareDateModificate={preluareDateModificate} data={data}/> : null}
                </div>

            </div>

        </div>
    )
}

export default Items;