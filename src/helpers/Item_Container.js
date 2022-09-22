import React, { useState,useEffect } from 'react'
import '../CSS/Item_Container.css';
const Items_Container = (props) => {

      const [data,setData]=useState({name:"",details:"",size:"",maker:"",model:"",link:""});

      useEffect(() =>{
            setData(existingValues => ({
                
                  ...existingValues,
                  
                  name:props.name,
                  details:props.details,
                  size:props.size,
                  maker:props.maker,
                  model:props.model,
                  link:props.link
                }));
      },[] )

      return (
            <div className="Container_item">
                  <div className="Container_item_1">
                        Name: {props.name}
                  </div>
                  <div className="Container_item_2">
                        Details: {props.details}
                  </div>
                  <div className="Container_item_3">
                        Size: {props.size}
                  </div>
                  <div className="Container_item_4">
                        Maker: {props.maker}
                  </div>
                  <div className="Container_item_5">
                        Model: {props.model}
                  </div>
                  <div className="Container_item_6">
                        Link: {props.link}
                  </div>
                  <div className="Container_button1">
                        <button
                              className="buttonVertical"
                              onClick={() => {
                                    // console.log("button delete apasat")
                                    props.deleteById(props.id);
                              }
                              }

                        ><span>Delete</span></button>
                  </div>
                  <div className="Container_button2">
                        <button
                              className="buttonVertical"
                              onClick={() => {
                                    props.getUpdateInfo(props.id,data)        
                              }}
                        ><span>Update</span></button>
                  </div>
            </div>
      )
}

export default Items_Container