
import React from 'react'
import "../CSS/ViewUsers.css";
const Paginatie = (props) => {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(props.totalPost / props.postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (

        <div>
                {pageNumbers.map((number,i) =>(
                    <button key={i} className='buton_paginatie' onClick={()=> props.paginate(number)}>
                        {number}
                    </button>
                )
                    )}
        </div>
    )
}

export default Paginatie