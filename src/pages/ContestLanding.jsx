import React, { useEffect, useState } from "react";
import { useQuiz } from "../context/QuizContext";
import { useNavigate } from "react-router";

function ContestLanding(){
    const {questions,contestQuesData,handleContestPlayerData,changeIsContestto} = useQuiz()
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
            ContestLanding : {contestQuesData?.ContestName}
            <label>Player Name : </label>
            <form onSubmit={handlePlayerName}>
            <input type="text" required placeholder="Enter your name..." value={name} onChange={(e) => setName(e.target.value)}/>
            <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default ContestLanding