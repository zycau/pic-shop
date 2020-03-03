const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')

const User = require('../../model/User')
const auth = require('../../middleware/auth')
const regExp = require('../../util/regExp')

const router = express.Router()

// GET api/user
// Get user information
// Private user
router.get('/', auth, (req, res)=>{
    const {id} = req.user
    User.findById(id)
        .select('-password')
        .then(user=>{
            res.json(user)
        })
        .catch(err=>{
            if(err) throw err
        })
})

// POST api/user
// Add new user (register)
// Public
router.post('/register', (req, res)=>{
    const {email, name, password} = req.body
    
    // Validation
    const {emailReg, nameReg, passwordReg} = regExp

    if(!emailReg.test(email)){
        res.status(400).json({
            errType: 'regEmail',
            msg: 'Please input a valid email address'
        })
    }else if(!nameReg.test(name)){
        res.status(400).json({
            errType: 'regName',
            msg: 'Your user name must be at least 3 characters long, only letters and digits allowed'
        })
    }else if(!passwordReg.test(password)){
        res.status(400).json({
            errType: 'regPassword',
            msg: 'Your password must be 6 to 12 characters long'
        })
    }
    
    // Register
    else{
        User.findOne({email})
        .then(user=>{
            // If user exists
            if(user){
                res.status(400).json({
                    errType: 'userExists',
                    msg: 'User exists'
                })
            }else{
                const newUser = new User({
                    email,
                    name
                })
                bcrypt.genSalt(10, (err, salt)=>{
                    if(err) throw err
                    bcrypt.hash(password, salt, (err, hash)=>{
                        if(err) throw err
                        newUser.password = hash
                        newUser.save()
                            .then(user=>{
                                jwt.sign(
                                    {id: user._id},
                                    config.get('JWTkey'),
                                    {expiresIn: '1h'},
                                    (err,token)=>{
                                        if(err) throw err
                                        res.json({
                                            token,
                                            user: {
                                                id: user._id,
                                                email: user.email,
                                                name: user.name,
                                                favorite: user.favorite,
                                                inCart: user.inCart,
                                                haveBought: user.haveBought,
                                                isAdmin: user.isAdmin
                                            }
                                        })
                                    }                                    
                                )
                            })
                    })
                })
            }
        })
    }
})

// POST api/user
// Login
// Public
router.post('/', (req, res)=>{
    const {email, password} = req.body

    if(!email || !password){
        res.json({
            errType: 'emptyField',
            msg: 'Please enter all the fields'
        })
    }else{
        User.findOne({email})
            .then(user=>{
                if(!user){
                    res.status(400).json({
                        errType: 'userNotExist',
                        msg: 'Invalid email or password'
                    })
                }else{
                    bcrypt.compare(password, user.password)
                        .then(match=>{
                            if(!match){
                                res.status(400).json({
                                    errType: 'invalidPsw',
                                    msg: 'Invalid email or password'
                                })
                            }else{
                                jwt.sign(
                                    {id: user._id},
                                    config.get('JWTkey'),
                                    {expiresIn: '1h'},
                                    (err, token)=>{
                                        if(err) throw err
                                        res.json({
                                            token,
                                            user: {
                                                id: user._id,
                                                email: user.email,
                                                name: user.name,
                                                favorite: user.favorite,
                                                inCart: user.inCart,
                                                haveBought: user.haveBought,
                                                isAdmin: user.isAdmin
                                            }
                                        })
                                    }
                                )
                            }
                        })
                }
            })
    }
})

// PUT api/user
// Modify favorite, inCart, haveBought
// Private user
router.put('/', auth, (req, res)=>{
    const {favorite, inCart, haveBought} = req.body
    const {id} = req.user

    if(favorite){        
        User.findByIdAndUpdate(id, {"favorite": favorite}, {new: true}, (err, updated)=>{
            if(err){
                res.status(500).json({
                    errType: 'updateFail',
                    msg: 'Could not update favorite pics'
                })
            }           
            res.json(updated.favorite)
        })        
    }
    if(inCart){
        User.findByIdAndUpdate(id, {"inCart": inCart}, {new: true}, (err, updated)=>{
            if(err){
                res.status(500).json({
                    errType: 'updateFail',
                    msg: 'Could not update cart items'
                })
            }           
            res.json(updated.inCart)
        })  
    }
    if(haveBought){
        User.findByIdAndUpdate(id, {"haveBought": haveBought}, {new: true}, (err, updated)=>{
            if(err){
                res.status(500).json({
                    errType: 'updateFail',
                    msg: 'Could not place order'
                })
            }           
            res.json(updated.haveBought)
        })  
    }
})

module.exports = router