import React, {createContext,useState, useEffect} from 'react'
import axios from 'axios'
// import * as data from '../data/pic.json'

export const picContext = createContext()

export const PicProvider = ({children})=>{        
    // Define the states
    const [pics, setPics] = useState([])
    
    const [isLoading, setIsLoading] = useState(false)

    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const [user, setUser] = useState({})

    const [err, setErr] = useState({
        msg: '',
        status: ''
    })    

    // User actions
    // Get all pics and auth the user
    useEffect(()=>{
        setIsLoading(true)

        // Get all pics
        axios.get('/api/pics')
            .then(res=>setPics(res.data))
            .then(()=>setIsLoading(false))
            .catch(err=>setErr({
                ...err,
                status: err.response.status
            }))
        
        // If token exists, auth the user
        if(localStorage.getItem('token')){
            const config = {
                headers: {
                    "x-auth-token": localStorage.getItem('token')
                }
            }
            axios.get('/api/user', config)
                .then(res=>{
                    setUser(res.data)
                    setIsAuthenticated(true)
                })
                .catch(err=>{
                    localStorage.removeItem('token')
                    setErr({
                        status: err.response.status,
                        msg: err.response.msg
                    })
                })     
        }           
    }, [])    
    
    // User actions
    const toggleFavor = (id)=>{        
        // Define headers and body
        const config = {
            headers: {
                "Content-type": "application/json",
                "x-auth-token": localStorage.getItem('token')
            }
        }

        const body = JSON.stringify({
            'toggleFavorite': id
        })
        
        // modify db, let server to judge if it should add or remove item
        axios.put('/api/user', body, config)
            .then(res=>{                
                setUser(prev=>({
                    ...prev,
                    favorite: res.data
                }))
            })
            .catch(err=>{
                console.log(err.response.data)
                setErr({
                    status: err.response.status,
                    msg: err.response.data.msg
                })
            })           
    }    

    const toggleCart = (id)=>{
        // Define headers and body
        const config = {
            headers: {
                "Content-type": "application/json",
                "x-auth-token": localStorage.getItem('token')
            }
        }
        const body = JSON.stringify({
            'toggleInCart': id
        })

        // modify db, let server to judge if it should add or remove item
        axios.put('/api/user', body, config)
            .then(res=>{
                setUser(prev=>({
                    ...prev,
                    inCart: res.data
                }))
            })
            .catch(err=>{
                setErr({
                    status: err.response.status,
                    msg: err.response.msg
                })
            })        
    }
    
    const placeOrder = ()=>{
        // Define headers and body
        const config = {
            headers: {
                "Content-type": "application/json",
                "x-auth-token": localStorage.getItem('token')
            }
        }
        const body = JSON.stringify({
            'addHaveBought': user.inCart
        })

        // Modify DB, add items in cart to haveBought
        axios.put('/api/user', body, config)
            .then(res=>{
                setUser(res.data)
            })
    }

    
    // User account
    const register = (email, name, password)=>{
        
        // Define headers and body
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }

        const body = JSON.stringify({email, name, password})

        axios.post('/api/user/register', body, config)
            .then(res=>{
                // Store token in local storage
                localStorage.setItem('token', res.data.token)
                setUser(res.data.user)
                setIsAuthenticated(true)
                setErr({                   
                    msg: '',
                    status: ''                    
                })
            })
            .catch(err=>{
                setErr({
                    status: err.response.status,
                    msg: err.response.data.msg
                })                
            })
    }

    const login = (email, password)=>{
        // Define headers and body
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }

        const body = JSON.stringify({email, password})
        
        axios.post('/api/user', body, config)
            .then(res=>{
                // Store token in local storage
                localStorage.setItem('token', res.data.token)
                console.log(res.data.user)
                
                setUser(res.data.user)
                setIsAuthenticated(true)
                setErr({                   
                    msg: '',
                    status: ''                    
                })

                console.log(res.data.user.favorite.includes('123'))
            })            
            .catch(err=>{                            
                localStorage.removeItem('token')
                setErr({
                    status: err.response.status,
                    msg: err.response.data.msg
                })
            })
    }

    const logout = ()=>{
        // delete token in local storage
        localStorage.removeItem('token')
        setIsAuthenticated(false)
        setUser({})
    }

    // Admin actions
    // Add picture
    const addPic = (pic)=>{
        // Define headers and body
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
        <picContext.Provider value={{pics, user, isLoading, isAuthenticated, err, toggleFavor, toggleCart, placeOrder, register, login, logout, addPic}}>
            {children}
        </picContext.Provider>
    )
}
