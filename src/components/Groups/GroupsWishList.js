import React,{useState,useEffect} from 'react'
import Paginatie from '../../components/Paginatie.js';
import './Group.css';
const GroupsWishList = (props) => {

    
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(5);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentData = props.elem.items.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (number) => {
        setCurrentPage(number);
    }

    return (
        <div className='GroupWishListParticular'>

            <div className="GroupWishListParticularItem">

                <div className="">
                    {props.elem.name}
                </div>
            </div>

            <div className="">
                <div className="GroupWishListParticularItem">
                    <div>
                        Details:
                    </div>
                    <div>
                        {props.elem.details}
                    </div>
                </div>
            </div>

            <div className="GroupWishListParticularItem">
                Items: <br />
                {props.elem.items.map((elem) => {
                    return (
                        <div className="">
                            <br />
                            name: {elem?.name}<br />
                            details: {elem?.details}<br />
                            size: {elem?.size}<br />
                            maker: {elem?.maker}<br />
                            model: {elem?.model}<br />
                            link: {elem?.link}<br />
                        </div>
                    );
                }
                )}
                <br />
            </div>

        </div>
    )
}

export default GroupsWishList