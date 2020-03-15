import React, {useContext} from 'react'
import {
    UncontrolledDropdown, 
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavItem
} from 'reactstrap'
import {Link} from 'react-router-dom'
import {picContext} from '../context/context'

export const LoginHeader = ()=>{
    const {user, logout} = useContext(picContext)

    return (
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
        </>
    )
}