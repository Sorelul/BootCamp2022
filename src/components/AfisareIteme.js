import React,{useState,useEffect} from 'react'

const AfisareIteme = (props) => {

    const [checked,setChecked] = useState(false);
    const [listaItemePrimitePtUpdate,setListaItemePrimitePtUpdate]= useState(props.setChecked ? props.setChecked : '');
    const handleChange = () =>{
        setChecked(!checked);
    }

    useEffect(() => {
        props.getChecked(checked,props.elem.id);
    },[checked])

    useEffect(() => {
        if(listaItemePrimitePtUpdate !== ''){

            {listaItemePrimitePtUpdate.map((elem, i) => {
                if(elem.item.id === props.elem.id)
                {            
                    setChecked(true);}
            }
            )
            }

        }
        
    },[])

    return (
        <div>
            <input type="checkbox" id={props.id} name={props.elem.name} checked={checked} onChange={handleChange} value={props.elem.name}/>
            <label htmlFor={props.elem.name}>{props.elem.name}</label>
        </div>

    )
}

export default AfisareIteme;