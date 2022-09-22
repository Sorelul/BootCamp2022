//racfe
import React from 'react'
import Navbar from '../helpers/Navbar.js'
import fundal_styles from '../helpers/Fundal.module.css'
import Footer from '../helpers/Footer.js'

const Main = (props) => {
  return (
    <div className={fundal_styles.corp}>

      {props.children}

      <Footer></Footer>
    </div>
  )
}

export default Main