import React, { useContext, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from "firebase/auth";
import app from '../firebase.config';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';



const Register = () => {

    const {createUser} = useContext(AuthContext)
    
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const [name, setName] = useState()

    const auth = getAuth(app)

    const handleForm = event =>{
        event.preventDefault()
        const form = event.target;
        const name = form.name.value;
        setName(name)
        const email = form.email.value;
        const password = form.password.value;
        // console.log(name, email, password);

        // validation 
        if(!/(?=.*?[A-Z])/.test(password)){
            setError("Please At least one upper case ")
            return;
        } else if(!/(?=.*?[0-9])/.test(password)){
            setError("At least one digit")
            return;
        }

        createUser( email, password)
        .then(result=>{
            const loggedUser = result.user;
            console.log(loggedUser);
            setSuccess("User has been created Successful")
            event.target.reset()
            emailVerification(loggedUser)
            setError('')
            profileUpdate(loggedUser, name)
            
        })
        .catch(error=>{
            // console.error(error);
            setError(error.message)

        })
        const emailVerification = user =>{
            sendEmailVerification(user)
            .then(() =>{
                setSuccess('Please check your email for verification')
                return;
                
            })
            .catch(error=>{
                setError(error.message)
                console.log(error);
            })
        }

    }

    const profileUpdate = (user, name) =>{
        updateProfile(user,{
            displayName: name
        })
        .then(()=>{

        })
        .catch(error=>{
            console.log(error);
        })
    }



    return (
        <div>
            <h2>Please Register</h2>
            <div className='w-50 mx-auto'>
                <form onSubmit={handleForm}>
                    <div className="form-group">
                        <input type="text" name='name' className="form-control mb-2" id="name" aria-describedby="name" placeholder="Enter Name" required />
                    </div>
                    <div className="form-group">
                        <input type="email" name='email' className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" required />
                    </div>
                    <div className="form-group mt-2 mb-2">
                        <input type="password" name='password' className="form-control" id="password" placeholder="Password" required />
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                <p><small>Have an account? Please <Link to="/login">Login</Link> </small></p>
                <p>{error}</p>
                <p>{success}</p>
            </div>
        </div>
    );
};

export default Register;