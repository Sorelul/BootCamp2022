import React from 'react'
import Persoana from '../helpers/Persoana.js';
import '../CSS/ViewUsers.css'
const CasetaPersoane = (props) => {
  return (

    <div className="casetaPersoane">
      <div className="casetaPersoane_persoane">
        {props.date.map((elem, i) => {
          return <Persoana key={i} elem={elem} />
        })}
      </div>

      <div className="casetaPersoane_butoane">
        <button onClick={props.nextStep}>Next Step</button><br /><br />
        <button onClick={props.cancel}>Cancel</button>
      </div>

    </div>
  )
}

export default CasetaPersoane