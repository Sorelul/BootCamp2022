import React,{useState} from 'react'
import List from '../components/List.js';
import '../CSS/WishList.css';

const WishListContainer = (props) => {



    if (props.loading) {
        return <h2>Loading...</h2>
    }


    return (
        <div>

            <div>
                {props?.data.map((elem, i) => {
                    return <List key={i} elem={elem} getUpdate={props.getUpdate} getDelId={props.getDelId}/>
                }
                )
                }
            </div>



        </div>
    )
}

export default WishListContainer