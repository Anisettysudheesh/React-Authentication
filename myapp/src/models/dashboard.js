import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import {store} from "../App"

function Dashboard() {
    const[token]=useContext(store)
    const [data,setData]= useState(null)
    const navigate=useNavigate()
    const userId = localStorage.getItem('userId');
    const storedToken = localStorage.getItem('token');
    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    useEffect( ()=>{
        const fetchData = async () => {
            try{
                const res = await axios.get("https://auth-backend-roan.vercel.app/dashboard",{
                    headers:{
                        "x-token":storedToken,
                        "x-user-id":userId
                    }
                })
                setData(res.data)
                console.log(res.data)
            }
            catch(err)
            {
                console.log(err)
            }
        };
        fetchData();
    }, [storedToken,userId])


    return ( 
        <div>
      
           {
                data &&
                 <center>
                <h1>Welcome {data.username}</h1>
                 </center>
           }
        
         
           

        
        </div>
       
    
   
       
    );
}

export default Dashboard;
