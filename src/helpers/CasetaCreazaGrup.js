import React, { useState, useEffect } from 'react'
import { addUsersToGroup } from '../api/groupsAxios.js';
import '../CSS/ViewUsers.css'
const CasetaCreazaGrup = (props) => {

    const token = sessionStorage.getItem('token');

    const [isChecked, setChecked] = useState('');
    const [userIds, setUserIds] = useState([]);

    useEffect(()=>{
        setUserIds([]);
        props.date.map((elem) => {
            setUserIds(oldArray => [...oldArray, elem.id]);
        })
        console.log(userIds);
    },[isChecked])

    const apiAddPeople = async () => {
        if (token) {

            if (isChecked !== '') {

                const resp = await addUsersToGroup(token, isChecked, userIds);

                console.log(resp);
            }

        }
    }

    return (
        <div className="casetaGrupuri">

            <div className="casetaGrupuriTitlu">
                In which group do you want to add?
            </div>

            <div className="casetaGrupuriBody">
                {props.grupuri.map((elem, i) => {
                    return (
                        <div>
                            <br /><br />
                            <label htmlFor="name">{elem.name}
                                <input onChange={() => setChecked(elem.id)} name="grup" id="name" type="radio" />
                            </label>

                        </div>
                    );
                })}
            </div>

            <div className="casetaGrupuriButoane">
                <button onClick={() => { 
                    apiAddPeople(); props.cancel();
                }}>Add</button><br /><br />
                <button onClick={props.cancel}>Cancel</button>
            </div>

        </div>
    )
}

export default CasetaCreazaGrup