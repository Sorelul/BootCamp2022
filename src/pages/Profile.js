import React, { useRef, useContext, useState, useEffect } from "react";
import { getUserAccount, setUserAccount } from "../api/index.js";
import { GeneralContext } from "../context/GeneralContext";
import { useNavigate } from "react-router-dom";
import '../CSS/MsMadi-Regular.ttf'
import '../CSS/Profile.css'

function Profile() {
    const navigate = useNavigate();
    // const tokenu = localStorage.getItem("token");
    const tokenu = sessionStorage.getItem("token");

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const nameRef = useRef(null);
    const phoneRef = useRef(null);
    const dobRef = useRef(null);
    const countryRef = useRef(null);
    const cityRef = useRef(null);
    const streetRef = useRef(null);
    const zipRef = useRef(null);

    const { token, setToken } = useContext(GeneralContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [dob, setDob] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    const [zip, setZip] = useState("");
    const [address,setAddress] = useState({country:"",city:"",street:"",zip:""});

    const handleClick = async () => {

        const resp = await setUserAccount(tokenu, email, name, dob, phone,address);
        console.log(resp);


    }

    const seteazaAdresa = () =>{
        setAddress(existingValues => ({
                
            ...existingValues,
            
            country:country,
            city:city,
            street:street,
            zip:zip
          }));
    }

    const getUser = async () => {
        if (tokenu) {
            const resp = await getUserAccount(tokenu);

            setEmail(resp.email);
            setName(resp.name);
            setPhone(resp.phone);
            setDob(resp.dob);
            setCountry(resp.address.country);
            setCity(resp.address.city);
            setStreet(resp.address.street);
            setZip(resp.address.zip);
        }
    }

    useEffect(() => {
        getUser();
    }, [tokenu])

    useEffect(() => {
        emailRef.current.value = email;
        passwordRef.current.value = password;
        nameRef.current.value = name;
        phoneRef.current.value = phone;
        dobRef.current.value = dob;
        countryRef.current.value = country;
        cityRef.current.value = city;
        streetRef.current.value = street;
        zipRef.current.value = zip;
        // console.log("e spam?");
    })

    return (
        <div className={'container'}>
            <div className={'caseta'}>

                <div className={'caseta_profile'}>Profile</div>

                <div className={'caseta_email'}>
                    <label htmlFor="email">Email</label><br /><br />
                    <input
                        className={"form_input"}
                        id="email"
                        // value={email}
                        ref={emailRef}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Email" />
                </div>

                <div className={'caseta_parola'}>
                    <label htmlFor="password">
                        Password
                    </label><br /><br />
                    <input
                        id="password"
                        required
                        ref={passwordRef}
                        className={"form_input"}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        type="password"
                    />
                </div>

                <div className={'caseta_nume'}>
                    <label htmlFor="name">Name</label><br /><br />
                    <input
                        className={"form_input"}
                        id="name"
                        ref={nameRef}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                        type="text" />
                </div>

                <div className={'caseta_telefon'}>
                    <label htmlFor="telefon">Phone Number</label><br /><br />
                    <input
                        id="telefon"
                        ref={phoneRef}
                        className={"form_input"}
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone"
                        type="text" />
                </div>

                <div className={'caseta_dob'}>
                    <label htmlFor="dob">Date Of Birth</label><br /><br />
                    <input
                        id="dob"
                        ref={dobRef}
                        className={"form_input"}
                        value={dob} 
                        onChange={(e) => setDob(e.target.value)}
                        placeholder="Date Of Birth"
                        type="text" />
                </div>

                <div className={'caseta_adresa'}>Address</div>

                <div className={'caseta_country'}>
                    <label htmlFor="country">Country</label><br /><br />
                    <input
                        id="country"
                        className={"form_input"}
                        ref={countryRef}
                        value={country} 
                        onChange={(e) => {setCountry(e.target.value);seteazaAdresa()}}
                        placeholder="Country"
                        type="text" />
                </div>

                <div className={'caseta_city'}>
                    <label htmlFor="city">City</label><br /><br />
                    <input
                        id="city"
                        ref={cityRef}
                        className={"form_input"}
                        value={city} 
                        onChange={(e) => {setCity(e.target.value);seteazaAdresa()}}
                        placeholder="City"
                        type="text" />
                </div>

                <div className={'caseta_street'}>
                    <label htmlFor="street">Street</label><br /><br />
                    <input
                        id="street"
                        ref={streetRef}
                        className={"form_input"}
                        value={street} 
                        onChange={(e) => {setStreet(e.target.value); seteazaAdresa()}}
                        placeholder="Street"
                        type="text" />
                </div>

                <div className={'caseta_zip'}>
                    <label htmlFor="zip">Zip Code</label><br /><br />
                    <input
                        id="zip"
                        ref={zipRef}
                        className={"form_input"}
                        value={zip} 
                        onChange={(e) =>{setZip(e.target.value); seteazaAdresa()}}
                        placeholder="Zip Code"
                        type="text" />
                </div>

                <div className={'caseta_button'}>
                    <button className={"button"} onClick={()=>{handleClick();}}  >Save</button>
                </div>

            </div>

        </div>
    );
}

export default Profile;
