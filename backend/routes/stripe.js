const dotenv =require("dotenv")
dotenv.config();
const router =require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY)

YOUR_DOMAIN="http://localhost:5173"


router.post("/payment",async(req,res)=>{
    console.log("newrequest");
    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        mode: 'payment',
        line_items: req.body.items.map(item=>{
            return {
                price_data:{
                    currency:"inr",
                    product_data:{
                        name:item.name
                    },
                    unit_amount:(item.price)*100,
                },
                quantity:item.quantity
            }
        }),
        success_url: `${YOUR_DOMAIN}/success`,
        cancel_url: `${YOUR_DOMAIN}/`,
      });
      res.json({url: session.url})
})




module.exports =router;