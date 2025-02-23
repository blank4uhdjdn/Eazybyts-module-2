const express=require('express')
const { handlePortfolio } = require('../controllers/handlePortfolioApi')

const router=express.Router()

router.post('/stock/buy',handlePortfolio)

module.exports=router