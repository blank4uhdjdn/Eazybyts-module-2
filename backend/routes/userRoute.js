const express=require('express')
const { handleGetProfile } = require('../controllers/handleFetchUser')


const router=express.Router()

router.get('/user/:userId',handleGetProfile)

module.exports=router