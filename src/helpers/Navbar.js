import React, { useEffect, useState,useContext } from "react";
import './Navbar.module.css'
import styles from './Navbar.module.css'
import logo from './logo.png';
import { GeneralContext } from "../context/GeneralContext";
import {Link,useNavigate} from 'react-router-dom'
import notif from '../CSS/notif.png';
const Navbaru = () => {

  const [message, setMessage] = useState('');
  const [isLogged, setLogged] = useState('Login');

  const [toggleMenu, setToggleMenu] = useState(false);
  const [loggedState, setLoggedState] = useState('');
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  const {token} = useContext(GeneralContext);
  const navigate = useNavigate();
  // const tokenu = localStorage.getItem('token');
  const tokenu = sessionStorage.getItem('token');

  const verificareLatime = () =>{
    screenWidth < 1000 ? unHandleMove() : handleMove();
  }

  const handleMove = () => {
    if(screenWidth>1000)
    setMessage('');
  };


  const unHandleMove = () => {
    setMessage('none');
  };


  const toggleNav = () => {
    setToggleMenu(!toggleMenu)
  }
  useEffect(()=>{
      if(tokenu){
        setLoggedState("");
        setLogged("Logout");
      }
      else{
        setLogged("Login");
        setLoggedState("none");
      }
  },[tokenu])

  useEffect(() => {

    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener('resize', changeWidth)

    const onScroll = () => {
      (window.pageYOffset) >= 50 ? unHandleMove() : handleMove();
    }
    // console.log(message)
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
   
    verificareLatime();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', changeWidth)
    }

  }, [screenWidth]);



  return (
    <nav className={styles.navbarul} >

      <a href="/" className={styles.brandNameIMG}>
        <img width={70} height={70} src={logo} />
      </a>

      <div style={{ display: `${message}`, marginLeft:20 }}>
        <h1>Welcome to</h1>
      </div>

      <a href="/" className={styles.brandName}>
        Wishy
      </a>



       {(toggleMenu || screenWidth > 800) && (

        <ul className={styles.list}>
          <Link to="/home"><li className={styles.items}>Home</li></Link>
          <Link to="/profile"><li className={styles.items} style={{display:loggedState}}>Profile</li></Link>
          <Link to="/items"><li className={styles.items} style={{display:loggedState}}>Items</li></Link>
          <Link to="/users"><li className={styles.items} style={{display:loggedState}}>Users</li></Link>
          <Link to="/wishlists"><li className={styles.items} style={{display:loggedState}}>WishLists</li></Link>
          <Link to="/groups"><li className={styles.items} style={{display:loggedState}}>Groups</li></Link>
          <Link to="/profile/notifications"><li style={{display:loggedState}}><img width="40" height="40" style={{borderRadius:'20px'}}src={notif}/></li></Link>
          <li className={styles.items_log}>{isLogged}</li>
        </ul>

      )}
      <div>
      <button className={styles.btn2} onClick={()=>{
        if(isLogged==="Login")
        navigate('/login');
        else{
          navigate('/home');
          sessionStorage.removeItem('token');
        }
        
      }}>{isLogged}</button> 
      <button onClick={toggleNav} className={styles.btn}>MENU</button> 
      </div>
      
      

    </nav>

  );
}

export default Navbaru;