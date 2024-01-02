import React, { useEffect, useState } from "react"
import { useQuiz } from "../context/QuizContext";


function App() {
  const {questions,isContest,categories,fetchQuestions,fetchQuestionsforContest} = useQuiz()
  const [selectedOueries,setSelectedOueries] = useState({
    limit : "10",
    difficulties : "medium",
    category : "Arts & Literature",
    name : ""
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
    <form onSubmit={(e) => {isContest?fetchQuestionsforContest(e,selectedOueries):fetchQuestions(e,selectedOueries)}}> 

        {isContest?<div>
          <label>Name of Contest</label>
          <input type="text" required value={selectedOueries.name} name="name" id="name list" onChange={ChangleHandler}/>
                  </div>:null}
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
            <option value={"default"}>--Please select a category</option>
            {
              categories && categories.map((items)=>(
                <option key={items} value={items}>
                    {items}
                </option>
              ))
            }
        </select>
        <button type="submit">Create {isContest?"Contest":"Quiz"}</button>
    </form>
  );
}

export default App
