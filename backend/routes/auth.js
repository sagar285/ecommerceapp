const router =require("express").Router();
const User =require("../models/User")
const CryptoJS =require("crypto-js")
const jwt =require("jsonwebtoken");

// REGISTER

router.post("/register",async(req,res)=>{
    const newUser = new User({
        username:req.body.username,
        email:req.body.email,
        password:CryptoJS.AES.encrypt(req.body.password,process.env.PASS_SEC).toString(),
    })
    try {
    const saveduser = await newUser.save();
       res.status(200).json(saveduser)
} catch (error) {
   res.status(500).json(error);    
}
})


// LOGIN
router.post("/login",async(req,res)=>{
    try{
        const user = await User.findOne({username:req.body.username});
        !user && res.status(401).json("Wrong Credentials");
        const hashpassword =CryptoJS.AES.decrypt(user.password,process.env.PASS_SEC);
        const Originalpassword =hashpassword.toString(CryptoJS.enc.Utf8);

        Originalpassword!==req.body.password && res.status(401).json("Wrong crednetials");

        const accessToken =jwt.sign({
            id:user._id,
            isAdmin:user.isAdmin,
        },process.env.JWT_SEC,{expiresIn:"3d"})

        const {password,...others}=user._doc;
        res.status(200).json({...others,accessToken});
    }

catch(err){
    
}
})


module.exports =router;