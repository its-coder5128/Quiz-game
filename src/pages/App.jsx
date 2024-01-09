import React, { useEffect, useState } from "react"
import { useQuiz } from "../context/QuizContext";


function App() {
  const {questions,loading,isContest,categories,fetchQuestions,fetchQuestionsforContest} = useQuiz()
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
    <div className=" w-full flex justify-center">
      <form 
        className=" w-full max-w-md flex flex-col p-4 rounded-lg bg-orange-300 z-50 shadow-lg"
        onSubmit={(e) => {isContest?fetchQuestionsforContest(e,selectedOueries):fetchQuestions(e,selectedOueries)}}> 

          {isContest?<div className=" w-full flex p-2">
            <label className=" w-1/2">Name of Contest : </label>
            <input 
              className=" p-2 outline-none w-1/2"
              type="text" required value={selectedOueries.name} placeholder="Enter Contest Name" name="name" id="name list" onChange={ChangleHandler}/>
                    </div>:null}
          <div className=" w-full flex p-2" >
            <label className=" w-1/2">Number of Questions : </label>
            <select 
              className=" p-2 outline-none w-1/2"
              name="limit" id="limit list" value={selectedOueries.limit} onChange={ChangleHandler}>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
            </select>
          </div>
          <div className=" w-full flex p-2" >
            <label className=" w-1/2" >Difficulty Level : </label>
            <select 
              className=" p-2 outline-none w-1/2"
              name="difficulties" id="difficulties list" value={selectedOueries.difficulties} onChange={ChangleHandler}>
                <option value={"easy"}>Easy</option>
                <option value={"medium"}>Medium</option>
                <option value={"hard"}>Hard</option>
            </select>
          </div>
          <div className=" w-full flex p-2" >
            <label className=" w-1/2" >category of Questions : </label>
            <select 
              className=" p-2 outline-none w-1/2"
              name="category" id="category list" value={selectedOueries.category} onChange={ChangleHandler}>
                <option value={"default"}>--Please select a category</option>
                {
                  categories && categories.map((items)=>(
                    <option key={items} value={items}>
                        {items}
                    </option>
                  ))
                }
            </select>
          </div>
          <button 
            className=" m-2 p-4 bg-orange-600 text-white hover:bg-orange-700 dura"
            type="submit">{loading?"Loading...":isContest?"Create Contest":"Play Quiz"}</button>
      </form>
    </div>
  );
}

export default App
