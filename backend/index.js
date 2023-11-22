 const express =require("express");
 const app = express();
  const mongoose =require("mongoose");
  const dotenv =require("dotenv")
  const userroute =require("./routes/user")
  const authroute =require("./routes/auth")
  const productroute =require("./routes/product")
  const cartroute =require("./routes/cart")
  const orderroute =require("./routes/order")
  const paymentroute =require("./routes/stripe")
  const cors =require("cors");

  app.use(
     cors()
      )
      app.use(express.json());


  app.use("/api/auth",authroute);
  app.use("/api/checkout/",paymentroute);
  app.use("/api/carts",cartroute);
  app.use("/api/orders",orderroute);
  app.use("/api/products",productroute);
  app.use("/api/users",userroute);

  dotenv.config();

  mongoose.connect(process.env.MONGO_URL).then(()=>console.log("db connection succesful")).catch((error)=>{console.log(error)})







 app.listen(5000,()=>{
    console.log("backend server is runing")
 })