import React, {useContext, useState} from 'react'
import {Link} from 'react-router-dom'
import {picContext} from '../context/context'

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
    Container
} from 'reactstrap'

import {PublicHeader} from './PublicHeader'
import { LoginHeader } from './LoginHeader'


export const Header = ()=>{
    const {isAuthenticated} = useContext(picContext)
   
    return (
        <div>
            <Navbar color='dark' dark expand='sm' className='mb-3 fixed-top'>
                <Container style={{maxWidth: '100%'}}>
                    <NavbarText style={{fontSize: '1.5rem'}}>
                        <Link to='/'>Pic Shop</Link>
                    </NavbarText>
                    <Nav navbar className='ml-auto'>
                    {
                        isAuthenticated ?
                        <LoginHeader /> :
                        <PublicHeader />
                    }                        
                    </Nav>                    
                </Container>
            </Navbar>            
        </div>
    )
}