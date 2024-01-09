import React, { useEffect, useState } from "react";
import { useQuiz } from "../context/QuizContext";
import { useNavigate } from "react-router";

function ContestLanding(){
    const {questions,contestQuesData,handleContestPlayerData,changeIsContestto} = useQuiz()
    let LeaderBoard = JSON.parse(window.localStorage.getItem("LeaderBoard"))
    const [name,setName] = useState("")
    const navigate = useNavigate()

    const handlePlayerName = (e) => {
        e.preventDefault()
        handleContestPlayerData("PlayerName",name)
        navigate("/quiz")
    }

    useEffect(()=>{
        changeIsContestto(true)
        window.localStorage.setItem("ContestLive","true")
    },[])

    useEffect(()=>{
        console.log("contestLanding",questions)
    },[questions])
    return(
        <div>
            <p className=" p-4 text-4xl border-b-2 border-orange-600"><strong>{contestQuesData?.ContestName}</strong></p>
            
            <form
                className=" m-4" 
                onSubmit={handlePlayerName}>
                <div className="py-4"> 
                    <label className=" pr-3">Player Name : </label>
                    <input
                        className=" p-2 outline-none" 
                        type="text" required placeholder="Enter your name..." value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <button
                    className=" p-4 bg-orange-600 w-80  text-white hover:bg-orange-700 duration-200" 
                    type="submit">Play Contest</button>
            </form>
            <h2 className=" p-4 text-3xl">Leader Board :- </h2>
            {LeaderBoard && LeaderBoard.length>0 ? 
            <ul>
                {
                    LeaderBoard.map((item) => (
                        <li 
                        className=' flex w-full mx-auto rounded-xl overflow-hidden justify-between bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 mb-2 '
                            key={item.$createdAt}>{item.PlayerName} : {item.Score}</li>
                    ))
                }
            </ul> : <div>
                        <p>No entries yet</p>
                    </div>}
            
        </div>
    )
}

export default ContestLanding