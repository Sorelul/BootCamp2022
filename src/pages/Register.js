import React, { useRef, useContext, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from "react-router-dom";
import '../CSS/Register.css'
import styles from "./Login.module.css";

import { createUser } from "../api/index.js";
import { GeneralContext } from "../context/GeneralContext";

function Register() {


    const { setToken } = useContext(GeneralContext);
    const navigate = useNavigate();

    const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
    const Password_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
    const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    const NAME_REGEX = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/
    const PHONE_REGEX = /^(\+4|)?(07[0-8]{1}[0-9]{1}|02[0-9]{2}|03[0-9]{2}){1}?(\s|\.|\-)?([0-9]{3}(\s|\.|\-|)){2}$/
    const DATE_REGEX = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/
    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [name, setName] = useState("");
    const [validName, setValidName] = useState(false);
    const [nameFocus, setNameFocus] = useState(false);

    const [phone, setPhone] = useState("");
    const [validPhone, setValidPhone] = useState(false);
    const [phoneFocus, setPhoneFocus] = useState(false);

    const [dob, setDob] = useState("");
    const [validDob, setValidDob] = useState(false);
    const [dobFocus, setDobFocus] = useState(false);

    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [validPasswordConfirm, setValidPasswordConfirm] = useState(false);
    const [passwordConfirmFocus, setPasswordConfirmFocus] = useState(false);

    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        // userRef.current.focus();
    }, [])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    }, [email])

    useEffect(() => {
        const result = Password_REGEX.test(password);
        setValidPassword(result);
        const match = password === passwordConfirm;
        setValidPasswordConfirm(match);
    }, [password, passwordConfirm])

    useEffect(() => {
        setErrMsg('');
    }, [email, password, passwordConfirm])


    const handleClick = async () => {

        const v1 = EMAIL_REGEX.test(email);
        const v2 = Password_REGEX.test(password);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            console.log("Nice Try but Nope")
            return;
        }

        const resp = await createUser(email,password,name,dob,phone);
        console.log(resp)
        if (resp.id) {
            setToken(resp.token);
            setSuccess(true);
            console.log("SUCCES :"+success);
        }
    }



    return (
        <>
            {success ? (
                <div className={styles.ContainerRegister}>
                    <div className={styles.Item}>
                        <div className={styles.ItemInnerRegisterSucces}>
                            <div className={styles.itemInnerRegisterSucces_r1}>
                                <h1>Registered Successfully</h1>
                            </div>
                            <div className={styles.itemInnerRegisterSucces_r2}>
                            <p><a href="/login">Sign In</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (

                <div className={styles.ContainerRegister}>
                    <div className={styles.Item}>
                        <div className={styles.ItemInnerRegister}>
                            <div className={styles.itemInnerRegister_r1}>Register</div>

                            {/* Campul pentru email */}
                            <div className={styles.itemInnerRegister_r2}>

                                <label className={styles.form_lable} htmlFor="email">
                                    Email:
                                    <span className={validEmail ? "valid" : "hide"}>
                                        <FontAwesomeIcon icon={faCheck} />
                                    </span>
                                    <span className={validEmail || !email ? "hide" : "invalid"}>
                                        <FontAwesomeIcon icon={faTimes} />
                                    </span>
                                </label><br /><br />
                                <input
                                    type="text"
                                    id="email"
                                    ref={userRef}
                                    autoComplete="off"
                                    required
                                    aria-invalid={validEmail ? "false" : "true"}
                                    aria-describedby="uidnote"
                                    onFocus={() => setEmailFocus(true)}
                                    onBlur={() => setEmailFocus(false)}
                                    className={styles.form_input}
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value); }}
                                    placeholder="Email" />
                                <p id="uidnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    example@example.ro
                                </p>
                            </div>

                            {/* Campul pentru parola */}
                            <div className={styles.itemInnerRegister_r3}>
                                <label className={styles.form_lable} htmlFor="password">
                                    Password
                                    <FontAwesomeIcon icon={faCheck} className={validPassword ? "valid" : "hide"} />
                                    <FontAwesomeIcon icon={faTimes} className={validPassword || !password ? "hide" : "invalid"} />
                                </label><br /><br />
                                <input
                                    id="password"
                                    required
                                    aria-invalid={validPassword ? "false" : "true"}
                                    aria-describedby="passwordNote"
                                    className={styles.form_input}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    type="password"
                                    onFocus={() => setPasswordFocus(true)}
                                    onBlur={() => setPasswordFocus(false)} />
                                <p id="passwordNote" className={passwordFocus && password && !validPassword ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    8 to 24 characters.<br />
                                    Must include uppercase and lowercase letters, a number and a special character.<br />
                                    Allowed special characters: <span aria-label="exclamation mark">!</span>
                                    <span aria-label="at symbol">@</span>  <span aria-label="hashtag">#</span>
                                    <span aria-label="dollar sign">$</span>  <span aria-label="percent">%</span>
                                </p><br />
                            </div>

                            {/* Campul pentru confirmarea parolei */}
                            <div className={styles.itemInnerRegister_r4}>
                                <label className={styles.form_lable} htmlFor="confirm_password">
                                    Confirm Password
                                    <FontAwesomeIcon icon={faCheck} className={validPasswordConfirm && passwordConfirm ? "valid" : "hide"} />
                                    <FontAwesomeIcon icon={faTimes} className={validPasswordConfirm || !passwordConfirm ? "hide" : "invalid"} />
                                </label><br /><br />

                                <input
                                    type="password"
                                    id="confirm_password"
                                    onChange={(e) => setPasswordConfirm(e.target.value)}
                                    value={passwordConfirm}
                                    required
                                    aria-invalid={validPasswordConfirm ? "false" : "true"}
                                    aria-describedby="confirmnote"
                                    onFocus={() => setPasswordConfirmFocus(true)}
                                    onBlur={() => setPasswordConfirmFocus(false)}
                                    className={styles.form_input}
                                    placeholder="Confirm Password" />

                                <p id="confirmnote" className={passwordConfirm && !validPasswordConfirm ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    Must match the first password input field.
                                </p>

                            </div>

                            {/* Campul pentru Nume */}
                            <div className={styles.itemInnerRegister_r5}>
                                <label className={styles.form_lable}>Name</label><br /><br />
                                <input className={styles.form_input} value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" type="text" />
                            </div>

                            {/* Campul pentru Numar de Telefon */}
                            <div className={styles.itemInnerRegister_r6}>
                                <label className={styles.form_lable}>Phone Number</label><br /><br />
                                <input className={styles.form_input} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" type="text" />
                            </div>

                            {/* Campul pentru Data Nasterii */}
                            <div className={styles.itemInnerRegister_r7}>
                                <label className={styles.form_lable}>Date Of Birth</label><br /><br />
                                <input className={styles.form_input} value={dob} onChange={(e) => setDob(e.target.value)} placeholder="Date Of Birth" type="date" />
                            </div>

                            {/* Campul pentru Buton */}
                            <div className={styles.itemInnerRegister_r8}>
                                <button className={styles.button} onClick={handleClick} disabled={!validEmail || !validPassword || !validPasswordConfirm ? true : false} >Register</button>
                                <p>
                                    Already registered?<br />
                                    <div className="line">
                                        <a href="/login">Sign In</a>
                                    </div>
                                </p>
                            </div>


                        </div>

                    </div>
                    <div className={errMsg != '' ? styles.ItemError : styles.ItemError_gol}>
                        <div className={errMsg != '' ? styles.ItemInnerError : styles.ItemInnerError_gol}>
                            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        </div>
                    </div>
                </div>
            )}
        </>


    );
}

export default Register;
