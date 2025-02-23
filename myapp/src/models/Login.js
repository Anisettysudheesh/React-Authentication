import React, { useContext, useState } from 'react';
import axios from 'axios';
import "../App.css";
import {store} from "../App.js"
import { useNavigate} from "react-router-dom";

function Login() {
   
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useContext(store);
    const navigate = useNavigate();
 
    const Submit = async (e)=>{

        try{
            e.preventDefault()
            if(email==='' || password==='')
                alert("Please fill all the fields");
            else{
                
            
            
                const Data = {
                   
                    email: email,
                    password: password
                   
                }
    
                const sendData = await axios.post("http://localhost:5000/login", Data);
                setToken(sendData.data.token);

                if(token)
                    navigate('/dashboard');
                
                
           
            }

        }
        catch(err){
            alert(err.response.data)
        }
    
    }






    return <div>
        <center>
        
        <form onSubmit={Submit}>
        <h1>Login</h1>
         
            <div>
                <label>Email</label>
                <input type="email" name="email" autoComplete='off' placeholder='Enter your Email' onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>
            <div>
                <label>Password</label>
                <input type="password" name="password" placeholder='Enter your password' autoComplete="off"  onChange={(e)=>{setPassword(e.target.value)}}/>
            </div>
           
            <button type="submit">Register</button>
        </form>
        </center>
    </div>  ;
}

export default Login;