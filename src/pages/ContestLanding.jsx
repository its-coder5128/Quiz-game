import React, { useEffect } from "react";
import { useQuiz } from "../context/QuizContext";

function ContestLanding(){
    const {questions,contestQuesData} = useQuiz()

    useEffect(()=>{
        console.log("contestLanding",questions)
    },[questions])
    return(
        <div>
            ContestLanding : {contestQuesData.ContestName}
        </div>
    )
}

export default ContestLanding