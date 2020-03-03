import React, {useContext} from 'react'
import {useParams} from 'react-router-dom'
import {picContext} from '../context/context'

export const BigPic = ()=>{
    const {id} = useParams()
    
    const {pics,toggleFavor,toggleCart,user} = useContext(picContext)
 
    const {url} = pics.find(i=>i._id===id)

    return (
        <main className='big-pic'>
            
            <img src={url} alt='this is big'/>
            {
                user.email && (
                    user.favorite.includes(id) ? 
                        <i className="ri-heart-fill favorite" onClick={()=>toggleFavor(id)}></i> :
                        <i className="ri-heart-line favorite" onClick={()=>{toggleFavor(id)}}></i>
                )
            }
            {
                user.email && (
                    user.inCart.includes(id) ?
                        <i className="ri-shopping-cart-fill cart" onClick={()=>toggleCart(id)}></i>:
                        <i className="ri-add-circle-line cart" onClick={()=>toggleCart(id)}></i>
                )                
            }
            
        </main>
    )
}