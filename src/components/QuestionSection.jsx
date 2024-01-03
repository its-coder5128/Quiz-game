import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import AnswerQues from './AnswerQues'
import { Link } from 'react-router-dom'
import { useQuiz } from '../context/QuizContext'

function QuestionSection(){
  const navigate = useNavigate()
  const {isContest,handleContestPlayerData,createContestEntry,contestPlayerData,changeIsContestto} = useQuiz()
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
    createContestEntry()
    const quizData = {
      question : ques,
      indices : 0,
      scores : 0
    }
    window.localStorage.setItem("list",JSON.stringify(quizData))
    navigate("/contest")
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
      {loading?<p>loading quiz...</p>:<div>
        
        <p>Total Questions : {ques.length}</p>
        <p>Questions remaining : {ques.length - index}</p>
        {isContest?null:<p>score : {score}</p>}
        { ques && index < ques.length && <AnswerQues
          ques = {ques[index]}
          index = {index}
          onAnswer = {handleAnswer}
        />}
        <div>
          {
            ques && index == 0 && <p>Start the quiz</p>
          }
          {
            ques && index < ques.length && <p>Quiz in progress...</p>
          }
          {
            ques && index === ques.length && <div>
              <p>Quiz completed</p>
              {isContest?<button onClick={handleContestPlayer}>Submit</button>:<Link to={"/createQuiz"}>Create new Quiz</Link>}
            </div>
          }
        </div>
      </div>}
    </>
  );
}

export default QuestionSection
