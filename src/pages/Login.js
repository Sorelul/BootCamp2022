import React, { useContext,useRef, useState, useEffect } from "react";
import { loginAsUser } from "../api/index.js";
import { GeneralContext } from "../context/GeneralContext";
import { useNavigate,Link } from "react-router-dom";
import styles from "./Login.module.css";
import '../CSS/Register.css'
function Login() {
    // const tokenu = localStorage.getItem("token");
    const tokenu = sessionStorage.getItem("token");
    const emailRef = useRef();
    const errRef = useRef();
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const [eroare,setErr] = useState('');
    const { setToken } = useContext(GeneralContext);
    const navigate = useNavigate();

    const handleClick = async () => {
        const resp = await loginAsUser(email,password);
        console.warn(email,password)
        if (resp.token) {
            setToken(resp.token);
            localStorage.setItem("token", resp.token);
            sessionStorage.setItem("token", resp.token);
            setSuccess(true);
            // navigate('/profile');
        }
        if(resp.errors){
            // console.log(resp);
            // console.log(resp.errors);
            setErr(JSON.stringify(resp.errors[0]));
            errRef.current.focus();
        }else{
            setErr('');
        }

    }

    useEffect(()=>{
        setErr('');
    },[email,password])

    useEffect(()=>{
        emailRef.current.focus();
    },[])

    const linkStyle = {
        margin: "1rem",
        textDecoration: "none",
        color: 'red',
        
      };


    return (
        <>
            {success ? (
                <div className={styles.ContainerRegister}>
                    <div className={styles.Item}>
                        <div className={styles.ItemInnerRegisterSucces}>
                            <div className={styles.itemInnerRegisterSucces_r1}>
                                <h1>Logged in Successfully</h1>
                            </div>
                            <div className={styles.itemInnerRegisterSucces_r2}>
                            <p><a href="/home">Home</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
        <div className={styles.Container}>

            <div className={styles.Item}>

                <div className={styles.ItemInner}>

                    <div className={styles.itemInner_r1}>Login</div>

                    <div className={styles.itemInner_r2}>
                    <p ref={errRef} className={eroare ? "errmsg":"offscreen"} aria-live="assertive">{eroare}</p>
                    </div>
                    
                    <div className={styles.itemInner_r3}>
                    <label className={styles.form_lable} htmlFor="email">Email</label><br /><br />
                    <input 
                    className={styles.form_input} 
                    id="email"
                    value={email}
                    ref={emailRef}
                    onChange={(e) => setEmail(e.target.value)} 
                    required
                    placeholder="Email"/>
                    </div>

                    <div className={styles.itemInner_r4}>
                    <label className={styles.form_lable} htmlFor="password">Password</label><br /><br />
                    <input 
                    id="password"
                    className={styles.form_input} 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password" 
                    required
                    type="password" />
                    </div>
                    
                    <div className={styles.itemInner_r5}>
                    <button className={styles.button} onClick={handleClick} disabled={!email || email.length < 3} >Login</button><br/><br/>
                    
                    <Link style={linkStyle} to='/Register'>
                    Need an account? Sing up</Link>
                    </div>

                   

                    

                </div>

            </div>
        </div>
        )}
        </>
    );
}

export default Login;
