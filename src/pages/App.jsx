import React, { useEffect, useState } from "react"
import { useQuiz } from "../context/QuizContext";


function App() {
  const {questions,categories,fetchQuestions} = useQuiz()
  const [selectedOueries,setSelectedOueries] = useState({
    limit : "10",
    difficulties : "medium",
    category : "Arts & Literature"
  })

  const ChangleHandler = (e) => {
    let name = e.target.name
    let value = e.target.value
    setSelectedOueries((prev) => ({...prev, [name] : value}))
    
  }
  useEffect(()=>{
    console.log(selectedOueries)
    console.log(questions)
  },[selectedOueries,questions])
  return (
    <form onSubmit={(e) => fetchQuestions(e,selectedOueries)}> 
        <label>Number of Questions</label>
        <select name="limit" id="limit list" value={selectedOueries.limit} onChange={ChangleHandler}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
        </select>
        <label>Difficulty Level</label>
        <select name="difficulties" id="difficulties list" value={selectedOueries.difficulties} onChange={ChangleHandler}>
            <option value={"easy"}>Easy</option>
            <option value={"medium"}>Medium</option>
            <option value={"hard"}>Hard</option>
        </select>
        <label>category of Questions</label>
        <select name="category" id="category list" value={selectedOueries.category} onChange={ChangleHandler}>
            {
              categories && categories.map((items)=>(
                <option key={items} value={items}>
                    {items}
                </option>
              ))
            }
        </select>
        <button>Create Quiz</button>
    </form>
  );
}

export default App
