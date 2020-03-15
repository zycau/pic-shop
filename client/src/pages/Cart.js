import React, {useContext, useState} from 'react'
import {Redirect} from 'react-router-dom'
import {picContext} from '../context/context'
import {CartItem} from '../component/CartItem'

export const Cart = ()=>{
    const {user, placeOrder} = useContext(picContext)

    const [btn, setBtn] = useState('Place Order')
    
    const orderBtn = ()=>{
        user.inCart.length &&
        setBtn('Ordering...')
        setTimeout(()=>{
            setBtn('Place Order')
            placeOrder()            
        }, 3000)        
    }

    console.log(user)
    
    return (       
        <main className="cart-page">
            {Object.keys(user).length===0 ?
                <Redirect to='/' /> :
                <>
                <h1>Check out</h1>
                {user.inCart.map(i=>
                    <CartItem key={i} id={i} />
                )}
                <p className='total-cost'>Total: {Number(user.inCart.length*2.99).toLocaleString('en-AU', {style:'currency',currency:'AUD'})}</p>
                <div className='order-button'>
                    <button onClick={orderBtn} disabled={!user.inCart.length}>{btn}</button>
                </div>
                </> 
            }
        </main>
    )
}