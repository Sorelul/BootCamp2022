import React from 'react';
import '../CSS/Pop.css';
import { useState,useEffect } from 'react';

const PopUpItem = (props) => {
    const objectu = {
        name:'',
        details:'',
        size:'',
        maker:'',
        model:'',
        link:'',
        toggle:''
    };
    const [name, setName] = useState(props.data.name);
    const [details, setDetails] = useState(props.data.details);
    const [size, setSize] = useState(props.data.size);
    const [maker, setMaker] = useState(props.data.maker);
    const [model, setModel] = useState(props.data.model);
    const [link, setLink] = useState(props.data.link);

    const curatareCampuri = () =>{
        setName('');
        setDetails('');
        setSize('');
        setMaker('');
        setModel('');
        setLink('');
    }

    useEffect(() => {
        objectu.name = name;
        objectu.details = details;
        objectu.size = size;
        objectu.maker = maker;
        objectu.model = model;
        objectu.link = link;

    })


 

    return (
        <div className="ContainerPopUp">
            <div className="Interior">

                <div className="Interior_titlu">
                    <h3>Update</h3>
                </div>
                <div className="Interior_nume">
                    <label htmlFor="id">
                        Name:
                    </label>
                    <input type="text" value={name} id="name" className="form_input"  onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="Interior_detalii">
                    <label htmlFor="details">
                        Details:
                    </label>
                    <input type="text" value={details} id="details" className="form_input" onChange={(e) => setDetails(e.target.value)}/>
                </div>
                <div className="Interior_marime">
                    <label htmlFor="size">
                        Size:
                    </label>
                    <input type="text" value={size} id="size" className="form_input" onChange={(e) => setSize(e.target.value)}/>
                </div>
                <div className="Interior_creator">
                    <label htmlFor="maker">
                        Maker:
                    </label>
                    <input type="text" value={maker} id="maker" className="form_input" onChange={(e) => setMaker(e.target.value)}/>
                </div>
                <div className="Interior_model">
                    <label htmlFor="model">
                        Model:
                    </label>
                    <input type="text" value={model} id="model" className="form_input" onChange={(e) => setModel(e.target.value)}/>
                </div>
                <div className="Interior_link">
                    <label htmlFor="link">
                        Link:
                    </label>
                    <input type="text" value={link} id="link" className="form_input" onChange={(e) => setLink(e.target.value)}/>
                </div>
                <div className="Interior_butoane">
                    <button className="buttonPopUp" onClick={()=>{
                        props.preluareDateModificate(objectu); curatareCampuri(); 
                    }}>Save</button><br/><br/>
                    <button onClick={()=>{props.preluareDateModificate(0);curatareCampuri();}} className="buttonPopUp">Cancel</button>
                </div>

            </div>
        </div>
    )
}

export default PopUpItem