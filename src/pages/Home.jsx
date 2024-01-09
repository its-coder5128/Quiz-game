import React, { useEffect,useState } from 'react'
import { Link} from 'react-router-dom'
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext'
import { useQuiz } from '../context/QuizContext'
import { Trash2 } from 'react-feather'

function Home(){
  const {user} = useAuth()
  const {contests,changeIsContestto,removeContest,handleContestReq,handleContestData} = useQuiz()
  const navigate = useNavigate()
  
  useEffect(()=>{
    changeIsContestto(false)
    window.localStorage.setItem("ContestLive","false")
    window.localStorage.setItem("contestQuesData",JSON.stringify(null))
    handleContestData(null)
  },[])

  const createContest = ()=>{
    changeIsContestto(true)
    navigate("/createQuiz")
  }

  return (
    <div className='flex flex-col'>

        <div className='  flex flex-col justify-center items-center '>
          <div className=' w-full '>
            <Link to={"/createQuiz"}> 
              <div className=' w-full max-w-sm py-4 text-white rounded-sm mb-4 mx-auto text-center bg-orange-700 hover:bg-orange-800'>Play Quiz</div>
            </Link>
          </div>
          <div className=' w-full '>
            
            {user?<div 
                  className=' w-full max-w-sm  text-white rounded-sm mb-4 mx-auto text-center bg-orange-700 hover:bg-orange-800'>
                    <button 
                      className='w-full py-4'
                      onClick={createContest}>Create Contest
                    </button>
                  </div>:
                  <div
                  className=' w-full max-w-sm py-4 rounded-sm mb-4 mx-auto text-center border-2 border-orange-700 text-gray-700'  
                  >
                    <p><Link to={"/signin"} className=' underline'>Login</Link> to create contest</p>
                  </div>}
          </div>
        </div>

        <div className=' flex flex-col items-start'>
              <h2 className=' text-3xl my-2'>Available Contests :- </h2>
              <ul className='w-full px-4 py-2'>
                  {
                    contests && contests.length > 0 && contests.map((items)=>(
                      <li key={items.$createdAt}>
                        <div className=' flex w-full max-w-screen-lg mx-auto rounded-xl overflow-hidden justify-between mb-2'>
                          <button 
                            className=' px-4 py-2 w-full text-left bg-orange-500 text-white hover:bg-orange-700 duration-200'
                            onClick={()=>handleContestReq(items)}>{items.ContestName}</button>
                          {items.User_ID === user?.$id ? 
                              <button
                                className='px-4 py-2 hover:bg-orange-700 hover:text-white duration-200' 
                                onClick={() => removeContest(items.$id)}> <Trash2/> </button> : null}

                        </div>
                      </li>
                    ))
                  }
              </ul>
          </div>
        
    </div>
  )
}

export default Home
