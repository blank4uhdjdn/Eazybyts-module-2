const express = require('express');
const app = express();
const dotenv=require("dotenv");
const path=require("path")

dotenv.config()

const port=process.env.PORT||8000
const connectToMongodb = require('../database/connetToMongoDB');
const StockUser =require('./model/userModel')
const PortfolioUser=require('./model/portfolioModel')
const apiRoute=require('./routes/apiRoute')
const authRoute=require('./routes/authRoute')
const portfolioRoute=require('./routes/portfolioRoute')
const userRoute=require('./routes/userRoute')





app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/api",apiRoute)
app.use("/api",authRoute)
app.use("/api",portfolioRoute)
app.use("/api",userRoute)

app.use(express.static(path.join(__dirname,"../frontend/dist")))

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"))

})



app.listen(port,()=>{
    connectToMongodb()
    console.log(`the server is listening at the port ${port}`);
})