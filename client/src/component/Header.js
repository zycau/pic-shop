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


export const Header = ()=>{
    const {user, logout} = useContext(picContext)
   
    return (
        <div>
            <Navbar color='dark' dark expand='sm' className='mb-3 fixed-top'>
                <Container style={{maxWidth: '100%'}}>
                    <NavbarText style={{fontSize: '1.5rem'}}>
                        <Link to='/'>Pic Shop</Link>
                    </NavbarText>
                    <Nav navbar className='ml-auto'>
                    {
                        user.email ?
                        <>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret className='mr-3 active'>
                                Welcome {user.name}
                            </DropdownToggle>
                            <DropdownMenu right>
                                <Link to='/favorite'>
                                    <DropdownItem style={{paddingLeft:10, display:'flex'}}>
                                        <i className="ri-heart-fill" style={{marginRight:10, color:'#EA453C'}}></i>
                                        My Favorite
                                    </DropdownItem>
                                </Link>
                                <Link to='/purchased'>
                                    <DropdownItem style={{paddingLeft:10, display:'flex'}}>
                                        <i className="ri-shopping-cart-fill" style={{marginRight:10, color:'#ACE6EC'}}></i>
                                        Purchased
                                    </DropdownItem>
                                </Link>
                                <DropdownItem divider />
                                <DropdownItem onClick={logout}>
                                    Logout
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <NavItem >
                            <Link to='/cart'>
                            {user.inCart.length ?
                                <i className="ri-shopping-cart-fill ri-fw ri-2x"></i> :
                                <i className="ri-shopping-cart-line ri-fw ri-2x"></i>
                            }
                            </Link>
                        </NavItem>
                        </> :
                        <>
                        <NavItem>
                            <NavLink className='active'>login</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className='active'>register</NavLink>
                        </NavItem>
                        </>
                    }                        
                    </Nav>
                    
                </Container>
            </Navbar>

            
        </div>
    )
}