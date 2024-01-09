import { createContext, useContext, useState, useEffect } from "react";
import { account } from "../appwriteconfig";
import { useNavigate } from "react-router";
import { ID } from "appwrite";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [err,setErr] = useState(false)
    const [loading,setLoading] = useState(true)
    const [user,setUser] = useState(null)

    const navigate = useNavigate()

    useEffect(()=>{
        getUseronLoad()
    },[])
    
    const getUseronLoad = async ()=>{
        
        try{
            let accDetails = await account.get();
            setUser(accDetails)   
        }catch(error){
            console.error(error);
        }

        setLoading(false)  
    }

    const handleRegisterNewUser = async (cred) => {

        try{
            let response = await account.create(ID.unique(), cred.Email,cred.Password,cred.FirstName,cred.LastName,cred.Phone);
            console.log("res",response)
            await account.createEmailSession(cred.Email,cred.Password)
            let accDetails = await account.get();
            setUser(accDetails)
            navigate("")   

        }catch(error){
            console.log(error)
        }

    }
    const handleLogin = async (cred) => {

        try{
            await account.createEmailSession(cred.Email,cred.Password)
            let accDetails = await account.get();
            setUser(accDetails) 
            navigate("")     

        }catch(error){
            setErr(true);
            console.log(error)
        }

    }
    const handleLogout = async () => {

        try{
            let response = await account.deleteSessions('current');
            setUser(null) 

        }catch(error){
            console.log(error)
        }

    }
    const contextData ={
        user,
        err,
        handleRegisterNewUser,
        handleLogin,
        handleLogout,
    }
    
    return(
        <AuthContext.Provider value={contextData}>
            {loading ? <p>Loading...</p> : children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=>{ return useContext(AuthContext)}

export default AuthContext