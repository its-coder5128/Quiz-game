import React, { useEffect, useState } from 'react'
import { useQuiz } from '../context/QuizContext'
import AnswerQues from './AnswerQues'
import { Link } from 'react-router-dom'

function QuestionSection(){
  
  const [ques,setQues] = useState([])
  const [index,setIndex] = useState(0)
  const [score,setScore] = useState(0)
  const [loading, setLoading] = useState(true)
  const handleAnswer = (answer) => {
    if(answer === ques[index].correctAnswer )
    {
      setScore(score+1)
    }
    setIndex(index+1)
  }
  const {questions} = useQuiz()

  useEffect(()=>{
    console.log(questions)
    setQues(questions)
    setTimeout(() => {
      setLoading(false)
    }, "1000");
    
  },[questions])

  return (
    <>
      {loading?<p>loading quiz...</p>:<div>
        Total Questions : {ques.length}
        Questions remaining : {ques.length - index}
        score : {score}
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
              <Link to={"/createQuiz"}>Create new Quiz</Link>
            </div>
          }
        </div>
      </div>}
    </>
  );
}

export default QuestionSection
