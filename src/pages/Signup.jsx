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
        <div className=' w-full flex justify-center'>
            <div className='w-full max-w-md flex flex-col'>
                <form
                    className=' w-full flex flex-col' 
                    onSubmit={handleSubmit(onSubmit)}>
                        <div className=' w-full flex flex-col p-2'>
                            <label>First Name: </label>
                            <input
                                className=" p-2 outline-none" 
                                type="text" placeholder="First name" {...register("FirstName", {required: true, maxLength: 80})} />
                        </div>
                        <div className=' w-full flex flex-col p-2'>
                            <label>Last Name: </label>
                            <input
                                className=" p-2 outline-none" 
                                type="text" placeholder="Last name" {...register("LastName", {required: true, maxLength: 100})} />
                        </div>
                        <div className=' w-full flex flex-col p-2'>
                            <label>Email: </label>
                            <input
                                className=" p-2 outline-none" 
                                type="text" placeholder="Email" {...register("Email", {required: true, pattern: /^\S+@\S+$/i})} />
                        </div>
                        <div className=' w-full flex flex-col p-2'>
                            <label>Mobile Number: </label>
                            <input
                                className=" p-2 outline-none" 
                                type="tel" placeholder="Mobile Number" {...register("Phone", {required: true, minLength: 6, maxLength: 12})} />
                        </div>
                        <div className=' w-full flex flex-col p-2'>
                            <label>Password: </label>
                            <input
                                className=" p-2 outline-none" 
                                type="password" placeholder="Password" {...register("Password", {required: true, minLength: 6})} />
                        </div>
    
                        <button
                            className=' w-11/12 mx-auto p-4 my-2 bg-orange-600 hover:bg-orange-700 text-white ' 
                            type="submit">Sign up</button>
                </form>
                <p className='text-center'>Already have an account? <Link to={"/signin"} className=' underline'>signin here</Link></p>
            </div>
        </div>
  );
}