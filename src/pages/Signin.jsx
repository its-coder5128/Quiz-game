import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Signin() {
    const {handleLogin} = useAuth()
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (cred) => {
        console.log("cred", cred)
        handleLogin(cred)
        if(errors && errors.length>0)
            console.log("error", errors);
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="Email" {...register("Email", {required: true, pattern: /^\S+@\S+$/i})} />
                <input type="password" placeholder="Password" {...register("Password", {required: true, minLength: 6})} />
                <button type="submit">Sign in</button>
            </form>
            <p>Don't have an account? <Link to={"/signup"} className=' underline'>registed here</Link></p>
        </div>
  );
}