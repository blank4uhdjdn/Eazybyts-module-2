const jwt=require("jsonwebtoken")
const generateTokenAndSetCookie=(userid,res)=>{
    const token=jwt.sign({userid},process.env.JWT_SECRET,{
        expiresIn:"15d",
    })
    res.cookie("jwt",token,{
        maxAge:15*24*60*60*1000,//  MS
        httpOnly:true, // prevent xss attacks or cross site scripiting attack
        sameSite:"strict",
        secure:process.env.NODE_ENV!=="development",

    })

}
module.exports={
    generateTokenAndSetCookie
}