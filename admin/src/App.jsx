import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import {BrowserRouter as Router,Routes,Route, Navigate} from "react-router-dom"
import Login from "./pages/login/login";
import { useSelector } from "react-redux";
const App = () => {
  let admin = useSelector((state) => state?.user?.currentUser?.isAdmin);
  return (
    <div>
      <Router>
               { admin ? (
                <>
               <Topbar/>
              <div className="container">
                <Sidebar/>  
              <Routes>
                 <Route path="/" element={<Home/>}/>
                 <Route path="/users" element={<UserList/>}/>
                 <Route path="/user/:userId" element={<User/>}/>
                 <Route path="/newUser" element={<NewUser/>}/>
                 <Route path="/products" element={<ProductList/>}/>
                 <Route path="/product/:productId" element={<Product/>}/>
                 <Route path="/newproduct" element={<NewProduct/>}/>  
          </Routes>
                </div> 
                </>
                ):(
             <Routes>
                    <Route path="/login" element={admin ? <Navigate replace={"/"}/> : <Login/>}/>
             </Routes>
                )}       
                
          </Router>   
    </div>
  )
}

export default App