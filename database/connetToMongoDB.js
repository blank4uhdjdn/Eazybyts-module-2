const mongoose =require("mongoose")


const connectToMongodb=async(req , res)=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("connected to mongodb")
        
    } catch (error) {
        console.log(`error in connectig to the database ${error}`)
    }
}
module.exports=connectToMongodb;
