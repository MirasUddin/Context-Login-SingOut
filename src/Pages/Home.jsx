import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';


const user = useContext(AuthContext)

const Home = () => {

    
    
    return (
        <div>
            <h2>Home page {user && <span>{user.displayName}</span>}</h2>
        </div>
    );
};

export default Home;