const express =require("express");
const {handleSignup, handleLogin, handleLogout} = require("../controllers/authapi");



const router=express.Router();

router.post('/login',handleLogin)
router.post('/signup',handleSignup)
router.post('/logout',handleLogout)

module.exports=router