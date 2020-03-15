import React, {useContext} from 'react'
import {picContext} from '../context/context'
import {useHover} from '../hooks/useHover'
import {Link} from 'react-router-dom'

export const CartItem = ({id})=>{
    const {pics, toggleCart} =useContext(picContext)

    const [hovered, on, off] = useHover(false)

    const iClass = hovered ? 'ri-delete-bin-fill' : 'ri-delete-bin-line'

    const currentPic = pics.find(pic=>pic._id==id)
    
    return (
        <div className='cart-item'>            
            <i 
                className={iClass} 
                onClick={()=>toggleCart(id)}
                onMouseEnter={on}
                onMouseLeave={off}
            ></i>
            <Link to={`/${id}`}>
                <img src={currentPic.url} width='130px' alt='this is cart'/>
            </Link>
            <p>$ 2.99</p>
        </div>
    )
}