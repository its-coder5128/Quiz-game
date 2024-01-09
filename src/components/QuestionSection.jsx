import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import AnswerQues from './AnswerQues'
import { Link } from 'react-router-dom'
import { useQuiz } from '../context/QuizContext'

function QuestionSection(){
  const navigate = useNavigate()
  const {isContest,handleContestPlayerData,contestPlayerData,changeIsContestto} = useQuiz()
  const [ques,setQues] = useState([])
  const [index,setIndex] = useState(-1)
  const [score,setScore] = useState(0)
  const [loading, setLoading] = useState(true)

  const handleAnswer = (answer) => {
    if(answer === ques[index].correctAnswer )
    {
      setScore(score+1)
    }
    setIndex(index+1)
  }

  const handleContestPlayer = () => {
    handleContestPlayerData("Score",score)
    console.log("score",score)
    
    const quizData = {
      question : ques,
      indices : 0,
      scores : 0
    }
    window.localStorage.setItem("list",JSON.stringify(quizData))
    navigate("/")
  }

  let QnS = JSON.parse(window.localStorage.getItem("list"))

  useEffect(()=>{
    setQues(QnS.question)
    setIndex(QnS.indices)
    setScore(QnS.scores)
    
    if(contestPlayerData && contestPlayerData.contestId.length>0)
    {changeIsContestto(true)
    window.localStorage.setItem("ContestLive","true")}
    setLoading(false)
  },[])

  useEffect(()=>{
    const quizData = {
      question : ques,
      indices : index,
      scores : score
    }
    window.localStorage.setItem("list",JSON.stringify(quizData))
  },[index])


  return (
    <>
      {loading?<p>loading quiz...</p>:
      <div className=' w-full flex flex-col justify-center items-center'>
        <div className=' flex flex-col'>
          <p className=' p-1 '>Total Questions : {ques.length}</p>
          <p className=' p-1 '>Questions remaining : {ques.length - index}</p>
          {isContest?null:<strong className=' p-1 '>score : {score}</strong>}
        </div>
        { ques && index < ques.length && <AnswerQues
          ques = {ques[index]}
          index = {index}
          onAnswer = {handleAnswer}
        />}
        <div className=' flex flex-col w-full justify-center items-center' >
          {
            ques && index == 0 && <strong className=' p-1 '>Start the quiz</strong>
          }
          {
            ques && index < ques.length && index !== 0 && <p>Quiz in progress...</p>
          }
          {
            ques && index === ques.length && <div className=' flex flex-col w-full gap-2 justify-center items-center'>
              <div className=' flex flex-col my-4 p-4 border-y-2 text-2xl border-green-500 w-full text-center '>
                <strong >Quiz completed</strong>
                {
                  isContest?
                  <strong className=' p-1  text-xl'>Score : {score}</strong>:null
                }
              </div>
              {isContest? <div>
                            <button 
                              className=' mx-2 p-4 px-8 bg-orange-500 text-white hover:bg-orange-700 duration-200 rounded-lg '
                              onClick={handleContestPlayer}>Submit</button>
                          </div> : <Link 
                                      className=' mx-2 p-4 bg-orange-500 text-white hover:bg-orange-700 duration-200 rounded-lg '
                                      to={"/createQuiz"}>Play new Quiz</Link>}
            </div>
          }
        </div>
      </div>}
    </>
  );
}

export default QuestionSection
