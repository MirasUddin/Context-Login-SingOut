import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Header.css'
import { AuthContext } from '../Provider/AuthProvider';

const Header = () => {
    const {user} = useContext(AuthContext)
    console.log(user);
    return (
        <nav>
            <div className='nav'>
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
                <Link to="/about-us">About US</Link>
                {
                    user? <span>{user.email}</span>: <button>sing Out</button>
                }
            </div>
        </nav>
    )
};

export default Header;