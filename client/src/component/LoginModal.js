import React, {useState, useEffect, useContext} from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup, 
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap'
import {picContext} from '../context/context'

export const LoginModal = ()=>{
    const {login, err, isAuthenticated} = useContext(picContext)
    
    // Controlled form
    const [input, setInput] = useState({        
        email: '',
        password: ''        
    })

    // Modal open and error msg
    const [modalStatus, setModalStatus] = useState({
        modal: false,
        msg: ''
    })
   
    useEffect(()=>{
        // Get error msg from server, and show it
        if(err.msg !== '' && err.msg !== modalStatus.msg){
            setModalStatus(prev=>({
                ...prev,
                msg: err.msg
            }))
        }

        // If authenticated, close the modal
        if(isAuthenticated){
            toggle()
            setInput({
                email: '',
                name: '',
                password: ''
            })
        }
    }, [err.msg, isAuthenticated])

    const toggle = ()=>{
        setModalStatus(prev=>({
            modal: !prev.modal,
            msg: ''
        }))
    }

    const onChange = e=>{
        const {name, value} = e.target
        setInput(prev=>({
            ...prev,
            [name]: value
        }))
    }

    // Implement register
    const onSubmit = e=>{
        e.preventDefault()
        
        const {email, password} = input
        
        // Front end validation
        if(password.length===0 || email.length===0){
            setModalStatus(prev=>({
                ...prev,
                msg: 'Please fill all the fields'
            }))
        }else{
            login(email, password)
        }        
    }

    return (
        <>
        <NavLink href='#' onClick={toggle}>Login</NavLink>
        <Modal isOpen={modalStatus.modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>
                Login
            </ModalHeader>
            <ModalBody>
                {modalStatus.msg && 
                    <Alert color='danger'>{modalStatus.msg}</Alert>
                }
                <Form onSubmit={onSubmit}>
                    <FormGroup>
                        <Label for='email'>Email:</Label>
                        <Input 
                            type='email'
                            name='email'
                            id='email'
                            placeholder='mike@gmail.com'
                            onChange={onChange}
                            value={input.email}
                            className='mb-3'
                        />
                        
                        <Label for='password'>Password:</Label>
                        <Input 
                            type='password'
                            name='password'
                            id='password'                            
                            onChange={onChange}
                            value={input.password}
                            className='mb-3'
                        />
                        
                        <Button color='dark' block>Login</Button>
                    </FormGroup>
                </Form>
            </ModalBody>

        </Modal>
        </>
    )
}