import React from 'react'
import './ButtonElement.css'
const ButtonElement = (props) => {
  return (
   <button 
   href={props.adresa} 
   className={`${props.butonType} ${props.butonSecundar}`} 
   >

     {props.nume}

     </button>
  )
}

export default ButtonElement