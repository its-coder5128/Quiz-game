import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
    const {handleRegisterNewUser} = useAuth()
    const { register, handleSubmit, formState: { errors }, } = useForm();

    const onSubmit = (cred) => {
        handleRegisterNewUser(cred)
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
                            {errors.FirstName && <p className=' text-red-700'>First name is required.</p>}
                        </div>
                        <div className=' w-full flex flex-col p-2'>
                            <label>Last Name: </label>
                            <input
                                className=" p-2 outline-none" 
                                type="text" placeholder="Last name" {...register("LastName", {required: true, maxLength: 100})} />
                            {errors.LastName && <p className=' text-red-700'>Last name is required.</p>}
                        </div>
                        <div className=' w-full flex flex-col p-2'>
                            <label>Email: </label>
                            <input
                                className=" p-2 outline-none" 
                                type="text" placeholder="Email" {...register("Email", {required: true, pattern: /^\S+@\S+$/i})} />
                            {errors.Email && errors.Email.type == "required" && <p className=' text-red-700'>Email is required.</p>}
                            {errors.Email && errors.Email.type == "pattern" && <p className=' text-red-700'>Enter a valid Email.</p>}
                        </div>
                        <div className=' w-full flex flex-col p-2'>
                            <label>Mobile Number: </label>
                            <input
                                className=" p-2 outline-none" 
                                type="tel" placeholder="Mobile Number" {...register("Phone", {required: true, minLength: 6, maxLength: 12})} />
                            {errors.Phone && errors.Phone.type == "required" && <p className=' text-red-700'>Phone Number is required.</p>}
                            {errors.Phone && errors.Phone.type == "minLength" && <p className=' text-red-700'>Enter a valid Phone Number.</p>}
                            {errors.Phone && errors.Phone.type == "maxLength" && <p className=' text-red-700'>Enter a valid Phone Number.</p>}
                        </div>
                        <div className=' w-full flex flex-col p-2'>
                            <label>Password: </label>
                            <input
                                className=" p-2 outline-none" 
                                type="password" placeholder="Password" {...register("Password", {required: true, minLength: 8})} />
                            {errors.Password && errors.Password.type == "required" && <p className=' text-red-700'>Password is required.</p>}
                            {errors.Password && errors.Password.type == "minLength" && <p className=' text-red-700'>Password must be alteast 8 characters.</p>}
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