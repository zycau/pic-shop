const express = require('express')

const Pic = require('../../model/Pic')

const router = express.Router()

// GET api/pics
// Get all pics
// Public
router.get('/', (req, res)=>{
    Pic.find()
        .sort({date: -1})
        .then(pics=>res.json(pics))
        .catch(err=>res.status(404).json({success: false}))
})

// POST api/pics
// Add new pic
// Private Admin
router.post('/', (req, res)=>{
    const newPic = new Pic({
        url: req.body.url,
        tag: req.body.tag,
        isShown: true
    })

    newPic.save()
        .then(pic=>res.json(pic))
        .catch(err=>res.json({success: false}))
})

// PUT api/pics/:id
// Update a pic
// Private Admin
router.put('/:id', (req, res)=>{
    Pic.findById(req.params.id)
        .then(pic=>pic.update({
            "url": req.body.url,
            "tag": req.body.tag,
            "isShown": req.body.isShown
        }))
        .then(()=>res.json({success: true}))
        .catch(err=>res.status(404).json({success: false}))        
})

// DELETE api/pics/:id
// Delete a pic
// Private Admin
// Disabled for now
router.delete('/:id', (req,res)=>{
    Pic.findById(req.params.id)
        .then(pic=>pic.remove())
        .then(()=>res.json({success: true}))
        .catch(err=>res.status(404).json({success: false}))
})

module.exports = router