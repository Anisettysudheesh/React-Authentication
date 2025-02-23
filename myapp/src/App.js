import React, {  createContext, useState } from 'react';
import Register from './models/Register'; 
import Navbar from './models/nav';
import Login from "./models/Login"
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Dashboard from './models/dashboard';

export const store= createContext()
function App() {
  const [token,setToken]=useState(null)




  return ( <div>
    <store.Provider value={[token,setToken]}>
    <BrowserRouter>
   <Navbar/>

   <Routes>
    <Route path="/Register" element={<Register/>}></Route>
    <Route path="/Login" element={<Login/>}></Route>
    <Route path="/dashboard" element={<Dashboard/>}></Route>
   </Routes>

    </BrowserRouter>
    </store.Provider>


{/* <h5 style={{textAlign:"center",marginTop:"1rem",fontSize:"2rem"}}>
  Welcome to the example of React Authentication and Authorisation build with
</h5>
<h3 style={{textAlign:"center",fontSize:"2rem"}}>
  Tech Stack
</h3>
<center className="tech-stack">
        <ol>
          <li>Frontend: React.js</li>
          <li>Routing: React Router</li>
          <li>Authorisation: Private Route</li>
          <li>Styling: CSS</li>
          <li>State Management: Context API</li>
          <li>Backend: Node.js & Express.js</li>
          <li>Database: MongoDB</li>
          <li>Authentication: JWT</li>
        </ol>
      </center> */}


  </div> );

}

export default App;