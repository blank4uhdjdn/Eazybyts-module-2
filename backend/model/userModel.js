const mongoose=require('mongoose')
const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true

    },
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true

    },
    confirmPassword:{
        type:String,

    },
    accountBalance: { 
        type: Number,
         default: 50000 }

},{timestamps:true})

const StockUser=mongoose.model("User",userSchema);

module.exports=StockUser
