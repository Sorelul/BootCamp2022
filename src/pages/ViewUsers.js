import React, { useContext, useEffect, useState } from "react";
import UsersContainer from "../components/UsersContainer";
import { getUsers } from "../api/usersAxios.js";
import { getGroups } from "../api/groupsAxios.js";
import Paginatie from '../components/Paginatie.js';
import "../CSS/ViewUsers.css";
import Caseta from '../helpers/CasetaPersoane.js';
import Caseta2 from '../helpers/CasetaCreazaGrup.js';

function ViewUsers() {

    const [nrConturi, setNrConturi] = useState(0);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [toggleCreate, setToggleCreate] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(5);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentData = data.slice(indexOfFirstPost, indexOfLastPost);
    const token = sessionStorage.getItem('token');

    const [Array, setArray] = useState([]);
    const [groups,setGroups]= useState([]);

    useEffect(() => {
        apiCall();
        apiCallGetGroups();
    }, [])

    const apiCall = async () => {
        setLoading(true);
        const resp = await getUsers(token);
        if (resp) {
            setNrConturi(resp.totalCount);
            setData(resp.users);
        }
        setLoading(false);
    }

    const apiCallGetGroups = async () =>{
        const resp = await getGroups(token);
        if (resp) {
            setGroups(resp.groups);
        }
    }

    const paginate = (number) => {
        setCurrentPage(number);
    
    }

    const verificareExistenta = (id) => {

        const isFound = Array.some(element => {
            if (element.id === id) {
                return true;
            }

            return false;
        });

        return isFound;
    }

    const btnPressed = (obiect) => {
        setToggle(true);
        const obj = { id: obiect.id, name: obiect.name };
        const poz = verificareExistenta(obj.id)
        if (Array.length === 0) {
            setArray(oldArray => [...oldArray, obj]);
        } else
            if (poz === false)
                setArray(oldArray => [...oldArray, obj]);

        console.log(Array);
    }

    const cancel = ()=>{
        setArray([]);

    }

    const nextStep = () =>{
        setToggleCreate(!toggleCreate);
    }

    useEffect(() => {
        if (Array.length === 0)
            setToggle(false);
    })


    return (
        <div className='containerView'>

            <div className='container_titlu'>
                <div className='titlu'>
                    Users List:{nrConturi}
                </div>
            </div>

            <div className='container_body'>

                <div className="ctnStanga">

                    {toggle ? <Caseta date={Array} cancel={cancel} nextStep={nextStep}/> : null}

                </div>

                <div className='iteme'>
                    <UsersContainer loading={loading} data={currentData} btnPressed={btnPressed} />
                </div>

                <div className="ctnDreapta">
                    {toggleCreate ? <Caseta2 grupuri={groups} date={Array} cancel={nextStep}/> : null}
                </div>

                <div className='paginatie'>
                    <Paginatie totalPost={data.length} postsPerPage={postsPerPage} paginate={paginate} />

                </div>
            </div>
        </div>
    );
}

export default ViewUsers;
