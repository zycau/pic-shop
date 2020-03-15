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

export const RegisterModal = ()=>{
    const {register, err, isAuthenticated} = useContext(picContext)
    
    // Controlled form
    const [input, setInput] = useState({        
        email: '',
        name: '',
        password: '',
        passwordRepeat: ''
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
                password: '',
                passwordRepeat: ''
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
        
        const {email, name, password, passwordRepeat} = input
        
        // Front end validation
        if(password !== passwordRepeat){
            setModalStatus(prev=>({
                ...prev,
                msg: 'Please confirm the password'
            }))
        }else if(name.length<3){
            setModalStatus(prev=>({
                ...prev,
                msg: 'Your user name must be at least 3 characters long, only letters and digits allowed'
            }))
        }else if(password.length<6 || password.length>12){
            setModalStatus(prev=>({
                ...prev,
                msg: 'Your password must be 6 to 12 characters long'
            }))
        }else{
            register(email, name, password)
        }
        
    }

    return (
        <>
        <NavLink href='#' onClick={toggle}>Register</NavLink>
        <Modal isOpen={modalStatus.modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>
                Register
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

                        <Label for='name'>Name:</Label>
                        <Input 
                            type='text'
                            name='name'
                            id='name'
                            placeholder='Mike'
                            onChange={onChange}
                            value={input.name}
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

                        <Label for='passwordRepeat'>Confirm Password:</Label>
                        <Input 
                            type='password'
                            name='passwordRepeat'
                            id='passwordRepeat'                            
                            onChange={onChange}
                            value={input.passwordRepeat}
                            className='mb-3'
                        />

                        <Button color='dark' block>Register</Button>
                    </FormGroup>
                </Form>
            </ModalBody>

        </Modal>
        </>
    )
}