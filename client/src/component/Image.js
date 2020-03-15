import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import {useHover} from '../hooks/useHover'

import {picContext} from '../context/context'
import {Link} from 'react-router-dom'

export const Image = ({className,img})=>{
    const {toggleFavor,toggleCart,user,isAuthenticated} =useContext(picContext)
    
    const [hovered, on, off] = useHover(false)
    
    return (        
        <div 
            className={`image-container ${className}`}
            onMouseEnter={on}
            onMouseLeave={off}
        >
            <Link to={`/${img._id}`}>
                <img src={img.url} className='image-grid' alt='there is a beauty'/>
            </Link>
            {
                isAuthenticated && 
                    (user.favorite.includes(img._id) ? 
                        <i className="ri-heart-fill favorite" onClick={()=>toggleFavor(img._id)}></i> :
                        hovered && <i className="ri-heart-line favorite" onClick={()=>{toggleFavor(img._id)}}></i>
                    )
            }
            {
                isAuthenticated && 
                    (!user.haveBought.includes(img._id) && 
                        (user.inCart.includes(img._id) ?
                            <i className="ri-shopping-cart-fill cart" onClick={()=>toggleCart(img._id)}></i>:
                            hovered && <i className="ri-add-circle-line cart" onClick={()=>toggleCart(img._id)}></i>)
                    )
            } 
        </div>
        
    )
}

Image.propTypes = {
    className: PropTypes.string,
    img: PropTypes.shape({
        url: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
        tag: PropTypes.array.isRequired,
        isShown: PropTypes.bool.isRequired
    })
}

