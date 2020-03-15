import React from 'react'
import {Container, Spinner} from 'reactstrap'

export const LoadingText = ()=>{
    return (
        <Container style={{marginTop: 100}}>
            <Spinner />
        </Container>
    )
}