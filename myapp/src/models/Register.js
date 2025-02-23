import React, { useState } from 'react';
import axios from 'axios';
import "../App.css"
import {useNavigate} from "react-router-dom"

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
const navigate = useNavigate();
    const Submit = async (e)=>{

        try{
            e.preventDefault()
            if(password !== confirmpassword)
                alert("Password and Confirm Password do not match");
            if(email==='' || password==='' || username==='' || confirmpassword==='')
                alert("Please fill all the fields");
            else{
                
            
            
                const Data = {
                    username: username,
                    email: email,
                    password: password,
                    confirmpassword: confirmpassword
                }
    
                const sendData = await axios.post("https://auth-backend-plum.vercel.app/register",Data)

                if(sendData.status === 200)
                {
                    navigate("/login")
                }

                // console.log(sendData)
             

                 
                
                
                // console.log(sendData.response);
            }

        }
        catch(err){
            alert(err.response.data);
        }
    
    }






    return (<div>
        <center>
       
        <form onSubmit={Submit}>
        <h1>Register</h1>
            <div>
                <label>Username</label>
                <input type="text" name="username" autoComplete="off" placeholder='Enter your username' onChange={(e)=>{setUsername(e.target.value)}} />
            </div>
            <div>
                <label>Email</label>
                <input type="email" name="email" autoComplete='off' placeholder='Enter your Email' onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>
            <div>
                <label>Password</label>
                <input type="password" name="password" autoComplete='off'placeholder='Enter your password'   onChange={(e)=>{setPassword(e.target.value)}}/>
            </div>
            <div>
                <label>Confirm Password</label>
                <input type="password" name="confirmpassword" autoComplete='off' placeholder='Enter your password again'  onChange={(e)=>{setConfirmpassword(e.target.value)}}></input>
            </div>
            <button type="submit">Register</button>
        </form>
        </center>
    </div>  );
}

export default Register;
