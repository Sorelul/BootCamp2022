import React, { useEffect, useState } from 'react';
import { getList, deleteList } from '../api/wishListAxios.js';
import {getItems} from '../api/itemsAxios.js';
import WishListContainer from '../components/WishListContainer.js';
import Paginatie from '../components/Paginatie.js';
import PopUp from '../components/PopUpAddWishList.js'
import '../CSS/WishList.css';

const WishList = () => {

    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(1);
    

    const [nrListe, setNrListe] = useState(0);
    const token = sessionStorage.getItem('token');
    const [data, setData] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [toggle2, setToggle2] = useState(false);
    const [itemeExistente,setItemeExistente]=useState([]);
    const [dateUpdate,setDateUpdate]=useState({id:'',name:'',details:'',items:[]});

    const paginate = (number) => {
        setCurrentPage(number);
    }

    const getDelId = async (id) => {
        const resp = await deleteList(token, id);
        if (resp.message === 'Success message - Data deleted') {
            console.log("WishListul cu id " + id + " a fost sters");
            alert("WishListul cu id-ul " + id + " a fost sters si lista o sa fie actualizata la primul refresh.")
        }

    }

    const apiGetItems = async () =>{
        const resp = await getItems(token);
        if (resp) {
            // console.log(resp);
            setItemeExistente(resp.items);
        }
    }

    const apiGetListCall = async () => {
        setLoading(true);
        const resp = await getList(token);
        if (resp) {
            setNrListe(resp.totalCount);
            setData(resp.wishlists);
        }
        setLoading(false);
    }

    useEffect(() => {
        apiGetListCall();
        apiGetItems();
    }, [])

    const backPage = () => {

        if (currentPage !== 1)
            setCurrentPage(currentPage - 1);
    }

    const nextPage = () => {
        if (currentPage < Math.ceil(data.length / postsPerPage))
            setCurrentPage(currentPage + 1);
    }

    const addNewWishList = () => {
        setToggle(!toggle);
    }

    const toggle2_status = ()=>{
        setToggle2(!toggle2);
    }

    const getUpdate = (id,name,details,items)=>{
        setToggle2(!toggle2);
        setDateUpdate(existingValues => ({
                
            ...existingValues,
            
            id:id,
            name:name,
            details:details,
            items:items
          }))

    }


    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentData = data.slice(indexOfFirstPost, indexOfLastPost);

    return (
        <div className='containerWishList'>

            <div className='container_titlu'>
                <div className='titlu'>
                    <button onClick={() => { addNewWishList(); }} className="btnAdaugare">Creeaza un nou WishList!</button>
                    My WishLists
                </div>
            </div>

            <div className='container_body'>

                <div className='ContainerStanga'>
                    {data.length !== 0 ? <button className='btn_nav' onClick={backPage}>{'<'}</button> : null}
                    {toggle ? <PopUp actiune='Save' scop='Add' itemeExistente={itemeExistente} preluareToggle={addNewWishList}/>:null}
                </div>

                <div className='iteme'>
                    {data.length === 0 ? <div>
                        Lista dumneavoastra de WishList-uri este momentan goala!<br /><br /><br />
                    </div> : null}
                    <WishListContainer getUpdate={getUpdate} loading={loading} data={currentData} getDelId={getDelId} />
                </div>

                <div className='ContainerDreapta'>
                    {data.length !== 0 ? <button className='btn_nav' onClick={nextPage}>{'>'}</button> : null}
                    {toggle2 ? <PopUp actiune='Update' scop='Update' dateUpdate={dateUpdate} itemeExistente={itemeExistente} preluareToggle2={toggle2_status}/>:null}
                
                </div>

                <div className='paginatie'>
                    <Paginatie totalPost={data.length} postsPerPage={postsPerPage} paginate={paginate} />
                </div>

            </div>

        </div>
    )
}

export default WishList