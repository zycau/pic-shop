import React, {createContext,useState, useEffect} from 'react'
import axios from 'axios'
// import * as data from '../data/pic.json'

export const picContext = createContext()

export const PicProvider = ({children})=>{        
    // Define the states
    const [pics, setPics] = useState([])
    
    const [user, setUser] = useState({
        name: 'aaa',
        email: 'aaa@gmail.com',
        favorite: [],
        inCart: [],
        haveBought: []
    })

    const [err, setErr] = useState({
        msg: '',
        status: ''
    })

    // const [cartItem, setCartItem] = useState([])

    // User actions
    // Get all pics and auth the user
    useEffect(()=>{
        axios.get('/api/pics')
            .then(res=>setPics(res.data))
            .catch(err=>setErr({
                ...err,
                status: err.response.status
            }))        
        
    }, [])
    
    const toggleFavor = (id)=>{        
        // modify db
        
        setUser(prev=>({
            ...prev,
            favorite: prev.favorite.includes(id) ? 
                        prev.favorite.filter(i=>i!==id) :
                        [...prev.favorite, id]
        }))       
    }
    // new Promise(resolve=>{
    //         toggleFavor('5e59d2a1a76aec1c90700261')
    //         resolve('finish')
    //     }).then((data)=>console.log(user,data))

    const toggleCart = (id)=>{
        // modify db
        
        setUser(prev=>({
            ...prev,
            inCart: prev.inCart.includes(id) ?
                    prev.inCart.filter(i=>i!==id) :
                    [...prev.inCart, id]
        }))
    }

    // const outCart = (id)=>{
    //     setCartItem(prev=>
    //         prev.filter(i=>i.id!==id)
    //     )
    // }
    
    const placeOrder = ()=>{
        // modify db

        setUser(prev=>({
            ...prev,
            haveBought: prev.haveBought.concat(prev.inCart),
            inCart: []
        }))
    }

    const logout = ()=>{
        // delete token in local storage


        setUser({})
    }

    // Admin actions
    // Add picture
    const addPic = (pic)=>{
        const body = JSON.stringify(pic)
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }

        axios.post('/api/pics', body, config)
            .then(pic=>{
                setPics([
                    ...pics,
                    pic
                ])
            })        
    }


    return (
        <picContext.Provider value={{pics, user, err, toggleFavor, toggleCart, placeOrder, logout, addPic}}>
            {children}
        </picContext.Provider>
    )
}
