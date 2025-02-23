const bcrypt=require("bcryptjs")
const StockUser = require("../model/userModel")
const{generateTokenAndSetCookie}=require("../utils/generateJwtTtoken")



const handleLogin=async(req,res)=>{
    try {
        const {userName,password}=req.body
        if(!userName||!password){
            return res.status(400).json({message:"Please enter both username and password"})
        }
            const user=await StockUser.findOne({userName})
            if(!user){
                return res.status(400).json({message:"User not found"})
            }

                const isValidPassword=await bcrypt.compare(password,user.password)
                if(!isValidPassword){
                    return res.status(400).json({message:"Invalid password"})
                }
                generateTokenAndSetCookie(user._id,res)
            
            return res.status(200).json({
                _id:user._id,
                userName:user.userName,
                fullName:user.fullName


            })
            
        
        
    } 
    catch (error) {
        console.log("error in handleLogin method")
        res.status(500).json({message:"Internal server error",error:error.message})
        
    }
   
}

const handleSignup =async(req,res)=>{
    try {
        const {fullName,userName,email,password,confirmPassword} = req.body
        // console.log(fullName,userName,email,password,confirmPassword)
        if(!fullName||!userName||!email||!password||!confirmPassword){
            return res.status(400).json({message:"Please enter all fields"})

        }
        if(password!==confirmPassword){
            return res.status(400).json({message:"Passwords do not match"})

        }
        const user=await StockUser.findOne({userName})
        if(user){
            return res.status(400).json({message:"User already exists"})
        }
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)

        const newUser=new StockUser({
            fullName:fullName,
            userName:userName,
            email:email,
            password:hashedPassword
        })
        if(newUser){
            await newUser.save()
            res.status(200).json({
                id:newUser._id,
                fullName:fullName,
                userName:userName,
                password:hashedPassword
            })
            
            }
            else{
                res.status(400).json({error:"invalid user data "})
            }
        }
     
     catch (error) {
        console.log("error in singup controller",error.message)
        res.status(500).json({error:"internal server error"})
        
    }
}

const handleLogout=async(req,res)=>{
    try {
        
            res.cookie("jwt","",{maxAge:0})
            res.status(200).json({message:"logged out successfully"})
         
        
    } catch (error) {
        console.log("error in logout controller",error.message)
        res.status(500).json({error:"internal server error"})
        
    }
}

module.exports={handleLogin,handleSignup,handleLogout}
