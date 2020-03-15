import React, {useContext} from 'react'
import {Image} from '../component/Image'
import {picContext} from '../context/context'
import {getClass} from '../util/util'
import { Redirect } from 'react-router-dom'


export const Photos = ({showPics})=>{
    const {pics, user} = useContext(picContext)
 
    return (
        <main className="photos">
            {Object.keys(user).length===0 &&
                <Redirect to='/' />
            }
            {   showPics === 'all' &&
                pics.map((i,ind)=>
                    <Image img={i}  key={i._id} className={getClass(ind)} />  
                )
            }
            {   (user.email && showPics === 'favorite') &&
                pics.filter(i=>user.favorite.includes(i._id)).map(i=>
                    <Image img={i}  key={i._id} />  
                )
            }
            {   (user.email && showPics === 'purchased') &&
                pics.filter(i=>user.haveBought.includes(i._id)).map(i=>
                    <Image img={i}  key={i._id} />  
                )
            }
        </main>
    )
}

 