import React from 'react'
import styles from './Footer.module.css'
const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        Copyright: Sorel 2022 
      </div>

      <div className={styles.caseta1}>
        <button className={styles.button}>Facebook</button>
      </div>

      <div  className={styles.caseta2}> 
        <button className={styles.button}>Instagram</button>
      </div>
      
      <div className={styles.caseta3}>
        <button className={styles.button}>Twitter</button>
      </div>
      
      <div className={styles.caseta4}>
       <button className={styles.button}>Email</button>
      </div>

    </div>
  )
}

export default Footer