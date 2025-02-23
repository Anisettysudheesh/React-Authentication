import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import {store} from "../App"

function Dashboard() {
    const[token]=useContext(store)
    const [data,setData]= useState(null)
    const navigate=useNavigate()
    if(!token)
        navigate('/login')

    useEffect( ()=>{
        const fetchData = async () => {
            try{
                const res = await axios.get("http://localhost:5000/dashboard",{
                    headers:{
                        "x-token":token
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
    }, [token])


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