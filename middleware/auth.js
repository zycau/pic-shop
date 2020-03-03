const jwt = require('jsonwebtoken')
const config = require('config')

const auth = (req, res, next)=>{
    const token = req.header('x-auth-token')

    if(!token){
        res.status(401).json({
            errType: 'noToken',
            msg: 'Unauthorised operation'
        })
    }else{
        jwt.verify(token, config.get('JWTkey'), (err, decode)=>{
            if(err){
                res.status(401).json({
                    errType: 'invalidToken',
                    msg: 'Invalid token'
                })
            }
            req.user = decode
            next()
        })
    }
}

module.exports = auth