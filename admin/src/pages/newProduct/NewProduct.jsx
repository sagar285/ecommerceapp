import { useState } from "react";
import "./newProduct.css";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
import { addproducts } from "../../redux/apicalls";
import { useDispatch } from "react-redux";

export default function NewProduct() {
    const [inputs,setinputs]=useState({})
    const [file,setfile]=useState(null)
    const [cat,setcat]=useState([])
    const dispatch =useDispatch();


     const handlechange =(e)=>{
      setinputs(prev=>{
        return {...prev,[e.target.name]:e.target.value}
      })
     }

     const handlecategory=(e)=>{

      setcat(e.target.value.split(","));

     }
     const handleclick=(e)=>{
         e.preventDefault();
        const fileName =new Date().getTime() +file.name;
        const storage =getStorage(app);
        const storageRef =ref(storage,fileName)
       
        const uploadTask = uploadBytesResumable(storageRef, file);

// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
        default:
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      const product ={...inputs,img:downloadURL,categories:cat}
      addproducts(product,dispatch)
    });
  }
);



     }
       




  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="file" onChange={e=>setfile(e.target.files[0])} />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input type="text" name="title" placeholder="Apple Airpods" onChange={handlechange} />
        </div>
        <div className="addProductItem">
          <label>Desc</label>
          <input type="text" name="desc" placeholder="description" onChange={handlechange} />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input type="number" name="price" placeholder="100" onChange={handlechange} />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input type="text" placeholder="jeans,skirt" onChange={handlecategory}/>
        </div>
        <div className="addProductItem">
          <label>Stock</label>
         <select name="inStock" onChange={handlechange}>
          <option value="true">Yes</option>
          <option value="false">No</option>
         </select>
        </div>
        <button onClick={handleclick} className="addProductButton">Create</button>
      </form>
    </div>
  );
}
