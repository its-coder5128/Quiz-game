import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
    const {handleRegisterNewUser} = useAuth()
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (cred) => {
        console.log("cred", cred)
        handleRegisterNewUser(cred)
        if(errors && errors.length>0)
            console.log("error", errors);
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="First name" {...register("FirstName", {required: true, maxLength: 80})} />
                <input type="text" placeholder="Last name" {...register("LastName", {required: true, maxLength: 100})} />
                <input type="text" placeholder="Email" {...register("Email", {required: true, pattern: /^\S+@\S+$/i})} />
                <input type="tel" placeholder="Mobile Number" {...register("Phone", {required: true, minLength: 6, maxLength: 12})} />
                <input type="password" placeholder="Password" {...register("Password", {required: true, minLength: 6})} />

                <button type="submit">Sign up</button>
            </form>
            <p>Already have an account? <Link to={"/signin"} className=' underline'>signin here</Link></p>
        </div>
  );
}