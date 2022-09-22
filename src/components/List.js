import React,{useState} from 'react'
import '../CSS/WishList.css';
import ItemCard from '../components/ItemCard.js';
import Paginatie from '../components/Paginatie.js';
const List = (props) => {


    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(5);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentData = props.elem.items.slice(indexOfFirstPost, indexOfLastPost);
    
    const paginate = (number) => {
        setCurrentPage(number);
    }

    return (
        <div  className='container_lista'>

            <div className="container_titlu_wish">
                
                <div className="titlu_wish">

                <button onClick={()=>{
                    props.getDelId(props.elem.id);
                }
                    } className="btnSterge">Delete</button>

                {props.elem.name}

                <button onClick={
                    ()=>{
                        props.getUpdate(props.elem.id,props.elem.name,props.elem.details,props.elem.items);
                    }
                } className="btnUpdate">Update</button>

                </div>
            </div>

            <div className="container_detalii_wish">
                <div className="detalii_wish">
                    <div>
                    Details:
                    </div> 
                    <div>
                    {props.elem.details} 
                    </div> 
                </div>
            </div>

            <div className="iteme_wish">
                Items: <br/>
            {currentData.map((elem,i) => {
                return <ItemCard key={i} elem={elem}/>
                }
            )}
            <br/>
            </div>
            <div className='paginatie_lista'>
                    <Paginatie totalPost={props?.elem.items.length} postsPerPage={postsPerPage} paginate={paginate} />
                </div>
        
        </div>

    )
}

export default List