import React from 'react'
import '../CSS/WishList.css';
const ItemCard = (props) => {
  return (
    <div className="item_particular">
        {/* ITEM ID {props.elem.item.id};<br/> */}
        <br/>
        name: {props.elem.item.name}<br/>
        details: {props.elem.item.details}<br/>
        size: {props.elem.item.size}<br/>
        maker: {props.elem.item.maker}<br/>
        model: {props.elem.item.model}<br/>
        link: {props.elem.item.link}<br/>
    </div>
  )
}

export default ItemCard