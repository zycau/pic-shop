import React from 'react'
import {NavItem} from 'reactstrap'
import {RegisterModal} from './RegisterModal'
import {LoginModal} from './LoginModal'

export const PublicHeader = ()=>{
    return (
        <>        
        <NavItem>
            <RegisterModal />
        </NavItem>
        <NavItem>
            <LoginModal />
        </NavItem>
        </>
    )
}