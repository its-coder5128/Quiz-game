import React from 'react'

function AnswerQues(
    {ques,index,onAnswer}
){
    const allAnswers = [ques.correctAnswer, ...ques.incorrectAnswers].sort((a,b) => a < b ? -1 : 1)
  return (
    <div>
        <p>{index+1} : {ques.question.text}</p>
        <ul>
            {
                allAnswers.map(answer => <li  key={answer} ><button onClick={() => onAnswer(answer)}>{answer}</button></li>)
            }
        </ul>
      
    </div>
  )
}

export default AnswerQues
