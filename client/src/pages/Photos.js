import React, {useContext} from 'react'
import {Image} from '../component/Image'
import {picContext} from '../context/context'
import {getClass} from '../util/util'


export const Photos = ({showPics})=>{
    const {pics, user} = useContext(picContext)
    console.log(user.favorite, user.haveBought)
    return (
        <main className="photos">
            {   showPics === 'all' &&
                pics.map((i,ind)=>
                    <Image img={i}  key={i._id} className={getClass(ind)} />  
                )
            }
            {   (user.email && showPics === 'favorite') &&
                pics.filter(i=>user.favorite.includes(i._id)).map((i,ind)=>
                    <Image img={i}  key={i._id} />  
                )
            }
            {   (user.email && showPics === 'purchased') &&
                pics.filter(i=>user.haveBought.includes(i._id)).map((i,ind)=>
                    <Image img={i}  key={i._id} />  
                )
            }
        </main>
    )
}

 