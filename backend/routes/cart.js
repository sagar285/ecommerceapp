const Cart = require("../models/Cart");
const { verifytoken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const CryptoJS = require("crypto-js");

const router = require("express").Router();

// CREATE

router.post("/",verifytoken,async(req,res)=>{
    
    const newCart =new Cart(req.body);
    try{

        const saveCart = await newCart.save();
        res.status(200).json(saveCart)

    }catch(error){
        res.status(500).json(error);
    }


})


router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
 
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedCart);


  } catch (error) {
    return res.status(500).json(err);
  }
});


// DELETE
router.delete("/:id",verifyTokenAndAuthorization,async(req,res)=>{
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart has been deleted....");
        
    } catch (error) {
        res.status(500).json(error);
    }
})

// GET CART
router.get("/find/:id",verifyTokenAndAuthorization,async(req,res)=>{
    try {
       const Cart= await Cart.findOne({userId:req.params.id});
        res.status(200).json(Cart);
        
    } catch (error) {
        res.status(500).json(error);
    }
})

router.get("/",verifyTokenAndAdmin,async(req,res)=>{
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
        
    } catch (error) {
        res.status(500).json(err);
    }
})




module.exports = router;
