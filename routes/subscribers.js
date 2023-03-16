const express = require(`express`)
const router = express.Router()
//const user = require('../models/user')

//CREATE ROUTES
//getting routes for all subscribers
router.get('/', (req, res) => {
    res.send('Hello World')
    // try{
    //     const user = await user.find()
    //     res.json(user)

    // } catch (err){
    //     res.status(500).json({ message: err.message })
    // }
})


//getting one subscriber by its ID , to do: populate thought and friend data
router.get('/:id', (req, res) => {
    
})

//creating one subscriber using POST route
router.post('/', (req, res) => {

})

//updating one subscriber
router.patch('/:id', (req, res) => {

})
//deleting one subscriber
router.delete('/:id', (req,res) => {

})



module.exports = router