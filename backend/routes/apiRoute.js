const express =require("express");
const handleStockApi = require("../controllers/handleStockApi");


const router=express.Router();

router.get('/stockData',handleStockApi)



module.exports=router