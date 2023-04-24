import React, { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import app from '../firebase.config';
import { AuthContext } from '../Provider/AuthProvider';
const auth = getAuth(app)

const Register = () => {

    const { singIn } = useContext(AuthContext)

    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const emailRef = useRef();



    const handleForm = event => {
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password);

        // validation 
        if (!/(?=.*?[A-Z])/.test(password)) {
            setError("Please At least one upper case ")
            return;
        } else if (!/(?=.*?[0-9])/.test(password)) {
            setError("At least one digit")
            return;
        }

        singIn(email, password)
            .then(result => {
                const loggedUser = result.user;
                event.target.reset()
                if (!loggedUser.emailVerified) {
                    alert('First verify your email')
                    return;
                }
                console.log(loggedUser);
                setSuccess("User has been logged In Successful")
                setError('')


            })
            .catch(error => {
                // console.error(error);
                setError(error.message)
                setSuccess('')

            })

    }

    const handleResetPassword = event => {
        const email = (emailRef.current.value);
        if (!email) {
            alert("please provide your Email for reset password")
            return;
        }
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('please Check your Email for reset password')
            })
            .catch(error => {
                console.error(error);
            })
    }

    return (
        <div>
            <h2>Please Login</h2>
            <div className='w-50 mx-auto'>
                <form onSubmit={handleForm}>
                    <div className="form-group">
                        <input type="email" name='email' ref={emailRef} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required />
                    </div>
                    <div className="form-group mt-2 mb-2">
                        <input type="password" name='password' className="form-control" id="exampleInputPassword1" placeholder="Password" required />
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                <p>Are you forget your password? <button onClick={handleResetPassword} className='btn btn-link'>Reset Password</button></p>
                <p><small>Are you new here? Please <Link to="/register">Register</Link> </small></p>
                <p>{error}</p>
                <p>{success}</p>
            </div>
        </div>
    );
};

export default Register;