import React, { useEffect,useState } from 'react'
import { Link} from 'react-router-dom'
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext'
import { useQuiz } from '../context/QuizContext'

function Home(){
  const {user,handleLogout} = useAuth()
  const {contests,changeIsContestto,removeContest,handleContestReq} = useQuiz()
  const navigate = useNavigate()
  
  useEffect(()=>{
    changeIsContestto(false)
  },[])
  useEffect(()=>{
    console.log("contest",contests)
  },[contests])

  const createContest = ()=>{
    changeIsContestto(true)
    navigate("/createQuiz")
  }

  return (
    <>
        <div>
            <Link to={"/createQuiz"}> Create Quiz </Link>
            {user?<button onClick={createContest}>Create Contest</button>:<p><Link to={"/signin"} className=' underline'>Login</Link> to create contest</p>}
            <h2>Available Contests :- </h2>
            <ul>
                {
                  contests && contests.length > 0 && contests.map((items)=>(
                    <li key={items.$createdAt}>
                      <div className=' flex'>
                        <button onClick={()=>handleContestReq(items)}>{items.ContestName}</button>
                        {items.User_ID === user?.$id ? <button onClick={() => removeContest(items.$id)}>X</button> : null}

                      </div>
                    </li>
                  ))
                }
            </ul>
            

        </div>
        <div>
          {user?<button onClick={handleLogout}>Log out</button>:<div>
            <Link to={"/signin"}>signin</Link>
            <Link to={"signup"}>signup</Link>
          </div>}
        </div>
    </>
  )
}

export default Home
