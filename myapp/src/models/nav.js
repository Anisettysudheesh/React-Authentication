import React from 'react';
import "../App.css"
import {Link} from 'react-router-dom';

function Navbar() {
    return (  
        <div className='Nav'>
           <Link><h3>Not logged in</h3></Link> 
            <div className='Nav-right'>
            <Link to="/register"><h3>Register</h3></Link> 
           <Link to="/login"><h3>Login</h3></Link> 
           
          
            </div>
        </div>
    );
}

export default Navbar;