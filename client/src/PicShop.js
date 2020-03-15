import React, {useContext} from 'react'
import './style/style.css'
import {Header} from './component/Header'
import {Photos} from './pages/Photos'
import {Cart} from './pages/Cart'
import {BigPic} from './pages/BigPic'
import {LoadingText} from './component/LoadingText'
import {picContext} from './context/context'

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

export const PicShop = ()=>{
    const {isLoading} = useContext(picContext)
    return (
        
            <Router>                
                <div>
                    <Header />
                    {!isLoading ? 
                    <Switch>
                        <Route path='/' exact>
                            <Photos showPics={'all'} />
                        </Route>
                        <Route path='/favorite'>
                            <Photos showPics={'favorite'} />
                        </Route>
                        <Route path='/purchased'>
                            <Photos showPics={'purchased'} />
                        </Route>
                        <Route path='/cart'>
                            <Cart />
                        </Route>
                        <Route path='/:id'>
                            <BigPic />
                        </Route> 
                    </Switch> :
                    <LoadingText />                
                }
                </div>       
            </Router>       
        
    )
}

