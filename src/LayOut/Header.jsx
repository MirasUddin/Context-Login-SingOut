import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Header.css'
import { AuthContext } from '../Provider/AuthProvider';

const Header = () => {
    const { user, logOut } = useContext(AuthContext)

    const handleSingOut = () =>{
        logOut()
        .then(()=>{

        })
        .catch(error=>{
            console.log(error);
        })
    }
    
    console.log(user);
    return (
        <nav>
            <div className='nav'>
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
                <Link to="/about-us">About US</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/profile">Profile</Link>
                {
                    user?.emailVerified ? <>
                        <span>{user.email}</span>
                        <button onClick={handleSingOut}>sing Out</button>
                        </> : <Link to="/login">Login</Link>
                }
            </div>
        </nav>
    )
};

export default Header;