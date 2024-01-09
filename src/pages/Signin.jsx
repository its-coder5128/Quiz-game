import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Signin() {
    const {err,handleLogin} = useAuth()
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (cred) => {
        console.log("cred", cred)
        handleLogin(cred)
        if(errors && errors.length>0)
            console.log("error", errors);
    }
    
    return (
        <div className=' w-full flex justify-center'>
            <div className='w-full max-w-md flex flex-col'>
                {err?<p className='text-center text-red-700'>Email/Password doesn't match</p>:null}
                <form
                    className=' w-full flex flex-col' 
                    onSubmit={handleSubmit(onSubmit)}>
                        <div className=' w-full flex flex-col p-2'>
                            <label>Email: </label>
                            <input
                                className=" p-2 outline-none" 
                                type="text" placeholder="Email" {...register("Email", {required: true, pattern: /^\S+@\S+$/i})} />
                        </div>
                        <div className=' w-full flex flex-col p-2'>
                            <label>Password: </label>
                            <input
                                className=" p-2 outline-none" 
                                type="password" placeholder="Password" {...register("Password", {required: true, minLength: 8})} />
                        </div>
    
                        <button
                            className=' w-11/12 mx-auto p-4 my-2 bg-orange-600 hover:bg-orange-700 text-white ' 
                            type="submit">Sign in</button>
                </form>
                <p className='text-center'>Don't have an account? <Link to={"/signup"} className=' underline'>registed here</Link></p>
            </div>
        </div>
  );
}