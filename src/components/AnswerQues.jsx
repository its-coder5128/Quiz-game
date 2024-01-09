import React from 'react'

function AnswerQues(
    {ques,index,onAnswer}
){
    const allAnswers = [ques.correctAnswer, ...ques.incorrectAnswers].sort((a,b) => a < b ? -1 : 1)
  return (
    <div className=' w-full my-4  py-4 border-y-2 border-gray-600'>
        <div className=' py-2'>
            <p><strong>{index+1} : </strong> {ques.question.text}</p>
        </div>
        <ul>
            {
                allAnswers.map(answer => 
                <li  
                    key={answer} >
                        <button 
                            className=' flex w-full mx-auto rounded-xl overflow-hidden justify-between bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 mb-2 '
                            onClick={() => onAnswer(answer)}>
                            {answer}
                        </button>
                </li>
                )
            }
        </ul>
      
    </div>
  )
}

export default AnswerQues
