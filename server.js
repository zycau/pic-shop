const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const config = require('config')

const pics = require('./routes/api/pics')
const user = require('./routes/api/user')

const app = express()

// Body parser
app.use(express.json())


// Connect to database
const db = config.get('MongoURI')
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>console.log('DB connected'))
    .catch(err=>err)

// Routes
app.use('/api/pics', pics)
app.use('/api/user', user)

// PORT
const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log('Server running')
})
