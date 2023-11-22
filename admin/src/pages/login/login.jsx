import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/apicalls";

const Login = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const dispatch = useDispatch();

  const handleclick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };

  return (
    <div
      style={{
        height:"100vh",
        display: "flex",
        justifyContent: "center",
        flexDirection:"column",
        alignItems: "center",
      }}
    >
      <input
      style={{padding:10,marginBottom:20}}
        type="text"
        placeholder="username"
        onChange={(e) => setusername(e.target.value)}
      />
      <input
       style={{padding:"10px",marginBottom:"20px"}}
        type="text"
        placeholder="password"
        onChange={(e) => setpassword(e.target.value)}
      />
      <button onClick={handleclick} style={{padding:10,width:100}} >Login</button>
    </div>
  );
};

export default Login;
