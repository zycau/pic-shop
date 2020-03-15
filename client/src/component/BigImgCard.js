import React, {useContext} from 'react'
import {picContext} from '../context/context'
import {
    Card,
    CardImg, 
    CardText, 
    CardBody,
    CardTitle, 
    CardSubtitle, 
    Button,
    Badge
  } from 'reactstrap'

export const BigImgCard = ({url, tag})=>{
    const {user} = useContext(picContext)
    return (
        <Card style={{maxWidth: 1000, margin: 'auto'}}>
            <CardImg top width="80%" src={url} alt="Welcome to pic-shop" style={{maxWidth: 800, margin: '10px auto 0'}} />
            <CardBody>
                <CardText>
                    {tag.map((i, ind)=>
                        <Badge color='primary' key={ind}>{i}</Badge>
                    )}
                </CardText>
                <Button>Button</Button>
            </CardBody>
        </Card>
    )
}